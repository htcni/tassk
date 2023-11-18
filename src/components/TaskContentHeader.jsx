import { Button, Divider, Flex, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Search from 'antd/es/input/Search'
import Title from 'antd/es/typography/Title'
import CreateTask from './CreateTask'
import { useState } from 'react'
import { useMutation } from 'react-query'
import apiClient from '../http-common'
import { queryClient } from '../main'
import Filter from './Filter'

const TaskContentHeader = ({ onSetTableData }) => {
  const [open, setOpen] = useState(false)

  const { mutate, isLoading } = useMutation({
    mutationFn: async (newTask) => {
      return await apiClient.post('/tasks/', newTask)
    },
    onSuccess: () => {
      queryClient.invalidateQueries('tasks')
      setOpen(false)
    },
    onError: (err) => {
      console.log(err.response)
    },
  })

  const onCreate = (values) => {
    values['due_date'] = values['due_date'].toISOString()
    mutate(values)
  }
  return (
    <Flex vertical>
      <Title level={4}>Tasks</Title>

      <Flex justify='space-between'>
        <Button
          type='primary'
          icon={<PlusOutlined />}
          onClick={() => {
            setOpen(true)
          }}
        >
          Add Task
        </Button>

        <Flex align='center' gap={8}>
          <Filter onSetTableData={onSetTableData} />
          <Search />
        </Flex>
      </Flex>
      <CreateTask
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </Flex>
  )
}

export default TaskContentHeader
