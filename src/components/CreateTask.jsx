import { DatePicker, Form, Input, Modal, Select } from 'antd'
import dayjs from 'dayjs'

const CreateTask = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm()

  return (
    <Modal
      open={open}
      title='Create a new task'
      okText='Create'
      cancelText='Cancel'
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields()
            onCreate(values)
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
          })
      }}
    >
      <Form form={form} layout='vertical' name='form_in_modal'>
        <Form.Item
          name='title'
          label='Title'
          rules={[
            {
              required: true,
              message: 'Please input task title!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name='description' label='Summary'>
          <Input type='textarea' />
        </Form.Item>
        <Form.Item
          name='status'
          label='Status'
          style={{ display: 'inline-block' }}
          initialValue={'TO_DO'}
        >
          <Select
            style={{ width: 180 }}
            options={[
              { value: 'TO_DO', label: 'TODO' },
              { value: 'IN_PROGRESS', label: 'IN PROGRESS' },
              { value: 'DONE', label: 'DONE' },
            ]}
          />
        </Form.Item>
        <Form.Item
          name='priority'
          label='Priority'
          style={{ display: 'inline-block', margin: '0 1rem' }}
          initialValue={'Low'}
        >
          <Select
            style={{ width: 180 }}
            options={[
              { value: 'Low', label: 'Low' },
              { value: 'Medium', label: 'Medium' },
              { value: 'High', label: 'High' },
            ]}
          />
        </Form.Item>
        <Form.Item label='Due Date' name='due_date' initialValue={dayjs()}>
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateTask
