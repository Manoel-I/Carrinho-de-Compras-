//fazer uma tela tipo um mercado/ com carrinho de compra/
//tela de itens por categoria ao clicar na categoria abre as informaçoes dos produtos
//e quando clicar nos produtos eles vão para o carrinho de compras.



var mercado = 
    {camiseta:[
    {"pk":"1","estampa":"Hulk","tamanho":"M","preco":"20,00","categoria":"camiseta"},
    {"pk":"2","estampa":"Goku","tamanho":"M","preco":"40,00","categoria":"camiseta"},
    {"pk":"3","estampa":"Vegeta","tamanho":"G","preco":"100,00","categoria":"camiseta"}],
    bermuda:[
    {"pk":"4","estampa":"Simpsom","tamanho":"M","preco":"20,00","categoria":"bermuda"},
    {"pk":"5","estampa":"Pica Pau","tamanho":"M","preco":"40,00","categoria":"bermuda"},
    {"pk":"6","estampa":"Power Ranger","tamanho":"G","preco":"100,00","categoria":"bermuda"}],
    meia:[
    {"pk":"7","estampa":"Naruto","tamanho":"M","preco":"20,00","categoria":"meia"},
    {"pk":"8","estampa":"Irmão Jorel","tamanho":"M","preco":"40,00","categoria":"meia"},
    {"pk":"9","estampa":"Rick And Morty","tamanho":"G","preco":"100,00","categoria":"meia"}]
};

var containerInicial = document.createElement("div") ; 
document.body.appendChild(containerInicial) ;
var escolha = document.createElement("select");
escolha.classList.add("escolha");
var carrinho = document.createElement("div");
containerInicial.appendChild(carrinho);
carrinho.classList.add("carrinho");
carrinho.addEventListener("click", abrirCarrinho);   
carrinho.addEventListener("drop", drop);
carrinho.addEventListener("dragover", allowDrop);
var pp = document.createElement("p");
carrinho.appendChild(pp);
pp.innerText = "Carrinho";
var telaCarrinho = document.createElement("div");
telaCarrinho.classList.add("telaCarrinho");
var categorias = ["camiseta", "bermuda", "meia"];
var itensCarrinho = Array();
var loja = document.createElement("div");
var escolha1 = document.createElement("div");
containerInicial.appendChild(escolha1);
escolha1.classList.add("escolha");
var id = Array();
var contadorCarrinho = 0;
var arrastado;

if(escolha1.querySelector("select.escolha")== null){
    gerarSelect();
}else{
     escolha1.removeChild(escolha);
     }

function allowDrop() {
    event.preventDefault();
}

function drop() {
    var nomeProduto = arrastado;
    var x = nomeProduto;
    var y = x.toString();
    var z = y.slice(0, 1); 
    for(var a in mercado){
        for(var b = 0; b < mercado[a].length; b++){
            if(mercado[a][b].pk === z){
                var receptora = mercado[a][b];
                receptora.id = contadorCarrinho;
                var newjson = JSON.stringify(receptora);
                itensCarrinho.push(JSON.parse(newjson));
                qtdCarrinho();
            }
        }
    }
}

//cria o select das categorias
function gerarSelect(){
    escolha1.appendChild(escolha);
    var opcaoSelecionar = document.createElement("option");
    escolha.appendChild(opcaoSelecionar)
    opcaoSelecionar.innerText = "SELECIONAR";
    for(var i = 0; i < 3 ; i++){ 
        var opcoes = document.createElement("option");
        opcoes.innerText = categorias[i];
        escolha.appendChild(opcoes);
        escolha.addEventListener("click", selecaoCategoria);
    }
}

var containerInfoItens = document.createElement("div");
containerInicial.appendChild(containerInfoItens);

function remover(){
    while(containerInfoItens.firstChild){
        containerInfoItens.removeChild(containerInfoItens.lastChild);
    }
}

carrinho.innerText = "Carrinho"+"("+0+")";
function selecaoCategoria (){
    remover();
    abrirOpcoes();
    carrinho.innerText = "Carrinho "+ "("+qtd+")";  

    if(containerInicial.querySelector("escolha1.escolha")==null){
        containerInicial.appendChild(escolha1);
    }
    if(escolha1.querySelector("select")){
        escolha1.appendChild(escolha);
    }
    if(containerInicial.querySelector("div.loja")){
        containerInicial.removeChild(loja);
    }
    while(telaCarrinho.firstChild){
        telaCarrinho.removeChild(telaCarrinho.lastChild);
    }
    for(var j in mercado){
        for(var k = 0; k < mercado[j].length; k++){
            if(mercado[j][k].categoria == escolha.value){
                var escolhasPorCategorias = document.createElement("div");
                containerInfoItens.appendChild(escolhasPorCategorias);
                escolhasPorCategorias.setAttribute("draggable", "true");
                escolhasPorCategorias.addEventListener("mouseover",function(){
                    arrastado = event.target.innerText;
                });
                escolhasPorCategorias.classList.add("itens");
                var botao = document.createElement("button");
                botao.classList.add("botao1");
                var pularLinha = document.createElement("br");
                if(mercado[j][k].estampa != undefined){
                    id = mercado[j][k].estampa; 
                }
                for(var l in mercado[j][k]){
                    escolhasPorCategorias.innerText += mercado[j][k][l];
                    escolhasPorCategorias.appendChild(botao);
                    escolhasPorCategorias.appendChild(pularLinha);
                    botao.addEventListener("click", adicionarCompra);
                    botao.addEventListener("click", qtdCarrinho);
                }
                botao.innerText = "add to cart " + id;
            }
        }
    }
    if(textos.childElement == h){
        textos.removeChild(h);
    }
    carrinho.addEventListener("click", abrirCarrinho);

    containerInicial.appendChild(carrinho);
    totalCompra = 0;
    contador = 0; 
}

