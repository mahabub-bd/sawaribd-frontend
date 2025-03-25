"use client";

import { useState } from "react";
import { ClipboardCopy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
}

export function CopyButton({ textToCopy, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);

    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button
      className={cn(
        "text-primary hover:text-primary/80 transition-colors",
        className
      )}
      onClick={handleCopy}
      title={copied ? "Copied!" : "Copy to clipboard"}
      type="button"
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <ClipboardCopy className="h-4 w-4" />
      )}
    </button>
  );
}
