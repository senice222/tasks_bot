const Task = require("../models/TaskModel");

module.exports = (app) => {
    app.get("/tasks/:id", async (req, res) => {
        const { id } = req.params;
        try {
            const task = await Task.findById(id);
            if (!task) {
                return res.status(404).send("Task not found");
            }
            return res.status(200).send(task);
        } catch (error) {
            return res.status(500).send("Error fetching task");
        }
    });
};