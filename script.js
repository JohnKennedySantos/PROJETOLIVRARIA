let livros = [];

document.addEventListener("DOMContentLoaded", function() {
  fetch('livros.json')
    .then(response => response.json())
    .then(data => {
      livros = data.books;
      const listaLivros = document.getElementById('livros');

      livros.forEach(livro => {
        const divLivro = document.createElement('div');
        divLivro.classList.add('livro');
        divLivro.setAttribute('data-titulo', livro.titulo);

        divLivro.innerHTML = `
          <h2>${livro.titulo}</h2>
          <p><strong>Autor:</strong> ${livro.autor}</p>
          <p><strong>Gênero:</strong> ${livro.genero}</p>
          <p class="quantidade"><strong>Quantidade:</strong> ${livro.quantidade}</p>
          <p><strong>Valor:</strong> R$ ${livro.valor}</p>
          <img src="${livro.imagem}" alt="${livro.titulo}">
          <button class="comprar-btn" onclick="comprarLivro('${livro.titulo}')">Comprar</button>
        `;

        listaLivros.appendChild(divLivro);
      });
    })
    .catch(error => console.error('Erro ao carregar os livros:', error));
});

function comprarLivro(titulo) {
  const livroComprado = livros.find(livro => livro.titulo === titulo);

  if (livroComprado) {
    if (parseInt(livroComprado.quantidade) > 0) {
      livroComprado.quantidade = (parseInt(livroComprado.quantidade) - 1).toString();
      alert(`Você comprou o livro "${titulo}"!`);
      const quantidadeElement = document.querySelector(`div[data-titulo="${titulo}"] .quantidade`);
      if (quantidadeElement) {
        quantidadeElement.textContent = `Quantidade: ${livroComprado.quantidade}`;
      }
    } else {
      alert(`Desculpe, o livro "${titulo}" está fora de estoque.`);
    }
  } else {
    alert(`Desculpe, o livro "${titulo}" não foi encontrado.`);
  }
}

function abrirFormularioCadastro() {
  const listaLivros = document.getElementById('livros');
  listaLivros.style.display = 'none';

  const formulario = `
    <form id="formulario-cadastro" style="
      max-width: 400px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    ">
      <label for="titulo">Título:</label>
      <input type="text" id="titulo" name="titulo" style="
        width: calc(100% - 22px); /* Reduzindo 2px para a borda */
        padding: 8px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 3px;
        font-size: 14px; /* Tamanho da fonte reduzido */
      " required><br><br>

      <label for="autor">Autor:</label>
      <input type="text" id="autor" name="autor" style="
        width: calc(100% - 22px); /* Reduzindo 2px para a borda */
        padding: 8px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 3px;
        font-size: 14px; /* Tamanho da fonte reduzido */
      " required><br><br>

      <label for="genero">Gênero:</label>
      <input type="text" id="genero" name="genero" style="
        width: calc(100% - 22px); /* Reduzindo 2px para a borda */
        padding: 8px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 3px;
        font-size: 14px; /* Tamanho da fonte reduzido */
      " required><br><br>

      <label for="quantidade">Quantidade:</label>
      <input type="number" id="quantidade" name="quantidade" style="
        width: calc(100% - 22px); /* Reduzindo 2px para a borda */
        padding: 8px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 3px;
        font-size: 14px; /* Tamanho da fonte reduzido */
      " required><br><br>

      <label for="valor">Valor:</label>
      <input type="text" id="valor" name="valor" style="
        width: calc(100% - 22px); /* Reduzindo 2px para a borda */
        padding: 8px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 3px;
        font-size: 14px; /* Tamanho da fonte reduzido */
      " required><br><br>

      <label for="imagem">URL da Imagem:</label>
      <input type="text" id="imagem" name="imagem" style="
        width: calc(100% - 22px); /* Reduzindo 2px para a borda */
        padding: 8px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 3px;
        font-size: 14px; /* Tamanho da fonte reduzido */
      " required><br><br>

      <button type="submit" style="
        width: calc(100% - 22px); /* Reduzindo 2px para a borda */
        padding: 10px;
        background-color: #28a745; /* Cor verde */
        color: #fff;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        transition: background-color 0.3s; /* Transição suave de cor */
      ">Cadastrar Livro</button>
    </form>
  `;

  const formularioDiv = document.getElementById('formulario');
  formularioDiv.innerHTML = formulario;

  const form = document.getElementById('formulario-cadastro');
  form.addEventListener('submit', cadastrarLivro);
}

  

function cadastrarLivro(event) {
  event.preventDefault();

  const titulo = document.getElementById('titulo').value;
  const autor = document.getElementById('autor').value;
  const genero = document.getElementById('genero').value;
  const quantidade = document.getElementById('quantidade').value;
  const valor = document.getElementById('valor').value;
  const imagem = document.getElementById('imagem').value;

  const novoLivro = {
    titulo: titulo,
    autor: autor,
    genero: genero,
    quantidade: quantidade,
    valor: valor,
    imagem: imagem
  };

  fetch('livros.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ book: novoLivro }), // Enviando apenas o novo livro, não a lista inteira
  })
  .then(response => response.json())
  .then(data => {
    alert(`Livro "${titulo}" cadastrado com sucesso!`);
    // Apresentar o novo livro cadastrado
    apresentarNovoLivro(novoLivro);
  })
  .catch(error => console.error('Erro ao cadastrar livro:', error));
}

function apresentarNovoLivro(novoLivro) {
  const listaLivros = document.getElementById('livros');

  const divLivro = document.createElement('div');
  divLivro.classList.add('livro');
  divLivro.setAttribute('data-titulo', novoLivro.titulo);

  divLivro.innerHTML = `
    <h2>${novoLivro.titulo}</h2>
    <p><strong>Autor:</strong> ${novoLivro.autor}</p>
    <p><strong>Gênero:</strong> ${novoLivro.genero}</p>
    <p class="quantidade"><strong>Quantidade:</strong> ${novoLivro.quantidade}</p>
    <p><strong>Valor:</strong> R$ ${novoLivro.valor}</p>
    <img src="${novoLivro.imagem}" alt="${novoLivro.titulo}">
    <button class="comprar-btn" onclick="comprarLivro('${novoLivro.titulo}')">Comprar</button>
  `;

  listaLivros.appendChild(divLivro);
}

function apresentarListaLivros() {
  const listaLivros = document.getElementById('livros');
  listaLivros.style.display = 'block';
}
