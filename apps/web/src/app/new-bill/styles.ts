import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    wrapper: 'w-full py-10 relative flex justify-center items-center',
    form: 'max-w-lg w-full shadow-none p-5',
    content: 'flex flex-col justify-start items-center pt-7',
    row: 'flex w-full gap-3',
    title: 'text-lg font-bold',
    progress: 'absolute bg-transparent top-0 right-0 h-1 w-full rounded-none',
    header: 'flex justify-start pb-3 items-center gap-3',
    submit: 'font-bold max-w-[180px] w-full mt-5',
    footer: 'flex justify-end items-center gap-3',
    subform: 'flex flex-col gap-2 mt-5 w-full',
  },
});
