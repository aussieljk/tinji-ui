import {
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
} from "@/registry/default/ui/data-list";

export default function Particle() {
  return (
    <DataList className="w-full max-w-sm" orientation="horizontal">
      <DataListItem>
        <DataListLabel>Status</DataListLabel>
        <DataListValue>Active</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Name</DataListLabel>
        <DataListValue>Ada Lovelace</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Email</DataListLabel>
        <DataListValue>ada@example.com</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Plan</DataListLabel>
        <DataListValue>Pro</DataListValue>
      </DataListItem>
    </DataList>
  );
}
