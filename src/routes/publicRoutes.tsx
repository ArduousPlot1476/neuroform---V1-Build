import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';
import ResetPassword from '../components/Auth/ResetPassword';

export const publicRoutes = [
  {
    path: '/login',
    element: LoginForm,
  },
  {
    path: '/register',
    element: RegisterForm,
  },
  {
    path: '/reset-password',
    element: ResetPassword,
  },
];