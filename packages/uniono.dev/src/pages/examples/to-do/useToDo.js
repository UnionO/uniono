import useUnion from '@uniono/react'

export const toDo = {
	input: '',
	tab: 'all',
	tasks: [],
	editableTask: null,
	visibleTasks: useUnion.mart(
		({ tab, tasks }) => tasks
			.map((task, index) => ({ ...task, index }))
			.filter((task) => {
				switch (tab) {
					case 'all':
						return true

					case 'active':
						return task.done === false

					case 'completed':
						return task.done === true
					
					default:
						throw new Error(`Unsupported tab ${JSON.stringify(tab)}`)
				}
		}),
		({ tab, tasks }) => ({ tab, tasks })
	),
	setInput: ({ mutations }, value) => mutations.input.setValue(value),
	setTab: ({ mutations }, tab) => mutations.tab.setValue(tab),
	addTask: ({ value, mutations }) => {
		const { input } = value()
		const title = input.trim()
		if (title.length === 0) {
			return
		}

		mutations.input.setValue('')
		mutations.tasks.unshift({ done: false, title })
	},
	deleteTask: ({ mutations }, index) => 
		mutations.tasks.filter((_, i) => i !== index),
	toggleTaskDone: ({ mutations }, index) => 
		mutations.tasks.map((task, i) => ({ ...task, done: i === index ? !task.done : task.done })),
	setEditableTask: ({ value, mutations }, index) => {
		const { tasks } = value()
		mutations.editableTask.setValue({ title: tasks[index].title, index })
	},
	setEditableTaskTitle: ({ mutations }, title) => mutations.editableTask.merge({ title }),
	applyEdit: ({ value, mutations }) => {
		const { editableTask } = value()
		const title = ((editableTask || {}).title || '').trim()
		
		if (title.length > 0) {
			mutations.tasks.map((task, index) => ({
				...task,
				title: index === editableTask.index ? title : task.title
			}))
		}
		mutations.editableTask.setNull()
	},
	cancelEdit: ({ mutations }) => mutations.editableTask.setNull(),
}

export default () => useUnion(toDo)