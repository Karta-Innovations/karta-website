/**
 * AUDIT EXCERPT
 * The credibility centerpiece - a bordered mono panel showing a
 * representative doctrine-attributed log entry.
 */
export function AuditExcerpt() {
  return (
    <div className="mt-10">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-tertiary">
        Representative record
      </p>
      <div className="mt-5 border border-edge bg-surface px-4 py-4 md:px-5 md:py-5">
        <div className="space-y-1.5 font-mono text-[11px] leading-[1.7] text-return">
          <div>T+00:38:12  ACQUIRE  pos 17.454N 78.500E  confidence 4.2m</div>
          <div>T+00:51:04  HOLD  alt 140m  clause KX-2.4 · link-loss loiter</div>
          <div className="text-fg-tertiary">auth: pre-approved  operator notified</div>
          <div>T+01:07:20  CONFIRM  corridor 5.1km · conflict resolved</div>
          <div>T+01:08:30  RETURN  route planned  sortie-record locked</div>
        </div>
      </div>
      <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-fg-tertiary">
        Illustrative · not a live record
      </p>
    </div>
  );
}
