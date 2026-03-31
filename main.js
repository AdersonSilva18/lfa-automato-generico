class Automato {
  constructor(alfabeto, estados, programa, estadoInicial, estadosFinais) {
    this.alfabeto = alfabeto;
    this.estados = estados;
    this.programa = programa;
    this.estadoInicial = estadoInicial;
    this.estadosFinais = estadosFinais;
  }

  processar(palavra) {
    let estadoAtual = this.estadoInicial;
    for (let i = 0; i < palavra.length; i++) {
      const simbolo = palavra[i];
      try {
        estadoAtual = this.programa.transicoes[estadoAtual][simbolo];
        if (!estadoAtual) {
          return false;
        }
      } catch (e) {
        console.error(e);
        return false;
      }
    }
    return this.estadosFinais.includes(estadoAtual);
  }
}

class Estado {
  constructor(nome, isFinal) {
    this.nome = nome;
    this.isFinal = isFinal;
  }
}

class Alfabeto {
  simbolos = [];

  addSimbolo(simbolo) {
    this.simbolos.find((s) => s === simbolo)
      ? new Error()
      : this.simbolos.push(simbolo);
  }
}

class Programa {
  
  constructor(transicoes) {
    this.transicoes = transicoes;
  }
  
}

