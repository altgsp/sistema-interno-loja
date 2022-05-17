class Produto {
  constructor() {
    this.id = 1;
    //this.nomeProduto = "";
    //this.valor = 0;

    this.arrayProdutos = [];
    this.editId = null;
    this.verificaFoto = true;
    //this.foto = "";

    let foto = document.getElementById('imgFoto');
    let arquivo = document.getElementById('flImage');

    // let foto = $("#imgFoto");
    //let arquivo = $("#flImage");

    arquivo.addEventListener('change', e => {
      let leitor = new FileReader();

      leitor.onload = () => {
        foto.src = leitor.result;
      };
      leitor.readAsDataURL(arquivo.files[0]);
    });
  }

  //********************** AÇÃO NÚMERO 0 *******************************************************/
  salvar() {
    //alert("vamos adicionar um produto");
    //this.lerDados();

    let produto = this.lerDados();
    if (this.validaCampos(produto)) {
      if (this.editId == null) {
        this.adicionar(produto);
      } else {
        console.log(produto);
        this.atualizar(this.editId);
      }
    }
    this.listaTabela();
    this.cancelar();
    console.log(this.arrayProdutos);
    localStorage.setItem('meusProdutos', JSON.stringify(this.arrayProdutos));
  }

  //********************** AÇÃO NÚMERO 04 *******************************************************/
  listaTabela() {
    let tbody = document.getElementById('tbody');

    tbody.innerText = '';

    for (let i = 0; i < this.arrayProdutos.length; i++) {
      let newTr = tbody.insertRow();

      let td_id = newTr.insertCell();
      let td_nome = newTr.insertCell();
      let td_valor = newTr.insertCell();
      let td_acoes = newTr.insertCell();

      td_id.innerText = this.arrayProdutos[i].id;
      td_nome.innerText = this.arrayProdutos[i].nome;
      td_valor.innerText = this.arrayProdutos[i].valor;

      td_id.classList.add('center');
      td_acoes.classList.add('center');

      let imgEdit = document.createElement('img');
      imgEdit.src = 'assets/edit.png';

      imgEdit.setAttribute(
        'onclick',
        'produto.preparaEdicao(' + JSON.stringify(this.arrayProdutos[i]) + ')'
      );

      let imgDelete = document.createElement('img');
      imgDelete.src = 'assets/delete.png';

      imgDelete.setAttribute(
        'onclick',
        'produto.deletar(' + this.arrayProdutos[i].id + ')'
      );

      td_acoes.appendChild(imgEdit);
      td_acoes.appendChild(imgDelete);
    }
  }

  //********************** AÇÃO NÚMERO 03 *******************************************************/
  adicionar(produto) {
    this.arrayProdutos.push(produto);
    $('#flImage').val('');
    this.id++;
  }

  preparaEdicao(dados) {
    //alert(dados.id);

    this.editId = dados.id;
    document.getElementById('nomeProduto').value = dados.nome;
    document.getElementById('valorProduto').value = dados.valor;

    let foto = document.getElementById('imgFoto');
    if (dados.foto == 'undefined') {
      foto.src = 'assets/camera.png';
    } else {
      foto.src = dados.foto;
    }

    document.getElementById('btn1').innerText = 'Atualizar';
  }

  atualizar(id) {
    //alert(id);

    for (let i = 0; i < this.arrayProdutos.length; i++) {
      if (id == this.arrayProdutos[i].id) {
        this.arrayProdutos[i].nome =
          document.getElementById('nomeProduto').value;
        this.arrayProdutos[i].valor =
          document.getElementById('valorProduto').value;

        if ($('#flImage').val() != '') {
          let nomeDoArquivo = $('#flImage')[0].files[0].name;
          this.arrayProdutos[i].foto = 'assets/' + nomeDoArquivo;
        }
      }
    }

    this.editId = null;
    $('#flImage').val('');
  }

  //********************** AÇÃO NÚMERO 01 *******************************************************/
  lerDados() {
    //alert("ler Dados");

    let produto = {};

    produto.id = this.id;
    produto.nome = document.getElementById('nomeProduto').value;
    produto.valor = document.getElementById('valorProduto').value;

    if ($('#flImage').val() != '') {
      let nomeDoArquivo = $('#flImage')[0].files[0].name;
      produto.foto = 'assets/' + nomeDoArquivo;
    } else {
      produto.foto = 'assets/camera.png';
      this.verificaFoto = true;
    }

    let foto = document.getElementById('imgFoto');
    foto.src = 'assets/camera.png';

    return produto;
  }

  //********************** AÇÃO NÚMERO 02 *******************************************************/
  validaCampos(produto) {
    let msg = '';

    if (produto.nome == '') {
      msg += '- informe o nome do produto \n';
    }
    if (produto.valor == '') {
      msg += '- informe o preço do produto \n';
    }
    if (msg != '') {
      alert(msg);
      return false;
    }

    return true;
  }

  //********************** AÇÃO NÚMERO 05 *******************************************************/
  cancelar() {
    //alert("produto deletado");

    document.getElementById('nomeProduto').value = '';
    document.getElementById('valorProduto').value = '';

    document.getElementById('btn1').innerText = 'Salvar';
    this.editId = null;
  }

  deletar(idProcurado) {
    //alert("Vamos deletar o id: " + id);

    //console.log(this.arrayProdutos);

    if (confirm('Deseja realmente deletar o produto ID: ' + idProcurado)) {
      let tbody = document.getElementById('tbody');

      for (let i = 0; i < this.arrayProdutos.length; i++) {
        if (this.arrayProdutos[i].id == idProcurado) {
          this.arrayProdutos.splice(i, 1);
          tbody.deleteRow(i);
        }
      }
      localStorage.setItem('meusProdutos', JSON.stringify(this.arrayProdutos));
    }
    //console.log(this.arrayProdutos);
  }
}

