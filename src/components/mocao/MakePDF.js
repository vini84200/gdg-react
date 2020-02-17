import pdfMake from 'pdfmake/build/pdfmake';

import vfsFonts from 'pdfmake/build/vfs_fonts';

export default () => {
	const {vfs} = vfsFonts.pdfMake;
	pdfMake.vfs = vfs;

  const documentDefinition = {
		pageSize: 'A4',
        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        pageMargins: [ 40, 60, 40, 60 ],
        header: [
            {
                text: "Escola Estadual de Ensino Médio Elisa Tramontina",
                alignment: 'center'
            },
        ],
		content: [
			{text: 'React + pdfmake example'},
			'\n'
		]
  };

	pdfMake.createPdf(documentDefinition).open();
}
