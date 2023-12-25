import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    wrapper: 'w-full h-full gap-7 flex flex-col',
    fields: 'flex flex-col gap-2 w-full',
    footer: 'flex flex-col items-center gap-5 justify-center',
    separator: 'max-w-[70px]',
    button: 'w-full gap-2',
    link: 'text-sm text-muted-foreground duration-150 w-full transition-all hover:text-primary hover:font-bold sm:w-fit sm:absolute top-8 right-8',
    row: 'flex flex-col w-full items-baseline gap-3 sm:flex-row',
  },
});
