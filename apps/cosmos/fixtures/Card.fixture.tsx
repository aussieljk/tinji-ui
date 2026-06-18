import { Button } from "@tinji/ui/components/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@tinji/ui/components/card";

export default {
  Basic: (
    <div className="max-w-sm p-6">
      <Card>
        <CardHeader>
          <CardTitle>Project settings</CardTitle>
          <CardDescription>
            Manage your project configuration and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Card panel content goes here. This area holds the main body of the
            card.
          </p>
        </CardContent>
        <CardFooter className="gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </div>
  ),
  WithAction: (
    <div className="max-w-sm p-6">
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>You have 3 unread messages.</CardDescription>
          <CardAction>
            <Button size="sm" variant="ghost">
              Mark all read
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Header action sits in the top-right corner of the card.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};
