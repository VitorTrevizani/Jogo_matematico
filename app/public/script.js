let temp = true
let id = null
let respostaCerta = 0
let acertos = 0;
let cardResultado = 0
let alternativas = document.getElementsByClassName("altern");
let start = document.getElementById("start");
let stop = document.getElementById("stop");
let dificuldade = document.getElementById("dificuldade").value;
let tentativas = 0;
let limite = 0;
let infoTent = document.getElementById("infoTent");
let infoTemp = document.getElementById("infoTemp");
let card1 = document.getElementById("card1");
let card2 = document.getElementById("card2");




// Pega o valor do input hidden
const userId = document.getElementById('userId').value;

// Exemplo de uso: enviar junto com a pontuação
function enviarPontuacao(score, dificuldade) {
  fetch('/gameplay/acertos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, score, dificuldade })
  })
  .then(res => res.json())
  .then(data => console.log(data.message))
  .catch(err => console.error(err));
}



function avisar(elemento){
       elemento.classList.toggle("avisar");
    setTimeout(() => {
       elemento.classList.toggle("avisar");
    }, 1500)  
}



function cria_interface(){
    
    let cronometro

    infoTent.innerHTML = tentativas;

    let card1Content = Math.trunc(((Math.random()) * limite));
    let card2Content =  Math.trunc(((Math.random()) * limite)); 
    card1.innerHTML = card1Content;
    card2.innerHTML = "+ " + card2Content;
    cardResultado = Math.trunc(Math.random() * (3 - 0 + 1)) + 0;
    temp = true

    for(let i=0; i < alternativas.length; i++){
        
        if(dificuldade === "facil"){           
            cronometro = 10
            if(i == cardResultado){
                alternativas[i].innerHTML = card1Content + card2Content;
                respostaCerta = alternativas[i];
            }
            else{
                let operacao = card1Content + card2Content;
                alternativas[i].innerHTML = Math.random() >= 0.5? Math.trunc((Math.random() * 10) + operacao) : operacao - Math.trunc((Math.random() * 10));
            }
        }

        else if(dificuldade === "medio"){           
            cronometro = 8
            if(i == cardResultado){
                alternativas[i].innerHTML = card1Content + card2Content;
                respostaCerta = alternativas[i];
            }
            else{
                operacao = card1Content + card2Content;
                alternativas[i].innerHTML = Math.random() > 0.5? Math.trunc((Math.random() * 10) + operacao) : operacao - Math.trunc((Math.random() * 10));
            }
        }

        else if(dificuldade === "dificil"){ 
            cronometro = 6
            if(i == cardResultado){
                alternativas[i].innerHTML = card1Content + card2Content;
                respostaCerta = alternativas[i];
            }
            else{
                operacao = card1Content + card2Content;
                alternativas[i].innerHTML = Math.random() > 0.5? Math.trunc((Math.random() * 10) + operacao) : operacao - Math.trunc((Math.random() * 10));
            }
        }

        else{
            cronometro = 5
            if(i == cardResultado){
                alternativas[i].innerHTML = card1Content + card2Content;
                respostaCerta = alternativas[i];
            }
            else{
                operacao = card1Content + card2Content;
                alternativas[i].innerHTML = Math.random() > 0.5? Math.trunc((Math.random() * 10) + operacao) : operacao - Math.trunc((Math.random() * 10));
            }
        }
    }

    //função do tempo
    
    if(temp == true){

        if(id != null){
          clearInterval(id)
        }

        
        id = setInterval(function() {
            if(cronometro <= 0){
                clearInterval(id);
                cronometro = 0;
                infoTemp.innerHTML = cronometro;
                tentativas--;
                avisar(infoTent.parentNode);
                if(tentativas <= 0){ // fazer o botão de start voltar, e resetar os valores dos cards;
                    enviarPontuacao(acertos, dificuldade)
                    acertos = 0;
                    start.style.display = "block";
                    stop.style.display = "none";
                    for(let i=0; i < alternativas.length; i++){
                        alternativas[i].innerHTML = "0000";
                    }
                    card1.innerHTML = "0000";
                    card2.innerHTML = "0000";
                        
                    if(dificuldade === "facil"){
                        tentativas = 7;
                    }

                    else if(dificuldade === "medio"){
                        tentativas = 5;
                    }

                    else if(dificuldade === "dificil"){
                        tentativas = 3;
                    }

                    else{
                        tentativas = 3;
                    }

                    infoTent.innerHTML = tentativas;
                    temp = false;
                }
                else{
                cria_interface()
                return
                }    
            }
            infoTemp.innerHTML = cronometro;
            cronometro -- ;
            
        }, 1000); // 1000 milissegundos = 1 segundo
    }
  

}





start.addEventListener("click", () => {

    start.style.display = "none";
    stop.style.display = "block";

    if (dificuldade === "facil"){
        tentativas = 7;
        limite = 100;
    }
    else if (dificuldade === "medio"){
        tentativas = 5;
        limite = 100
    }
    else if (dificuldade === "dificil"){
        tentativas = 3;
        limite = 1000
    }
    else{
        tentativas = 3;
        limite = 10000
    }

    cria_interface();
});



stop.addEventListener("click", () => {

    clearInterval(id)
    enviarPontuacao(acertos, dificuldade)

    acertos = 0;
    start.style.display = "block";
    stop.style.display = "none";
    for(let i=0; i < alternativas.length; i++){
        alternativas[i].innerHTML = "0000";
    }
    card1.innerHTML = "0000";
    card2.innerHTML = "0000";
        
    if(dificuldade === "facil"){
        tentativas = 7;
    }

    else if(dificuldade === "medio"){
        tentativas = 5;
    }

    else if(dificuldade === "dificil"){
        tentativas = 3;
    }

    else{
        tentativas = 3;
    }

    infoTent.innerHTML = tentativas;
    infoTemp.innerHTML = 0;

})







for(let i=0; i<alternativas.length; i++){
    alternativas[i].addEventListener("click", () => {
        clearInterval(id)
        if(alternativas[i] == respostaCerta){
            acertos++;
            cria_interface();
        }
        else{
            tentativas --;
            avisar(infoTent.parentNode);
            if(tentativas == 0){ // fazer o botão de start voltar, e resetar os valores dos cards;
                enviarPontuacao(acertos, dificuldade)
                acertos = 0
                start.style.display = "block";
                stop.style.display = "none";
                for(let i=0; i < alternativas.length; i++){
                    alternativas[i].innerHTML = "0000";
                }
                card1.innerHTML = "0000";
                card2.innerHTML = "0000";
                    
                if(dificuldade === "facil"){
                    tentativas = 7;
                }

                else if(dificuldade === "medio"){
                    tentativas = 5;
                }

                else if(dificuldade === "dificil"){
                    tentativas = 3;
                }

                else{
                    tentativas = 3;
                }

                infoTent.innerHTML = tentativas;
                
            }
            else{
                cria_interface();
            }
        }

        
    })
}
    

    

window.addEventListener("beforeunload", function (event) {
  if(start.style.display == "none"){
    // Mensagem padrão 
    event.preventDefault();
    event.returnValue = "";
  }
});