var qtd = 0;

function qtdCarrinho(){
    qtd++;
    carrinho.innerText ="Carrinho " +" ("+qtd+")";
}

  
function adicionarCompra(){
    var x = event.target.innerText;
    var y = x.slice(12);
    contadorCarrinho++;
    for(var a in mercado){
        for(var b = 0; b < mercado[a].length; b++){
            if(mercado[a][b].estampa === y){
                var receptora = mercado[a][b];
                receptora.id = contadorCarrinho;
                var newjson = JSON.stringify(receptora);
                itensCarrinho.push(JSON.parse(newjson));
            }
        }
    }
}

var br = document.createElement("br");
var totalCompra = 0;
var h = document.createElement("h1");
h.classList.add("textoCarrinho");
h.innerText = "CARRINHO";
var hValor = document.createElement("h2");
hValor.classList.add("textoValor");
var textos = document.createElement("div");
var contador = 0;
var divDesconto = document.createElement("div");
var hDesconto = document.createElement("h2");
hDesconto.classList.add("textoDesconto");
var hDesconto2 = document.createElement("h2");
hDesconto2.classList.add("textoDesconto2");
var inputDesconto = document.createElement("input");
inputDesconto.classList.add("inputDesconto");
inputDesconto.setAttribute("type", "number");
var porcentagemDesconto = inputDesconto.value;

function descontos(){
    telaCarrinho.appendChild(divDesconto);
    divDesconto.appendChild(hDesconto);
    divDesconto.appendChild(inputDesconto);
    divDesconto.appendChild(hDesconto);
    divDesconto.appendChild(hDesconto2);
}

function ajusteDesconto(){ 
    porcentagemDesconto = inputDesconto.value;
    
    if(porcentagemDesconto < 0 || porcentagemDesconto > 100){
        hDesconto.innerText = "Valor Não Permitido";
    }else{
        let resultadoDesconto = totalCompra*porcentagemDesconto/(100);
        resultadoDesconto = totalCompra - resultadoDesconto;
        resultadoDesconto = resultadoDesconto.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        hDesconto.innerText = "Total com Desconto de "+porcentagemDesconto +"% : "+ resultadoDesconto; 
    }
}



function abrirCarrinho(){
    ajusteDesconto();
    carrinho.removeEventListener("click", abrirCarrinho);
    carrinho.addEventListener("click", abrirLoja);
    carrinho.innerText = "Carrinho"+"("+qtd+")";
    descontos();
    remover();
    containerInicial.appendChild(telaCarrinho);
    telaCarrinho.appendChild(textos);
    textos.appendChild(h);
    hDesconto2.innerText = "Digite o desconto em %: ";
    inputDesconto.addEventListener("keyup", ajusteDesconto);
    if(escolha1.firstChild){   
        escolha1.removeChild(escolha);
    }
    if(containerInicial.querySelector(".escolha")!= null){
        containerInicial.removeChild(escolha1);
    }
    textos.appendChild(hValor);
    totalCompra = 0.0; 
     for(var i = 0; i < itensCarrinho.length;i++){
        descricao = document.createElement("p");
        telaCarrinho.appendChild(descricao);
        criarBotao();     
        for(var j in itensCarrinho[i]){
            descricao.innerText += itensCarrinho[i][j] + ' - ';
            telaCarrinho.appendChild(descricao);
        }
        totalCompra += parseFloat(itensCarrinho[i].preco);
        contador++;
    }
    totalCompra.toFixed(2);
    var resultadoTotal = totalCompra.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    hValor.innerText ="Total: "+ resultadoTotal;
    contadorBotao = 0; 
    abrirLoja(); 
}


function abrirLoja(){
    ajusteDesconto();
    carrinho.removeEventListener("click", abrirLoja);
    carrinho.innerText = "Loja";
    carrinho.addEventListener("click", selecaoCategoria);
}


function abrirOpcoes(){
    if(escolha1.querySelector("select.escolha") == null){
        escolha1.appendChild(escolha);
    }
}
var contadorBotao = 0;

function criarBotao(){
    botaoRemover = document.createElement("button");
    botaoRemover.classList.add("botaoRemover");
    botaoRemover.innerText = "remover "+ contadorBotao;
    telaCarrinho.appendChild(botaoRemover);
    botaoRemover.addEventListener("click", removerItem);
    contadorBotao++;
}

function removerItem(){
    var x = event.target.innerText;
    var y = x.toString();
    var z = y.slice(8);
    itensCarrinho.splice(z, 1);
    qtd--; 
    while(telaCarrinho.firstChild){
        telaCarrinho.removeChild(telaCarrinho.lastChild);
    }
    abrirCarrinho(); 
    ajusteDesconto();
}




