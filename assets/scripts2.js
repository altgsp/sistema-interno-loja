

class Produto{

    constructor(){
        this.id = 1;
        //this.nomeProduto = "";
        //this.valor = 0;

        this.arrayProdutos =[];
        this.editId = null;
        this.verificaFoto = true;
        //this.foto = "";

        let foto = document.getElementById("imgFoto");
        let arquivo = document.getElementById("flImage");

        // let foto = $("#imgFoto");
        //let arquivo = $("#flImage");

        
        arquivo.addEventListener("change", (e) =>{
          
                    
            let leitor = new FileReader();

            leitor.onload = () =>{
              foto.src = leitor.result;
            }
            leitor.readAsDataURL(arquivo.files[0]);
          
            
          
          
        } )

        
        
    }

    //********************** AÇÃO NÚMERO 0 *******************************************************/
    salvar(){
        //alert("vamos adicionar um produto");
        //this.lerDados();

        let produto = this.lerDados();  
        if(this.validaCampos(produto)){
            if(this.editId == null){
                this.adicionar(produto);
            }else{
                console.log(produto);
                this.atualizar(this.editId);
            }
        }
        this.listaTabela();
        this.cancelar();
        console.log(this.arrayProdutos);
        localStorage.setItem("meusProdutos", JSON.stringify(this.arrayProdutos));
    }

    //********************** AÇÃO NÚMERO 04 *******************************************************/
    listaTabela(){
        let tbody = document.getElementById("tbody");

                tbody.innerText = "";
        
        for(let i = 0; i < this.arrayProdutos.length; i++){

            let newTr = tbody.insertRow();

            let td_id = newTr.insertCell();
            let td_nome = newTr.insertCell();
            let td_valor = newTr.insertCell();
            let td_acoes = newTr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_nome.innerText = this.arrayProdutos[i].nome;
            td_valor.innerText = this.arrayProdutos[i].valor;

            td_id.classList.add("center");
            td_acoes.classList.add("center");

            let imgEdit = document.createElement("img");
            imgEdit.src = "img/edit.png"

            imgEdit.setAttribute("onclick","produto.preparaEdicao("+JSON.stringify(this.arrayProdutos[i]) + ")");

            let imgDelete = document.createElement("img");
            imgDelete.src = "img/delete.png"

            imgDelete.setAttribute("onclick","produto.deletar("+this.arrayProdutos[i].id+")");
            
            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);

        }
    }

    //********************** AÇÃO NÚMERO 03 *******************************************************/
    adicionar(produto){
        this.arrayProdutos.push(produto);
        $("#flImage").val("");
        this.id++;
    }

    preparaEdicao(dados){
        //alert(dados.id);

        this.editId = dados.id;
        document.getElementById("nomeProduto").value = dados.nome;
        document.getElementById("valorProduto").value = dados.valor;

        let foto = document.getElementById("imgFoto");
        if(dados.foto == "undefined"){
          foto.src="img/camera.png";
        }else{
          foto.src = dados.foto;
        }
        
        document.getElementById("btn1").innerText = "Atualizar";
    }

    atualizar(id){
        //alert(id);

        for(let i=0; i < this.arrayProdutos.length; i++){
            if(id == this.arrayProdutos[i].id){
                this.arrayProdutos[i].nome = document.getElementById("nomeProduto").value;
                this.arrayProdutos[i].valor = document.getElementById("valorProduto").value
                
                if($("#flImage").val() != ""){
                    let nomeDoArquivo = $("#flImage")[0].files[0].name;
                    this.arrayProdutos[i].foto = "img/" + nomeDoArquivo;
                }
            }
        }

        this.editId = null;
        $("#flImage").val("");
    }

    //********************** AÇÃO NÚMERO 01 *******************************************************/
    lerDados(){
        //alert("ler Dados");

        let produto = {};

        produto.id = this.id;
        produto.nome = document.getElementById("nomeProduto").value;
        produto.valor = document.getElementById("valorProduto").value;

        if($("#flImage").val() != ""){
          let nomeDoArquivo = $("#flImage")[0].files[0].name;
          produto.foto = "img/" + nomeDoArquivo;
        }else{
        produto.foto = "img/camera.png";
          this.verificaFoto = true;
        }
       
        let foto = document.getElementById("imgFoto");
        foto.src = "img/camera.png";

             

        return produto;

    }

    //********************** AÇÃO NÚMERO 02 *******************************************************/
    validaCampos(produto){

        let msg = "";

        if(produto.nome == ""){
            msg += "- informe o nome do produto \n";
        }
        if(produto.valor == ""){
            msg += "- informe o preço do produto \n";
        }
        if(msg != ""){
            alert(msg);
            return false;
        }

        return true;

    }
    
    //********************** AÇÃO NÚMERO 05 *******************************************************/
    cancelar(){
        //alert("produto deletado");

        document.getElementById("nomeProduto").value = "";
        document.getElementById("valorProduto").value = "";

                document.getElementById("btn1").innerText = "Salvar";
                this.editId = null;
    }

    deletar(idProcurado){
        //alert("Vamos deletar o id: " + id);

        //console.log(this.arrayProdutos);

        if(confirm("Deseja realmente deletar o produto ID: " + idProcurado)){
            let tbody = document.getElementById("tbody");

            for(let i=0; i < this.arrayProdutos.length; i++){
                if(this.arrayProdutos[i].id == idProcurado){
                    this.arrayProdutos.splice(i,1);
                    tbody.deleteRow(i);
                }
            }
            localStorage.setItem("meusProdutos", JSON.stringify(this.arrayProdutos));
        }
        //console.log(this.arrayProdutos);

    }
}

