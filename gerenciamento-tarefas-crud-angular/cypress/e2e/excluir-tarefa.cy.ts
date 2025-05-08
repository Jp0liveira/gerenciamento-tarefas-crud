describe('Exclusão de Tarefa', () => {
  it('Deve excluir uma tarefa da lista', () => {
    cy.visit('/tarefas');

    cy.get('#deletar-tarefa').click();

    cy.contains('Tarefa exluída com sucesso!').should('exist');
  });
});
