describe('Google Books - Busca e Visualização de Detalhes', () => {
  const searchTerm = '1984';         // Livro para busca por título
  const authorTerm = 'George Orwell'; // Autor para busca por autor
  const erroTermo = 'gfruhg3foiurgfo3urbvgfoug'; // Termo de erro para busca sem resultados

  beforeEach(() => {
    // Acessa a página inicial do Google Books antes de cada teste
    cy.visit('https://books.google.com/');
  });

  it('Deve acessar a página inicial', () => {
    cy.get('body').should('be.visible'); // Verifica se a página foi carregada
  });

  it('Deve buscar um livro pelo nome e clicar no resultado', () => {
    // Busca um livro pelo título
    cy.xpath("//input[contains(@id,'oc-search-input')]")
      .should('be.visible')
      .type(`${searchTerm}{enter}`, { delay: 100 });

    // Localiza o livro "1984" e clica no resultado
    cy.xpath("(//h3[contains(text(),'1984')])[1]", { timeout: 10000 })
      .should('be.visible')
      .click();

  });

  it('Deve buscar livros pelo autor e clicar no resultado', () => {
    // Realiza a busca por autor
    cy.xpath("//input[contains(@id,'oc-search-input')]")
      .should('be.visible')
      .type(`${authorTerm}{enter}`, { delay: 100 });

    // Localiza "George Orwell" nos resultados e clica nele
    cy.xpath("(//span[contains(text(),'George Orwell')])[2]", { timeout: 10000 })
      .should('be.visible')
      .click();

    // Verifica se a página contém informações relacionadas ao autor
    cy.get('body').should('contain.text', authorTerm);
  });

  it('Deve validar busca sem resultados', () => {
    // Realiza uma busca com termo inválido
    cy.xpath("//input[contains(@id,'oc-search-input')]")
      .should('be.visible')
      .type(`${erroTermo}{enter}`);

    // Verifica se aparece uma mensagem indicando que não houve correspondência
    cy.contains('não corresponde aos resultados de livros', { timeout: 10000 })
      .should('be.visible');
  });
});
