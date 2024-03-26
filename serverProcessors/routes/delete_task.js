const Task = require("../models/TaskModel");

module.exports = (app) => {
    app.delete("/tasks/:id", async (req, res) => {
        const { id } = req.params;
        try {
            const task = await Task.findOneAndDelete({ _id: id });
            if (!task) {
                return res.status(404).send("Task not found");
            }
            return res.status(200).send(task.value);
        } catch (error) {
            console.error("Error deleting task:", error);
            return res.status(500).send("Error deleting task");
        }
    });
};