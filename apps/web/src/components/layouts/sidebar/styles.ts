import { tv } from 'tailwind-variants';

export const styles = tv({
  variants: {
    open: {
      true: {
        itemText: 'opacity-1',
        wrapper: 'max-w-[200px]',
      },
      false: {
        wrapper: 'max-w-[90px]',
        itemText: 'opacity-0',
        items: 'justify-center',
        itemIcon: 'flex-shrink-0 w-6',
        toggle: '-right-6',
        toggleIcon:
          '-rotate-180 transform transition ease-in-out duration-300',
      },
    },
  },
  slots: {
    toggle: 'absolute -right-4 top-4 z-20 transition ease-in-out duration-300',
    logo: 'w-full max-w-[55px] mb-8',
    tooltip: 'w-full',
    items: 'flex flex-col gap-2',
    itemIcon: 'w-4 h-4 justify-center items-center transition-all flex duration-200 ease-out',
    item: 'w-full flex gap-2 overflow-hidden text-sm text-ellipsis truncate justify-start items-center',
    toggleIcon: 'h-4 w-4',
    itemText: 'transition-opacity delay-200 duration-100',
    wrapper:
      'flex flex-col relative w-full p-4 justify-between gap-8 transition-[max-width] ease-in-out duration-300 h-full bg-background border-r-border border-r',
  },
  defaultVariants: {
    open: true,
  },
});
