import Typography from '@material-ui/core/Typography'
import React from 'react'

import useArticle from '../../../../unions/article'

export default () => {
	const { UI } = useArticle()

	return (
		<UI.Article>
			<Typography variant="h2">
				Todo
			</Typography>
			<Typography variant="body1">
				Это очень удобная задача, чтобы показать концепцию работы со Store, что такое Mart
				зачем нужны транзакции и как они работают.
			</Typography>
			<Typography variant="h4">
				Store
			</Typography>
			<Typography variant="body1">
				Правильно было бы пойти от постановки задачи, и мы должны задать себе вопрос что мы должны хранить?
			</Typography>
			<ul>
				<li>значение input</li>
				<li>активный таб (все задачи, завершенные или активные)</li>
				<li>сам список задач</li>
				<li>данные редактируемого таска</li>
			</ul>
			<Typography variant="body1">
				В итоге мы получаем такой шаблон нашего состояния
			</Typography>
			<UI.Code value={CODE_STORES} />
			<Typography variant="body1">
				Который useUnion превратит в следующий union
			</Typography>
			<UI.Code value={CODE_STORES_UNION} />
			<Typography variant="h4">
				Mart
			</Typography>
			<Typography variant="body1">
				Marts дают возможность удобно аггригировать данные из одного или нескольких сторов (в нашем случае мы 
				создадим Mart который будет содержать видимые задачи)
			</Typography>
			<UI.Code value={CODE_MART} from={CODE_STORES} />
			<Typography variant="h4">
				Transaction
			</Typography>
		</UI.Article>
	)
}

const CODE_STORES = `{
	input: '',         // Input value
	tab: 'all',        // Selected tab ("all", "active" or "completed")
	tasks: [],         // Tasks array ([ { done: boolean, title: string } ])
	editableTask: null // Editable task state (null or { title: string, index: number })
}`

const CODE_STORES_UNION = `const union = {}

union.input = new Store('')
union.tab = new Store('all')
union.tasks = new ArrayStore([])
union.editableTask = new ObjectStore([])`

const CODE_MART = `{
	...,
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
						throw new Error(\`Unsupported tab \${JSON.stringify(tab)}\`)
				}
			}),
		({ tab, tasks }) => ({ tab, tasks })
	)
}`

