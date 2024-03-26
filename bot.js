const { Telegraf, Scenes, session } = require('telegraf')

const initBot = () => {
	const bot = new Telegraf('')
	bot.launch().then(console.log('[Tasks] Bot started successfully'))

	bot.use(session())

	const Stage = new Scenes.Stage([
		require('./botStructure/scenes/create_task'),
	])

	// middlewares
	bot.use(Stage.middleware())

	// commands
	require('./botStructure/commands/start')(bot)

	// callbacks
    require('./botStructure/callbacks/start')(bot)
	require('./botStructure/callbacks/createTask')(bot)
	require('./botStructure/callbacks/tasks/activeTasks/list_tasks')(bot)
    require('./botStructure/callbacks/tasks/activeTasks/detailed_task')(bot)
	require('./botStructure/callbacks/tasks/doneTasks/list_done_tasks')(bot)
	require('./botStructure/callbacks/tasks/doneTasks/detailed_done_task')(bot)


}

module.exports = initBot
