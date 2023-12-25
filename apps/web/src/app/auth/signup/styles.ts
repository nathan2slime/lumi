import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    title: 'text-xl font-bold',
    wrapper: 'w-full h-full px-6  flex flex-col py-6',
    description: 'text-sm text-muted-foreground',
    header: 'flex w-full items-center mb-3 gap-2',
    form: 'flex flex-col mt-14',
    icon: 'w-full max-w-[80px]',
  },
});
