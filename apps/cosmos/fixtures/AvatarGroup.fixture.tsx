import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@tinji/ui/components/avatar";
import {
  AvatarGroup,
  AvatarGroupOverflow,
} from "@tinji/ui/components/avatar-group";

export default {
  Default: (
    <div className="p-6">
      <AvatarGroup className="-space-x-2 *:ring-2 *:ring-background">
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/64?img=1" alt="Alice" />
          <AvatarFallback>AL</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/64?img=2" alt="Bob" />
          <AvatarFallback>BO</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/64?img=3" alt="Carol" />
          <AvatarFallback>CA</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    </div>
  ),
  WithOverflow: (
    <div className="p-6">
      <AvatarGroup className="-space-x-2 *:ring-2 *:ring-background">
        <Avatar>
          <AvatarFallback>AL</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>BO</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>CA</AvatarFallback>
        </Avatar>
        <AvatarGroupOverflow>+5</AvatarGroupOverflow>
      </AvatarGroup>
    </div>
  ),
};
