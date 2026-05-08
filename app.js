const express = require('express');
const path = require('path');

require('dotenv').config()
const app = express();
const indexRouter = require('./routes/indexRouter')

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use('/', indexRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.msg);
});

const PORT = process.env.PORT;
app.listen(PORT || 3000, () => {
    console.log(`Server listen on port ${PORT}`);
})