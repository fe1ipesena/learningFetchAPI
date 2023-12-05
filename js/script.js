
const GeneroLivro = {
    TEXTOS_RELIGIOSOS: 'Textos Religiosos',
    TERROR: 'Terror',
    COMEDIA: 'Comedia',
    COMEDIA_ROMANTICA: 'Comédia Romântica',
    SUSPENSE: 'Suspense',
    DRAMA: 'Drama',
    POLICIAL: 'Policial',
    HISTORIA: 'História',
    FICCAO_CIENTIFICA: 'Ficção Científica'
};

//ENTIDADE BIBLIOGRAFICA É UMA CLASS
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

/*LIVRO ESTA HERDANDO ENTIDADE BIBLIOGRAFICA E 
TENDO UM NOVO ATRIBUTO GENERO*/
class Livro extends EntidadeBibliografica {
    constructor(titulo, autor, anoPublicacao, codigo,
        genero){
        super(titulo, autor, anoPublicacao, codigo)
        this.genero = genero

    }

    informacoes(){
        console.log(this.titulo)
        console.log(this.autor)
        console.log(this.anoPublicacao)
        console.log(this.codigo)
        console.log(this.genero)
    }

}
/*LIVRO ESTA HERDANDO ENTIDADE BIBLIOGRAFICA E 
TENDO UM NOVO ATRIBUTO GENERO*/


/*REVISTA ESTA HERDANDO ENTIDADE BIBLIOGRAFICA E 
TENDO UM NOVO ATRIBUTO EDICAO*/
class Revista extends EntidadeBibliografica {
    constructor(titulo, autor, anoPublicacao, codigo,
        edicao){
        super(titulo, autor, anoPublicacao, codigo)
        this.edicao = edicao
    }

    informacoes(){
        console.log(this.titulo)
        console.log(this.autor)
        console.log(this.anoPublicacao)
        console.log(this.codigo)
        console.log(this.edicao)
    }

}
/*REVISTA ESTA HERDANDO ENTIDADE BIBLIOGRAFICA E 
TENDO UM NOVO ATRIBUTO EDICAO*/


class Usuario {
    constructor(nome, registroAcademico, dataNascimento){
        this.nome = nome
        this.registroAcademico = registroAcademico
        this.dataNascimento = dataNascimento
    }
}

class Biblioteca {
    constructor(acervo, usuarios){
        this.acervo = []
        this.usuarios = []
    }

    adicionarItem(item){
        this.acervo.push(item)
    }

    listarAcervo(){
        console.log("Acervo da biblioteca:")
        if(this.acervo.length == 0){
            console.log('Acervo vazio.')
            alert('Acervo vazio!')
        }else{
            this.acervo.forEach(item => {
                const infoUsuario = item.usuarioEmprestimo
                ? `Emprestado para: ${item.usuarioEmprestimo.nome}`
                :'Disponivel';
                console.log(`-> ${item.titulo} Código: ${item.codigo}`)
                
            })
        }
    }

    adicionarUsuario(usuario){
        this.usuarios.push(usuario)
        console.log(`Usuário ${usuario.nome} adicionado
        à biblioteca.`)
    }

    emprestarItem(codigo, registroAcademico){
        const item = this.acervo.find(item => item.codigo === codigo);

        if (item){
            const usuarioEmprestimo = this.usuarios.find(usuario=> usuario.registroAcademico === registroAcademico)

            if(usuarioEmprestimo){
                item.emprestar(usuarioEmprestimo)
                console.log('Livro emprestado com sucesso.')
            }else{
                console.log(`Usuário com registro acadêmico ${registroAcademico}`)
            }
        }else {
            console.log(`Item com código ${codigo} não encontrado no acervo.`)
        }

    }

    devolverItem(codigo){
        const item = this.acervo.find(item => item.codigo === codigo)

        if(item){
            item.devolver()
            console.log(`Item com código ${codigo} devolvido
            ao acervo.`)
        }else{
            console.log(`Item com código ${codigo} 
            não encontrado no acervo.`)
        }
    }

}