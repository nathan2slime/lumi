import type * as Stitches from '@stitches/react';

import { AppChildren } from '@/types';

import { ButtonStyled } from './styles';

export type ButtonProps = Stitches.VariantProps<typeof ButtonStyled> &
  AppChildren & {};
