"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var compression_1 = __importDefault(require("compression"));
var cors_1 = __importDefault(require("cors"));
var routes_1 = __importDefault(require("./routes"));
var process_1 = __importDefault(require("process"));
require("./setup/mongo");
if (process_1.default.env.ENV !== 'production') {
    require('dotenv').config();
}
var checkIfCompressResponse = function (req, res) {
    if (req.headers['x-no-compression']) {
        return false;
    }
    return compression_1.default.filter(req, res);
};
var app = express_1.default();
app.use(express_1.default.json());
app.use(compression_1.default({ filter: checkIfCompressResponse, threshold: 0 }));
app.use(cors_1.default());
app.use('/api/v1', routes_1.default);
var server = app.listen(process_1.default.env.PORT);
process_1.default.on('SIGINT', function () {
    server.close(function () { return console.log("Servidor encerrado!"); });
});
//# sourceMappingURL=index.js.map