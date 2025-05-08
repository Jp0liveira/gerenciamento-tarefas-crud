describe('Criação de Tarefa', () => {
  it('Deve criar uma nova tarefa', () => {
    cy.visit('/tarefas/nova');

    cy.url().should('include', '/tarefas/nova');
    cy.get('#titulo-tarefa-form').type('text');
    cy.get('#descricao-tarefa-form').type('text');
    cy.get('#salvar').click();

    cy.contains('Tarefa salva com sucesso!').should('exist');
  });
});
