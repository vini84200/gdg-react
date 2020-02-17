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

export default async resolucao => {
  const { vfs } = vfsFonts.pdfMake;
  pdfMake.vfs = vfs;
  const documentDefinition = {
    pageSize: 'A4',
    // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
    pageMargins: [40, 200, 40, 60],
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
      { text: resolucao.ementa, alignment: 'justify', margin: [230, 0, 0, 30] },
      { text: 'O Grêmio Estudantil Vinicius de Moraes resolve:' },
    ],
    defaultStyle: {
      alignment: 'justify',
    },
  };

  pdfMake.createPdf(documentDefinition).open();
};
