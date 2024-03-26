
module.exports = (bot) => {
    bot.action("?create_task", async (ctx) => {
        ctx.scene.enter("create_task")
    })
}