import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    wrapper:
      'flex flex-col relative w-screen bg-no-repeat bg-background bg-cover p-2 overflow-hidden sm:p-0 h-screen items-center justify-center',
    content: 'w-full max-w-sm z-10 shadow-none py-5',
  },
});
