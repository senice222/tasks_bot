const express = require('express');
const app = express()

const startServer = (port) => {
    app.use(express.json());

    require("./serverProcessors/routes/create_task")(app)
    require("./serverProcessors/routes/tasks_list")(app)
    require("./serverProcessors/routes/unique_task")(app)
    require("./serverProcessors/routes/delete_task")(app)

    app.listen(port, () => {
        console.log(`[Tasks] server started - localhost:${port}`);
    });
}

module.exports = startServer