import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = lazy(() => import('../pages/Login'));
const Home = lazy(() => import('../pages/Home'));
const DashboardLayout = lazy(() => import('../layouts/Dashboard'));
const Absent = lazy(() => import('../pages/Absent'));
const Permit = lazy(() => import('../pages/Permit'));
const Leave = lazy(() => import('../pages/Leave'));
const Overtime = lazy(() => import('../pages/Overtime'));

const Router = ({ children }) => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/login" replace={true} />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      element: <DashboardLayout />,
      children: [
        { path: '/dashboard', element: <Home /> },
        { path: '/absent', element: <Absent /> },
        { path: '/permit', element: <Permit /> },
        { path: '/leave', element: <Leave /> },
        { path: '/overtime', element: <Overtime /> },
      ],
    },
  ]);
  return (
    <>
      <Provider store={store}>
        <Suspense fallback={<>Loading</>}>
          <RouterProvider router={router}>{children}</RouterProvider>
        </Suspense>
      </Provider>
      <ToastContainer limit={1} />
    </>
  );
};

Router.propTypes = {
  children: PropTypes.node,
};
export default Router;
