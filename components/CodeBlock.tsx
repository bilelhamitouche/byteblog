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
    <pre className="rounded-lg my-4 overflow-x-auto font-mono text-base bg-black">
      <code ref={codeRef} className="hljs">
        {code.trim()}
      </code>
    </pre>
  );
}
