import { Avatar, AvatarFallback } from "@tinji/ui/components/avatar";
import { cn } from "@tinji/ui/lib/utils";
import type React from "react";

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
