"use client";

import type * as React from "react";
import { Expand } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type DiagramExpandProps = {
  children: React.ReactNode;
  description?: string;
  title: string;
};

export function DiagramExpand({
  children,
  description,
  title,
}: DiagramExpandProps) {
  return (
    <Dialog>
      <DialogTrigger render={<Button size="sm" variant="outline" />}>
        <Expand data-icon="inline-start" />
        Expand
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)] overflow-hidden p-5 sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : null}
        </DialogHeader>
        <div className="border-border bg-background/70 max-h-[calc(100vh-10rem)] overflow-auto rounded-xl border p-4">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
