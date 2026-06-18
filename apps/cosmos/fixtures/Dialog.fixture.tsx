import { Button } from "@tinji/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@tinji/ui/components/dialog";

export default {
  Default: (
    <div className="p-6">
      <Dialog>
        <DialogTrigger render={<Button>Open dialog</Button>} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <DialogClose render={<Button>Save changes</Button>} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
  Destructive: (
    <div className="p-6">
      <Dialog>
        <DialogTrigger render={<Button variant="destructive">Delete</Button>} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <DialogClose
              render={<Button variant="destructive">Delete account</Button>}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
};
