import { IResponseLaboratorio, IResponseExame } from './interfaces'

export const transformStatusLaboratory = (payload) => {
    if (Array.isArray(payload)) {
        const responseLaboratorios = payload.map(item => {
            return { 
                ...item._doc,
                status: item._doc.status ? 'ativo' : 'inativo',
                exames: item._doc.exames.length > 0
                    ? item._doc.exames.map(exame => (
                        { ...exame._doc, status: exame._doc.status ? 'ativo' : 'inativo' }
                    ))
                    : item._doc.exames
            }
        }) as Array<IResponseLaboratorio>

        return responseLaboratorios
    } else {
        const responseLaboratorio = { 
            ...payload._doc,
            status: payload._doc.status ? 'ativo' : 'inativo',
            exames: payload._doc.exames.length > 0
                ? payload._doc.exames.map(exame => (
                    { ...exame._doc, status: exame._doc.status ? 'ativo' : 'inativo' }
                ))
                : payload._doc.exames
        }

        return responseLaboratorio as IResponseLaboratorio
    }
}

export const transformStatusExam = (payload) => {
    if (Array.isArray(payload)) {
        const responseExames = payload.map(item => {
            return { 
                ...item._doc,
                status: item._doc.status ? 'ativo' : 'inativo',
                laboratorios: item._doc.laboratorios.length > 0
                    ? item._doc.laboratorios.map(laboratorio => (
                        { ...laboratorio._doc, status: laboratorio._doc.status ? 'ativo' : 'inativo' }
                    ))
                    : item._doc.laboratorios
            }
        }) as Array<IResponseExame>

        return responseExames
    } else {
        const responseExame = { 
            ...payload._doc,
            status: payload._doc.status ? 'ativo' : 'inativo',
            laboratorios: payload._doc.laboratorios.length > 0
                ? payload._doc.laboratorios.map(laboratorio => (
                    { ...laboratorio._doc, status: laboratorio._doc.status ? 'ativo' : 'inativo' }
                ))
                : payload._doc.laboratorios
        } as IResponseExame

        return responseExame
    }
}

export const validateInputs = (inputs) => {
    let result = {}
    
    Object.keys(inputs).map(key => {
        if (typeof inputs[key].value !== inputs[key].type) {
            result[key] = { error: `Erro de tipo: campo /${key}/ recebido possui o tipo /${typeof inputs[key].value}/, porém o tipo esperado é ${inputs[key].type}` }
        }
    })

    if (Object.keys(result).length === 0) {
        result = false
    }

    return result
}