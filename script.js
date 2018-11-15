// Implementacao dos algoritmos de Computacao Grafica
// Autor: Matheus Possas

// Canvas onde serao desenhados os pixels
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// Leva em consideracao apenas os dois ultimos pontos
var Xant, Yant,
  Xprox = 0, Yprox = 0;

// Cor do pixel
context.fillStyle = "white";

// Lista de vertices das retas desenhadas.
var vertices = [];

// Escuta um evento de click no canvas e colore o pixel selecionado
canvas.addEventListener("click", function (e) {
  Xant = Xprox; Yant = Yprox;

  Xprox = e.clientX - canvas.offsetLeft;
  Yprox = e.clientY - canvas.offsetTop;

  context.fillRect(Xprox, Yprox, 1, 1);
}, false);

var algoritmo;

// Identifica qual algoritmo de rasterizacao foi selecionado e chama o mesmo
function desenhar() {
  algoritmo = document.getElementById("rasterizacao").value;
  switch (algoritmo) {
    case "dda":
      dda();
      vertices.push(Xant, Yant, Xprox, Yprox);
      break;
    case "bresenham":
      bresenham();
      vertices.push(Xant, Yant, Xprox, Yprox);
      break;
    case "bresenham_c":
      bresenham_c();
      break;
    default:
      alert("Selecione um algoritmo de rasterização.");
  }
}

// Limpa o canvas e redefine os pontos
function limpar() {
  Xant = Yant = undefined;
  Xprox = Yprox = 0;
  vertices = [];
  context.clearRect(0, 0, canvas.width, canvas.height);
}

// Rasterizacao de primitivas basicas

// Retas

// Algoritmo DDA (Analisador Diferencial Digital)
function dda() {
  var x, y, dx, dy, passos, Xincr, Yincr;
  x = Xant; y = Yant; dx = Xprox - Xant; dy = Yprox - Yant;

  if (Math.abs(dx) > Math.abs(dy)) passos = Math.abs(dx);
  else passos = Math.abs(dy);

  Xincr = dx / passos;
  Yincr = dy / passos;

  context.fillRect(x, y, 1, 1);

  for (var i = 0; i < passos; i++) {
    x += Xincr;
    y += Yincr;

    context.fillRect(Math.round(x), Math.round(y), 1, 1);
  }
}

// Algoritmo de Bresenham
function bresenham() {
  var x, y, dx, dy, Xincr, Yincr, p, const1, const2;
  x = Xant; y = Yant; dx = Xprox - Xant; dy = Yprox - Yant;

  context.fillRect(x, y, 1, 1);

  if (dx < 0) {
    dx = -dx;
    Xincr = -1;
  } else Xincr = 1;

  if (dy < 0) {
    dy = -dy;
    Yincr = -1;
  } else Yincr = 1;

  // 1 caso
  if (dx > dy) {
    p = 2 * dy - dx;
    const1 = 2 * dy; const2 = 2 * (dy - dx);

    for (var i = 0; i < dx; i++) {
      x += Xincr;
      if (p < 0) p += const1;
      else {
        y += Yincr;
        p += const2;
      }
      context.fillRect(x, y, 1, 1);
    }
  // 2 caso
  } else {
    p = 2 * dx - dy;
    const1 = 2 * dx; const2 = 2 * (dx - dy);

    for (var i = 0; i < dy; i++) {
      y += Yincr;
      if (p < 0) p += const1;
      else {
        p += const2;
        x += Xincr;
      }
      context.fillRect(x, y, 1, 1);
    }
  }
}

// Circunferencia

