import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import { ConfigProvider } from 'antd'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoutes from './components/PublicRoutes'

const App = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: '#0052cc',
            fontFamily: 'Work Sans',

            // Alias Token
          },
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route element={<PublicRoutes />}>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path='/tasks' element={<Dashboard />} />
            </Route>
            <Route path='*' element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </>
  )
}

export default App
