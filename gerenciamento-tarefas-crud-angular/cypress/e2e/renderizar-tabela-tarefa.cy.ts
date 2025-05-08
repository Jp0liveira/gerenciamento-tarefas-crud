describe('Renderização da Tabela de Tarefas', () => {
  beforeEach(() => {
    cy.visit('/tarefas');
  });

  it('Deve exibir colunas esperadas na tabela', () => {
    cy.get('mat-header-cell').contains('Título').should('exist');
    cy.get('mat-header-cell').contains('Descrição').should('exist');
    cy.get('mat-header-cell').contains('Vencimento').should('exist');
    cy.get('mat-header-cell').contains('Status').should('exist');
  });
});
