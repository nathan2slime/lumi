<<<<<<< HEAD
<<<<<<< HEAD
'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';
=======
"use client"
=======
'use client';
>>>>>>> 75ef71d (feat(web): format code)

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

<<<<<<< HEAD
import { cn } from "@/lib/utils"
>>>>>>> 5b6d67a (feat(web): create invoice page)
=======
import { cn } from '@/lib/utils';
>>>>>>> 75ef71d (feat(web): format code)

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
<<<<<<< HEAD
<<<<<<< HEAD
      'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
      className,
=======
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      className
>>>>>>> 5b6d67a (feat(web): create invoice page)
=======
      'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
      className,
>>>>>>> 75ef71d (feat(web): format code)
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
<<<<<<< HEAD
<<<<<<< HEAD
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
=======
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
>>>>>>> 5b6d67a (feat(web): create invoice page)
=======
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
>>>>>>> 75ef71d (feat(web): format code)
