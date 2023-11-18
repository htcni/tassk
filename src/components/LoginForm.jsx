import { Alert, Button, Flex, Form, Input, message } from 'antd'
import Title from 'antd/es/typography/Title'
import { useMutation } from 'react-query'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import apiClient from '../http-common'
import { useEffect, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

const LoginForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const data = location.state

  const [alertMessage, setAlertMessage] = useState('')

  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    setAlertMessage(data?.msg)
    navigate(location.pathname, { replace: true })
  }, [navigate])

  const { mutate, isLoading } = useMutation({
    mutationFn: async (newUser) => {
      return await apiClient.post('/auth/token/login', newUser)
    },
    onSuccess: (res) => {
      const token = res?.data?.auth_token
      if (token) {
        localStorage.setItem('authToken', token)
        navigate('/tasks', { replace: true })
      }
    },
    onError: (err) => {
      console.log(err)
      messageApi.open({
        type: 'error',
        content: 'Incorrect username and password',
      })
    },
  })

  const onFinish = (values) => {
    console.log('Success:', values)
    mutate(values)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Flex vertical align='center'>
      {alertMessage && (
        <Alert
          message={alertMessage}
          type='success'
          style={{ margin: '1rem' }}
        />
      )}
      {contextHolder}

      <Flex
        vertical
        align='center'
        style={{ background: '#fff', padding: '1rem', marginTop: '10rem' }}
      >
        <Link to={'/'}>
          <Title style={{ margin: 0 }} level={2}>
            Tassk
          </Title>
        </Link>
        <Title style={{ margin: 0 }} level={5}>
          Welcome back
        </Title>
        <Form
          name='basic'
          layout='vertical'
          style={{
            width: 400,
            padding: '2rem',
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          requiredMark='optional'
        >
          <Form.Item
            label='Username'
            name='username'
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Username'
            />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>
          <Form.Item>
            <Button
              block
              size='large'
              type='primary'
              loading={isLoading}
              htmlType='submit'
            >
              {isLoading ? 'Logging In' : 'Login'}
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Flex>
  )
}
export default LoginForm
