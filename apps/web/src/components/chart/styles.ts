import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    wrapper: 'px-5 min-h-[300px] w-full',
    graphic: 'pt-7 pr-0 sm:pr-5 md:pr-12 w-full h-full pb-4 shadow-none',
    tooltipLine: 'mt-1',
    title: 'text-base text-primary pb-7 text-center',
    tooltipItem: 'pb-3 w-full gap-3 text-sm flex justify-between items-center',
    tooltip: 'p-2 flex flex-col gap-1 shadow-none',
    legend: 'flex pt-10 flex-wrap gap-3 justify-center',
    legendItem: 'text-xs flex items-center justify-center gap-1',
  },
});
