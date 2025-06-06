//declaraçao das variaveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

//captura os botoes pelos ids e adiciona um evento de clique
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');
const somAcerto = document.getElementById('somAcerto');
const somErro = document.getElementById('somErro');

//funçao que zera os valores das variáveis controladoras
function reiniciar() {
    desempenho = 0;
    tentativas = 0;
    acertos = 0;
    jogar = true;
    // Remove todas as imagens e redefine as classes das divs
    limparTabuleiro();
    atualizaPlacar(0, 0);
    //mostra o botao jogarnovamente alterando a classe css (className)
    btnJogarNovamente.className = 'visivel';
    //oculta o botao reiniciar alterando a classe css (className)
    btnReiniciar.className = 'invisivel';
}

// Nova função para limpar o tabuleiro e remover imagens
function limparTabuleiro() {
    let divis = document.getElementsByTagName("div");
    for (let i = 0; i < divis.length; i++) {
        // Verifica se são as divs com ids 0, 1, 2 ou 3
        if (divis[i].id == 0 || divis[i].id == 1 || divis[i].id == 2 || divis[i].id == 3) {
            // Remove qualquer imagem existente dentro da div
            const imagemExistente = divis[i].querySelector('img');
            if (imagemExistente) {
                imagemExistente.remove();
            }
            // Altera a classe css das divs para "inicial"
            divis[i].className = "inicial";
        }
    }
}

//funçao jogar novamente
function jogarNovamente() {
    jogar = true; //variável jogar volta a ser verdadeira
    limparTabuleiro(); // Limpa o tabuleiro a cada nova jogada
}

//funçao que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
    //calcula o desempenho em porcentagem
    desempenho = (acertos / tentativas) * 100;
    //escreve o placar com os valores atualizados (innerHTML)
    document.getElementById("resposta").innerHTML = "Placar - Acertos: " + acertos + " Tentativas: " + tentativas + " Desempenho: " + Math.round(desempenho) + "%";
}

//funçao executada quando o jogador acertou
function acertou(obj) {
    //altera a classe CSS da <div> escolhida pelo jogador (className)
    obj.className = "acertou";
    //Criar uma constante img que armazena um novo objeto imagem com largura de 100px
    const img = new Image(100);
    img.id = "imagem"; // Mantido o ID para referência, se necessário
    //altera o atributo src (source) da imagem criada
    img.src = "https://i.pinimg.com/736x/e1/41/c1/e141c1b7ffad82123a7966f9263b14a5.jpg";
    //adiciona a imagem criada na div (obj) escolhida pelo jogador (appendChild)
    obj.appendChild(img);
    somAcerto.play();
    // Como a div 'inicial' tem estilos de flexbox, a imagem deve centralizar automaticamente.
}

function verifica(obj) {
    //se jogar é verdadeiro (uma nova rodada está ativa)
    if (jogar) {
        //incrementa as tentativas
        tentativas++;
        //jogar passa a ser false para evitar múltiplos cliques na mesma rodada
        jogar = false;
        //a variável sorteado recebe um valor inteiro aleatório
        let sorteado = Math.floor(Math.random() * 4);

        if (obj.id == sorteado) {
            //chama a funçao acertou
            acertou(obj);
            //incrementa o contador de acertos
            acertos++;
        } else { //se errou a tentativa
            //altera a classe da <div> escolhida para errou
            obj.className = "errou";
            const imgErro = new Image(100);
            imgErro.src = "https://i.pinimg.com/736x/64/f8/71/64f8713bdb8c2764ea56d19f23a2aa75.jpg";
            obj.appendChild(imgErro);
            somErro.play();
        }

        // Aguarda um pouco antes de permitir a próxima jogada ou reiniciar
        setTimeout(() => {
            // Se as tentativas não atingiram o limite, permite jogar novamente
            if (tentativas < 4) { // Assumindo 4 como o limite de tentativas
                jogar = true;
                // Redefine a classe da div para "inicial" e remove a imagem para a próxima rodada
                obj.className = "inicial";
                const imagemAtual = obj.querySelector('img');
                if (imagemAtual) {
                    imagemAtual.remove();
                }
                // Se errou e é o final da rodada, mostra a imagem do acerto na div sorteada.
                // Isso não é necessário se o objetivo é apenas exibir a imagem de erro.
                // Se você quer mostrar onde estava o acerto, precisaria de uma lógica diferente.
            } else {
                // Se as tentativas chegaram ao limite
                btnJogarNovamente.className = 'invisivel';
                btnReiniciar.className = 'visivel';
                jogar = false; // Impede mais jogadas até reiniciar
            }
        }, 1500); // Espera um pouco para mostrar a imagem antes de permitir nova jogada

        //chama a funçao que atualiza o placar
        atualizaPlacar(acertos, tentativas);
    } else { //se clicar em outra carta sem reiniciar
        alert('Clique em "Jogar novamente" ou "Reiniciar" para começar uma nova rodada.');
    }
}
//adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);