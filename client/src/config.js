export const livrosAta = [
  { cod: 28, title: "28 - Livro de Atas do Grêmio", default: true }
];

export const livroAtaDefault = livrosAta[0];

export const getLivroAta = num => {
  return livrosAta.find(livro => livro.cod == num);
};
