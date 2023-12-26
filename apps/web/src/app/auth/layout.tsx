import { Card } from '@/components/ui/card';

import { AppChildren } from '@/types';

import { styles } from './styles';

import '@/firebase';

const AuthLayout = ({ children }: AppChildren) => {
  const style = styles();

  return (
    <div className={style.wrapper()}>
      <Card className={style.content()}>{children}</Card>
    </div>
  );
};

export default AuthLayout;
