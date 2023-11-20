import { Button, Flex, Form, Alert, Input } from 'antd'
import Title from 'antd/es/typography/Title'
import { Link, useNavigate } from 'react-router-dom'
import apiClient from '../http-common'
import { useMutation } from 'react-query'
import { useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import Paragraph from 'antd/es/typography/Paragraph'

const SignupForm = () => {
  const [errorMessage, setErrorMessage] = useState()
  const navigate = useNavigate()
  const data = {
    msg: 'Registration successfull. Please Login to continue.',
  }

  const { mutate, isLoading } = useMutation({
    mutationFn: async (newUser) => {
      return await apiClient.post('/auth/users/', newUser)
    },
    onSuccess: () => {
      navigate('/login', { state: data })
    },
    onError: (err) => {
      console.log(err)
      if (err.response.status === 400) {
        setErrorMessage(err.response?.data)
      }
    },
  })

  const onFinish = (values) => {
    mutate(values)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Flex vertical align='center'>
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
          Get started by signing up.
        </Title>

        <Form
          name='basic'
          layout='vertical'
          style={{
            width: '375px',
            padding: '2rem',
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='on'
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
              {isLoading ? 'Signing Up' : 'Sign Up'}
            </Button>
          </Form.Item>
          {Object.keys(errorMessage || {}).map((field) => (
            <div key={field}>
              {errorMessage[field].map((errorMessage, index) => (
                <p key={index} style={{ color: 'red' }}>
                  {errorMessage}
                </p>
              ))}
            </div>
          ))}
          <Paragraph style={{ margin: 0, textAlign: 'center' }}>
            Already a member?{' '}
            <span>
              <Link to={'/login'}>Login</Link>
            </span>
          </Paragraph>
        </Form>
      </Flex>
      <Alert
        message='The hosted instance make take some time to respond.'
        type='info'
        showIcon
        style={{ marginTop: '4rem' }}
      />
    </Flex>
  )
}

export default SignupForm
