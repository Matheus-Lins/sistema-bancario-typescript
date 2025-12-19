    import readlinesync =  require("readline-sync");
    import { colors } from "./src/util/Colors";
    import { Conta } from "./src/model/Conta";
    import { ContaCorrente } from "./src/model/ContaCorrente";
    import { ContaPoupanca } from "./src/model/ContaPoupanca";
    import { ContaController } from "./src/controller/ContaController";
    import { read } from "fs";
    
    
    export function main(){

        

        //instância da classe ContaController
        let contas: ContaController = new ContaController();

        //variáveis auxiliares
        let opcao, numero, agencia, tipo, saldo, limite, aniversario, valor, numeroDestino: number;
        let titular: string;
        const tiposContas = ["Conta Corrente", "Conta Poupanca"]

        console.log("\nCriar Contas\n");


        while (true){
            
            
            console.log(colors.bg.black, colors.fg.yellow,
                        "*****************************************************");
            console.log("                                                     ");
            console.log("                BANCO DO BRAZIL COM Z                ");
            console.log("                                                     ");
            console.log("*****************************************************");
            console.log("                                                     ");
            console.log("            1 - Criar Conta                          ");
            console.log("            2 - Listar todas as Contas               ");
            console.log("            3 - Buscar Conta por Numero              ");
            console.log("            4 - Atualizar Dados da Conta             ");
            console.log("            5 - Apagar Conta                         ");
            console.log("            6 - Sacar                                ");
            console.log("            7 - Depositar                            ");
            console.log("            8 - Transferir valores entre Contas      ");
            console.log("            9 - Sair                                 ");
            console.log("                                                     ");
            console.log("*****************************************************");
            console.log("                                                     ",
            colors.reset);

            console.log("Entre com a opção desejada: ");
            opcao = readlinesync.questionInt("");

            if (opcao == 9){
                console.log(colors.fg.greenstrong,
                    "\nBanco do Brazil com Z - O seu futuro começa aqui!");
                sobre();
                console.log(colors.reset, "");
                
                process.exit(0);
            }

            switch (opcao) {
                case 1:
                    console.log(colors.fg.whitestrong,"\n\nCriar Conta\n\n", colors.reset);

                    console.log("Digite o número da agência: ");
                    agencia = readlinesync.questionInt("")
                    
                    console.log("Digite o nome do titular da conta: ");
                    titular = readlinesync.question("")

                    console.log("Digite o tipo da conta: ");
                    tipo = readlinesync.keyInSelect(tiposContas, "",{cancel: false}) + 1;

                    console.log("Digite o saldo da conta (R$): ");
                    saldo = readlinesync.questionFloat("")

                    switch(tipo){
                        case 1:
                            console.log("digite o limite da conta (R$): ");
                            limite = readlinesync.questionFloat("");
                            contas.cadastrar(new ContaCorrente(contas.gerarNumero(), agencia, tipo, titular, saldo,limite));
                            break;
                        case 2:
                            console.log("digite o dia do aniversário da conta poupança: ");
                            aniversario = readlinesync.questionInt("");
                            contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), agencia, tipo, titular, saldo, aniversario));
                            break;
                    }
                        
                    keypress()
                    break;
                case 2:
                    console.log(colors.fg.whitestrong, 
                        "\n\nListar todas as Contas\n\n", colors.reset);

                    contas.listarTodas();

                    keypress()
                    break;
                case 3:
                    console.log(colors.fg.whitestrong, "\n\nConsultar dados da Conta - por número\n\n"
                        , colors.reset);

                    console.log("digite o número da conta: ");
                    numero = readlinesync.questionInt("");
                    contas.procurarPorNumero(numero);

                    keypress()
                    break;
                case 4:
                    console.log(colors.fg.whitestrong, 
                        "\n\nAtualizar dados da Conta\n\n", colors.reset);

                        console.log("digite o número da conta: ");
                        numero = readlinesync.questionInt("");

                        let conta = contas.buscaNoArray(numero);

                        if(conta != null){

                            console.log("digite o numero da agência: ");
                            agencia = readlinesync.questionInt("");

                            console.log("digite o nome do titular  da conta: ");
                            titular = readlinesync.question("");

                            
                            tipo = conta.tipo;

                            console.log("\ndigite o saldo da conta (R$): ");
                            saldo = readlinesync.questionFloat("");

                            switch(tipo){
                                case 1:
                                    console.log("digite o limite da conta (R$): ");
                                    limite = readlinesync.questionFloat("");
                                    contas.atualizar(
                                        new ContaCorrente(numero, agencia, tipo , titular, saldo, limite));
                                    break;
                                case 2:
                                    console.log("digite o dia do aniversario da conta poupança: ");
                                    aniversario = readlinesync.questionInt("");
                                    contas.atualizar(new ContaPoupanca(numero, agencia, tipo, titular, saldo, aniversario));
                                    break;
                                    

                            }  
                        
                        }else {
                            console.log(colors.fg.red, "\nA conta número: " + numero + " nao foi encontrada!", colors.reset);  
                        }
                    
                    keypress()
                    break;
                case 5:
                    console.log(colors.fg.whitestrong, "\n\nApagar uma Conta\n\n", colors.reset);

                    console.log("digite o numero da conta: ");
                    numero =  readlinesync.questionInt("");
                    contas.deletar(numero);

                    keypress()
                    break;
                case 6:
                    console.log(colors.fg.whitestrong, "\n\nSaque\n\n", colors.reset);

                    console.log("digite o numero da conta: ");
                    numero = readlinesync.questionInt("");

                    console.log("\ndigite o valor do saque (R$): ");
                    valor = readlinesync.questionFloat("");

                    contas.sacar(numero, valor);
                                        
                    keypress()
                    break;
                case 7:
                    console.log(colors.fg.whitestrong, "\n\nDepósito\n\n", colors.reset);
                    
                    console.log("digite o número da conta: ");
                    numero = readlinesync.questionInt("");

                    console.log("\ndigite o valor do depósito (R$): ");
                    valor = readlinesync.questionFloat("");

                    contas.depositar(numero, valor);
    
                    keypress()
                    break;
                case 8:
                    console.log(colors.fg.whitestrong, "\n\nTransferência entre Contas\n\n", colors.reset);

                    console.log("digite o número da conta de origem: ");
                    numero = readlinesync.questionInt("");

                    
                    console.log("digite o número da conta de destino: ");
                    numeroDestino = readlinesync.questionInt("");  

                    console.log("\ndigite o valor do depósito (R$): ");
                    valor = readlinesync.questionFloat("");

                    contas.transferir(numero, numeroDestino, valor);

                    keypress()
                    break;
                default:
                    console.log(colors.fg.whitestrong, 
                        "\nOpção Inválida!\n", colors.reset);

                    keypress()
                    break;
            }

        }

    }

    export function sobre(): void{
    console.log("\n*****************************************************");
    console.log("Projeto Desenvolvido por: Matheus Antonio Santos Lins ");
    console.log("Generation Brasil - matheusl@genstudents.org");
    console.log("https://github.com/Matheus-Lins/Conta_Bancaria");
    console.log("*****************************************************");
    }

    function keypress(): void {
        console.log(colors.reset, "");
        console.log("\nPressione enter para continuar...");
        readlinesync.prompt();
    }

    main();

    