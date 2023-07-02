import style from './style.module.css';
import { Button, Input } from '../../components/base';
import { useLogin } from '../../hooks/local';
import iconBrand from '../../assets/icons/sos.png';

const Index = () => {
  const { Formik, Form, formLogin, handlerSubmit } = useLogin();
  return (
    <Formik
      enableReinitialize={true}
      initialValues={formLogin}
      validateOnBlur={true}
      validateOnChange={true}
      onSubmit={(values, formik) => handlerSubmit(values, formik)}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div className={style['container-form-login']}>
            <h1 className={style['form-login-header']}>Silakan Login</h1>
            <div className='flex w-full text-center justify-center items-center'>
              <img src={iconBrand} className="text-center h-10 justify-center mb-4" alt="hrattendance-logo" />
            </div>
            <div className={style['form-login-card']}>
              <Input errorLabelEffect={true} name="identity" id="identity" label="E-Mail" placeholder="E-Mail Anda" />
              <Input
                errorLabelEffect={true}
                type="password"
                name="password"
                id="password"
                label="Password"
                placeholder="Kata Sandi Anda"
              />
              <Button className="!mb-0 mt-3 bg-[#98321f] text-white" size="small" type="submit">
                Sign in
              </Button>
            </div>
          </div>
          {/* <div className={style['container-form-button-login']}></div> */}
        </Form>
      )}
    </Formik>
  );
};

export default Index;
