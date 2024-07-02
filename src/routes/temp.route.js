import express from "express";
const tempRouter = express.Router();

tempRouter.get('/', (req, res) => {
    res.send('Temp Router Root');
});

tempRouter.get('/example', (req, res) => {
    res.send('Example route in Temp Router');
});

export default tempRouter;