import { VERTICALS, type VerticalId } from "@/lib/solutions";
import { SolutionHero } from "./SolutionHero";
import { ProofPillars } from "./ProofPillars";
import { MissionConsole } from "./MissionConsole";
import { PayloadCatalog } from "./PayloadCatalog";
import { PlatformsForMission } from "./PlatformsForMission";
import { StackUnderneath } from "./StackUnderneath";
import { SolutionClosing } from "./SolutionClosing";

/**
 * Composes a full Solutions vertical page from its config. /enterprise and
 * /defense are identical in structure and differ only by vertical, so the
 * route files stay thin (metadata + this).
 *
 * Order mirrors the approved plan: hero -> wedge -> mission console ->
 * payload catalog -> platforms -> stack -> close.
 */
export function SolutionPage({ vertical }: { vertical: VerticalId }) {
  const config = VERTICALS[vertical];
  return (
    <>
      <SolutionHero config={config} />
      <ProofPillars config={config} />
      <MissionConsole vertical={vertical} />
      <PayloadCatalog vertical={vertical} />
      <PlatformsForMission vertical={vertical} />
      <StackUnderneath config={config} />
      <SolutionClosing config={config} />
    </>
  );
}
