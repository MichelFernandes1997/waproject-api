"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Exame_1 = __importDefault(require("../../entity/Exame"));
var Laboratorio_1 = __importDefault(require("../../entity/Laboratorio"));
var helpers_1 = require("../../helpers");
var ExameController = {
    index: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var withTrashed, exames, responseExames, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        withTrashed = req.query.withTrashed;
                        return [4 /*yield*/, Exame_1.default.find().populate("laboratorios")];
                    case 1:
                        exames = _a.sent();
                        responseExames = helpers_1.transformStatusExam(exames);
                        if (!withTrashed) {
                            return [2 /*return*/, res.send(responseExames.filter(function (item) { return item.status === 'ativo'; }))];
                        }
                        else {
                            return [2 /*return*/, res.send(responseExames)];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [2 /*return*/, res.status(500).json(err_1.message || err_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    findOne: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, exame, responseExame, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _id = req.params.id;
                        return [4 /*yield*/, Exame_1.default.findOne({ _id: _id }).populate("laboratorios")];
                    case 1:
                        exame = _a.sent();
                        responseExame = helpers_1.transformStatusExam(exame);
                        return [2 /*return*/, res.send(responseExame)];
                    case 2:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [2 /*return*/, res.status(500).json(err_2.message || err_2)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    upsert: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, laboratorioId, removerLaboratorio, params_1, exame_1, inputs, invalidInputs, laboratorioAtivo, exameAtivo, relationOperation, exameCriado, responseExame, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 11, , 12]);
                        _a = req.body, id = _a.id, laboratorioId = _a.laboratorioId, removerLaboratorio = _a.removerLaboratorio, params_1 = __rest(_a, ["id", "laboratorioId", "removerLaboratorio"]);
                        return [4 /*yield*/, Exame_1.default.findOne({ _id: id })];
                    case 1:
                        exame_1 = _b.sent();
                        if (!params_1) return [3 /*break*/, 4];
                        if (!exame_1) {
                            exame_1 = {};
                            id = mongoose_1.default.Types.ObjectId();
                            inputs = {
                                nome: {
                                    type: 'string',
                                    value: params_1.nome
                                },
                                tipo: {
                                    type: 'string',
                                    value: params_1.tipo
                                }
                            };
                            invalidInputs = helpers_1.validateInputs(inputs);
                            if (invalidInputs) {
                                return [2 /*return*/, res.status(400).json({ errors: invalidInputs })];
                            }
                            params_1.status = true;
                        }
                        else {
                            if (params_1.status || params_1.status === false) {
                                delete params_1.status;
                                if (Object.keys(params_1).length === 0 && !laboratorioId) {
                                    return [2 /*return*/, res.status(200).send({ message: "Nothing are received for update!" })];
                                }
                            }
                        }
                        Object.keys(params_1).map(function (key) {
                            exame_1[key] = params_1[key];
                        });
                        return [4 /*yield*/, Exame_1.default.updateOne({ _id: id }, exame_1, {
                                upsert: true
                            })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, Exame_1.default.findOne({ _id: id })];
                    case 3:
                        exame_1 = _b.sent();
                        _b.label = 4;
                    case 4:
                        if (!laboratorioId) return [3 /*break*/, 9];
                        return [4 /*yield*/, Laboratorio_1.default.findOne({ _id: laboratorioId, status: true })];
                    case 5:
                        laboratorioAtivo = _b.sent();
                        if (!laboratorioAtivo) {
                            return [2 /*return*/, res.status(400).send({ message: "Laboratorio inativo: por favor para vincular o laboratorio é necessário que o mesmo esteja ativo" })];
                        }
                        if (!id) {
                            if (exame_1) {
                                id = exame_1._id;
                            }
                            else {
                                return [2 /*return*/, res.status(400).send({ message: "Campo não encontrado: o campo /id/ do exame não foi encontrado no payload recebido" })];
                            }
                        }
                        return [4 /*yield*/, Exame_1.default.findOne({ _id: id, status: true })];
                    case 6:
                        exameAtivo = _b.sent();
                        if (!exameAtivo) {
                            return [2 /*return*/, res.status(400).send({ message: "Exame inativo: por favor para vincular o exame à um laboratorio é necessário que o mesmo esteja ativo" })];
                        }
                        relationOperation = { exame: {}, laboratorio: {} };
                        if (removerLaboratorio) {
                            relationOperation.exame.$pull = { laboratorios: laboratorioId };
                            relationOperation.laboratorio.$pull = { exames: id };
                        }
                        else {
                            relationOperation.exame.$push = { laboratorios: laboratorioId };
                            relationOperation.laboratorio.$push = { exames: id };
                        }
                        return [4 /*yield*/, Exame_1.default.findByIdAndUpdate(id, relationOperation.exame, {
                                new: true,
                                useFindAndModify: false
                            })];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, Laboratorio_1.default.findByIdAndUpdate(laboratorioId, relationOperation.laboratorio, {
                                new: true,
                                useFindAndModify: false
                            })];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9: return [4 /*yield*/, Exame_1.default.findOne({ _id: id }).populate("laboratorios")];
                    case 10:
                        exameCriado = _b.sent();
                        responseExame = helpers_1.transformStatusExam(exameCriado);
                        return [2 /*return*/, res.json(responseExame)];
                    case 11:
                        err_3 = _b.sent();
                        console.log(err_3);
                        return [2 /*return*/, res.status(500).json(err_3.message || err_3)];
                    case 12: return [2 /*return*/];
                }
            });
        });
    },
    delete: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, exame, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        _id = req.params.id;
                        if (!_id) {
                            return [2 /*return*/, res.status(400).json({ message: 'Campo não encontrado: campo /id/ não foi enviado no payload para remoção' })];
                        }
                        return [4 /*yield*/, Exame_1.default.findOne({ _id: _id })];
                    case 1:
                        exame = _a.sent();
                        if (!exame) {
                            return [2 /*return*/, res.json({ message: "Nenhum exame foi deletado pois não foi encontrada nenhuma correspondência com o /id/ recebido!" })];
                        }
                        if (exame.status === false) {
                            return [2 /*return*/, res.json({ message: "Nenhum exame foi deletado pois o exame encontrado com o /id/ recebido, já encontra-se removido!" })];
                        }
                        exame.status = false;
                        return [4 /*yield*/, Exame_1.default.updateOne({ _id: _id }, exame)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.send({ message: "O exame com /id/ igual \u00E0 " + _id + " foi removido com sucesso" })];
                    case 3:
                        err_4 = _a.sent();
                        console.log(err_4);
                        return [2 /*return*/, res.status(500).json(err_4.message || err_4)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    restore: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, exame, exameRestaurado, responseExame, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        _id = req.body.id;
                        if (!_id) {
                            return [2 /*return*/, res.status(400).json({ message: 'Campo não encontrado: campo /id/ não foi enviado no payload para restauração' })];
                        }
                        return [4 /*yield*/, Exame_1.default.findOne({ _id: _id }).populate("laboratorios")];
                    case 1:
                        exame = _a.sent();
                        if (!exame) {
                            return [2 /*return*/, res.json({ message: "Nenhum exame foi restaurado pois não foi encontrada nenhuma correspondência com o /id/ recebido!" })];
                        }
                        if (exame.status) {
                            return [2 /*return*/, res.json({ message: "Nenhum exame foi restaurado pois o exame encontrado com o /id/ recebido, já encontra-se ativo!" })];
                        }
                        exame.status = true;
                        return [4 /*yield*/, Exame_1.default.updateOne({ _id: _id }, exame)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, Exame_1.default.findOne({ _id: _id }).populate("laboratorios")];
                    case 3:
                        exameRestaurado = _a.sent();
                        responseExame = helpers_1.transformStatusExam(exameRestaurado);
                        return [2 /*return*/, res.json(responseExame)];
                    case 4:
                        err_5 = _a.sent();
                        console.log(err_5);
                        return [2 /*return*/, res.status(500).json(err_5.message || err_5)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
};
exports.default = ExameController;
//# sourceMappingURL=ExameController.js.map