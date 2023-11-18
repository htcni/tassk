import { Layout } from 'antd'

const { Content } = Layout
const FormContainer = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content
        style={{
          height: '100%',
          display: 'flex',

          justifyContent: 'center',
        }}
      >
        {children}
      </Content>
    </Layout>
  )
}
export default FormContainer
