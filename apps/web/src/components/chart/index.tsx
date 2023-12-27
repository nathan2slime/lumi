'use client';
import { Bills } from '@lumi/types';
import {
  LineChart,
  YAxis,
  Line,
  CartesianGrid,
  XAxis,
  Tooltip,
  TooltipProps,
  Label,
  Legend,
  LegendProps,
} from 'recharts';
import { useCallback, useEffect, useState } from 'react';
import { format, toDate, isAfter } from 'date-fns';
import { CommitIcon } from '@radix-ui/react-icons';

import { Card } from '../ui/card';
import { Separator } from '../ui/separator';

import { useBillState } from '@/store/bill';

import { ChartProps } from './model';
import { chartPriceConfig } from './utils';
import { styles } from './styles';

export const Chart = ({ type, label, ...props }: ChartProps) => {
  const [bills, setBills] = useState(props.bills ? props.bills.items : []);
  const style = styles();

  const billState = useBillState();

  useEffect(() => {
    if (billState.items) setBills(billState.items);
  }, [billState.items]);

  const values = bills
    .map(
      ({
        total_price,
        public_lighting_contribution,
        date,
        due_date,
        items,
      }) => {
        const extra = items.reduce(
          (acc, { type: key, ...currentValue }) => {
            acc[key.toLocaleLowerCase()] =
              type == 'price' ? currentValue.price : currentValue.amount;

            return acc;
          },
          {} as Record<string, string | number>,
        );

        return {
          ...extra,
          total_price,
          date: format(date, 'MM/yy'),
          due_date,
          public_lighting_contribution,
        };
      },
    )
    .sort((prev, current) => {
      const a = toDate(prev.date);
      const b = toDate(current.date);

      if (isAfter(b, a)) return -1;
      if (isAfter(a, b)) return 1;

      return 1;
    });

  const PriceTooltip = ({
    active,
    payload = [],
    label,
  }: TooltipProps<any, any>) => {
    if (active && payload.length > 0) {
      return (
        <div>
          <Card className={style.tooltip()}>
            {payload.map(e => {
              const dataKey = e.dataKey as string;
              const colors = {
                color: chartPriceConfig[dataKey].color,
              };
              const value = e.payload[dataKey || 'none'] || 0;

              return (
                <div key={dataKey}>
                  <div className={style.tooltipItem()}>
                    <span style={colors}>
                      {chartPriceConfig[dataKey].label}
                    </span>
                    {type == 'price'
                      ? Intl.NumberFormat('pt-BR', {
                          currency: 'BRL',
                          style: 'currency',
                        }).format(value)
                      : 'kWh ' + value}
                  </div>

                  <Separator
                    orientation="horizontal"
                    className={style.tooltipLine()}
                  />
                </div>
              );
            })}
          </Card>
        </div>
      );
    }
  };

  const LegendContent = ({ payload }: LegendProps) => (
    <ul className={style.legend()}>
      {payload &&
        payload.map((entry, index) => {
          const colors = {
            color: entry.color,
          };

          return (
            <li style={colors} className={style.legendItem()} key={index}>
              <CommitIcon />

              {entry.value}
            </li>
          );
        })}
    </ul>
  );

  return (
    <div className={style.wrapper()}>
      <Card className={style.graphic()}>
        <h5 className={style.title()}>{label}</h5>

        <LineChart
          width={500}
          margin={{ bottom: 10 }}
          height={500}
          data={values}
        >
          <YAxis fontSize="0.82rem" className="text-sm" />
          <XAxis
            fontSize="0.82rem"
            dataKey="date"
            padding={{ left: 30, right: 30 }}
          >
            <Label
              fontSize="0.88rem"
              fontWeight="medium"
              offset={10}
              position="bottom"
            >
              Date
            </Label>
          </XAxis>

          <Legend
            align="center"
            content={props => <LegendContent {...(props as LegendProps)} />}
          />

          <Tooltip content={PriceTooltip} />

          <CartesianGrid stroke="#cfcfcf" strokeDasharray="9 9" />

          <Line
            type="monotone"
            dataKey="total_price"
            name={chartPriceConfig.total_price.label}
            stroke={chartPriceConfig.total_price.color}
          />
          <Line
            type="monotone"
            dataKey="public_lighting_contribution"
            name={chartPriceConfig.public_lighting_contribution.label}
            stroke={chartPriceConfig.public_lighting_contribution.color}
          />
          <Line
            type="monotone"
            dataKey="energy"
            name={chartPriceConfig.energy.label}
            stroke={chartPriceConfig.energy.color}
          />
          <Line
            type="monotone"
            dataKey="compensed_energy"
            name={chartPriceConfig.compensed_energy.label}
            stroke={chartPriceConfig.compensed_energy.color}
          />
          <Line
            type="monotone"
            dataKey="energy_without_icms_value"
            name={chartPriceConfig.energy_without_icms_value.label}
            stroke={chartPriceConfig.energy_without_icms_value.color}
          />
        </LineChart>
      </Card>
    </div>
  );
};
