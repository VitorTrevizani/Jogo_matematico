let temp = true
let id = null
let respostaCerta = 0
let acertos = 0;
let cardResultado = 0
let alternativas = document.getElementsByClassName("altern");
let start = document.getElementById("start");
let dificuldade = document.getElementById("dificuldade").value;
let tentativas = 0;
let limite = 0;



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



function cria_interface(){

    let cronometro
    
    document.getElementById("infoTent").innerHTML = tentativas;

    let card1 = Math.trunc(((Math.random()) * limite));
    let card2 =  Math.trunc(((Math.random()) * limite)); 
    document.getElementById("card1").innerHTML = card1;
    document.getElementById("card2").innerHTML = "+ " + card2;
    cardResultado = Math.trunc(Math.random() * (3 - 0 + 1)) + 0;
    temp = true

    for(let i=0; i < alternativas.length; i++){
        
        if(dificuldade === "facil"){           
            cronometro = 10
            if(i == cardResultado){
                alternativas[i].innerHTML = card1 + card2;
                respostaCerta = alternativas[i];
            }
            else{
                alternativas[i].innerHTML = Math.trunc(((Math.random()) * limite));
            }
        }

        else if(dificuldade === "medio"){           
            cronometro = 8
            if(i == cardResultado){
                alternativas[i].innerHTML = card1 + card2;
                respostaCerta = alternativas[i];
            }
            else{
                alternativas[i].innerHTML = Math.trunc(((Math.random()) * limite));
            }
        }

        else if(dificuldade === "dificil"){ 
            cronometro = 6
            if(i == cardResultado){
                alternativas[i].innerHTML = card1 + card2;
                respostaCerta = alternativas[i];
            }
            else{
                alternativas[i].innerHTML = Math.trunc(((Math.random()) * limite));
            }
        }

        else{
            cronometro = 5
            if(i == cardResultado){
                alternativas[i].innerHTML = card1 + card2;
                respostaCerta = alternativas[i];
            }
            else{
                alternativas[i].innerHTML = Math.trunc(((Math.random()) * limite));
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
                document.getElementById("infoTemp").innerHTML = cronometro;
                tentativas--;
                if(tentativas <= 0){ // fazer o botão de start voltar, e resetar os valores dos cards;
                    enviarPontuacao(acertos, dificuldade)
                    acertos = 0;
                    document.getElementById("start").style.display = "block";
                    for(let i=0; i < alternativas.length; i++){
                        alternativas[i].innerHTML = "0000";
                    }
                    document.getElementById("card1").innerHTML = "0000";
                    document.getElementById("card2").innerHTML = "0000";
                        
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

                    document.getElementById("infoTent").innerHTML = tentativas;
                    temp = false;
                }
                else{
                cria_interface()
                return
                }    
            }
            document.getElementById("infoTemp").innerHTML = cronometro;
            cronometro -- ;
            
        }, 1000); // 1000 milissegundos = 1 segundo
    }

}





start.addEventListener("click", () => {
     document.getElementById("start").style.display = "none";

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







for(let i=0; i<alternativas.length; i++){
    alternativas[i].addEventListener("click", () => {
        clearInterval(id)
        if(alternativas[i] == respostaCerta){
            acertos++;
            cria_interface();
        }
        else{
            tentativas --;
            if(tentativas == 0){ // fazer o botão de start voltar, e resetar os valores dos cards;
                enviarPontuacao(acertos, dificuldade)
                acertos = 0
                document.getElementById("start").style.display = "block";
                for(let i=0; i < alternativas.length; i++){
                    alternativas[i].innerHTML = "0000";
                }
                document.getElementById("card1").innerHTML = "0000";
                document.getElementById("card2").innerHTML = "0000";
                    
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

                document.getElementById("infoTent").innerHTML = tentativas;
                
            }
            else{
                cria_interface();
            }
        }

        
    })
}
    

    
   



