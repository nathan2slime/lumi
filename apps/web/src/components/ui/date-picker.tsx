'use client';

import { format } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';

import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { FormControl } from './form';
import { Calendar } from './calendar';
import { Button } from './button';

import { cn } from '@/lib/utils';

export type DatePickerProps = {
  value: Date;
  onChange: (value?: Date) => void
};

export const DatePicker = ({ value, onChange}: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant='outline'
            className={cn(
              'w-full pl-3 text-left font-normal',
              !value && 'text-muted-foreground',
            )}
          >
            {value ? (
              format(value, 'PPP')
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={date => date < new Date('1900-01-01')}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
