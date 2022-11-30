
window.onload = async () => {//mapeando a serviceWorker
    "use strict";   
    api()
    if("serviceWorker" in navigator){
        navigator.serviceWorker.register("./sw.js");
    }
};

async function api(){
    const response = await fetch("http://localhost:5001/")
    const data = await response.json();
    const result = document.getElementById("result")
 
    console.log(data)
 
    data.map((product) => {
     result.innerHTML += `<div id="produtos">
 
     <h2>${product.titulo}</h2>
    <h2>R$ ${product.preco},00</h2>
     <h3>${product.descricao}</h3>
     <br/> <img id="img" width="300px" src=${product.imagem}></img>

      </div>`
    })
    
    
 
 }

let posicaoInicial;//variavel para capturar a posicao
const capturarLocalizacao = document.getElementById('localizacao');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');
const map = document.getElementById('mapa');

const sucesso = (posicao) => {//callback de sucesso para captura da posicao
    posicaoInicial = posicao;
    latitude.innerHTML = posicaoInicial.coords.latitude;
    longitude.innerHTML = posicaoInicial.coords.longitude;
};

const erro = (error) => {//callback de error (falha para captura de localizacao)
    let errorMessage;
    switch(error.code){
        case 0:
            errorMessage = "Erro desconhecido"
        break;
        case 1:
            errorMessage = "Permissão negada!"
        break;
        case 2:
            errorMessage = "Captura de posição indisponível!"
        break;
        case 3:
            errorMessage = "Tempo de solicitação excedido!" 
        break;
    }
    console.log('Ocorreu um erro: ' + errorMessage);
};

capturarLocalizacao.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(sucesso, erro);

    map.src = "http://maps.google.com/maps?q="+ posicaoInicial.coords.latitude+"," + posicaoInicial.coords.longitude +"&z=16&output=embed"

});
