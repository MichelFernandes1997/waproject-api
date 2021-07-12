"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var exameSchema = new mongoose_1.default.Schema({
    nome: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    laboratorios: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Laboratorio' }]
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Exame', exameSchema);
//# sourceMappingURL=Exame.js.map