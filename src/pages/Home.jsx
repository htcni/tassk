import { Layout, Space } from 'antd'

import Navbar from '../components/Navbar'
import Banner from '../components/Banner'

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#fff',
}

const footerStyle = {
  textAlign: 'center',

  backgroundColor: '#fff',
}

const { Header, Footer, Content } = Layout
const Home = () => {
  return (
    <Space direction='vertical' style={{ width: '100%' }} size={[0, 48]}>
      <Layout>
        <Header style={headerStyle}>
          <Navbar />
        </Header>
        <Content>
          <Banner />
        </Content>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </Space>
  )
}

export default Home
