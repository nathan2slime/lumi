export type ChartPriceConfig = {
  label: string;
  color: string;
};

export const chartPriceConfig: Record<string, ChartPriceConfig> = {
  total_price: { label: 'Total', color: '#8884d8' },
  public_lighting_contribution: {
    label: 'CIP',
    color: '#82ca9d',
  },
  due_date: { label: 'Due Date', color: '#ffc658' },
  energy: { label: 'Energy', color: '#ff7300' },
  energy_without_icms_value: {
    label: 'ICMS',
    color: '#b15928',
  },
  compensed_energy: { label: 'GD I', color: '#0088FE' },
};
