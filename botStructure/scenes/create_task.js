const { Scenes, Markup } = require("telegraf");
const Task = require("../../serverProcessors/models/TaskModel");
const { finishKeyboard, cancelKeyboard } = require("./keyboard")

const createTask = new Scenes.WizardScene(
    "create_task",
    async (ctx) => {
        ctx.wizard.state.dataPush = {}
        ctx.wizard.state.deleteMessages = []

        ctx.reply(
            "Введите заголовок задачи:",
            {
                reply_markup: cancelKeyboard
            }
        ).then((msg) => ctx.wizard.state.deleteMessages.push(msg.message_id))
        ctx.wizard.next()
    },
    async (ctx) => {
        if (ctx.updateType === "message") {
            ctx.wizard.state.dataPush['title'] = ctx.message.text

            ctx.reply(
                "Введите описание задачи:",
                {
                    reply_markup: cancelKeyboard
                }
            ).then((msg) => ctx.wizard.state.deleteMessages.push(msg.message_id))
            ctx.wizard.next()
        }
    },
    async (ctx) => {
        ctx.wizard.state.dataPush['descr'] = ctx.message.text

        ctx.wizard.state.deleteMessages.forEach(msg => {
            ctx.deleteMessage(msg)
        })
        const task = new Task(ctx.wizard.state.dataPush)
        await task.save()
    
        ctx.reply("✅ Успешно создано!");
        await ctx.scene.leave()
    }
)

createTask.on("message", async (ctx, next) => {
    ctx.wizard.state.deleteMessages.push(ctx.message.message_id)
    next()
})

createTask.action("?cancelScene", async (ctx) => {
    ctx.wizard.state.deleteMessages.forEach(msg => {
        ctx.deleteMessage(msg)
    })
    ctx.answerCbQuery("❌ Успешно отменено!", { show_alert: true });
    await ctx.scene.leave()

})


module.exports = createTask