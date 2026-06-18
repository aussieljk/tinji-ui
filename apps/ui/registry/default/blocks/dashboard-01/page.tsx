import { BellIcon, PlusIcon, SearchIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/default/ui/input-group";
import { Separator } from "@/registry/default/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/registry/default/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { OrdersTable } from "./components/orders-table";
import { StatCards } from "./components/stat-cards";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator className="mx-1 h-4" orientation="vertical" />
          <h1 className="font-semibold text-sm">Dashboard</h1>
          <div className="ms-auto flex items-center gap-2">
            <InputGroup className="hidden w-56 sm:flex">
              <InputGroupInput
                aria-label="Search"
                placeholder="Search…"
                type="search"
              />
              <InputGroupAddon>
                <SearchIcon aria-hidden="true" />
              </InputGroupAddon>
            </InputGroup>
            <Button aria-label="Notifications" size="icon" variant="ghost">
              <BellIcon aria-hidden="true" />
            </Button>
            <Button>
              <PlusIcon aria-hidden="true" />
              New order
            </Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <StatCards />
          <OrdersTable />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
