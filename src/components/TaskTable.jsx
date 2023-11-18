import {
  Button,
  Dropdown,
  Popconfirm,
  Space,
  Spin,
  Table,
  Tag,
  message,
} from 'antd'
import apiClient from '../http-common'
import { useMutation, useQuery } from 'react-query'
import { useState } from 'react'
import UpdateTask from './UpdateTask'
import { queryClient } from '../main'
import { DeleteOutlined } from '@ant-design/icons'

const statusColor = {
  TO_DO: '#f50',
  IN_PROGRESS: '#feac3e',
  DONE: '#51c945',
}

const priorityColor = {
  Low: '#4f772d',
  Medium: '#ee9b00',
  High: '#ef233c',
}

const statusText = {
  TO_DO: 'Todo',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
}

const formatDate = (date) => {
  const dateObject = new Date(date)

  const options = { month: 'short', day: 'numeric' }
  return dateObject.toLocaleDateString('en-US', options)
}

const TaskTable = ({ tableData, onSetTableData }) => {
  const columns = [
    {
      title: 'Task Name',
      dataIndex: 'title',
      width: '30%',
    },
    {
      title: 'Due Date',
      dataIndex: 'due_date',
      render: (due_date) => <span>{formatDate(due_date)}</span>,
      width: '20%',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      render: (priority) => (
        <Tag
          color={priorityColor[priority]}
          style={{ padding: '4px 16px', fontWeight: '500' }}
        >
          {priority}
        </Tag>
      ),
      width: '20%',
    },
    {
      title: 'Status',
      dataIndex: 'status',

      render: (status) => (
        <div
          style={{
            background: statusColor[status],
            color: 'white',
            textAlign: 'center',
            fontWeight: '500',
            padding: '0.5rem',
            borderRadius: '4px',
          }}
        >
          {statusText[status]}
        </div>
      ),

      width: '20%',
    },
    {
      title: 'Owner',
      dataIndex: 'user',
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      onCell: (record, rowIndex) => {
        return {
          onClick: (e) => {
            e.stopPropagation()
            setTaskId(record.id)
          },
        }
      },
      render: () => (
        <Popconfirm
          placement='leftTop'
          onConfirm={confirm}
          title='Delete the task'
          description='Are you sure to delete this task?'
          icon={<DeleteOutlined style={{ color: 'red' }} />}
        >
          <Button icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ]

  const confirm = () => {
    deleteTask(taskId)
  }

  const [open, setOpen] = useState(false)
  const [initialValues, setInitialValues] = useState(null)
  const [messageApi, contextHolder] = message.useMessage()

  const [taskId, setTaskId] = useState(null)

  // Get Tasks
  const { isLoading } = useQuery({
    queryKey: 'tasks',
    queryFn: async () => {
      return await apiClient.get('/tasks')
    },
    onSuccess: (res) => {
      console.log(res)
      onSetTableData(res?.data?.results)
    },
  })

  // Update Task
  const { mutate, isLoading: isUpdating } = useMutation({
    mutationFn: async (updateTask) => {
      return await apiClient.put(`/tasks/${taskId}`, {
        title: updateTask.title,
        description: updateTask.description,
        status: updateTask.status,
        priority: updateTask.priority,
        due_date: updateTask.due_date,
      })
    },
    onSuccess: (res) => {
      console.log(res)
      queryClient.invalidateQueries('tasks')
      messageApi.open({
        type: 'success',
        content: 'Task has been updated',
      })
    },
    onError: (err) => {
      console.log(err.response)
    },
  })

  // Delete Task
  const { mutate: deleteTask, isLoading: isDeleting } = useMutation({
    mutationFn: async (id) => {
      console.log(id)
      return await apiClient.delete(`/tasks/${id}`)
    },
    onSuccess: (res) => {
      console.log(res)
      queryClient.invalidateQueries('tasks')
      messageApi.open({
        type: 'success',
        content: 'Task deleted successfully',
      })
    },
    onError: (err) => {
      console.log(err.response)
    },
  })

  const onCreate = (values) => {
    console.log('Received values of form: ', values)
    mutate(values)
    setOpen(false)
  }

  return (
    <>
      {contextHolder}
      <Table
        dataSource={tableData}
        columns={columns}
        rowKey={(record) => record.id}
        style={{ marginTop: '1rem' }}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              setInitialValues(record)
              setTaskId(record.id)
              setOpen(true)
            },
          }
        }}
      ></Table>
      {/* This is update form */}
      <UpdateTask
        open={open}
        onCreate={onCreate}
        initialValues={initialValues}
        onCancel={() => {
          setOpen(false)
        }}
      />
      <Spin spinning={isUpdating || isDeleting} fullscreen />
    </>
  )
}

export default TaskTable
