import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { Navigate, Outlet } from 'react-router';
import config from '../utils/config';

const { routes } = config

interface ProtectedRouteProps {
  restrict: 'authenticated' | 'unauthenticated';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ restrict }) => {
  const user = useSelector((state: RootState) => state.user.user);

  if (restrict === 'authenticated') {
    return user ? <Outlet /> : <Navigate to={routes.login} replace />;
  } else {
    return user ? <Navigate to={routes.home} replace /> : <Outlet />;
  }
};

export default ProtectedRoute;