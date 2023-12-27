import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    title: 'text-lg font-medium',
    wrapper:
      'flex justify-between w-full items-center border-b border-b-border py-5 px-6 md:px-9',
  },
});
