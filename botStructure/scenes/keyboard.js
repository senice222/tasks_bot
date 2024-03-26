const {Markup} = require('telegraf')

const cancelKeyboard = Markup.inlineKeyboard([
    [
        Markup.button.callback("❌ Отменить", "?cancelScene")
    ]
]).resize().reply_markup

const finishKeyboard = Markup.inlineKeyboard([
    [
        Markup.button.callback("✅ Завершить", "?finishScene")
    ],
    [
        Markup.button.callback("❌ Отменить", "?cancelScene")
    ]
]).resize().reply_markup

module.exports = {cancelKeyboard, finishKeyboard}