import type { CSSProperties, ElementType } from "react";
import { cn } from "@/lib/cn";

interface WordsProps {
  /** One string, or one string per line when the breaks are deliberate. */
  text: string | string[];
  as?: ElementType;
  className?: string;
  /** Delay before the first word, in milliseconds. */
  delay?: number;
  id?: string;
}

/**
 * Sets a line of type so each word rises from behind its own mask as the
 * element enters the viewport. Words stay real text with real spaces, so the
 * sentence reads normally to assistive technology and to search.
 */
export function Words({ text, as: Tag = "span", className, delay = 0, id }: WordsProps) {
  const lines = (Array.isArray(text) ? text : [text]).map((line) => line.split(" "));
  // Position of each line's first word in the whole sentence, for the stagger.
  const starts = lines.map((_, lineIndex) =>
    lines.slice(0, lineIndex).reduce((count, words) => count + words.length, 0),
  );

  return (
    <Tag id={id} className={cn("words", className)} data-reveal="words" style={{ "--d": `${delay}ms` } as CSSProperties}>
      {lines.map((words, lineIndex) => {
        const content = words.map((word, wordIndex) => (
          <span key={`${lineIndex}-${wordIndex}`}>
            <span className="words__w">
              <span style={{ "--i": starts[lineIndex] + wordIndex } as CSSProperties}>{word}</span>
            </span>
            {wordIndex < words.length - 1 ? " " : null}
          </span>
        ));
        return lines.length > 1 ? (
          <span key={lineIndex} className="words__line">
            {content}{" "}
          </span>
        ) : (
          content
        );
      })}
    </Tag>
  );
}
