import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@tinji/ui/components/avatar";

export default {
  Image: (
    <div className="p-6">
      <Avatar className="size-12">
        <AvatarImage src="https://i.pravatar.cc/96?img=12" alt="User avatar" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </div>
  ),
  Fallback: (
    <div className="flex items-center gap-4 p-6">
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar className="size-10">
        <AvatarFallback>CD</AvatarFallback>
      </Avatar>
      <Avatar className="size-12">
        <AvatarFallback>EF</AvatarFallback>
      </Avatar>
    </div>
  ),
};