var produto = new Produto();

function exibeCards(){
  //window.open("listaProdutos.html","_self");
  criarLista();
  meusProdutos = JSON.parse(localStorage.getItem("meusProdutos"));
  console.log(meusProdutos);

 
      for(i=0; i<meusProdutos.length; i++){
        //let coluna = document.createElement('div');
        let cardEl = document.createElement('div');
        let id = document.createAttribute('id');
        let imagem = document.createElement('img');
        let nomeProduto = document.createElement('h5');
        let valor = document.createElement('p');
        let botao = document.createElement('button');
    
        //coluna.classList.add("col-lg-3", "col-md-6", "col-sm-12", "linha");
        //document.querySelector("#linhaProdutos").appendChild(coluna);

        cardEl.classList.add('card',"col-lg-3", "col-md-6", "col-sm-12", "meuCard","p-2");
        id.value = "card" + meusProdutos[i].id;
        cardEl.setAttributeNode(id);
       
        document.querySelector("#linhaProdutos").appendChild(cardEl);
    
        imagem.classList.add('card-img-top');
        imagem.src = meusProdutos[i].foto;
        imagem.style.width = '200px';
        document.getElementById("card"+ meusProdutos[i].id).appendChild(imagem);
    
        nomeProduto.classList.add('card-title');
        nomeProduto.innerHTML = meusProdutos[i].nome;
        document.querySelector("#card" + meusProdutos[i].id).appendChild(nomeProduto);
    
        valor.classList.add('card-text');
        valor.innerText = "R$ " + parseFloat(meusProdutos[i].valor).toFixed(2);
        document.querySelector("#card" + meusProdutos[i].id).appendChild(valor);
    
        //botao.href = "#";
        botao.classList.add('btn', 'btn-primary');
        botao.innerHTML = "Comprar Produto";
        botao.setAttribute("onclick","adicionarCarrinho(" + JSON.stringify(meusProdutos[i]) + ")");
        //imgEdit.setAttribute("onclick","produto.preparaEdicao("+JSON.stringify(this.arrayProdutos[i]) + ")");
        document.querySelector("#card" + meusProdutos[i].id).appendChild(botao);
       
      }
    
}

