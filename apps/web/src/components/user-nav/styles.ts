import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    trigger: 'flex justify-center items-center w-[57px]',
    button: 'w-11 relative h-11 rounded-full',
    name: 'text-sm font-medium leading-none',
    avatar: 'h-11 w-11',
    content: 'w-40',
    dropdown: 'flex flex-col space-y-1',
    item: 'text-xs',
    email: 'text-xs font-normal leading-none text-muted-foreground',
  },
});
