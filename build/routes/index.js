"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var exameRoute_1 = __importDefault(require("./exameRoute"));
var laboratorioRoute_1 = __importDefault(require("./laboratorioRoute"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swagger_json_1 = __importDefault(require("../doc/swagger.json"));
var routes = express_1.Router();
routes.get('/healthcheck', function (req, res) {
    return res.send('Api are running!');
});
routes.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
routes.use(exameRoute_1.default, laboratorioRoute_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map