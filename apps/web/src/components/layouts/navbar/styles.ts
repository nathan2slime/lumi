import { tv } from 'tailwind-variants';

export const styles = tv({
  variants: {
    hide: {
      true: {
        logo: 'opacity-0',
      },
      false: {
        logo: 'opacity-100',
      },
    },
  },
  slots: {
    logo: 'w-full max-w-[50px] duration-150 transition-opacity',
    wrapper:
      'flex md:hidden justify-between w-full min-h-14 items-center border-b border-b-border py-5 px-6 md:px-9',
  },
});
