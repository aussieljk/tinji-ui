import {
  TabsNav,
  TabsNavLink,
  TabsNavList,
} from "@/registry/default/ui/tabs-nav";

export default function Particle() {
  return (
    <TabsNav aria-label="Account">
      <TabsNavList>
        <TabsNavLink active href="#overview">
          Overview
        </TabsNavLink>
        <TabsNavLink href="#activity">Activity</TabsNavLink>
        <TabsNavLink href="#settings">Settings</TabsNavLink>
      </TabsNavList>
    </TabsNav>
  );
}
