
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

    adicionarLivro(item) {
        const { titulo, autor, anoPublicacao, codigo, genero } = item;
        const livro = new Livro(titulo, autor, anoPublicacao, codigo, genero);
        this.adicionarItem(livro);
    }

    adicionarRevista(item) {
        const { titulo, autor, anoPublicacao, codigo, edicao } = item;
        const revista = new Revista(titulo, autor, anoPublicacao, codigo, edicao);
        this.adicionarItem(revista);
    }

listarAcervo() {
    console.log("Acervo da biblioteca:");
    const itensDisponiveis = this.acervo.filter(item => !item.emprestado);

    if (itensDisponiveis.length === 0) {
        console.log('Acervo vazio.');
        alert('Acervo vazio!');
    } else {
        itensDisponiveis.forEach(item => {
            console.log(`-> ${item.titulo} Código: ${item.codigo}`);
        });
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
            const usuarioEmprestimo = this.usuarios.find(usuario => usuario.registroAcademico === registroAcademico);
    
            if (usuarioEmprestimo){
                item.emprestar(usuarioEmprestimo);
            } else {
                console.log(`Usuário com registro acadêmico ${registroAcademico} não encontrado.`);
                return;
            }
        } else {
            console.log(`Item com código ${codigo} não encontrado no acervo.`);
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

const biblioteca = new Biblioteca();

async function fetchData() {
    try {
        const response = await fetch('https://api-biblioteca-mb6w.onrender.com/acervo');
        if (!response.ok) {
            throw new Error('Erro ao carregar os dados da API');
        }
        
        const data = await response.json();
        
        data.forEach(item => {
            if (item.entidadeBibliografica === 'Livro') {
                const livro = new Livro(item.titulo, item.autor, item.anoPublicacao, item.codigo, item.genero);
                biblioteca.adicionarItem(livro);
            } else if (item.entidadeBibliografica === 'Revista') {
                const revista = new Revista(item.titulo, item.autor, item.anoPublicacao, item.codigo, item.edicao);
                biblioteca.adicionarItem(revista);
            }
        });

        //PLAYGROUND DE TESTES

        // Criando objetos
        const livro1 = new Livro('JavaScript: The Good Parts', 'Douglas Crockford', 2008, 1234, 'Terror');
        const revista1 = new Revista('National Geographic', 'National Geographic Society', 2022, 5678, 'Edição de Janeiro');

        // Adicionando itens à biblioteca
        biblioteca.adicionarItem(livro1);
        biblioteca.adicionarItem(revista1);

        // ... (restante do seu código)
    } catch (error) {
        console.error('Ocorreu um erro ao carregar os dados da API:', error.message);
    }
}

fetchData();


const usuario1 = new Usuario('Maria', 201, '1990-05-15');
const usuario2 = new Usuario('Pedro', 202, '1985-10-20');
const usuario3 = new Usuario('Jose', 203, '1985-10-20');
const usuario4 = new Usuario('Marta', 204, '1985-10-20');
const usuario5 = new Usuario('Mocreia', 205, '1985-10-20');


// Adicionando usuários à biblioteca
biblioteca.adicionarUsuario(usuario1);
biblioteca.adicionarUsuario(usuario2);
biblioteca.adicionarUsuario(usuario3);
biblioteca.adicionarUsuario(usuario4);
biblioteca.adicionarUsuario(usuario5);

biblioteca.listarAcervo(); // Verificar o acervo após devolução