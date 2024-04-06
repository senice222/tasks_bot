const { Markup } = require('telegraf');
const Task = require('../../../../serverProcessors/models/TaskModel')


function firstLetter(str) {
    if (!str) return str;

    return str[0].toUpperCase() + str.slice(1);
}

function splitIntoChunks(arr, chunkSize) {
    let chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
}

module.exports = function (bot) {
    bot.action(['?list_of_done_tasks', /\?list_of_done_tasks_(.+)/], async (ctx) => {
        let arr = await Task.find({ status: "done" })

        if (arr.length < 1) {
            return ctx.editMessageText(
                "Задач нет.",
                {
                    reply_markup: Markup.inlineKeyboard([
                        [
                            Markup.button.callback("🔙 Назад", "?start")
                        ]
                    ]).resize().reply_markup
                }
            )
        }

        let buttons = arr.map(button => {
            if (button.title.length >= 15) {
                var buttonTitle = button.title.slice(0, 15) + '...';
            } else {
                var buttonTitle = firstLetter(button.title);
            }
            const taskId = button.id.toString()

            return { text: `⭐️ ${buttonTitle}`, callback_data: `?lookDoneTaskInside_${taskId}` }
        })

        buttons.filter(section => section !== null && section !== undefined);

        const rows = splitIntoChunks(buttons, 1)
        let pages = [];

        for (let i = 0; i < rows.length; i += 4) {
            pages.push(rows.slice(i, i + 4));
        }

        pages = pages.map((page, i) => {
            let navigationButtons = [];
            let additionalButtons = [];

            if (i !== 0) navigationButtons.push({ text: '<<', callback_data: '?list_of_done_tasks_0' });
            if (i !== 0) navigationButtons.push({ text: '<', callback_data: '?list_of_done_tasks_' + (i - 1) });
            navigationButtons.push({ text: `[${i + 1}/${pages.length}]`, callback_data: '@' });
            if (i !== pages.length - 1) navigationButtons.push({ text: '>', callback_data: '?list_of_done_tasks_' + (i + 1) });
            if (i !== pages.length - 1) navigationButtons.push({ text: '>>', callback_data: '?list_of_done_tasks_' + String(pages.length - 1) });

            additionalButtons.push({ text: `🔙 Назад`, callback_data: '?start' });

            return [...page, navigationButtons, additionalButtons];
        });

        ctx.editMessageText(
            'Список активных задач:',
            {
                reply_markup: {
                    resize_keyboard: true,
                    inline_keyboard: pages[(ctx.match[1]) ? ctx.match[1] : 0]
                }
            }
        )
    }
    )
}