# Math App




## Sobre o Math App

Math App é um jogo educativo que tem como objetivo reforçar o raciocínio matemático dos jogadores, ao mesmo tempo que garante um aprendizado divertido e gratificante.




### Como jogar:




O jogo possui 2 modos: ranqueado e personalizado, estando o modo personalizado ainda indisponível. O modo ranqueado oferece ao jogador 4 diferentes níveis de dificuldade:





|                  | Fácil | Médio | Difícil | Hard |
|------------------|-------|-------|---------|------|
|  Tempo(segundos) | 10    | 8     | 6       | 5    |
|  Chances         | 7     | 5     | 3       | 3    |

   


 As chances são como "vidas" que o jogador gastará a cada erro. O tempo é a quantidade de segundos que o jogador terá para resolver cada cálculo.




As opções de modo são apresentadas ao jogador logo após ser autenticado e direcionado à página "home". As opções de dificuldade aparecem ao escolher o modo.




Ao escolher a dificuldade, o jogo o direcionará a uma página onde haverá duas caixas maiores , um botão de "START" e quatro caixas menores logo abaixo. Para iniciar o jogo, o usuário deve clicar em "START". Após isso, nas duas caixas de cima surgirá uma adição, e nas caixas de baixo aparecerão as alternativas. O jogador deve clicar em uma dessas alternativas para avançar e receber o próximo cálculo a ser resolvido. Caso clique na alternativa correta, ele apenas avança e o tempo é zerado, e caso clique na errada, ele também perderá uma chance. O jogo termina quando todas as chances forem consumidas ou quando o jogador parar o fluxo deliberadamente clicando em "PAUSE".

A pontuação final é comparada com pontuações anteriores salvas no banco de dados. Se a pontuação anterior for menor que a atual, esta primeira é substituída pela segunda. Caso contrário, é mantida. 




 Os valores presentes nas alternativas são próximos uns dos outros, para garantir que a resposta certa não seja óbvia por diferir das demais.




 




## Tecnologias utilizadas

- Node.js

- Bcrypt

- Dotenv

- Express

- Express-handlebars

- Express-session

- Flash

- Mongoose

- Passport





## Principais Funcionalidades:




A maioria das funcionalidades abaixo pode ser acessada pelo menu presente na parte superior da página, exceto o login e a escolha de avatar.




### Login e logout:

O usuário deve estar autenticado para acessar as funcionalidades do jogo. A autenticação não possui persistência prolongada, e por isso o usuário precisa autenticar novamente ao encerrar o navegador. Caso o usuário deseje sair de sua conta, haverá um botão "SAIR" no menu.




### Página de perfil:

A página de perfil contém as seguintes informações sobre o jogador:

- Nome de usuário

- Avatar

- Recorde fácil

- Recorde médio

- Recorde difícil

- Recorde Hard




Ela também fornece a opção de troca de nome e troca de avatar




#### Escolha de avatar:

Página acessada por meio da página de perfil e que oferece algumas opções de avatar para o jogador, que quando cria uma nova conta, começa com um avatar anônimo. As opções são as mesmas para todos os jogadores, e para navegar entre as opções, basta clicar nas setas que estão nas laterais. Para escolher um avatar, mantenha o avatar escolhido no painel do centro e clique em "Selecionar".




### Página de rankings

Essa página contém quatro rankings globais para cada dificuldade. O jogador pode escolher a dificuldade que deseja visualizar e, assim, obterá os jogadores organizados da maior para a menor quantidade de acertos na respectiva dificuldade. Também é possível visualizar o avatar, o nome e o desempenho desses jogadores nas demais dificuldades.




### Modo claro e escuro:

O Math app possui uma opção que alterna as páginas entre modo claro e modo escuro, presente no menu na parte superior e no formato de uma lua (se estiver no modo claro) ou no de um sol (se estiver no modo escuro). Ao alterar o tema, TODAS as páginas são afetadas e a preferência é salva no navegador, garantindo que na próxima visita o tema utilizado por último seja mantido.







## Arquitetura e Estrutura




### Visão Arquitetural




O projeto segue uma arquitetura MVC simplificada, sem separação explícita de camadas de domínio ou serviços.




Cliente (Browser)

   ->

Rotas Express

   ->

Controllers (embutidos nas rotas)

   ->

Mongoose Models

   ->

MongoDB




### Responsabilidades




- Routes: Controle de fluxo HTTP

- Models: Estrutura de dados

- Views: Renderização server-side

- Public: Assets estáticos e lógica do jogo

- Config: Autenticação 





## Fluxo de Execução (Uso Típico)




### Inicialização




1. app.js carrega variáveis de ambiente

2. Conecta ao MongoDB local

3. Configura middlewares

4. Registra rotas

5. Inicia servidor HTTP




### Fluxo de Cadastro




1. Usuário envia e-mail e senha

2. Backend valida:

- Se qualquer um dos campos estiver vazio (null ou undefined), será rejeitado





O tamanho mínimo da senha deve ser de 5 caracteres e o máximo de 10 

3. Se os dados enviados não atenderem às regras de validação, será emitida uma mensagem de erro. Caso contrário, a senha é criptografada com bcrypt e o novo usuário é salvo no MongoDB







### Fluxo de Login




1. Usuário informa e-mail e senha

2. Passport valida 

3. Usuário autenticado é salvo na sessão

4. Redirecionamento para /game/home

5. Caso não seja encontrado, emite uma mensagem de erro.

### Fluxo do Jogo




1. Controlado pelo frontend

2. Usuário aperta "START"

3. O cálculo e as alternativas são gerados de acordo com a dificuldade

4. Usuário clica em uma das alternativas

5. Se acertar, será gerado um novo cálculo e novas alternativas, e o tempo será zerado. Caso contrário, O número de chances também será decrementado.

6. Ao fim do jogo, o número de acertos é enviado ao backend, onde será comparado com dados no MongoDB.




## Configuração e Instalação




### Pré-requisitos




- Node.js v18 ou superior

- MongoDB rodando localmente




### Variáveis de ambiente

- PORT: A porta onde o servidor será executado

- DB_CONNECT: String de conexão do mongo db

- SECRET: Chave secreta do express




### Como executar:

```

npm start

```



