<<<<<<< HEAD
<<<<<<< HEAD
'use client';

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import { cn } from '@/lib/utils';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;
=======
"use client"
=======
'use client';
>>>>>>> 75ef71d (feat(web): format code)

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import { cn } from '@/lib/utils';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

<<<<<<< HEAD
const PopoverAnchor = PopoverPrimitive.Anchor
>>>>>>> 5b6d67a (feat(web): create invoice page)
=======
const PopoverAnchor = PopoverPrimitive.Anchor;
>>>>>>> 75ef71d (feat(web): format code)

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
<<<<<<< HEAD
<<<<<<< HEAD
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
=======
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
>>>>>>> 5b6d67a (feat(web): create invoice page)
=======
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
>>>>>>> 75ef71d (feat(web): format code)
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
<<<<<<< HEAD
<<<<<<< HEAD
        'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
=======
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
>>>>>>> 5b6d67a (feat(web): create invoice page)
=======
        'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
>>>>>>> 75ef71d (feat(web): format code)
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
<<<<<<< HEAD
<<<<<<< HEAD
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
=======
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
>>>>>>> 5b6d67a (feat(web): create invoice page)
=======
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
>>>>>>> 75ef71d (feat(web): format code)
