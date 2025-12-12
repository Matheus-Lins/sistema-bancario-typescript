import { log } from "console";
import { Conta } from "../model/Conta";
import { ContaCorrente } from "../model/ContaCorrente";
import { ContaPoupanca } from "../model/ContaPoupanca";
import { ContaRepository } from "../repository/ContaRepository";
import { colors } from "../util/Colors";

export class ContaController implements ContaRepository{

    private listaContas: Array<Conta> = new Array<Conta>();
    numero: number = 0;

    procurarPorNumero(numero: number): void {
        let buscaConta = this.buscaNoArray(numero);

        if(buscaConta != null){
            buscaConta.visualizar();
        }else
            console.log(colors.fg.red, "\nA conta numero: " + numero + " não foi encontrada!", colors.reset);
    }
    listarTodas(): void {
        for (let conta of this.listaContas){
            conta.visualizar();
        };
    }
    cadastrar(conta: Conta): void {
        this.listaContas.push(conta);
        console.log(colors.fg.green, "\nA conta número: " + conta.numero + " foi criada com sucesso!", colors.reset);
    }
    atualizar(conta: Conta): void {
        let buscaConta = this.buscaNoArray(conta.numero);

        if (buscaConta != null){
            this.listaContas[this.listaContas.indexOf(buscaConta)] = conta;
            console.log(colors.fg.green, "\nA conta numero: " + conta.numero + " foi atualizada com sucesso!", colors.reset);
            
        }else
            console.log(colors.fg.red, "\nA conta numero: " + conta.numero + " não foi encontrada!", colors.reset);
            
    }
    deletar(numero: number): void {
        let buscaConta = this.buscaNoArray(numero);

        if(buscaConta != null){
            this.listaContas.splice(this.listaContas.indexOf(buscaConta), 1);
            console.log(colors.fg.red, "\nA conta númeor: " + numero + " foi apagada com sucesso!", colors.reset);
        }else
            console.log(colors.fg.red, "\nA conta número: " + numero + " não foi encontrada!", colors.reset);
            
    }
    sacar(numero: number, valor: number): void {
        let conta = this.buscaNoArray(numero);

        if(conta != null){
            
            if(conta.sacar(valor) == true)
            console.log(colors.fg.green, "\nO saque na conta número: " + numero + " foi efetuado com sucesso!", colors.reset);
                
        }else
            console.log(colors.fg.red, "\n conta número: " + numero + " nao foi encontrada!", colors.reset);
            
    }
    depositar(numero: number, valor: number): void {
        let conta = this.buscaNoArray(numero);

        if(conta != null){
            conta.depositar(valor);
            console.log(valor);
            console.log(colors.fg.green, "\nO deposito na conta numero: " + numero + " foi efetuado com sucesso!", colors.reset);

        }else
            console.log(colors.fg.red, "\nA conta numero: " + numero + " não foi encontrada ou a conta destino não é uma conta corrente!", colors.reset);
    }
    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
            let ContaOrigem = this.buscaNoArray(numeroOrigem);
            let contaDestino = this.buscaNoArray(numeroDestino);

            if(ContaOrigem != null && contaDestino != null){
                if(ContaOrigem.sacar(valor) == true){
                    contaDestino.depositar(valor);
                    console.log(colors.fg.green, "\nA transferência da conta numero: " + numeroOrigem + " para a conta numero: " + numeroDestino + " foi efetuada com sucesso!", colors.reset);
                    
                }
            }else
                console.log(colors.fg.red, "\nA conta número: " + numeroOrigem + " e/ou a conta numero: " + numeroDestino + " não foram encontradas!", colors.reset);
                
    }

    //métodos auxiliares

    // gerar número da conta
    public gerarNumero(): number{
        return ++ this.numero;
    }

    public buscaNoArray(numero: number): Conta | null{
        for(let conta of this.listaContas){
            if(conta.numero === numero)
                return conta;
        }

        return null;
    }


    

}    

