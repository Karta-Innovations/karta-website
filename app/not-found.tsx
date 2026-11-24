import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
  return (
    <section className="lost" data-tone="indigo">
      <div className="wrap lost__inner">
        <p className="label accent">404 · No fix</p>
        <h1 className="t-hero">This position is not on the map.</h1>
        <p className="lede">
          We could not match that address to a page. Take a known position and carry on from there.
        </p>
        <div className="lost__actions">
          <Link href="/" className="btn">
            Return to the start <ArrowRight size={16} weight="bold" aria-hidden />
          </Link>
          <Link href="/engage" className="link">
            Talk to engineering
          </Link>
        </div>
      </div>
    </section>
  );
}
