# 🏦 Sistema Bancário - Console Application

Este projeto é um simulador de sistema bancário robusto desenvolvido em **TypeScript**. Ele gerencia diferentes tipos de contas (Corrente e Poupança), permitindo operações financeiras complexas com validações de regras de negócio em tempo real.

## 🚀 Tecnologias Utilizadas
* **Linguagem:** TypeScript
* **Ambiente:** Node.js
* **Interface:** CLI (Interface de Linha de Comando) via `readline-sync`
* **Estilização:** Injeção de cores ANSI via terminal para melhor UX

## 🛠️ Engenharia de Software Aplicada
O projeto foi estruturado utilizando princípios sólidos de **Programação Orientada a Objetos (POO)**:

* **Abstração:** Classe base `Conta` abstrata, definindo o comportamento essencial sem permitir instanciação direta.
* **Polimorfismo:** Sobrescrita do método `sacar()` nas subclasses para aplicar regras distintas (ex: uso de limite na Conta Corrente).
* **Padrão Repository:** Interface `ContaRepository` garantindo um contrato fixo para os métodos de CRUD e operações financeiras.
* **Injeção de Dependência:** O `ContaController` gerencia a lógica de armazenamento e busca em coleções (`Array<Conta>`).

## 📋 Funcionalidades Financeiras
* **Gestão de Contas:** Cadastro, Listagem, Atualização e Deleção (CRUD).
* **Operações Bancárias:**
  * **Saque:** Com validação de saldo e limite.
  * **Depósito:** Atualização imediata de saldo.
  * **Transferência:** Lógica de transação entre dois objetos distintos com validação de origem e destino.

## 📂 Estrutura do Projeto
```text
├── src
│   ├── controller
│   │   └── ContaController.ts   # Orquestração das operações bancárias
│   ├── model
│   │   ├── Conta.ts            # Classe Abstrata base
│   │   ├── ContaCorrente.ts    # Extensão com lógica de limite
│   │   └── ContaPoupanca.ts    # Extensão com lógica de aniversário
│   ├── repository
│   │   └── ContaRepository.ts  # Contrato (Interface) do sistema
│   └── util
│       └── Colors.ts           # Utilitários de interface visual
└── Menu.ts                     # Ponto de entrada e Menu Interativo