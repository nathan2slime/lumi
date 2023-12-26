<<<<<<< HEAD
<<<<<<< HEAD
'use client';

import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

import { cn } from '@/lib/utils';
=======
"use client"
=======
'use client';
>>>>>>> 75ef71d (feat(web): format code)

import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

<<<<<<< HEAD
import { cn } from "@/lib/utils"
>>>>>>> 5b6d67a (feat(web): create invoice page)
=======
import { cn } from '@/lib/utils';
>>>>>>> 75ef71d (feat(web): format code)

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
<<<<<<< HEAD
<<<<<<< HEAD
    className={cn('relative overflow-hidden', className)}
=======
    className={cn("relative overflow-hidden", className)}
>>>>>>> 5b6d67a (feat(web): create invoice page)
=======
    className={cn('relative overflow-hidden', className)}
>>>>>>> 75ef71d (feat(web): format code)
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
<<<<<<< HEAD
<<<<<<< HEAD
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
=======
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName
>>>>>>> 5b6d67a (feat(web): create invoice page)
=======
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
>>>>>>> 75ef71d (feat(web): format code)

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
<<<<<<< HEAD
<<<<<<< HEAD
>(({ className, orientation = 'vertical', ...props }, ref) => (
=======
>(({ className, orientation = "vertical", ...props }, ref) => (
>>>>>>> 5b6d67a (feat(web): create invoice page)
=======
>(({ className, orientation = 'vertical', ...props }, ref) => (
>>>>>>> 75ef71d (feat(web): format code)
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 75ef71d (feat(web): format code)
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' &&
        'h-full w-2.5 border-l border-l-transparent p-[1px]',
      orientation === 'horizontal' &&
        'h-2.5 flex-col border-t border-t-transparent p-[1px]',
      className,
<<<<<<< HEAD
=======
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
>>>>>>> 5b6d67a (feat(web): create invoice page)
=======
>>>>>>> 75ef71d (feat(web): format code)
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
<<<<<<< HEAD
<<<<<<< HEAD
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
=======
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
>>>>>>> 5b6d67a (feat(web): create invoice page)
=======
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
>>>>>>> 75ef71d (feat(web): format code)
