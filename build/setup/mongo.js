"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var process_1 = __importDefault(require("process"));
if (process_1.default.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
var _a = process_1.default.env, MONGO_USERNAME = _a.MONGO_USERNAME, MONGO_PASSWORD = _a.MONGO_PASSWORD, MONGO_HOST = _a.MONGO_HOST, LOCAL_MONGO_HOST = _a.LOCAL_MONGO_HOST, MONGO_PORT = _a.MONGO_PORT, MONGO_DATABASE = _a.MONGO_DATABASE;
var url;
if (process_1.default.env.NODE_ENV === 'production') {
    url = "mongodb+srv://" + MONGO_USERNAME + ":" + MONGO_PASSWORD + "@" + MONGO_HOST + "/" + MONGO_DATABASE + "?retryWrites=true&w=majority";
}
else {
    url = "mongodb://" + MONGO_USERNAME + ":" + MONGO_PASSWORD + "@" + MONGO_HOST + ":" + MONGO_PORT;
}
mongoose_1.default.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose_1.default.connection.on('error', function () { return console.error('Connection error:'); });
mongoose_1.default.connection.once('open', function () { return console.log('Database connected!'); });
exports.default = mongoose_1.default;
//# sourceMappingURL=mongo.js.map