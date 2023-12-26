import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    groupTitle: 'mb-3 font-bold text-sm',
    wrapper: 'mt-3',
    group: 'flex mt-3 md:flex-row flex-col w-full md:gap-3 gap-2',
  },
});
