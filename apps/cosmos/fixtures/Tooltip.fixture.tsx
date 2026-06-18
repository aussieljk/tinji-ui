import { Button } from "@tinji/ui/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@tinji/ui/components/tooltip";

export default {
  Default: (
    <TooltipProvider>
      <div className="p-12">
        <Tooltip>
          <TooltipTrigger
            render={<Button variant="outline">Hover me</Button>}
          />
          <TooltipContent>Add to library</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
  Sides: (
    <TooltipProvider>
      <div className="flex items-center gap-6 p-16">
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline">Top</Button>} />
          <TooltipContent side="top">Top tooltip</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline">Right</Button>} />
          <TooltipContent side="right">Right tooltip</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline">Bottom</Button>} />
          <TooltipContent side="bottom">Bottom tooltip</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};