var produto = new Produto();

// function exibeCards() {
//   let ProdutoCards = JSON.parse(localStorage.getItem('meusProdutos'));
//   // alert('testando');
//   let i = 1;
//   for (i = 0; i < ProdutoCards.length; i++) {
//     let coluna = document.createElement('div');
//     let idColuna = document.createAttribute('id');
//     coluna.classList.add('col-lg-3', 'col-md-6', 'col-sm-12');
//     idColuna.value = 'coluna' + i;
//     coluna.setAttributeNode(idColuna);
//     document.querySelector('#linhaProdutos').appendChild(coluna);

//     let card = document.createElement('div');
//     let idCard = document.createAttribute('id');

//     card.classList.add('card');
//     idCard.value = 'card' + i;
//     card.setAttributeNode(idCard);
//     card.style.width = '17rem';
//     document.querySelector('#coluna' + i).appendChild(card);

//     let imagem = document.createElement('img');
//     imagem.classList.add('card-img-top');
//     imagem.src = 'assets/banana.jpg';
//     document.querySelector('#card' + i).appendChild(imagem);

//     let divBodyCard = document.createElement('div');
//     let idDivCard = document.createAttribute('id');
//     divBodyCard.classList.add('card-body');
//     idDivCard.value = 'bodyId' + i;
//     divBodyCard.setAttributeNode(idDivCard);
//     document.querySelector('#card' + i).appendChild(divBodyCard);

//     let titleCard = document.createElement('h5');
//     titleCard.classList.add('card-title');
//     titleCard.innerHTML = 'Banana';
//     document.querySelector('#bodyId' + i).appendChild(titleCard);

//     let textoCard = document.createElement('p');
//     textoCard.classList.add('card-text');
//     textoCard.innerHTML = 'Frutas deliciosas vindo direto do produtor';
//     document.querySelector('#bodyId' + i).appendChild(textoCard);

//     let botaoCard = document.createElement('button');
//     botaoCard.classList.add('btn', 'btn-primary');
//     botaoCard.innerHTML = 'Comprar';
//     document.querySelector('#bodyId' + i).appendChild(botaoCard);
//   }
// }

function exibeCards2() {
  let produtoCards = JSON.parse(localStorage.getItem('meusProdutos'));

  let containerCards = document.getElementById('linhaProdutos');
  for (let i = 0; i < produtoCards.length; i++) {
    containerCards.innerHTML =
      `
    <div class="col-lg-3 col-md-6 col-sm-12">
      <div class="card" style="width: 18rem">
        <img src="` +
      produtoCards[i].foto +
      `" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">` +
      produtoCards[i].nome +
      `</h5>
          <p class="card-text">Frutas deliciosas vindas direto do produtor</p>
          <p class="fw-bolder"> R$` +
      parseFloat(produtoCards[i].valor).toFixed(2) +
      `</p>
          <a href="#" class="btn btn-primary">
            Comprar
          </a>
        </div>
      </div>
    </div>`;
  }
}

// código do banner

let vtBanner = [
  'assets/b1.jpg',
  'assets/b2.jpg',
  'assets/b3.jpg',
  'assets/b4.png'
];

var max = vtBanner.length - 1;

var i = 0;

$('#btnAnte').text('<');
$('#btnProx').text('>');
$('#banner').css('backgroundImage', 'url(' + vtBanner[0] + ')');

$('#btnAnte').click(function () {
  troca(-1);
});
$('#btnProx').click(function () {
  troca(1);
});

function troca(opr) {
  $('#banner')
    .css('backgroundImage', 'url(' + vtBanner[i] + ')')
    .fadeOut(3000, function () {
      i += opr;
      if (i > max) {
        i = 0;
      } else if (i < 0) {
        i = max;
      }

      $('#banner')
        .css('backgroundImage', 'url(' + vtBanner[i] + ')')
        .fadeIn(2000);
    });
}

setInterval(() => troca(1), 2000);

$(function () {
  $('#tabela input').keyup(function () {
    //toda vez que alguma tecla for pressionada e solta entre nessa função
    let index = $(this).parent().index(); //pega o indíce da coluna a ser selecionada;
    console.log(index);
    let nth = $('#tabela td:nth-child(' + (index + 1).toString() + ')'); // seleciona todos os filhos que os n-filhos do campo produto.nome
    let valor = $(this).val().toUpperCase(); // transforma o conteúdo do input para letras maiúsculas
    $('#tabela tbody tr').show(); // exibe na tela as linhas da tabela
    $(nth).each(function () {
      // percorre a tabela para procurar o texto digitado
      if ($(this).text().toUpperCase().indexOf(valor) < 0) {
        // percorrendo a tabela e não encontrando -> indexOf retorna -1
        $(this).parent().hide();
      }
    });
  });
  $('#tabela input').blur(function () {
    $(this).val('');
  });
});
