import {makeAndOpenDocument, getBase64ImageFromURL} from '../documento/MakePDF.js'
import {romanize} from './utils'
import { renderArtigoPDF } from './Artigo'
import { renderAssinaturaPDF} from '../documento/Assinatura'
import { renderDataPDF} from '../documento/Data'

export default async resolucao => {
    const documentDefinition = {
        content: [
            {
                text: `PROJETO DE RESOLUÇÃO Nº ${resolucao.num}, DE ${resolucao.year}`,
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
