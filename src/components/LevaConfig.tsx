"use client";
import { Leva } from "leva";

export default function LevaConfig() {
  return (
    <div className="fixed top-24 right-6 z-[2147483647] pointer-events-auto">
      <Leva 
        collapsed={false}
        titleBar={{ title: "Awwwards Art Director" }}
        theme={{ colors: { accent1: '#f97316', accent2: '#f97316' } }}
      />
    </div>
  );
}
