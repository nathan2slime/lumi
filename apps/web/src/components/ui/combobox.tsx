'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export type ComboboxItem = {
  value: string;
  label: string;
};

type ComboboxPopoverProps = {
  data: ComboboxItem[];
  label: string;
  placeholder?: string;
  onChange: (item?: ComboboxItem) => void;
  value?: ComboboxItem;
};

export function ComboboxPopover({
  data,
  value,
  label,
  onChange,
  placeholder,
}: ComboboxPopoverProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm flex-shrink-0 text-muted-foreground">{label}</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="max-w-[186px] w-full text-sm justify-start"
          >
            {value ? <>{value.label}</> : <> </>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 max-w-[200px]"
          side="bottom"
          align="start"
        >
          <Command>
            <CommandInput
              className="text-sm"
              onValueChange={e => {}}
              placeholder={placeholder}
            />
            <CommandList>
              <CommandEmpty className="text-sm p-4">
                No results found.
              </CommandEmpty>
              <CommandGroup>
                {data.map(item => (
                  <CommandItem
                    key={item.value}
                    className="text-sm"
                    value={item.value}
                    onSelect={(newValue: string) => {
                      onChange(
                        data.find(priority => priority.value === newValue),
                      );
                      setOpen(false);
                    }}
                  >
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
