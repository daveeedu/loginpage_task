import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { Navigate, Outlet } from 'react-router';
import config from '../utils/config';

const { routes } = config
const ProtectedRoute: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return user ? <Outlet /> : <Navigate to={routes.login} replace />;
};

export default ProtectedRoute;