// Algoritmo de Bresenham
function bresenham_c() {
  var x, y, Xc, Yc, r, p;
  Xc = Xant;
  Yc = Yant;
  r = Math.sqrt(Math.pow((Xprox - Xant), 2) + Math.pow((Yprox - Yant), 2));
  x = 0; y = r; p = 3 - 2 * r;

  context.clearRect(Xc, Yc, 1, 1);
  plotaSimetricos(x, y);
  while (x < y) {
    if (p < 0) p += 4 * x + 6;
    else {
      p += 4 * (x - y) + 10;
      y--;
    }
    x++
    plotaSimetricos(x, y);
  }

  function plotaSimetricos(x, y) {
    context.fillRect(Xc + x, Yc + y, 1, 1);
    context.fillRect(Xc - x, Yc + y, 1, 1);
    context.fillRect(Xc + x, Yc - y, 1, 1);
    context.fillRect(Xc - x, Yc - y, 1, 1);
    context.fillRect(Xc + y, Yc + x, 1, 1);
    context.fillRect(Xc - y, Yc + x, 1, 1);
    context.fillRect(Xc + y, Yc - x, 1, 1);
    context.fillRect(Xc - y, Yc - x, 1, 1);
  }
}

// Transformacoes geometricas

// Translacao
function translacao() {
  var a, b;
  a = Number(document.getElementById("x").value);
  b = Number(document.getElementById("y").value);
  Xant += a; Xprox += a; Yant += b; Yprox += b;
  desenhar();
}

// Escala
function escala() {
  var a, b, x, y;
  a = Number(document.getElementById("x").value);
  b = Number(document.getElementById("y").value);

  // Gera o posicionamento do ponto de referencia na origem
  Xprox -= Xant; Yprox -= Yant;

  // Aplica a transformacao
  Xprox *= a; Yprox *= b;

  // Retorna a posicao inicial
  Xprox += Xant; Yprox += Yant;

  desenhar();
}

// Rotacao
function rotacao() {
  var o, x, y;
  o = Number(document.getElementById("o").value);

  // Gera o posicionamento do ponto de referencia na origem
  Xprox -= Xant; Yprox -= Yant;

  // Calcula o seno e cosseno
  // Utiliza o complemento do angulo para desenhar no canvas
  var sin = Math.sin(-o * (Math.PI / 180));
  var cos = Math.cos(-o * (Math.PI / 180));

  // Variavel temporaria de Xprox
  var x = Xprox;

  // Aplica a transformacao
  Xprox = (Xprox * cos) - (Yprox * sin);
  Yprox = (x * sin) + (Yprox * cos);

  // Retorna a posicao inicial
  Xprox += Xant; Yprox += Yant;

  desenhar();
}

// Reflexao
function reflexao() {
  var eixo = document.getElementById("eixo").value;

  // Gera o posicionamento do ponto de referencia na origem
  Xprox -= Xant; Yprox -= Yant;

  // Aplica a transformacao
  switch (eixo) {
    case "x":
      Yprox = -Yprox;
      break;
    case "y":
      Xprox = -Xprox;
      break;
    case "x/y":
      Xprox = -Xprox;
      Yprox = -Yprox;
      break;
    default:
      alert("Selecione um eixo.");
  }

  // Retorna a posicao inicial
  Xprox += Xant; Yprox += Yant;

  desenhar();
}

// Cisalhamento
function cisalhamento() {
  var eixo, f;
  eixo = document.getElementById("eixo").value;
  f = Number(document.getElementById("f").value);

  // Gera o posicionamento do ponto de referencia na origem
  Xprox -= Xant; Yprox -= Yant;

  // Aplica a transformacao
  switch (eixo) {
    case "x":
      Xprox = Xprox + f * Yprox;
      break;
    case "y":
      Yprox = f * Xprox + Yprox;
      break;
    default:
      alert("Opção de eixo inválida para essa transformação.");
  }

  // Retorna a posicao inicial
  Xprox += Xant; Yprox += Yant;

  desenhar();
}

// Recorte

// Identifica qual algoritmo de recorte foi selecionado e chama o mesmo
function recorte() {
  var algoritmo;
  algoritmo = document.getElementById("recorte").value;

  // Apaga o canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  switch(algoritmo) {
    case "cohen_sutherland":
      alg_cohen_sutherland();
      break;
    case "liang_barski":
      alg_liang_barski();
      break;
    default:
      alert("Selecione um algoritmo de recorte.");
  }

}

