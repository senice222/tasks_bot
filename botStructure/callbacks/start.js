const { Markup } = require('telegraf')

module.exports = (bot) => {
    bot.action("?start", async (ctx) => {
        return ctx.editMessageText("Главное меню задач", {
            reply_markup: Markup.inlineKeyboard([
                [
                    Markup.button.callback("📋 Список задач", "?list_of_tasks"),
                ],
                [
                    Markup.button.callback("✅ Список выполненных задач", "?list_of_done_tasks"),
                ],
                [
                    Markup.button.callback("💻 Создать задачу", "?create_task"),
                ]
            ]).resize().reply_markup
        })
    })
}