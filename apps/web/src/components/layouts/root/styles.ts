import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    wrapper: 'w-screen h-screen overflow-x-hidden overflow-y-auto flex',
    page: 'w-full md:flex-shrink flex-shrink-0 h-screen overflow-y-auto overflow-x-hidden',
  },
});
