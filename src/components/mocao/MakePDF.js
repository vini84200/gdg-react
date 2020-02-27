import {makeAndOpenDocument, getBase64ImageFromURL} from '../documento/MakePDF.js'
import {romanize} from './utils'

const getCallingArtigo = num => {
    if (num > 9) {
        return 'Art. ' + num;
    } else {
        return 'Art. ' + num + '°';
    }
};

const getCallingItem = num => {
    return romanize(num) + "."
};

const renderArtigo = artigo => {
    return [
        {text: getCallingArtigo(artigo.number), bold: true},
		[artigo.text, renderItems(artigo.items) ]
    ];
};

const renderItem = item => {
    return [
        {text: getCallingItem(item.number), bold: true},
		[item.text, ]
    ];
};

const renderItems = items => {
	if (items){
		return {
			layout: 'noBorders',
			table: {
				widths: [15, '*'],
				margins: [0, 50],
				body: items.map(item => renderItem(item))
			}
		}
	}
	return;
}

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
                    body: resolucao.corpo.map(artigo => renderArtigo(artigo)),
                },
                margin: [20, 30, 0, 0],
            },
        ]
    };
    makeAndOpenDocument(documentDefinition);
};
