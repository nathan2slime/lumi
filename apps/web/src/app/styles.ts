import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    wrapper: 'flex flex-col w-full gap-5 pb-4',
    charts:
      'flex w-full gap-5 flex-wrap px-1 md:px-4 items-start justify-center',
  },
});
