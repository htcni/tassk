import { Navigate, Outlet } from 'react-router-dom'

const PublicRoutes = ({ redirectPath = '/tasks', children }) => {
  const isAuthenticated = !!localStorage.getItem('authToken')

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <Outlet />
}
export default PublicRoutes
