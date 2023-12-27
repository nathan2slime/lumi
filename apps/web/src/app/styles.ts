import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    wrapper: 'flex flex-col w-full h-fit gap-5 pb-4',
    charts: 'flex gap-5 flex-wrap items-start justify-center',
    filter: 'border-b border-b-border py-5 px-9',
  },
});
