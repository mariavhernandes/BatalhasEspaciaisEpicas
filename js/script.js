/**
 * script.js - Lógica de animação do fundo estrelado
 */

const canvas = document.getElementById('canvas-estrelas');
const ctx = canvas.getContext('2d');

let largura, altura;
let estrelas = [];

// Configuração
const QUANTIDADE_ESTRELAS = 150;
const VELOCIDADE_MAXIMA = 0.5;

class Estrela {
  constructor() {
    this.inicializar();
  }

  inicializar() {
    this.x = Math.random() * largura;
    this.y = Math.random() * altura;
    this.tamanho = Math.random() * 1.5 + 0.5;
    this.velocidadeX = (Math.random() - 0.5) * VELOCIDADE_MAXIMA;
    this.velocidadeY = (Math.random() - 0.5) * VELOCIDADE_MAXIMA;
    this.opacidade = Math.random();
    this.velocidadeOpacidade = Math.random() * 0.02;
  }

  atualizar() {
    this.x += this.velocidadeX;
    this.y += this.velocidadeY;

    // Reposicionar se sair da tela
    if (this.x < 0) this.x = largura;
    if (this.x > largura) this.x = 0;
    if (this.y < 0) this.y = altura;
    if (this.y > altura) this.y = 0;

    // Efeito de cintilação
    this.opacidade += this.velocidadeOpacidade;
    if (this.opacidade > 1 || this.opacidade < 0) {
      this.velocidadeOpacidade = -this.velocidadeOpacidade;
    }
  }

  desenhar() {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacidade})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.tamanho, 0, Math.PI * 2);
    ctx.fill();
  }
}

function redimensionar() {
  largura = window.innerWidth;
  altura = window.innerHeight;
  canvas.width = largura;
  canvas.height = altura;
  
  estrelas = [];
  for (let i = 0; i < QUANTIDADE_ESTRELAS; i++) {
    estrelas.push(new Estrela());
  }
}

function animar() {
  ctx.clearRect(0, 0, largura, altura);
  
  estrelas.forEach(estrela => {
    estrela.atualizar();
    estrela.desenhar();
  });
  
  requestAnimationFrame(animar);
}

window.addEventListener('resize', redimensionar);
redimensionar();
animar();
