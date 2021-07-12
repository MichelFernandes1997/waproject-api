"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ExameController_1 = __importDefault(require("../controller/Exame/ExameController"));
var exameRoute = express_1.Router();
exameRoute.get('/exame', ExameController_1.default.index);
exameRoute.get('/exame/:id', ExameController_1.default.findOne);
exameRoute.post('/exame', ExameController_1.default.upsert);
exameRoute.put('/exame', ExameController_1.default.upsert);
exameRoute.delete('/exame/:id', ExameController_1.default.delete);
exameRoute.put('/exame/restore', ExameController_1.default.restore);
exports.default = exameRoute;
//# sourceMappingURL=exameRoute.js.map