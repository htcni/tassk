import { DatePicker, Form, Input, Modal, Select } from 'antd'
import dayjs from 'dayjs'

const UpdateTask = ({ open, onCreate, onCancel, initialValues }) => {
  const [form] = Form.useForm()

  //convert date

  // if (initialValues) {
  //   initialValues['due_date'] = dayjs(initialValues['due_date'])
  // }

  if (!initialValues) return

  return (
    <Modal
      open={open}
      title='Edit task'
      okText='Save'
      cancelText='Cancel'
      onCancel={onCancel}
      destroyOnClose
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
      <Form
        form={form}
        layout='vertical'
        name='form_in_modal_update'
        preserve={false}
        // initialValues={initialValues}
      >
        <Form.Item
          initialValue={initialValues['title']}
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
        <Form.Item
          name='description'
          label='Summary'
          initialValue={initialValues['description']}
        >
          <Input type='textarea' />
        </Form.Item>
        <Form.Item
          initialValue={initialValues['status']}
          name='status'
          label='Status'
          style={{ display: 'inline-block' }}
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
          initialValue={initialValues['priority']}
          name='priority'
          label='Priority'
          style={{ display: 'inline-block', margin: '0 1rem' }}
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
        <Form.Item
          label='Due Date'
          name='due_date'
          initialValue={dayjs(initialValues['due_date'])}
        >
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UpdateTask
