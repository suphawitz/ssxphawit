"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import { TRUST_ITEMS } from "@/config/design";
import { fadeIn } from "@/config/motion";

export default function TrustBar() {
  return (
    <motion.section className="border-y border-border" {...fadeIn}>
      <Container className="grid grid-cols-1 gap-y-8 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
        {TRUST_ITEMS.map(({ label, value }) => (
          <div key={label}>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {label}
            </p>
            <p className="mt-1.5 text-sm font-medium text-foreground">
              {value}
            </p>
          </div>
        ))}
      </Container>
    </motion.section>
  );
}
