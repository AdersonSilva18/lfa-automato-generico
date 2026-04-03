# Autômato Finito Determinístico em JavaScript

Este projeto implementa um AFD em JavaScript para testar palavras formadas pelos símbolos `a` e `b`.

## O que este autômato faz

No exemplo atual, o autômato:

* começa no estado `q0`
* possui dois estados: `q0` e `q1`
* considera `q0` como estado final
* alterna entre `q0` e `q1` sempre que lê `a`
* permanece no mesmo estado quando lê `b`

Assim, ele **aceita palavras com quantidade par de letras `a`**.

## Estrutura do projeto

- `Automato`: representa o autômato e faz o processamento das palavras
- `Estado`: representa cada estado
- `Alfabeto`: guarda os símbolos permitidos
- `Programa`: guarda as transições entre estados
- `testar()`: monta um exemplo pronto e executa casos de teste automaticamente
- `popular()`: permite montar e testar um autômato de forma interativa via terminal

## Como executar

O modo de execução é definido por um parâmetro passado na linha de comando:

```sh
node main.js <modo>
```

### Modos disponíveis

| Modo      | Descrição                                              |
|-----------|--------------------------------------------------------|
| `testar`  | Executa os casos de teste automáticos do exemplo pronto |
| `popular` | Monta e testa um autômato de forma interativa          |

### Exemplos

Executar os testes automáticos:

```sh
node main.js testar
```

Montar um autômato interativamente:

```sh
node main.js popular
```

Se nenhum parâmetro for informado, o programa exibe as instruções de uso e encerra.

## Palavras sugeridas para teste

### Aceitas

* `""`
* `bb`
* `aa`
* `abba`
* `bbaa`
* `aab`
* `baa`

### Rejeitadas

* `a`
* `ab`
* `ba`
* `aaa`
* `baba`
* `aaaba`
* `abbab`
