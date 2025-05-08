describe('Teste de Listagem de Tarefas', () => {
  beforeEach(() => {
    cy.visit('/tarefas');
  });

  it('Deve carregar a lista de tarefas', () => {
    cy.get('mat-table').should('exist');
    cy.get('mat-row').should('have.length.at.least', 1);
  });
});
