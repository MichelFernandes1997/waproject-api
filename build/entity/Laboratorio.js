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
var laboratorioSchema = new mongoose_1.default.Schema({
    nome: {
        type: String,
        required: true,
        unique: true
    },
    endereco: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    exames: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Exame' }]
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Laboratorio', laboratorioSchema);
//# sourceMappingURL=Laboratorio.js.map