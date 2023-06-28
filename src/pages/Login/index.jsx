import style from './style.module.css';
import { Button, Input } from '../../components/base';
import { useLogin } from '../../hooks/local';

const Index = () => {
  const { Formik, Form, formLogin } = useLogin();
  return (
    <Formik
      enableReinitialize={true}
      initialValues={formLogin}
      validateOnBlur={true}
      validateOnChange={true}
      onSubmit={(values, formik) => console.log(values, formik)}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div className={style['container-form-login']}>
            <h1 className={style['form-login-header']}>Masuk</h1>
            <h4 className={style['form-login-description']}>Isi formulir untuk masuk</h4>
            <div className={style['form-login-card']}>
              <Input errorLabelEffect={true} name="email" id="email" label="E-Mail" placeholder="E-Mail Anda" />
              <Input
                errorLabelEffect={true}
                type="password"
                name="password"
                id="password"
                label="Password"
                placeholder="Kata Sandi Anda"
              />
            </div>
          </div>
          <div className={style['container-form-button-login']}>
            <Button className="!mb-0" size="small" schema="pills-purple" type="submit">
              Sign in
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Index;
