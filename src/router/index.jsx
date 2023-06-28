import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
const Login = lazy(() => import('../pages/Login'));

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
  ]);
  return (
    <Provider store={store}>
      <Suspense fallback={<>Loading</>}>
        <RouterProvider router={router}>{children}</RouterProvider>
      </Suspense>
    </Provider>
  );
};

Router.propTypes = {
  children: PropTypes.node,
};
export default Router;
