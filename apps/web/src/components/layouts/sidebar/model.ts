import { VariantProps } from 'tailwind-variants';

import { styles } from './styles';

export type SidebarProps = {
  open: boolean;
  onToggleOpen: (e: boolean) => void;
} & VariantProps<typeof styles>;
