const Koa = require('koa');
const config = require('config');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const sequelize = require("./config/db.js");

const mainRouter = require("./routes/index.routes.js");

const PORT = config.get("port") || 3030;

const app = new Koa();
app.use(serve(__dirname + "/static/img"));
app.use(bodyParser);
app.use(cors());

app.use(mainRouter());

const start = async() => {
    try {
        await sequelize.authenticate();
        await sequelize.sync(); // alter: true
        console.log("Connection has been established succesfully!");
        app.listen(PORT, () => {
            console.log(`Server ${PORT}-portda ishga tushdi`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();