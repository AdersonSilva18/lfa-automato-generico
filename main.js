class Automato {
  constructor(alfabeto, estados, programa, estadoInicial, estadosFinais) {
    this.alfabeto = alfabeto;
    this.estados = estados;
    this.programa = programa;
    this.estadoInicial = estadoInicial;
    this.estadosFinais = estadosFinais;
  }

  processar(palavra) {}
}

class Estado {
  
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
  
}

