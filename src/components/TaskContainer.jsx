import { useState } from 'react'
import TaskContentHeader from './TaskContentHeader'
import TaskTable from './TaskTable'

const TaskContainer = () => {
  const [tableData, setTableData] = useState()

  const onSetTableData = (data) => {
    setTableData(data)
  }

  return (
    <>
      <TaskContentHeader />
      <TaskTable tableData={tableData} onSetTableData={onSetTableData} />
    </>
  )
}

export default TaskContainer
