import { customAlphabet } from "nanoid/non-secure"
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10)

const addNewList = (state, listName) =>
	state.lists.push({
		_id: nanoid(10),
		title: listName,
		createdAt: Date.now()
	})

const updateList = (state, listId, title) => {
	for (const list of state.lists) {
		if (list._id !== listId) continue
		list.title = title
	}
}

const addNewTask = (state, task) =>
	state.tasks.push({
		_id: nanoid(10),
		...task,
		createdAt: Date.now()
	})

const updateTask = (state, task) => (state.tasks = state.tasks.map(i => (i._id === task._id ? task : i)))

export default {
	addNewList,
	updateList,
	addNewTask,
	updateTask
}
