"use client";
import { useEffect, useRef } from "react";
import hljs from "highlight.js";

interface CodeBlockProps {
  code: string;
}

export default function CodeBlock({ code }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [code]);

  return (
    <pre className="overflow-x-auto my-4 font-mono text-base bg-black rounded-lg">
      <code ref={codeRef} className="hljs">
        {code.trim()}
      </code>
    </pre>
  );
}
