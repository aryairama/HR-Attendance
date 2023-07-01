import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { ToastContainer } from 'react-toastify';
import { Loader } from '../components/base';
import { authLogin, authDashbaord } from '../redux/action/AuthAction';
import 'react-toastify/dist/ReactToastify.css';
const Login = lazy(() => import('../pages/Login'));
const Home = lazy(() => import('../pages/Home'));
const DashboardLayout = lazy(() => import('../layouts/Dashboard'));
const Absent = lazy(() => import('../pages/Absent'));
const Permit = lazy(() => import('../pages/Permit'));
const Leave = lazy(() => import('../pages/Leave'));
const Overtime = lazy(() => import('../pages/Overtime'));
const UserDuties = lazy(() => import('../pages/UserDuties'));

const Router = ({ children }) => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/login" replace={true} />,
    },
    {
      path: '/login',
      element: <Login />,
      loader: authLogin,
    },
    {
      element: <DashboardLayout />,
      loader: authDashbaord,
      children: [
        { path: '/dashboard', element: <Home /> },
        { path: '/absent', element: <Absent /> },
        { path: '/permit', element: <Permit /> },
        { path: '/leave', element: <Leave /> },
        { path: '/overtime', element: <Overtime /> },
        { path: '/user-duties', element: <UserDuties /> },
      ],
    },
  ]);
  return (
    <>
      <Provider store={store}>
        <Suspense fallback={<Loader show={true} />}>
          <RouterProvider router={router}>{children}</RouterProvider>
        </Suspense>
        <Loader />
      </Provider>
      <ToastContainer />
    </>
  );
};

Router.propTypes = {
  children: PropTypes.node,
};
export default Router;
