import { Avatar, AvatarFallback } from "@tinji/ui/components/avatar";
import { cn } from "@tinji/ui/lib/utils";
import type React from "react";

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
