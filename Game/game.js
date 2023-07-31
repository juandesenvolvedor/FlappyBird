
const somHit = new Audio();
somHit.src = './sons/hit.wav'

const sprites = new Image();
sprites.src = './sprites/sprites.png'

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

function fazColisao(FlappyBird, chao){
    const flappyBirdY = FlappyBird.y + FlappyBird.altura
    const chaoy = chao.y 

    if(flappyBirdY >= chaoy){
        return true;
    }else{
        return false;
    }
}


function criaFlappyBird(){
    const FlappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        pulo: 4.6,
        velocidade: 0,
        gravidade: 0.25,
        pula(){
            FlappyBird.velocidade = -FlappyBird.pulo
        },
    
        desenha(){
            ctx.drawImage(
                sprites,
                FlappyBird.spriteX, FlappyBird.spriteY,
                FlappyBird.largura, FlappyBird.altura,
                FlappyBird.x, FlappyBird.y,
                FlappyBird.largura, FlappyBird.altura 
            )
        },
        atualiza(){
            if(fazColisao(FlappyBird,chao)){
                somHit.play();

                setTimeout(() => {mudaParaTela(telas.INICIO)}, 500)
                return;
            }
    
            FlappyBird.velocidade = FlappyBird.velocidade + FlappyBird.gravidade
            FlappyBird.y = FlappyBird.y + FlappyBird.velocidade
        }
    }

    return FlappyBird;
}



const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    desenha(){
        ctx.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x, chao.y,
            chao.largura, chao.altura
        )

        ctx.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x + chao.largura,chao.y,
            chao.largura, chao.altura
        )
    }
}

const fundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 276,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha(){
        ctx.fillStyle = '#70c5ce'
        ctx.fillRect(0,0, canvas.width, canvas.height)

        ctx.drawImage(
            sprites,
            fundo.spriteX, fundo.spriteY,
            fundo.largura, fundo.altura,
            fundo.x, fundo.y,
            fundo.largura, fundo.altura
        )

        ctx.drawImage(
            sprites,
            fundo.spriteX, fundo.spriteY,
            fundo.largura, fundo.altura,
            fundo.x + fundo.largura, fundo.y,
            fundo.largura, fundo.altura
        )

        
    }
}

const Ready ={
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha(){
        ctx.drawImage(
            sprites,
            Ready.spriteX, Ready.spriteY,
            Ready.largura, Ready.altura,
            Ready.x, Ready.y,
            Ready.largura, Ready.altura
        )
    }
}


/*TELAS*/

const globais = {}
let telaAtiva = {}
function mudaParaTela(novaTela){
    telaAtiva = novaTela;

    if(telaAtiva.inicializa){
        telaAtiva.inicializa();
    }
}

const telas = {
    INICIO: {
        inicializa(){
            globais.FlappyBird = criaFlappyBird();
        },

        desenha(){
            fundo.desenha();
            chao.desenha();
            globais.FlappyBird.desenha();
            Ready.desenha();
        },

        click(){
            mudaParaTela(telas.JOGO)
        },

        atualiza(){

        }
    },

    JOGO: {
        desenha(){
            fundo.desenha();
            chao.desenha();
            globais.FlappyBird.desenha();
        },

        click(){
            globais.FlappyBird.pula();
        },

        atualiza(){
            globais.FlappyBird.atualiza();
        }
    }
}




function loop(){
    telaAtiva.atualiza();
    telaAtiva.desenha();
    

    requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
    if(telaAtiva.click){
        telaAtiva.click();
    }
})

mudaParaTela(telas.INICIO)
loop();