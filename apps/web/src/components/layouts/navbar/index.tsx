import { HamburgerMenuIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';

import { styles } from './styles';
import { NavbarProps } from './model';

import Energy from '@/assets/energy.svg';

export const Navbar = ({ onToggle, isOpenSidebar }: NavbarProps) => {
  const style = styles({ hide: isOpenSidebar });

  return (
    <div className={style.wrapper()}>
      <Energy className={style.logo()} />

      <Button size="icon" onClick={() => onToggle(true)}>
        <HamburgerMenuIcon />
      </Button>
    </div>
  );
};
