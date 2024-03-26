const Task = require("../models/TaskModel");

module.exports = (app) => {
    app.post("/tasks", async (req, res) => {
        const { title, descr } = req.body;
        
        try {
            const task = new Task({
                title,
                descr
            })
            await task.save()
            return res.send("Successfully created task");
        } catch (error) {
            return res.status(500).send("Error creating task");
        }
    })
}