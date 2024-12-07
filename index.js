
const express = require('express');
const app = express();
const PORT = 8080;

const advent = require("./Advent");
const fs = require('fs').promises;

app.get("/day/:day", async (req, res) => {
    const { day } = req.params;

    let daynum = parseInt(day, 10);
    if (Number.isNaN(daynum) || daynum < 0 || daynum > 25 || !Number.isSafeInteger(daynum)) {
        res.status(422).json({
            result: "Could not process day."
        });
        return;
    }

    const input = await fs.readFile(`input/day${daynum}.txt`, 'utf8');
    let result = await advent.SolveDay(daynum, input);

    res.status(200).json({
        day: `${daynum}`,
        result: result
    })
});

app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
);

