import { AuthForm } from '@/components/forms/auth';

import { styles } from './styles';

import Energy from '@/assets/energy.svg';

const LoginPage = () => {
  const style = styles();

  return (
    <div className={style.wrapper()}>
      <header className={style.header()}>
        <Energy className={style.icon()} />

        <div>
          <h3 className={style.title()}>Sign In</h3>

          <p className={style.description()}>Welcome back!</p>
        </div>
      </header>

      <div className={style.form()}>
        <AuthForm type="signin" />
      </div>
    </div>
  );
};

export default LoginPage;
