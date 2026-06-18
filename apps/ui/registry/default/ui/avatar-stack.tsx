import type React from "react";
import { cn } from "@/registry/default/lib/utils";
import { Avatar, AvatarFallback } from "@/registry/default/ui/avatar";

export function AvatarStack({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "flex items-center -space-x-2 [&_[data-slot=avatar]]:ring-2 [&_[data-slot=avatar]]:ring-background",
        className,
      )}
      data-slot="avatar-stack"
      {...props}
    />
  );
}

export function AvatarStackOverflow({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Avatar>): React.ReactElement {
  return (
    <Avatar
      className={cn("bg-muted text-muted-foreground", className)}
      data-slot="avatar-stack-overflow"
      {...props}
    >
      <AvatarFallback className="bg-transparent">{children}</AvatarFallback>
    </Avatar>
  );
}
