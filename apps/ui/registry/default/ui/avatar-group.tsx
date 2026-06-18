import type React from "react";
import { cn } from "@/registry/default/lib/utils";
import { Avatar, AvatarFallback } from "@/registry/default/ui/avatar";

export function AvatarGroup({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn("flex items-center gap-2", className)}
      data-slot="avatar-group"
      {...props}
    />
  );
}

export function AvatarGroupOverflow({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Avatar>): React.ReactElement {
  return (
    <Avatar
      className={cn("bg-muted text-muted-foreground", className)}
      data-slot="avatar-group-overflow"
      {...props}
    >
      <AvatarFallback className="bg-transparent">{children}</AvatarFallback>
    </Avatar>
  );
}
