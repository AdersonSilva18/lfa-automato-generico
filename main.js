const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(pergunta) {
  return new Promise((resolve) => rl.question(pergunta, resolve));
}

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
        if (!estadoAtual) return false;
      } catch (e) {
        return false;
      }
    }
    return this.estadosFinais.includes(estadoAtual);
  }

  async validar() {
    console.log('\nRegra: a palavra é aceita se o número de "a" for par (0, 2, 4...).');
    console.log('Exemplos: "" aa bb aab baa => ACEITA | a ab aaa => REJEITADA\n');

    while (true) {
      const palavra = await prompt('palavra (ou "sair"): ');

      if (palavra.trim().toLowerCase() === 'sair') {
        rl.close();
        break;
      }

      const resultado = this.processar(palavra.trim());
      console.log(resultado ? '  ACEITA\n' : '  REJEITADA\n');
    }
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

async function testar() {
  const alfabeto = new Alfabeto();
  alfabeto.addSimbolo('a');
  alfabeto.addSimbolo('b');

  const estados = [new Estado('q0'), new Estado('q1')];

  const programa = new Programa({
    q0: { a: 'q1', b: 'q0' },
    q1: { a: 'q0', b: 'q1' },
  });

  const automato = new Automato(alfabeto, estados, programa, 'q0', ['q0']);

  const casos = [
    { palavra: '',    esperado: true  },
    { palavra: 'aa',  esperado: true  },
    { palavra: 'bb',  esperado: true  },
    { palavra: 'aab', esperado: true  },
    { palavra: 'baa', esperado: true  },
    { palavra: 'a',   esperado: false },
    { palavra: 'ab',  esperado: false },
    { palavra: 'aaa', esperado: false },
  ];

  let passou = 0;
  casos.forEach(({ palavra, esperado }) => {
    const resultado = automato.processar(palavra);
    const ok = resultado === esperado;
    console.log(`"${palavra}" => ${resultado} ${ok ? '✓' : `✗ (esperado ${esperado})`}`);
    if (ok) passou++;
  });

  console.log(`\n${passou}/${casos.length} testes passaram`);

  await automato.validar();
}

testar();