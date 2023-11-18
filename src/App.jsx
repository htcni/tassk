import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import { ConfigProvider } from 'antd'

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
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/tasks' element={<Dashboard />} />
            <Route />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </>
  )
}

export default App
