import { useState } from 'react'
import { HomeOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons'

import { Layout, Menu, theme } from 'antd'
import DashboardHeader from '../components/DashboardHeader'
import TaskContainer from '../components/TaskContainer'

const { Header, Content, Footer, Sider } = Layout

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  }
}

const items = [
  getItem('Home', '1', <HomeOutlined />),
  getItem('User', '2', <UserOutlined />),
  getItem('Settings', '3', <SettingOutlined />),
]

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint='lg'
        collapsedWidth='0'
        onBreakpoint={(broken) => {
          console.log(broken)
        }}
      >
        <div className='demo-logo-vertical' />
        <Menu
          theme='dark'
          defaultSelectedKeys={['1']}
          mode='inline'
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: '1rem', background: colorBgContainer }}>
          <DashboardHeader />
        </Header>
        <Content style={{ margin: '16px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <TaskContainer />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Tassk Design ©2023</Footer>
      </Layout>
    </Layout>
  )
}

export default Dashboard
