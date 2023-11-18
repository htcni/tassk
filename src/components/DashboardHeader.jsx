import { Avatar, Flex } from 'antd'
import Link from 'antd/es/typography/Link'
import { useQuery } from 'react-query'
import apiClient from '../http-common'

const DashboardHeader = () => {
  const { data, isLoading } = useQuery({
    queryKey: 'profile',
    queryFn: async () => {
      return await apiClient.get('/auth/users/me/')
    },
    onSuccess: (res) => {
      console.log(res)
    },
  })

  return (
    <Flex style={{ height: '100%', padding: '0 24px' }} gap={16} align='center'>
      <Link>Home</Link>
      <Link>Projects</Link>
      <Link>Planning</Link>
      <Link>Reporting</Link>
      <p>{data?.username}</p>
      <Flex style={{ marginLeft: 'auto' }} align='center'>
        <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>
          {data?.data?.username[0].toUpperCase()}
        </Avatar>
      </Flex>
    </Flex>
  )
}

export default DashboardHeader
