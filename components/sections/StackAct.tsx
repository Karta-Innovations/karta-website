"use client";

import { STACK_LAYERS } from "@/lib/catalog";
import { MnemonicBand } from "./stack-act/MnemonicBand";
import { LayerBand } from "./stack-act/LayerBand";
import { LoopClosing } from "./stack-act/LoopClosing";

/**
 * Act 3 — THE ANSWER
 * Folds the /stack page into one act: three responsibilities that close the loop.
 * - Mnemonic band: light sand surface with three connected statements
 * - Three layer bands: dark background, one per layer with mission-clock eyebrows
 * - Loop diagram: the circuit that closes intent and audit
 */
export function StackAct() {
  return (
    <>
      <MnemonicBand />
      <div className="space-y-0">
        {STACK_LAYERS.map((layer, index) => (
          <LayerBand key={layer.slug} layer={layer} index={index} />
        ))}
      </div>
      <LoopClosing />
    </>
  );
}
