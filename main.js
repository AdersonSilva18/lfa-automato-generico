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

  popular() {
    console.log('escreva o alfabeto, dividido por virgula')
    const alfabeto = prompt('alfabeto: ').split(',');
    this.alfabeto = new Alfabeto();
    alfabeto.forEach((s) => this.alfabeto.addSimbolo(s.trim()));

    console.log('escreva os estados, dividido por virgula')
    const estados = prompt('estados: ').split(',');
    this.estados = [];
    estados.forEach((s) => this.estados.push(new Estado(s.trim())));

    console.log('escreva o programa, como uma matriz separada por vírgula, exemplo: q0,a,q1')
    const programa = prompt('programa: ');
    const transicoes = {};
    programa.split('\n').forEach((linha) => {
      const [ea, s, ep] = linha.split(',').map((x) => x.trim());
      if (!transicoes[ea]) transicoes[ea] = {};
      transicoes[ea][s] = ep;
    });
    this.programa = new Programa(transicoes);

    console.log('escreva o estado inicial')
    const estadoInicial = prompt('estado inicial: ');
    this.estadoInicial = estadoInicial.trim();

    console.log('escreva os estados finais, dividido por virgula')
    const estadosFinais = prompt('estados finais: ').split(',');
    this.estadosFinais = estadosFinais.map((s) => s.trim());

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

function testar() {
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
}

testar();
