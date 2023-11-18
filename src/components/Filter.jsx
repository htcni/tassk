import { Select } from 'antd'
import apiClient from '../http-common'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'

const Filter = () => {
  const [filter, setFilter] = useState('')

  const { isLoading, refetch } = useQuery({
    queryKey: 'tasks',
    queryFn: async () => {
      return await apiClient.get(`/tasks/?status=${filter}`)
    },
    enabled: false,
    onSuccess: () => {},
  })

  useEffect(() => {
    refetch()
  }, [filter, refetch])

  const handleStatusChange = (value) => {
    setFilter(value)
  }

  return (
    <Select
      defaultValue='All'
      style={{ width: 180 }}
      onChange={handleStatusChange}
      options={[
        { value: '', label: 'All' },
        { value: 'TO_DO', label: 'Todo' },
        { value: 'IN_PROGRESS', label: 'In Progress' },
        { value: 'DONE', label: 'Done' },
      ]}
    />
  )
}

export default Filter
