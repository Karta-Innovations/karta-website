import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { Script } from "node:vm";
import ts from "typescript";

// Load the actual route without starting Next or writing build files.
const routePath = fileURLToPath(new URL("../app/api/engage/route.ts", import.meta.url));
const { outputText } = ts.transpileModule(readFileSync(routePath, "utf8"), {
  fileName: routePath,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
});
const routeModule = { exports: {} };
new Script(`(function(exports, require, module) { ${outputText}\n})`, {
  filename: routePath,
}).runInThisContext()(routeModule.exports, createRequire(routePath), routeModule);
const { POST } = routeModule.exports;

const saved = {
  to: process.env.ENGAGE_TO_EMAIL,
  key: process.env.RESEND_API_KEY,
  fetch: globalThis.fetch,
  error: console.error,
};
const logs = [];
let deliveryAttempts = 0;
const submission = {
  intent: "operational",
  name: "Delivery regression",
  email: "audit@example.invalid",
  organisation: "Local check",
  message: "This stays inside the regression test.",
};

try {
  globalThis.fetch = async () => {
    deliveryAttempts++;
    throw new Error("Unexpected outbound delivery");
  };
  console.error = (...args) => logs.push(args);

  const cases = [
    [undefined, undefined],
    ["inbox@example.invalid", undefined],
    [undefined, "test-key-never-used"],
  ];
  for (const [index, [to, key]] of cases.entries()) {
    if (to === undefined) delete process.env.ENGAGE_TO_EMAIL;
    else process.env.ENGAGE_TO_EMAIL = to;
    if (key === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = key;

    const response = await POST(new Request("http://localhost/api/engage", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": `192.0.2.${index + 1}` },
      body: JSON.stringify(submission),
    }));
    const body = await response.json();
    assert.equal(response.status, 503);
    assert.equal(body.success, false);
    assert.match(body.error, /not sent/);
    assert.match(body.error, /info@kartainnovations\.com/);
  }
  assert.equal(deliveryAttempts, 0, "Missing configuration must never attempt delivery");
  assert.deepEqual(logs, [], "Missing configuration must not log submission data");
  process.stdout.write("PASS: 3 missing-mail-configuration cases; zero outbound requests or submission logs.\n");
} finally {
  if (saved.to === undefined) delete process.env.ENGAGE_TO_EMAIL;
  else process.env.ENGAGE_TO_EMAIL = saved.to;
  if (saved.key === undefined) delete process.env.RESEND_API_KEY;
  else process.env.RESEND_API_KEY = saved.key;
  globalThis.fetch = saved.fetch;
  console.error = saved.error;
}
