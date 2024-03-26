const { Markup } = require('telegraf')
const Task = require('../../../../serverProcessors/models/TaskModel')

module.exports = (bot) => {
	
	bot.action(/\?lookTaskInside_(.+)/, async ctx => {
		const task = await Task.findById(ctx.match[1])

		if (!task) {
			return ctx.editMessageText('Что-то пошло не так..')
		}

		return ctx.editMessageText(
			`<b>Заголовок:</b> ${task.title}\n<b>Описание:</b> ${task.descr}`,
			{
				reply_markup: Markup.inlineKeyboard([
					[
						Markup.button.callback(
							'✅ Пометить выполненным',
							`?task_is_done_${task._id}`
						),
					],
					[
						Markup.button.callback(
							'❌ Удалить задачу',
							`?delete_task_${task._id}`
						),
					],
					[
						Markup.button.callback('🔙 Назад', '?list_of_tasks')
					],
				]).resize().reply_markup,
				parse_mode: 'HTML',
			}
		)
	})
	bot.action(/\?task_is_done_(.+)/, async (ctx) => {
		const id = ctx.match[1]
		const task = await Task.findByIdAndUpdate(id, {
			status: "done"
		})
		await task.save()

		return ctx.editMessageText(
			"Вы успешно выполнили эту задачу ✅",
			{
				reply_markup: Markup.inlineKeyboard([
					[
						Markup.button.callback('🔙 Назад', '?list_of_tasks')
					]
				]).resize().reply_markup
			}
		)
	})

	bot.action(/\?delete_task_(.+)/, async (ctx) => {
		const id = ctx.match[1]
		await Task.deleteOne({_id: id})

		return ctx.editMessageText(
			"Вы удалили эту задачу из списка ✅",
			{
				reply_markup: Markup.inlineKeyboard([
					[
						Markup.button.callback('🔙 Назад', '?list_of_tasks')
					]
				]).resize().reply_markup
			}
		)
	})
}
