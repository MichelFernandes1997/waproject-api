import { IResponseLaboratorio, IResponseExame } from './interfaces'

export const transformStatusLaboratory = (payload: any) => {
    if (Array.isArray(payload)) {
        const responseLaboratorios = payload.map(item => {
            return { 
                ...item._doc,
                status: item._doc.status ? 'ativo' : 'inativo',
                exames: item._doc.exames.length > 0
                    ? item._doc.exames.map((exame: any) => (
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
                ? payload._doc.exames.map((exame: any ) => (
                    { ...exame._doc, status: exame._doc.status ? 'ativo' : 'inativo' }
                ))
                : payload._doc.exames
        }

        return responseLaboratorio as IResponseLaboratorio
    }
}

export const transformStatusExam = (payload: any) => {
    if (Array.isArray(payload)) {
        const responseExames = payload.map(item => {
            return { 
                ...item._doc,
                status: item._doc.status ? 'ativo' : 'inativo',
                laboratorios: item._doc.laboratorios.length > 0
                    ? item._doc.laboratorios.map((laboratorio: any) => (
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
                ? payload._doc.laboratorios.map((laboratorio: any) => (
                    { ...laboratorio._doc, status: laboratorio._doc.status ? 'ativo' : 'inativo' }
                ))
                : payload._doc.laboratorios
        } as IResponseExame

        return responseExame
    }
}

export const validateInputs = (inputs: any) => {
    let result = {} as any
    
    Object.keys(inputs).map(key => {
        if (inputs[key].value || inputs[key].value === false) {
            if (typeof inputs[key].value !== inputs[key].type) {
                result[key] = { error: `Erro de tipo: campo /${key}/ recebido possui o tipo /${typeof inputs[key].value}/, por??m o tipo esperado ?? ${inputs[key].type}` }
            }
        } else {
            result[key] = { error: `Erro de campo n??o encontrado: campo /${key}/ n??o foi encontrado no payload recebido e o mesmo ?? obrigat??rio` }
        }
    })

    if (Object.keys(result).length === 0) {
        result = false
    }

    return result
}