import { Avatar, Button, Flex, Popover, message } from 'antd'
import Title from 'antd/es/typography/Title'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import apiClient from '../http-common'

const ProfilePopup = ({ user }) => {
  const username = user?.username ?? 'User'
  const [messageApi, contextHolder] = message.useMessage()

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
  }

  // logout
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: async () => {
      return await apiClient.post('/auth/token/logout/')
    },
    onSuccess: () => {
      localStorage.removeItem('authToken')
      navigate('/', { replace: true })
    },
    onError: (err) => {
      console.log(err)
      messageApi.open({
        type: 'error',
        content: 'Error logging out.',
      })
    },
  })

  const content = (
    <Flex vertical style={{ minWidth: '175px' }} align='center'>
      {contextHolder}
      <Avatar
        style={{
          backgroundColor: '#fde3cf',
          color: '#f56a00',
          cursor: 'pointer',
        }}
        size={'large'}
      >
        {username[0].toUpperCase()}
      </Avatar>

      <Title level={5} style={{ fontWeight: 'lighter', margin: '0.5rem 0' }}>
        Hi, {username}
      </Title>

      <Flex vertical gap={4}>
        <Button type='text'>Account</Button>
        <Button type='text' onClick={handleLogout}>
          Logout
        </Button>
      </Flex>
    </Flex>
  )
  return (
    <Popover
      placement='bottomLeft'
      content={content}
      arrow={false}
      trigger={'click'}
    >
      <Avatar
        size={'large'}
        style={{
          backgroundColor: '#fde3cf',
          color: '#f56a00',
          cursor: 'pointer',
        }}
      >
        {username[0].toUpperCase()}
      </Avatar>
    </Popover>
  )
}

export default ProfilePopup
