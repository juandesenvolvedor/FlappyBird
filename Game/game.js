
const sprites = new Image();
sprites.src = './sprites/sprites.png'

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

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
        FlappyBird.velocidade = FlappyBird.velocidade + FlappyBird.gravidade
        FlappyBird.y = FlappyBird.y + FlappyBird.velocidade
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

const GetReady ={
    spriteX: 134,
    spriteY: 0,
    largura: 173,
    altura: 153,
    x: (canvas.width / 2) - 173 / 2,
    y: 50
}




function loop(){
    FlappyBird.atualiza();

    fundo.desenha();
    chao.desenha();
    FlappyBird.desenha();

    

    requestAnimationFrame(loop);
}

loop();