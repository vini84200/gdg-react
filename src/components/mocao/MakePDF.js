import {makeAndOpenDocument, getBase64ImageFromURL} from '../documento/MakePDF.js'
import {romanize} from './utils'
import { renderArtigoPDF } from './Artigo'
import { renderAssinaturaPDF} from '../documento/Assinatura'
import { renderDataPDF} from '../documento/Data'

const getTitle = (num, year, type) => {
    if (type === 'proposta')
      return `PROJETO DE RESOLUÇÃO Nº ${num}, DE ${year}`

    if (type === 'resolucao')
      return `RESOLUÇÃO Nº ${num}, DE ${year}`

    if (type === 'proposta_emenda')
      return `PROJETO DE EMENDA EM RESOLUÇÃO Nº ${num}, DE ${year}`

    if (type === 'emenda')
      return `EMENDA EM RESOLUÇÃO Nº ${num}, DE ${year}`

    if (type === 'projeto_emenda_estatuto')
      return `PROJETO DE EMENDA AO ESTATUTO DO GRÊMIO Nº ${num}, DE ${year}`

    if (type === 'projeto_emenda_estatuto')
      return `EMENDA AO ESTATUTO DO GRÊMIO Nº ${num}, DE ${year}`
}

export default async resolucao => {
    const documentDefinition = {
        content: [
            {
                text: getTitle(resolucao.num, resolucao.year, resolucao.typeResolucao),
                bold: true,
                alignment: 'center',
            },
            {
                text: "\t\t" + resolucao.ementa.replace("\n", "\n\t\t"),
                alignment: 'justify',
                margin: [250, 30, 0, 30],
				preserveLeadingSpaces: true
            },
            { text: 'O Grêmio Estudantil Vinícius de Moraes resolve:' },
            {
				layout: 'noBorders',
                table: {
					widths: [35, '*'],
					margins: [0, 50],
                    body: resolucao.corpo.map(artigo => renderArtigoPDF(artigo)),
                },
                margin: [20, 30, 0, 0],
            },
            renderDataPDF(resolucao.data),
            renderAssinaturaPDF(resolucao.assinatura, 'Proponente')
        ]
    };
    makeAndOpenDocument(documentDefinition);
};