function criarLista(){
  var listaCarrinhoVazia = [];
  localStorage.setItem("produtosCarrinho1", JSON.stringify(listaCarrinhoVazia));
  
}

//
function adicionarCarrinho(produtos){
  alert(produtos.id);
  console.log(produtos);
  //listaCarrinhoPopulada = JSON.parse(localStorage.getItem("produtosCarrinho1"));
  listaCarrinhoPopulada.push(produtos);
  console.log(listaCarrinhoPopulada);
  localStorage.setItem("produtosCarrinho2", JSON.stringify(listaCarrinhoPopulada));
  
}

function exibeCarrinho(){

  meusProdutos = JSON.parse(localStorage.getItem("meusProdutos"));
  //meusProdutosCarrinho = JSON.parse(localStorage.getItem("produtosCarrinho2"));
  //console.log(meusProdutosCarrinho);
  //alert("testando Carrinho");
  //criação da linha da lista
  for(i=0; i<meusProdutos.length; i++){
    let itemLista = document.createElement('li');
    //criação do id para essa linha da lista
    let idItemLista = document.createAttribute('id');

    itemLista.classList.add("list-group-item", "py-3", "my-2");
    idItemLista.value = "item" + i;
    itemLista.setAttributeNode(idItemLista);
    document.querySelector("#listaCarrinho").appendChild(itemLista);
    
    //**************************************************************/

    //criação de um div dentro do li (linha class row)
    let linhaRow = document.createElement('div');
    let idLinhaRow = document.createAttribute('id');

    linhaRow.classList.add("row", "g-3", "my-2");
    idLinhaRow.value = "linha" + i;
    linhaRow.setAttributeNode(idLinhaRow);
    document.getElementById("item" + i).appendChild(linhaRow);

    //**************************************************************/

    //criação da coluna onde vai a imagem 

    let colunaImagem = document.createElement('div');
    let idColunaImagem = document.createAttribute('id');

    colunaImagem.classList.add("col-4", "col-md-3", "col-lg-2");
    idColunaImagem.value = "divImagem" + i;
    colunaImagem.setAttributeNode(idColunaImagem);
    document.getElementById("linha" + i).appendChild(colunaImagem);

    //**************************************************************/

    //criação da imagem do produto
    let imagem = document.createElement('img');
    
    imagem.classList.add("img-thumbnail");
    imagem.src = meusProdutos[i].foto;
    document.getElementById("divImagem" + i).appendChild(imagem); 

    //**************************************************************/

    //criação da coluna onde vai o texto do produto 

    let colunaTexto = document.createElement('div');
    let idColunaTexto = document.createAttribute('id');

    colunaTexto.classList.add("col-8", "col-md-9", "col-lg-7", "col-xl-8", "text-start", "align-self-center");
    idColunaTexto.value = "divTexto" + i;
    colunaTexto.setAttributeNode(idColunaTexto);
    document.getElementById("linha" + i).appendChild(colunaTexto);

    //**************************************************************/

    //criação do texto do produto
    let nomeProduto = document.createElement('h5');
    let descProduto = document.createElement('h5');
    
    nomeProduto.classList.add("fs-3", "text", "fw-bold"); 
    descProduto.classList.add("fs-6", "text")
    nomeProduto.innerText = meusProdutos[i].nome;
    descProduto.innerText = "Frutas deliciosas da melhor qualidade e vindas diretas do produtor"
    document.getElementById("divTexto" + i).appendChild(nomeProduto);
    document.getElementById("divTexto" + i).appendChild(descProduto); 

    //**************************************************************/

    //criação da coluna onde vão os controles de preços

    let colunaControle = document.createElement('div');
    let idColunaControle = document.createAttribute('id');

    colunaControle.classList.add("col-6", "offset-6", "col-sm-6", "offset-sm6", "col-md-4", "offset-md-8", "col-lg-3", "offset-lg-0", "col-xl-2", "align-self-center", "mt-3");
    idColunaControle.value = "divControl" + i;
    colunaControle.setAttributeNode(idColunaControle);
    document.getElementById("linha" + i).appendChild(colunaControle);

    //**************************************************************/

    //criação da div onde vão os controles

    let divControle = document.createElement('div');
    let idDivControle = document.createAttribute('id');

    divControle.classList.add("input-group");
    idDivControle.value = "divControle" + i;
    divControle.setAttributeNode(idDivControle);
    document.getElementById("divControl" + i).appendChild(divControle);

    //**************************************************************/

    //criação do input para a quantidade de produto
    let quantidade = document.createElement('input');
    let tipoQuant = document.createAttribute('type');

    quantidade.classList.add("form-control", "text-center", "border-ark");
    tipoQuant.value = "number";
    quantidade.setAttributeNode(tipoQuant);
    document.getElementById("divControle" + i).appendChild(quantidade);
    
    //**************************************************************/

    //criação do botão de excluir produto
    let botaoExcluir = document.createElement('button');
    let idBotao = document.createAttribute('id');

    botaoExcluir.classList.add("btn", "btn-outline-danger", "border-dark", "btn-sm");
    idBotao.value = "btn" + i;
    botaoExcluir.setAttributeNode(idBotao);
    document.getElementById("divControle" + i).appendChild(botaoExcluir);

    //**************************************************************/

    //criação da imagem do botão de excluir produto
    let imgBotao = document.createElement('img');
    
    imgBotao.src = "img/delete.png";
    imgBotao.style.width = '20px';
    document.getElementById("btn" + i).appendChild(imgBotao);

    //**************************************************************/

    //criação da div onde vão os valores

    let divValores = document.createElement('div');
    let idDivValores = document.createAttribute('id');

    divValores.classList.add("mt-2", "text-end");
    idDivValores.value = "divValores" + i;
    divValores.setAttributeNode(idDivValores);
    document.getElementById("divControl" + i).appendChild(divValores);

    //****************************************************************/
    //criação do preço do produto
    let valorProduto = document.createElement('small');
    let idvalorProduto = document.createAttribute('id');

    valorProduto.classList.add("text-secondary");
    valorProduto.innerHTML = "Valor Kg: R$ 5,25 </br>"
    idvalorProduto.value = "valorProduto" + i;
    valorProduto.setAttributeNode(idvalorProduto);
    document.getElementById("divValores" + i).appendChild(valorProduto);

    //****************************************************************/
    //criação do totla do preço do produto
    let valorTotalProduto = document.createElement('span');
    let idvalorTotalProduto = document.createAttribute('id');

    valorTotalProduto.classList.add("text-dark");
    valorTotalProduto.innerHTML = "Valor Total: R$ 10,50"
    idvalorTotalProduto.value = "valorTotalProduto" + i;
    valorTotalProduto.setAttributeNode(idvalorTotalProduto);
    document.getElementById("divValores" + i).appendChild(valorTotalProduto);
  }
}

$(function(){
    $("#tabela input").keyup(function(){ //toda vez que alguma tecla for pressionada e solta entre nessa função
    let index = $(this).parent().index(); //pega o indíce da coluna a ser selecionada;
    console.log(index);
    let nth = $("#tabela td:nth-child("+(index+1).toString()+")");// seleciona todos os filhos que os n-filhos do campo produto.nome
    let valor = $(this).val().toUpperCase();// transforma o conteúdo do input para letras maiúsculas
    $("#tabela tbody tr").show();// exibe na tela as linhas da tabela
    $(nth).each(function(){ // percorre a tabela para procurar o texto digitado
      if($(this).text().toUpperCase().indexOf(valor) < 0) {// percorrendo a tabela e não encontrando -> indexOf retorna -1
        $(this).parent().hide();
      }
    });
  });
  $("#tabela input").blur(function(){
    $(this).val("");
  })
})
  


