const display = document.getElementById("display");
const numeros = document.querySelectorAll(".tecla");
const operadores = document.querySelectorAll(".operador");
const operadorIgual = document.querySelector('.igual');

let novoNumero = true;
let operador;
let igual;
let numeroAnterior;

const operacaoPendente = () => operador !== undefined;

const calcular = () => {
  if (operacaoPendente()){
    const numeroAtual = parseFloat(display.textContent);
    novoNumero = true;
    if (operador == '+'){
      atualizarDisplay(numeroAnterior + numeroAtual);  
    }else if (operador == '-'){
      atualizarDisplay(numeroAnterior - numeroAtual);
    }else if (operador == '*'){
      atualizarDisplay(numeroAnterior * numeroAtual);
    }else if (operador == '/'){
      atualizarDisplay(numeroAnterior / numeroAtual);
    }
  }
}

const atualizarDisplay = (texto) => {
  if (novoNumero){
    display.textContent = texto;
    novoNumero = false;
  }else{
    display.textContent += texto;
  }
}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);

numeros.forEach (numero => numero.addEventListener('click', inserirNumero));

const selecionaOperador = (evento) => {
  if (!novoNumero) {
    calcular();
    novoNumero = true;
    operador = evento.target.textContent;
    numeroAnterior = parseFloat(display.textContent);
  }
}

operadores.forEach(operador => operador.addEventListener('click', selecionaOperador));

const acionarIgual = () => {
  calcular();
  operador = undefined;
}

document.querySelector('.igual').addEventListener('click', acionarIgual);

const limpaDisplay = () => display.textContent = '';
document.querySelector('.deleta-parcial').addEventListener('click', limpaDisplay);

const limpaCalculo = () => {
  limpaDisplay();
  operador = undefined;
  novoNumero = true;
  numeroAnterior = undefined;
}
document.querySelector('.deleta').addEventListener('click', limpaCalculo);

const removeUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);
document.querySelector('.deleta-numero').addEventListener('click', removeUltimoNumero);


const inverteSinal = () => {
  novoNumero = true;
  atualizarDisplay(display.textContent * -1);
}
document.querySelector('.inverte-operacao').addEventListener('click', inverteSinal);


const existeDecimal = () => display.textContent.indexOf('.') !== -1;
const existeValor = () => display.textContent.length > 0;

const inserirDecimal = () => {
  if (!existeDecimal()){
    if (existeValor()){
      atualizarDisplay('.');
    }else{
      atualizarDisplay('0.');
    }
  }
}
document.querySelector('.decimal').addEventListener('click', inserirDecimal);
