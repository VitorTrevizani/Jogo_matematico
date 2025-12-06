

function cria_interface(){
    document.getElementById("infoTent").innerHTML = tentativas;
    
    let card1 = Math.trunc(((Math.random()) * 100));
    let card2 =  Math.trunc(((Math.random()) * 100)); 
    document.getElementById("card1").innerHTML = card1;
    document.getElementById("card2").innerHTML = "+ " + card2;
    cardResultado = Math.trunc(Math.random() * (3 - 0 + 1)) + 0;
    

    for(let i=0; i < alternativas.length; i++){
        
        if(estadoDific === "facil"){
            
            if(i == cardResultado){
                alternativas[i].innerHTML = card1 + card2;
                respostaCerta = alternativas[i];
            }
            else{
                alternativas[i].innerHTML = Math.trunc(((Math.random()) * 1000));
            }
        }

        else if(estadoDific === "medio"){
            
            if(i == cardResultado){
                alternativas[i].innerHTML = card1 + card2;
                respostaCerta = alternativas[i];
            }
            else{
                alternativas[i].innerHTML = Math.trunc(((Math.random()) * 1000));
            }
        }

        else if(estadoDific === "dificil"){
            
            if(i == cardResultado){
                alternativas[i].innerHTML = card1 + card2;
                respostaCerta = alternativas[i];
            }
            else{
                alternativas[i].innerHTML = Math.trunc(((Math.random()) * 100));
            }
        }

        else{
          
            if(i == cardResultado){
                alternativas[i].innerHTML = card1 + card2;
                respostaCerta = alternativas[i];
            }
            else{
                alternativas[i].innerHTML = Math.trunc(((Math.random()) * 100));
            }
        }
    }
}




const modos = document.getElementsByClassName("modo");
for(let i = 0; i < modos.length; i++){
    modos[i].addEventListener("click", () =>{
        if(modos[i].id === "ranqueado"){
            document.getElementById("escolha_modo").style.display = "none";
            document.getElementById("escolha_dificuldade").style.display = "grid";
        }
    });
}

let respostaCerta = 0
let estadoDific = "";
let tentativas = 0;


const dific = document.getElementsByClassName("dific");
for(let i = 0; i < dific.length; i++){
    dific[i].addEventListener("click", () => {

        document.getElementById("titulo").style.display = "none";
        document.getElementById("escolha_modo").style.display = "none";
        document.getElementById("escolha_dificuldade").style.display = "none";
        document.getElementsByTagName("main")[0].style.alignItems = "center";
        document.getElementById("game").style.display = "block";


        if(dific[i].id === "facil"){
            tentativas = 7;
            estadoDific = "facil";
        }
        else if(dific[i].id === "medio"){
            tentativas = 5;
            estadoDific = "medio";
        }
        else if(dific[i].id === "dificil"){
            tentativas = 3;
            estadoDific = "dificil";
        }
        else{
            tentativas = 3;
            estadoDific = "hard";
        }
    })
}


let acertos = 0;
let cardResultado = 0
let alternativas = document.getElementsByClassName("altern");
let start = document.getElementById("start");




start.addEventListener("click", () => {
        document.getElementById("start").style.display = "none";
        cria_interface();
        if(tentativas <= 0){
            if(estadoDific === "facil"){
                tentativas = 7;
            }

            else if(estadoDific === "medio"){
                tentativas = 5;
            }

            else if(estadoDific === "dificil"){
                tentativas = 3;
            }

            else{
                tentativas = 3;
            }
        }

});



for(let i=0; i<alternativas.length; i++){
    alternativas[i].addEventListener("click", () => {
        if(alternativas[i] == respostaCerta){
            acertos++;
            cria_interface();
        }
        else{
            tentativas --;
            if(tentativas == 0){ // fazer o botão de start voltar, e resetar os valores dos cards;
                document.getElementById("start").style.display = "block";
                for(let i=0; i < alternativas.length; i++){
                    alternativas[i].innerHTML = "0000";
                }
                document.getElementById("card1").innerHTML = "0000";
                document.getElementById("card2").innerHTML = "0000";
            }
            else{
                cria_interface();
            }
        }

        
    })
}
    

    
    



