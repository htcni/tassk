import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ redirectPath = '/login', children }) => {
  const isAuthenticated = !!localStorage.getItem('authToken')

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <Outlet />
}

export default ProtectedRoute
