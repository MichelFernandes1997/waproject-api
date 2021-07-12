"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var LaboratorioController_1 = __importDefault(require("../controller/Laboratorio/LaboratorioController"));
var laboratorioRoute = express_1.Router();
laboratorioRoute.get('/laboratorio', LaboratorioController_1.default.index);
laboratorioRoute.get('/laboratorio/:id', LaboratorioController_1.default.findOne);
laboratorioRoute.post('/laboratorio', LaboratorioController_1.default.upsert);
laboratorioRoute.put('/laboratorio', LaboratorioController_1.default.upsert);
laboratorioRoute.delete('/laboratorio/:id', LaboratorioController_1.default.delete);
laboratorioRoute.put('/laboratorio/restore', LaboratorioController_1.default.restore);
exports.default = laboratorioRoute;
//# sourceMappingURL=laboratorioRoute.js.map