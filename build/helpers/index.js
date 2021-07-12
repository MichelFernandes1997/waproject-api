"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformStatusLaboratory = function (payload) {
    if (Array.isArray(payload)) {
        var responseLaboratorios = payload.map(function (item) {
            return __assign({}, item._doc, { status: item._doc.status ? 'ativo' : 'inativo', exames: item._doc.exames.length > 0
                    ? item._doc.exames.map(function (exame) { return (__assign({}, exame._doc, { status: exame._doc.status ? 'ativo' : 'inativo' })); })
                    : item._doc.exames });
        });
        return responseLaboratorios;
    }
    else {
        var responseLaboratorio = __assign({}, payload._doc, { status: payload._doc.status ? 'ativo' : 'inativo', exames: payload._doc.exames.length > 0
                ? payload._doc.exames.map(function (exame) { return (__assign({}, exame._doc, { status: exame._doc.status ? 'ativo' : 'inativo' })); })
                : payload._doc.exames });
        return responseLaboratorio;
    }
};
exports.transformStatusExam = function (payload) {
    if (Array.isArray(payload)) {
        var responseExames = payload.map(function (item) {
            return __assign({}, item._doc, { status: item._doc.status ? 'ativo' : 'inativo', laboratorios: item._doc.laboratorios.length > 0
                    ? item._doc.laboratorios.map(function (laboratorio) { return (__assign({}, laboratorio._doc, { status: laboratorio._doc.status ? 'ativo' : 'inativo' })); })
                    : item._doc.laboratorios });
        });
        return responseExames;
    }
    else {
        var responseExame = __assign({}, payload._doc, { status: payload._doc.status ? 'ativo' : 'inativo', laboratorios: payload._doc.laboratorios.length > 0
                ? payload._doc.laboratorios.map(function (laboratorio) { return (__assign({}, laboratorio._doc, { status: laboratorio._doc.status ? 'ativo' : 'inativo' })); })
                : payload._doc.laboratorios });
        return responseExame;
    }
};
exports.validateInputs = function (inputs) {
    var result = {};
    Object.keys(inputs).map(function (key) {
        if (typeof inputs[key].value !== inputs[key].type) {
            result[key] = { error: "Erro de tipo: campo /" + key + "/ recebido possui o tipo /" + typeof inputs[key].value + "/, por\u00E9m o tipo esperado \u00E9 " + inputs[key].type };
        }
    });
    if (Object.keys(result).length === 0) {
        result = false;
    }
    return result;
};
//# sourceMappingURL=index.js.map