// Algoritmo de Cohen-Sutherland
function alg_cohen_sutherland() {
  var x1, y1, x2, y2, Xmin, Ymin, Xmax, Ymax,
    aceito, feito, cod1, cod2, cfora, Xint, Yint;

  // Coordenadas da janela de visualizacao
  Xmin = Xant; Ymin = Yant; Xmax = Xprox; Ymax = Yprox;

  // Retorna o codigo de um ponto
  function obtemCodigo(x, y) {
    var cod = 0;
    if(x < Xmin) cod++; // Antes da fronteira da esquerda
    if(x > Xmax) cod += 2; // Depois da fronteira da direita
    if(y < Ymin) cod += 4; // Abaixo da fronteira inferior
    if(y > Ymax) cod += 8; // Acima da fronteira superior
    return cod;
  }

  // Verifica se o bit esta setado
  function verificaBit(num, bit) {
    var mask = 1 << bit;
    return ((num & mask) != 0);
  }

  // Para todas as reta desenhadas
  for(var i = 0; i < vertices.length; i += 4) {
    x1 = vertices[i]; y1 = vertices[i + 1]; x2 = vertices[i + 2]; y2 = vertices[i + 3];
    aceito = false; // Algo para visualizacao
    feito = false; // Calculos finalizados

    while(!feito) {
      cod1 = obtemCodigo(x1, y1);
      cod2 = obtemCodigo(x2, y2);

      if(cod1 == 0 && cod2 == 0) {
        aceito = feito = true;
      }else if(cod1 & cod2 != 0) {
        feito = true;
      // Calcula intersecoes
      }else {
        if(cod1 != 0) cfora = cod1; // Variavel temporaria
        else cfora = cod2;

        if(verificaBit(cfora, 0)) {
          Xint = Xmin;
          Yint = y1 + (y2 - y1) * ((Xmin - x1) / (x2 - x1));
        }else if(verificaBit(cfora, 1)) {
          Xint = Xmax;
          Yint = y1 + (y2 - y1) * ((Xmax - x1) / (x2 - x1));
        }else if(verificaBit(cfora, 2)) {
          Yint = Ymin;
          Xint = x1 + (x2 - x1) * ((Ymin - y1) / (y2 - y1));
        }else if(verificaBit(cfora, 3)) {
          Yint = Ymax;
          Xint = x1 + (x2 - x1) * ((Ymax - y1) / (y2 - y1));
        }

        if(cfora == cod1) {
          x1 = Xint;
          y1 = Yint;
        }else {
          x2 = Xint;
          y2 = Yint;
        }
      }

    }

    if(aceito) {
      Xant = Math.round(x1); Yant = Math.round(y1); Xprox = Math.round(x2); Yprox = Math.round(y2);
      bresenham();
    }
  }
}

// Algoritmo de Liang-Barski
function alg_liang_barski() {
  var x1, y1, x2, y2, Xmin, Ymin, Xmax, Ymax,
    u1, u2, dx, dy;

  // Coordenadas da janela de visualizacao
  Xmin = Xant; Ymin = Yant; Xmax = Xprox; Ymax = Yprox;

  function cliptest(p, q) {
    var result, r;
    result = true;

    if(p < 0) {
      r = q / p;
      if(r > u2) result = false // Fora da janela
      else if(r > u1) u1 = r;
    }else if(p > 0) {
      r = q / p;
      if(r < u1) result = false // Fora da janela
      else if(r < u2) u2 = r;
    }else if(q < 0) result = false // Fora da janela

    return result;
  }

  // Para todas as reta desenhadas
  for(var i = 0; i < vertices.length; i += 4) {
    x1 = vertices[i]; y1 = vertices[i + 1]; x2 = vertices[i + 2]; y2 = vertices[i + 3];
    u1 = 0; u2 = 1; dx = x2 - x1; dy = y2 - y1;

    if(cliptest(-dx, (x1 - Xmin))) { // Fronteira da esquerda
      if(cliptest(dx, (Xmax - x1))) { // Fronteira da direita
        if(cliptest(-dy, (y1 - Ymin))) { // Fronteira inferior
          if(cliptest(dy, (Ymax - y1))) { // Fronteira superior
            if(u2 < 1) {
              x2 = x1 + dx * u2;
              y2 = y1 + dy * u2;
            }
            if(u1 > 0) {
              x1 = x1 + dx * u1;
              y1 = y1 + dy * u1;
            }
            Xant = Math.round(x1); Yant = Math.round(y1); Xprox = Math.round(x2); Yprox = Math.round(y2);
            bresenham();
          }
        }
      }
    }
  }
}

