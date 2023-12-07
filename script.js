// Definição da classe base EntidadeBibliografica
class EntidadeBibliografica {
    // Construtor da classe
    constructor(titulo, autor, anoPublicacao, codigo) {
      this.titulo = titulo;
      this.autor = autor;
      this.anoPublicacao = anoPublicacao;
      this.codigo = codigo;
      this.emprestado = false;
      this.usuarioEmprestimo = null;
    }
  
    // Método para emprestar a entidade bibliográfica a um usuário
    emprestar(usuario) {
      if (!this.emprestado) {
        this.emprestado = true;
        this.usuarioEmprestimo = usuario;
        console.log(`${this.constructor.name} "${this.titulo}" emprestado para ${usuario.nome}.`);
      } else {
        console.log(`O ${this.constructor.name.toLowerCase()} "${this.titulo}" já está emprestado.`);
      }
    }
  
    // Método para devolver a entidade bibliográfica
    devolver() {
      if (this.emprestado) {
        console.log(`${this.constructor.name} "${this.titulo}" devolvido.`);
        this.emprestado = false;
        this.usuarioEmprestimo = null;
      } else {
        console.log(`O ${this.constructor.name.toLowerCase()} "${this.titulo}" não está emprestado atualmente.`);
      }
    }
  
    // Método para obter informações da entidade bibliográfica
    informacoes() {
      return `${this.constructor.name} "${this.titulo}" - Autor: ${this.autor}, Ano de Publicação: ${this.anoPublicacao}`;
    }
  }
  
  // Definição da classe Livro que herda de EntidadeBibliografica
  class Livro extends EntidadeBibliografica {
    // Construtor da classe Livro
    constructor(titulo, autor, anoPublicacao, codigo, genero) {
      super(titulo, autor, anoPublicacao, codigo); // Chama o construtor da classe pai
      this.genero = genero;
    }
  
    // Método específico para obter informações sobre o livro
    informacoes() {
      return `${super.informacoes()}, Gênero: ${this.genero}`;
    }
  }
  
  // Definição da classe Revista que herda de EntidadeBibliografica
  class Revista extends EntidadeBibliografica {
    // Construtor da classe Revista
    constructor(titulo, autor, anoPublicacao, codigo, edicao) {
      super(titulo, autor, anoPublicacao, codigo); // Chama o construtor da classe pai
      this.edicao = edicao;
    }
  
    // Método específico para obter informações sobre a revista
    informacoes() {
      return `${super.informacoes()}, Edição: ${this.edicao}`;
    }
  }
  
  // Definição da classe Usuario
  class Usuario {
    // Construtor da classe Usuario
    constructor(nome, registroAcademico, dataNascimento) {
      this.nome = nome;
      this.registroAcademico = registroAcademico;
      this.dataNascimento = dataNascimento;
    }
  }
  
  // Definição da classe Biblioteca
  class Biblioteca {
    // Construtor da classe Biblioteca
    constructor() {
      this.acervo = []; // Array para armazenar as entidades bibliográficas
      this.usuarios = []; // Array para armazenar os usuários
    }
  
    // Método para adicionar uma entidade bibliográfica ao acervo
    adicionarItem(item) {
      this.acervo.push(item);
    }
  
    // Método para exibir o acervo da biblioteca
    listarAcervo() {
      console.log("Acervo da Biblioteca:");
      this.acervo.forEach(item => {
        const info = item.informacoes ? item.informacoes() : "Informações não disponíveis";
        console.log(info);
      });
    }
  
    // Método para adicionar um usuário à biblioteca
    adicionarUsuario(usuario) {
      this.usuarios.push(usuario);
    }
  
    // Método para emprestar um item para um usuário
    emprestarItem(codigo, registroAcademico) {
      const item = this.acervo.find(item => item.codigo === codigo);
      const usuario = this.usuarios.find(user => user.registroAcademico === registroAcademico);
  
      if (item && usuario) {
        item.emprestar(usuario);
      } else {
        console.log("Item ou usuário não encontrado.");
      }
    }
  
    // Método para devolver um item ao acervo
    devolverItem(codigo) {
      const item = this.acervo.find(item => item.codigo === codigo);
      if (item) {
        item.devolver();
      } else {
        console.log("Item não encontrado.");
      }
    }
  }
  
  // Criar um objeto Biblioteca
  const biblioteca = new Biblioteca();
  
  // Criar 5 objetos Usuários
  const usuarios = [
    new Usuario("Usuário 1", "111", "1990-01-01"),
    new Usuario("Usuário 2", "222", "1995-02-15"),
    new Usuario("Usuário 3", "333", "1988-07-10"),
    new Usuario("Usuário 4", "444", "2000-04-22"),
    new Usuario("Usuário 5", "555", "1993-11-30"),
  ];
  
  // Adicionar Usuários à Biblioteca
  usuarios.forEach(usuario => biblioteca.adicionarUsuario(usuario));
  
  // Obtendo dados da API para Livros e Revistas
  fetch("https://api-biblioteca-mb6w.onrender.com/acervo")
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        if (item.entidadeBibliografica === "Livro") {
          biblioteca.adicionarItem(new Livro(item.titulo, item.autor, item.anoPublicacao, item.codigo, item.genero));
        } else if (item.entidadeBibliografica === "Revista") {
          biblioteca.adicionarItem(new Revista(item.titulo, item.autor, item.anoPublicacao, item.codigo, item.edicao));
        }
      });
  
      // Realizando algumas operações
      biblioteca.listarAcervo();
      biblioteca.emprestarItem("LT456", "111");
      biblioteca.devolverItem("LT456");
    })
    .catch(error => console.error("Erro ao obter dados da API:", error));
  