import { AuthForm } from '@/components/forms/auth';

import { styles } from './styles';

import Energy from '@/assets/energy.svg';

const SignupPage = () => {
  const style = styles();

  return (
    <div className={style.wrapper()}>
      <header className={style.header()}>
        <Energy className={style.icon()} />

        <div>
          <h3 className={style.title()}>Sign Up</h3>

          <p className={style.description()}>Register to create an account!</p>
        </div>
      </header>

      <div className={style.form()}>
        <AuthForm type="signup" />
      </div>
    </div>
  );
};

export default SignupPage;
