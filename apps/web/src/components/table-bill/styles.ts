import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    wrapper: 'px-6 py-7 md:px-9',
    title: 'text-lg font-medium',
    table: 'rounded-md border',
    header:
      'flex justify-between px-6 md:px-9 w-full items-center border-b border-b-border py-5',
  },
});
