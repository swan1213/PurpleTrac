import mock from '@/@fake-db/mock'
import axios from 'axios'
import { serverUri } from '@/config'
import {
  getUserData
} from '@/auth/utils'
import store from '@/store'

const userData = getUserData();

/* eslint-disable global-require */
let data = {
  tasks: []
}

axios.get(`${serverUri}/todo/tasks/${userData ? userData.id : null}`).then(res => {

  res.data.map(item => {
    data.tasks.push({
      id: item.id,
      title: item.name,
      dueDate: item.due_date,
      fromDate: item.from_date,
      toDate: item.to_date,
      interval: item.interval,
      description: item.description,
      recurring: {option: item.recurring},
      status: item.status,
      assignee: {
        fullName: item.assignee,
        key: item.id,
      },
      tags: item.tags.split(','),
      isPending: item.status === 'pending' ? true : false,
      isInProgress: item.status === 'in progress' ? true : false,
      isCompleted: item.status === 'completed' ? true : false,
      isCancelled: item.status === 'cancelled' ? true : false,
    })
  })
})

/* eslint-enable */

// ------------------------------------------------
// GET: Return Tasks
// ------------------------------------------------
mock.onGet('/apps/todo/tasks').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', filter, tag, sortBy: sortByParam = 'latest' } = config.params
  /* eslint-enable */
  // ------------------------------------------------
  // Get Sort by and Sort Direction
  // ------------------------------------------------
  let sortDesc = true

  const sortBy = (() => {
    if (sortByParam === 'title-asc') {
      sortDesc = false
      return 'title'
    }
    if (sortByParam === 'title-desc') return 'title'
    if (sortByParam === 'assignee') {
      sortDesc = false
      return 'assignee'
    }
    if (sortByParam === 'due-date') {
      sortDesc = false
      return 'dueDate'
    }
    return 'id'
  })()

  // ------------------------------------------------
  // Filtering
  // ------------------------------------------------
  const queryLowered = q.toLowerCase()

  const hasFilter = task => {
    if (filter === 'pending') return task.isPending && !task.isCancelled
    if (filter === 'in progress') return task.isInProgress && !task.isCancelled
    if (filter === 'completed') return task.isCompleted && !task.isCancelled
    if (filter === 'cancelled') return task.isCancelled
    return !task.isCancelled
  }
  /* eslint-disable no-confusing-arrow, implicit-arrow-linebreak, arrow-body-style */
  const filteredData = data.tasks.filter(task => {
    return task.title.toLowerCase().includes(queryLowered) && hasFilter(task) && (tag ? task.tags.includes(tag) : true)
  })
  /* eslint-enable  */

  // ------------------------------------------------
  // Perform sorting
  // ------------------------------------------------
  const sortTasks = key => (a, b) => {
    let fieldA
    let fieldB

    // If sorting is by dueDate => Convert data to date
    if (key === 'dueDate') {
      fieldA = new Date(a[key])
      fieldB = new Date(b[key])
      // eslint-disable-next-line brace-style
    }

    // If sorting is by assignee => Use `fullName` of assignee
    else if (key === 'assignee') {
      fieldA = a.assignee ? a.assignee.fullName : null
      fieldB = b.assignee ? b.assignee.fullName : null
    } else {
      fieldA = a[key]
      fieldB = b[key]
    }

    let comparison = 0

    if (fieldA === fieldB) {
      comparison = 0
    } else if (fieldA === null) {
      comparison = 1
    } else if (fieldB === null) {
      comparison = -1
    } else if (fieldA > fieldB) {
      comparison = 1
    } else if (fieldA < fieldB) {
      comparison = -1
    }

    return comparison
  }

  // Sort Data
  const sortedData = filteredData.sort(sortTasks(sortBy))
  if (sortDesc) sortedData.reverse()

  return [200, sortedData]
})

// ------------------------------------------------
// POST: Add new task
// ------------------------------------------------
mock.onPost('/apps/todo/tasks').reply(config => {
  // Get event from post data
  const { task } = JSON.parse(config.data)

  let dataTask = {
    id: data.tasks.length ? data.tasks[data.tasks.length - 1].id + 1 : 0,
    title: task.title,
    dueDate: task.dueDate,
    interval: task.interval,
    fromDate: task.fromDate,
    toDate: task.toDate,
    description: task.description,
    recurring: {option: task.recurring.option},
    status: task.status.element,
    assignee: {
      fullName: task.assignee.fullName,
      key: task.assignee.key,
    },
    tags: task.tags,
    isPending: task.status.element === 'pending' ? true : false,
    isInProgress: task.status.element === 'in progress' ? true : false,
    isCompleted: task.status.element === 'completed' ? true : false,
    isCancelled: task.status.element === 'cancelled' ? true : false,
  }

  const userInfo = getUserData();

  axios.post(`${serverUri}/todo/add/${userInfo.id}`, dataTask).then(res => {
    console.log('The user is added');
  })
  
  data.tasks.push(dataTask)

  return [200, { dataTask }]
})

// ------------------------------------------------
// POST: Update Task
// ------------------------------------------------
mock.onPost(/\/apps\/todo\/tasks\/\d+/).reply(config => {
  const { task: taskData } = JSON.parse(config.data)

  axios.post(`${serverUri}/todo/update`, taskData).then(res => {
    console.log('The user is updated');
  })

  // Convert Id to number
  taskData.id = Number(taskData.id)

  const task = data.tasks.find(e => e.id === Number(taskData.id))
  Object.assign(task, taskData)

  return [200, { task }]
})

// ------------------------------------------------
// DELETE: Remove Task
// ------------------------------------------------
mock.onDelete(/\/apps\/todo\/tasks\/\d+/).reply(config => {
  // Get task id from URL
  let taskId = config.url.substring(config.url.lastIndexOf('/') + 1)

  // Convert Id to number
  taskId = Number(taskId)

  data.tasks.map((item, index) => {
    if (item.id === taskId) data.tasks.splice(index, 1);
  });
  
  axios.delete(`${serverUri}/tasks/deleteTask/${taskId}/${userData.id}`).then(res => {
    if(res.data)
      console.log(`The number of ${taskId} record is deleted.`);
  })

  return [200]
})
