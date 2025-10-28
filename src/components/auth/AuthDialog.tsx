
"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import SignUpCard from "./signup";
import SignInCard from "./login";

type AuthDialogProps = {
  asChild?: boolean;
  triggerClass?: string;
  children?: React.ReactNode;
};

export default function AuthDialog({
  asChild = false,
  triggerClass = "",
  children,
}: AuthDialogProps) {
  const [flipped, setFlipped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  // Measure height on content change
  useLayoutEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.offsetHeight);
    }
  }, [flipped]);

  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>
        <button className={triggerClass}>{children ?? "Get Started"}</button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-0 rounded-lg overflow-hidden transition-all">
        <div
          className="relative w-full"
          style={{
            perspective: "1000px",
            height: height ? `${height}px` : "auto",
            transition: "height 0.5s ease",
          }}
        >
          <div
            className="w-full transition-transform duration-700"
            style={{
              transformStyle: "preserve-3d",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
            ref={containerRef}
          >
            <div
              className="w-full"
              style={{
                backfaceVisibility: "hidden",
              }}
            >
              {!flipped && <SignInCard onSwitch={() => setFlipped(true)} />}
            </div>
            <div
              className="w-full"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              {flipped && <SignUpCard onSwitch={() => setFlipped(false)} />}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
