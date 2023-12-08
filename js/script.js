
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
            alert('Impossivel emprestar item já emprestado')
            }else{
            alert('Item emprestado com sucesso')
            this.emprestado = true
            this.usuarioEmprestimo = usuario
        }
        }

        devolver(){
            if (this.emprestado !== true){
                alert('Impossivel devolver item não emprestado.')
            }else{
                alert('Item devolvido com sucesso.')
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

    informacao(){
        const usuarioEmprestimoInfo = this.emprestado ? this.usuarioEmprestimo.nome : 'Não emprestado';
        alert(`Código: ${this.codigo}\nTítulo: ${this.titulo}\nAutor: ${this.autor}\nAno de Publicação: ${this.anoPublicacao}\nUsuário emprestado: ${usuarioEmprestimoInfo}\nGênero: ${this.genero}`);
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

    informacao(){
        const usuarioEmprestimoInfo = this.emprestado ? this.usuarioEmprestimo.nome : 'Não emprestado';
        alert(`Código: ${this.codigo}\nTítulo: ${this.titulo}\nAutor: ${this.autor}\nAno de Publicação: ${this.anoPublicacao}\nUsuário emprestado: ${usuarioEmprestimoInfo}\nEdição: ${this.edicao}`);
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
    constructor(){
        this.acervo = []
        this.usuarios = []
    }

    adicionarItem(item){
        this.acervo.push(item)
    }

    listarAcervo() {
        let acervoInfo = "Acervo da biblioteca:\n";
        const itensDisponiveis = this.acervo.filter(item => !item.emprestado);
    
        if (itensDisponiveis.length === 0) {
            console.log('Acervo vazio.');
            alert('Acervo vazio!');
        } else {
            itensDisponiveis.forEach(item => {
                acervoInfo += `-> ${item.titulo} | Código: ${item.codigo}\n`;
            });
            alert(acervoInfo);
        }
    }

listarUsuarios() {
    let userInfo = "Usuários cadastrados:\n"
    const usuariosCadastrados = this.usuarios

    if (usuariosCadastrados.length === 0) {
        alert('Não há usuários cadastrados!');
    } else {
        usuariosCadastrados.forEach(item => {
            userInfo += (`-> ${item.nome} RA: ${item.registroAcademico}\n`);
        });
        alert(userInfo)
    }
}

    adicionarUsuario(usuario){
        this.usuarios.push(usuario)
    }

    emprestarItem(codigo, registroAcademico){
        console.log(`Tentando emprestar item com código ${codigo} para o usuário com RA ${registroAcademico}`);
    console.log('Acervo:', this.acervo); // Verificar se há itens no acervo
        const item = this.acervo.find(item => item.codigo.toUpperCase() === codigo.toUpperCase());
    
        if (item){
            const usuarioEmprestimo = this.usuarios.find(usuario => usuario.registroAcademico === registroAcademico);
    
            if (usuarioEmprestimo){
                item.emprestar(usuarioEmprestimo);
            } else {
                    alert(`Usuário com registro acadêmico ${registroAcademico} não encontrado.`);
                return;
            }
        } else {
            alert(`Item com código ${codigo} não encontrado no acervo.`);
        }
    }
    
    devolverItem(codigo){
        const item = this.acervo.find(item => item.codigo.toUpperCase() === codigo.toUpperCase())

        if(item){
            item.devolver()
        }else{
            alert(`Item com código ${codigo} 
            não encontrado no acervo.`)
        }
    }

}

const biblioteca = new Biblioteca();

async function fetchAcervo() {
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
    } catch (error) {
        console.error('Ocorreu um erro ao carregar os dados da API:', error.message);
    }
}

async function fetchUser() {
    try {
        const response = await fetch('https://api-biblioteca-mb6w.onrender.com/users');
        if (!response.ok) {
            throw new Error('Erro ao carregar os dados da API');
        }
        
        const data = await response.json();
        
        data.forEach(dataUsuario => {
            const usuario = new Usuario(dataUsuario.nome, dataUsuario.registroAcademico, dataUsuario.dataNascimento);
            biblioteca.adicionarUsuario(usuario);
        });
    } catch (error) {
        console.error('Ocorreu um erro ao carregar os dados da API de usuários:', error.message);
    }
}

fetchAcervo();
fetchUser();

function adicionarLivro() {

    const titulo = prompt('Digite o titulo do livro')
    const autor = prompt('Digite o autor do livro')
    const anoPublicacao = prompt('Digite o ano do livro')
    const codigo = prompt('Digite o codigo do livro')
    const genero = prompt('Digite o genero do livro')

    const livro = new Livro(titulo, autor, anoPublicacao, codigo, genero);
    biblioteca.adicionarItem(livro);
}

function adicionarRevista() {

    const titulo = prompt('Digite o titulo da revista')
    const autor = prompt('Digite o autor da revista')
    const anoPublicacao = prompt('Digite o ano da revista')
    const codigo = prompt('Digite o codigo da revista')
    const edicao = prompt('Digite a edição da revista')

    const revista = new Revista(titulo, autor, anoPublicacao, codigo, edicao);
    biblioteca.adicionarItem(revista);
}

function emprestarItemInterativo(){
    const codigo = prompt('Digite o código do item que deseja emprestar:')
    const registroAcademico = prompt('Digite seu RA')

    biblioteca.emprestarItem(codigo, registroAcademico)
}

function devolverItemInterativo() {
    const codigo = prompt('Digite o código do item que será devolvido:')

    biblioteca.devolverItem(codigo)
}

function informacaoPrompt() {
    const codigo = prompt('Digite o código do item:')
    const item = biblioteca.acervo.find(item => item.codigo.toUpperCase() === codigo.toUpperCase())

if (!item){
    alert('Item não encontrado')
}
else{
    item.informacao()
}

}

function adicionarUsuarioInterativo() {
    const name = prompt('Digite o nome do usuário')
    const registroAcademico = prompt('Digite o RA do usuário')
    const birth = prompt('Digite a data de nascimento do usuário')

    const newUser = new Usuario(name, registroAcademico, birth)
    biblioteca.adicionarUsuario(newUser)
    alert(`Usuário ${name} adicionado à biblioteca.`)
}