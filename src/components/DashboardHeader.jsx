import { Avatar, Flex } from 'antd'
import Link from 'antd/es/typography/Link'
import { useQuery } from 'react-query'
import apiClient from '../http-common'
import ProfileDropdown from './ProfilePopup'
import ProfilePopup from './ProfilePopup'
import { useNavigate } from 'react-router-dom'

const DashboardHeader = () => {
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: 'profile',
    queryFn: async () => {
      return await apiClient.get('/auth/users/me/')
    },
    onSuccess: () => {},
    onError: (err) => {
      if (err?.response.status === 401) {
        localStorage.removeItem('authToken')
        navigate('/', { replace: true })
      }
    },
  })

  return (
    <Flex style={{ height: '100%', padding: '0 24px' }} gap={16} align='center'>
      <Link>Home</Link>
      <Link>Projects</Link>
      <Link>Planning</Link>
      <Link>Reporting</Link>
      <Flex style={{ marginLeft: 'auto' }} align='center'>
        <ProfilePopup user={data?.data} />
      </Flex>
    </Flex>
  )
}

export default DashboardHeader
