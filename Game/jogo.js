
const sprites = new Image();
sprites.src = './sprites/sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const FlappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    velocidade: 0,
    gravidade: 0.25,
    atualiza(){
        FlappyBird.velocidade = FlappyBird.velocidade + FlappyBird.gravidade
        FlappyBird.y = FlappyBird.y + FlappyBird.velocidade;
    },
    desenha(){
        contexto.drawImage(
            sprites,
            FlappyBird.spriteX, FlappyBird.spriteY, //sprite x, y (horizontal, vertical)
            FlappyBird.largura, FlappyBird.altura, //tamanho do recorte na sprite (widith, height)
            FlappyBird.x, FlappyBird.y, //onde vai ficar posicionado (left, top)
            FlappyBird.largura, FlappyBird.altura // tamanho que vc quer (widith, height)
            );
    
    }
}

const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    desenha(){
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x, chao.y,
            chao.largura, chao.altura
        );

        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x + chao.largura, chao.y,
            chao.largura, chao.altura
        );
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
        contexto.fillStyle = '#70c5ce' // cor escolhida
        contexto.fillRect(0,0, canvas.width, canvas.height) // onde comeca e onde termina

        contexto.drawImage(
            sprites,
            fundo.spriteX, fundo.spriteY,
            fundo.largura, fundo.altura,
            fundo.x, fundo.y,
            fundo.largura, fundo.altura
        )

        contexto.drawImage(
            sprites,
            fundo.spriteX, fundo.spriteY,
            fundo.largura, fundo.altura,
            fundo.x + fundo.largura, fundo.y,
            fundo.largura, fundo.altura
        )
    }
}



function loop(){
    fundo.desenha();
    chao.desenha();
    FlappyBird.desenha();

    FlappyBird.atualiza();


    requestAnimationFrame(loop);
}

loop();
     