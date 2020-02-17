import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';
import logo_gremio from '../../imgs/logo_gremio.jpg';
const getBase64ImageFromURL = url => {
    return new Promise((resolve, reject) => {
        var img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');

        img.onload = () => {
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            var dataURL = canvas.toDataURL('image/png');

            resolve(dataURL);
        };

        img.onerror = error => {
            reject(error);
        };

        img.src = url;
    });
};

function romanize(num) {
    if (isNaN(num)) return NaN;
    var digits = String(+num).split(''),
        key = [
            '',
            'C',
            'CC',
            'CCC',
            'CD',
            'D',
            'DC',
            'DCC',
            'DCCC',
            'CM',
            '',
            'X',
            'XX',
            'XXX',
            'XL',
            'L',
            'LX',
            'LXX',
            'LXXX',
            'XC',
            '',
            'I',
            'II',
            'III',
            'IV',
            'V',
            'VI',
            'VII',
            'VIII',
            'IX',
        ],
        roman = '',
        i = 3;
    while (i--) roman = (key[+digits.pop() + i * 10] || '') + roman;
    return Array(+digits.join('') + 1).join('M') + roman;
}

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
    const { vfs } = vfsFonts.pdfMake;
    pdfMake.vfs = vfs;
    const documentDefinition = {
        pageSize: 'A4',
        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        pageMargins: [60, 200, 60, 60],
        header: {
            margin: [40, 10, 40, 0],
            stack: [
                {
                    image: await getBase64ImageFromURL(logo_gremio), //"https://i.ibb.co/xY7TNZg/logo-gremio.jpg"),
                    fit: [170, 170],
                    alignment: 'center',
                },
                '\n',
                {
                    text: 'ESCOLA ESTADUAL DE ENSINO MÉDIO ELISA TRAMONTINA',
                    alignment: 'center',
                    fontSize: 16,
                    bold: true,
                },
                {
                    text: 'GRÊMIO ESTUDANTIL VINÍCIUS DE MORAES',
                    alignment: 'center',
                    fontSize: 14,
                    bold: true,
                },
                {
                    text:
                        'Rua José Raimundo Carlotto, nº 329 – Bairro Vila Nova  –  Carlos Barbosa – Rio Grande do Sul – CEP 95185-000',
                    alignment: 'center',
                    fontSize: 11,
                },
            ],
        },
        content: [
            {
                text: `PROJETO DE RESOLUÇÃO Nº ${resolucao.num}, DE ${resolucao.year}`,
                bold: true,
                alignment: 'center',
            },
            {
                text: resolucao.ementa,
                alignment: 'justify',
                margin: [300, 0, 0, 30],
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
        ],
        defaultStyle: {
            alignment: 'justify',
        },
    };

    pdfMake.createPdf(documentDefinition).open();
};
