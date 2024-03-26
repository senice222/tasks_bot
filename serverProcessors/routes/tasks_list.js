const Task = require("../models/TaskModel");

module.exports = (app) => {
    app.get("/tasks", async (req, res) => {
        try {   
            const tasks = await Task.find({}).toArray()
            return res.send(tasks)
        } catch (e) {
            return res.status(500).send("Error of getting list tasks")
        }
    })
}