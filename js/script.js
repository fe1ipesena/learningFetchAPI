
//ENTIDADE BIBLIOGRAFICA
class EntidadeBibliografica {
    constructor(titulo, autor, anoPublicacao, codigo){
            this.titulo = titulo
            this.autor = autor
            this.anoPublicacao = anoPublicacao
            this.codigo = codigo
            this.emprestado = false
            this.usuarioEmprestimo = null
        }

        emprestar(usuario){
            if (this.emprestado === true){
            console.log('Impossivel emprestar livro ja emprestado')
            }else{
            console.log('Livro emprestado com sucesso')
            this.emprestado = true
            this.usuarioEmprestimo = usuario
        }
        }

        devolver(){
            if (this.emprestado !== true){
                console.log('Impossivel devolver livro nao emprestado.')
            }else{
                console.log('Livro devolvido com sucesso.')
                this.emprestado = false
                this.usuarioEmprestimo = null
            }
        }

}
//ENTIDADE BIBLIOGRAFICA É UMA CLASS

class Livro extends EntidadeBibliografica {
    constructor(titulo, autor, anoPublicacao, codigo,
        genero){
        super(titulo, autor, anoPublicacao, codigo)
        this.genero = genero

        informacoes(){

        }

    }
}

class Revista extends EntidadeBibliografica {
    constructor(titulo, autor, anoPublicacao, codigo,
        edicao){
        super(titulo, autor, anoPublicacao, codigo)
        this.edicao = edicao

        informacoes(){

        }

    }
}
