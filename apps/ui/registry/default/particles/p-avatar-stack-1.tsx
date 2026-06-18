import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import {
  AvatarStack,
  AvatarStackOverflow,
} from "@/registry/default/ui/avatar-stack";

export default function Particle() {
  return (
    <AvatarStack>
      <Avatar>
        <AvatarImage alt="Luke Tracy" src="https://github.com/shadcn.png" />
        <AvatarFallback>LT</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage alt="Maya Lin" src="https://github.com/vercel.png" />
        <AvatarFallback>ML</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage alt="John Doe" src="https://github.com/nextjs.png" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <AvatarStackOverflow>+5</AvatarStackOverflow>
    </AvatarStack>
  );
}
