# Sistema de Biblioteca em JavaScript

Este projeto foi desenvolvido com o objetivo de praticar a utilização da Fetch API e a programação orientada a objetos (POO) em JavaScript. O sistema simula uma biblioteca, onde é possível gerenciar o acervo de livros e revistas, realizar empréstimos e devoluções, além de cadastrar usuários.

## 📚 Funcionalidades do Sistema

1. **Gerenciamento de Acervo**:
   - Adicionar livros e revistas ao acervo utilizando a API [https://api-biblioteca-mb6w.onrender.com/acervo](https://api-biblioteca-mb6w.onrender.com/acervo).
   - Listar todos os itens do acervo, incluindo detalhes como título, autor, ano de publicação e disponibilidade para empréstimo.

2. **Empréstimos e Devoluções**:
   - Empréstimo de livros e revistas para usuários cadastrados.
   - Devolução de itens emprestados ao acervo.

3. **Gerenciamento de Usuários**:
   - Adicionar novos usuários, informando nome, registro acadêmico e data de nascimento.
   - Associar usuários aos itens emprestados.

## 🛠️ Estrutura de Classes

### EntidadeBibliografica
Classe base que define os atributos e métodos comuns para livros e revistas.

- **Atributos**:
  - `titulo`
  - `autor`
  - `anoPublicacao`
  - `codigo`
  - `emprestado` (booleano)
  - `usuarioEmprestimo` (objeto `Usuario`, ou `null` se não estiver emprestado)

- **Métodos**:
  - `emprestar(usuario)`
  - `devolver()`

### Livro (herda de EntidadeBibliografica)
Classe que representa um livro com um atributo adicional de gênero.

- **Atributos**:
  - `genero`

- **Métodos**:
  - `informacoes()`

### Revista (herda de EntidadeBibliografica)
Classe que representa uma revista com um atributo adicional de edição.

- **Atributos**:
  - `edicao`

- **Métodos**:
  - `informacoes()`

### Usuario
Classe que define os usuários da biblioteca.

- **Atributos**:
  - `nome`
  - `registroAcademico`
  - `dataNascimento`

### Biblioteca
Classe que gerencia o acervo e os usuários da biblioteca.

- **Atributos**:
  - `acervo` (array para armazenar os itens)
  - `usuarios` (array para armazenar os usuários)

- **Métodos**:
  - `adicionarItem(item)`
  - `listarAcervo()`
  - `adicionarUsuario(usuario)`
  - `emprestarItem(codigo, registroAcademico)`
  - `devolverItem(codigo)`

## 🚀 Tecnologias Utilizadas

- **JavaScript**: Para implementar a lógica da aplicação e a interação com a API.
- **Fetch API**: Para realizar as requisições à API externa que fornece os livros e revistas.
- **HTML/CSS**: Para estruturar e estilizar o front-end da aplicação.
- **Netlify**: Plataforma de deploy utilizada para hospedar o projeto.

## 🎮 Como Executar o Projeto

Você pode acessar o projeto online através do link: [Biblioteca Minha](https://bibliotecaminha.netlify.app)

Ou, se preferir, seguir os passos abaixo para rodar localmente:

1. Clone o repositório:
   ```
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   ```
2. Abra o arquivo index.html no seu navegador.

## 💡 Funcionalidades Finais

- Cadastrar usuários.
- Consultar e listar livros e revistas.
- Realizar empréstimos e devoluções.
- Persistência dos dados durante a execução (não há persistência em banco de dados, mas a lógica de controle é mantida na aplicação).

## 📝 Requisitos do Projeto

Todos os requisitos definidos no projeto foram implementados:

- Criação das classes com herança e encapsulamento.
- Integração com API externa para listar acervo.
- Implementação de operações de CRUD para itens do acervo e usuários.
- Sistema de empréstimo e devolução funcional.

## 📈 Próximos Passos

- Adicionar persistência em um banco de dados.
- Implementar autenticação de usuários.
- Melhorar a interface gráfica para torná-la mais amigável e responsiva.

## 🤝 Contribuições

Sinta-se à vontade para abrir uma *issue* ou enviar um *pull request* caso tenha sugestões de melhorias ou queira contribuir com o projeto!

---

**Desenvolvido por fe1ipesena**
