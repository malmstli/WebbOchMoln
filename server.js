const express = require("express");
const app = express();
const PORT = 3000;
const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

console.log("hello node");

app.get("/", (req, res) => {
    res.send("Hello Express!");
});

app.get("/hello/:name", (req, res) => {
    res.send(`Hej ${req.params.name}`);
});

app.get("/weekdays/:dayNumber", (req, res) => {
    const dayNumber = Number(req.params.dayNumber);

    if (!Number.isInteger(dayNumber) || dayNumber < 1 || dayNumber > weekdays.length) {
        return res.status(400).send("Day number must be an integer between 1 and 7");
    }

    res.send(weekdays[dayNumber - 1]);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});