// Preenchimento de areas

// Cor de preenchimento anterior
var anterior = "#000000";

// Identifica qual algoritmo de preenchimento foi selecionado e chama o mesmo
function preencher() {
  var algoritmo, cor, borda;
  algoritmo = document.getElementById("preenchimento").value;
  cor = document.getElementById("cor").value;
  borda = context.fillStyle;

  // Recolore o pixel selecionado com a cor de preenchimento anterior
  context.fillStyle = anterior;
  context.fillRect(Xprox, Yprox, 1, 1);
  anterior = cor;

  // Cor de preenchimento
  context.fillStyle = cor;

  switch (algoritmo) {
    case "boundary":
      boundary(Xprox, Yprox, borda, cor);
      break;
    case "flood":
      flood(Xprox, Yprox, obtemCor(Xprox, Yprox));
      break;
    default:
      alert("Selecione um algoritmo de preenchimento.");
  }

  // Volta para a cor original de desenho
  context.fillStyle = borda;

}

// Identifica a cor de um ponto
function obtemCor(x, y) {
  var p, cor;
  p = context.getImageData(x, y, 1, 1).data;
  cor = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
  return cor;
}

function rgbToHex(r, g, b) {
    return ((r << 16) | (g << 8) | b).toString(16);
}

// Boundary-Fill
function boundary(x, y, borda, cor) {
  var atual = obtemCor(x, y);
  if(atual != borda && atual != cor) {
    context.fillRect(x, y, 1, 1);
    boundary(x + 1, y, borda, cor);
    boundary(x - 1, y, borda, cor);
    boundary(x, y + 1, borda, cor);
    boundary(x, y - 1, borda, cor);
  }
}

// Flood-Fill
function flood(x, y, antiga) {
  var atual = obtemCor(x, y);
  if(atual == antiga) {
    context.fillRect(x, y, 1, 1);
    flood(x + 1, y, antiga);
    flood(x - 1, y, antiga);
    flood(x, y + 1, antiga);
    flood(x, y - 1, antiga);
  }
}

// Curvas Parametricas

// Curvas Aproximadas

// Curva de Bezier
function bezier() {
  // Definicao dos pontos de controle
  var x1, y1, x2, y2, x3, y3, x4, y4, l;

  l = vertices.length;
  x1 = vertices[l-8]; y1 = vertices[l-7]; x2 = vertices[l-6]; y2 = vertices[l-5];
  x3 = vertices[l-4]; y3 = vertices[l-3]; x4 = vertices[l-2]; y4 = vertices[l-1];

  // Calculo dos coeficientes da curva de Bezier
  var cX, cY, bX, bY, aX, aY, x, y;

  cX = 3 * (x2 - x1);
  bX = 3 * (x3 - x2) - cX;
  aX = x4 - x1 - cX - bX;

  cY = 3 * (y2 - y1);
  bY = 3 * (y3 - y2) - cY;
  aY = y4 - y1 - cY - bY;

  // Define a quantidade de pontos da curva a serem calculados
  var accuracy = 0.005;

  // Definicao dos pontos da curva
  for(var t = 0; t < 1; t += accuracy) {
    x = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t) + x1;
    y = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + y1;

    context.fillRect(x, y, 1, 1);
  }

}
