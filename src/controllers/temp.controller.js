// temp.controller.js

import { status } from '../config/response.status.js';
import {CheckFlag, getTempData} from '../services/temp.service.js';
import { resp } from '../config/response.js';


export const tempTest = (req, res, next) => {
    res.send(resp(status.SUCCESS, getTempData()));
};


export const tempException = (req, res, next) => {
    console.log("/temp/exception/"+req.params.flag);
    return res.send(resp(status.SUCCESS, CheckFlag(req.params.flag)));
}