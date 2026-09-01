"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { ExternalAction } from "@/components/layout/external-action";
import { NavLink } from "@/components/layout/nav-link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNavigation, shellActions } from "@/config/navigation";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger
        render={
          <Button
            aria-label="Open navigation menu"
            className="md:hidden"
            size="icon"
            variant="outline"
          />
        }
      >
        <Menu />
      </SheetTrigger>
      <SheetContent className="border-border bg-popover/95 w-[min(22rem,calc(100vw-2rem))] shadow-[0_0_48px_rgb(0_0_0_/_0.42)] backdrop-blur-md">
        <SheetHeader className="border-border border-b">
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>
            Portfolio routes and external actions.
          </SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile navigation" className="grid gap-1 px-3">
          {mainNavigation.map((item) => (
            <NavLink
              href={item.href}
              key={item.href}
              label={item.label}
              mobile
              onClick={() => setOpen(false)}
            />
          ))}
        </nav>
        <Separator />
        <div className="grid gap-2 px-4">
          {shellActions.map((action) => (
            <ExternalAction
              disabled={action.placeholder}
              external={action.external}
              href={action.href}
              key={action.label}
              label={action.label}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
