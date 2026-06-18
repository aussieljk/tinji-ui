import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import {
  AvatarGroup,
  AvatarGroupOverflow,
} from "@/registry/default/ui/avatar-group";

export default function Particle() {
  return (
    <AvatarGroup>
      <Avatar>
        <AvatarImage alt="Luke Tracy" src="https://github.com/shadcn.png" />
        <AvatarFallback>LT</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage alt="Maya Lin" src="https://github.com/vercel.png" />
        <AvatarFallback>ML</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <AvatarGroupOverflow>+3</AvatarGroupOverflow>
    </AvatarGroup>
  );
}
