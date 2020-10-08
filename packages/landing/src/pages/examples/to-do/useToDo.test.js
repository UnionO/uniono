import Mart from '@uniono/state/lib/mart'
import Form from '@uniono/state/lib/form'

import { toDo } from './useToDo'

test('initial state', () => {
	const { value: { input, tab, tasks, editableTask } } = new Mart(Form.from(toDo))

	expect({ input, tab, tasks, editableTask })
		.toEqual({ input: '', tab: 'all', tasks: [], editableTask: null })
})

test('visibleTasks', () => {
	const form = new Mart(Form.from(toDo))

	form.union.tasks.mutations.setValue(tasks())
	expect(form.value.visibleTasks).toEqual(tasks().map((task, index) => ({ ...task, index })))

	form.value.setTab('active')
	expect(form.value.visibleTasks)
		.toEqual(tasks().map((task, index) => ({ ...task, index })).filter(({ done }) => !done))

	form.value.setTab('completed')
	expect(form.value.visibleTasks)
		.toEqual(tasks().map((task, index) => ({ ...task, index })).filter(({ done }) => done))
})

test('setInput', () => {
	const form = new Mart(Form.from(toDo))

	form.value.setInput('Publish')

	expect(form.value.input).toEqual('Publish')
})

test('setTab', () => {
	const form = new Mart(Form.from(toDo))

	form.value.setTab('active')

	expect(form.value.tab).toEqual('active')
})

test('addTask', () => {
	const form = new Mart(Form.from(toDo))
	
	form.value.addTask()
	expect(form.value.tasks).toEqual([])

	form.value.setInput('Publish')
	form.value.addTask()

	expect(form.value.tasks).toEqual([ { done: false, title: 'Publish' } ])
})

test('deleteTask', () => {
	const form = new Mart(Form.from(toDo))
	form.union.tasks.mutations.setValue(tasks())
	
	form.value.deleteTask(2)

	expect(form.value.tasks).toEqual([
		{ done: true, title: 'Core' },
		{ done: true, title: 'State' },
		{ done: false, title: '...' },
		{ done: false, title: 'Profit' }
	])
})

test('toggleTaskDone', () => {
	const form = new Mart(Form.from(toDo))
	form.union.tasks.mutations.setValue(tasks())

	form.value.toggleTaskDone(2)
	form.value.toggleTaskDone(3)

	expect(form.value.tasks).toEqual([ 
		{ done: true, title: 'Core' },
		{ done: true, title: 'State' },
		{ done: false, title: 'React' },
		{ done: true, title: '...' },
		{ done: false, title: 'Profit' }
	 ])	
})

test('setEditableTask', () => {
	const form = new Mart(Form.from(toDo))
	form.union.tasks.mutations.setValue(tasks())

	form.value.setEditableTask(3)

	expect(form.value.editableTask).toEqual({ index: 3, title: '...' })
})

test('setEditableTask', () => {
	const form = new Mart(Form.from(toDo))
	form.union.tasks.mutations.setValue(tasks())

	form.value.setEditableTask(3)
	form.value.setEditableTaskTitle('422')

	expect(form.value.editableTask).toEqual({ index: 3, title: '422' })
})

test('applyEdit', () => {
	const form = new Mart(Form.from(toDo))
	form.union.tasks.mutations.setValue(tasks())
	
	form.union.editableTask.mutations.setValue({ index: 3, title: '42' })
	form.value.applyEdit()

	form.union.editableTask.mutations.setValue({ index: 2, title: '    ' })
	form.value.applyEdit()

	expect(form.value.editableTask).toBeNull()
	expect(form.value.tasks).toEqual([ 
		{ done: true, title: 'Core' },
		{ done: true, title: 'State' },
		{ done: true, title: 'React' },
		{ done: false, title: '42' },
		{ done: false, title: 'Profit' }
	 ])	
})

test('cancelEdit', () => {
	const form = new Mart(Form.from(toDo))
	form.union.tasks.mutations.setValue(tasks())

	form.union.editableTask.mutations.setValue({ index: 3, title: '42' })
	form.value.cancelEdit()

	expect(form.value.editableTask).toBeNull()
})

const tasks = () => [
	{ done: true, title: 'Core' },
	{ done: true, title: 'State' },
	{ done: true, title: 'React' },
	{ done: false, title: '...' },
	{ done: false, title: 'Profit' }
]