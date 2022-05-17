class Produto {
  constructor() {
    this.id = 1;
    // this.nomeProduto = '';
    // this.valor = 0;
    this.arrayProdutos = [];

    //propriedade para testar qual método deve ser executado pelo botão btn1
    this.testeBtn = 0;

    let foto = document.getElementById('imgFoto');
    let file = document.getElementById('flImage');

    file.addEventListener('change', e => {
      let leitor = new FileReader();

      leitor.onload = () => {
        foto.src = leitor.result;
      };
      leitor.readAsDataURL(file.files[0]);
    });
  }
  salvar() {
    // alert('vamos salvar');
    let produto = this.lerDados();
    if (this.validarCampos(produto)) {
      //alert('Podemos salvar');
      if (this.testeBtn == 0) {
        this.adicionar(produto);
      } else {
        this.atualizar(this.testeBtn);
      }
      this.listarDados();
      this.cancelar();
    }
    console.log(this.arrayProdutos);

    // this.cancelar();
  }
  listarDados() {
    let tbody = document.getElementById('tbody');
    //resetar a lista quando salvar um novo produto
    tbody.innerText = '';
    for (let i = 0; i < this.arrayProdutos.length; i++) {
      let newTR = tbody.insertRow();
      let td_id = newTR.insertCell();
      let td_nome = newTR.insertCell();
      let td_valor = newTR.insertCell();
      let td_acoes = newTR.insertCell();

      td_id.innerText = this.arrayProdutos[i].id;
      td_nome.innerText = this.arrayProdutos[i].nome;
      td_valor.innerText = this.arrayProdutos[i].valor;

      td_id.classList.add('center');
      td_acoes.classList.add('center');

      let imgEdit = document.createElement('img');
      imgEdit.src = 'assets/edit.png';
      td_acoes.appendChild(imgEdit);

      let imgDelet = document.createElement('img');
      imgDelet.src = 'assets/delete.png';
      td_acoes.appendChild(imgDelet);

      imgDelet.setAttribute(
        'onclick',
        'produto.deletar(' + this.arrayProdutos[i].id + ')'
      );

      imgEdit.setAttribute(
        'onclick',
        'produto.mostrarDados(' + JSON.stringify(this.arrayProdutos[i]) + ')'
      );
    }
  }
  adicionar(produto) {
    this.arrayProdutos.push(produto);
    this.id++;
  }
  cancelar() {
    document.getElementById('nomeProduto').value = '';
    document.getElementById('valorProduto').value = '';

    document.getElementById('btn1').innerText = 'Salvar';
    this.testeBtn = 0;

    // alert('vamos cancelar');
  }
  lerDados() {
    let produto = {};
    produto.nome = document.getElementById('nomeProduto').value;
    produto.valor = document.getElementById('valorProduto').value;
    produto.id = this.id;
    return produto;
  }
  validarCampos(produto) {
    let msg = '';
    if (produto.nome == '') {
      msg += '- informe o nome do produto \n';
    }
    if (produto.valor == '') {
      msg += '- informe o valor do produto \n';
    }
    if (msg != '') {
      alert(msg);
      return false;
    }
    return true;
  }
  deletar(idProcurado) {
    // alert('Vamos deletar o produto de ID: ' + idProcurado);
    if (confirm('Deseja realmente deletar o produto do id: ' + idProcurado)) {
      for (let i = 0; i < this.arrayProdutos.length; i++) {
        if (this.arrayProdutos[i].id == idProcurado) {
          this.arrayProdutos.splice(i, 1);
          tbody.deleteRow(i);
        }
      }

      // this.produto.splice(idProcurado, 0);
      // this.listarDados();
    }
  }
  mostrarDados(dados) {
    // console.log(dados);
    document.getElementById('nomeProduto').value = dados.nome;
    document.getElementById('valorProduto').value = dados.valor;

    document.getElementById('btn1').innerText = 'Atualizar';
    this.testeBtn = dados.id;
  }
  atualizar(id) {
    // alert('Atualiza');

    for (let i = 0; i < this.arrayProdutos.length; i++) {
      if (id == this.arrayProdutos[i].id) {
        this.arrayProdutos[i].nome =
          document.getElementById('nomeProduto').value;
        this.arrayProdutos[i].valor =
          document.getElementById('valorProduto').value;
      }
    }

    document.getElementById('btn1').innerText = 'Salvar';

    this.testeBtn = 0;
  }
}

var produto = new Produto();

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
    let index = $('this').parent().index();
    console.log(index);
    let nth = $('#tabela td:nth-child(' + (index + 1).toString() + ')');

    let valor = $(this).val().toUpperCase();
    $('#tabela tbody tr').show();
    $(nth).each(function () {
      if ($(this).text().toUpperCase().indexOf(valor) < 0) {
        $(this).parent().hide();
      }
    });
  });
  $('#tabela input').blur(function () {
    $(this).val('');
    $('#tabela tbody tr').show();
  });
});
