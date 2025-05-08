describe('Edição de Tarefa', () => {
  it('Deve navegar até a tela de edição ao clicar no botão de editar', () => {
    cy.visit('/tarefas');

    cy.get('#editar-tarefa').click();
    cy.url().should('include', '/tarefas/editar');
    cy.get('#titulo-tarefa-form').type('Tarefa Editada');
    cy.get('#descricao-tarefa-form').type('Descrição Editada');
    cy.get('#salvar').click();

    cy.contains('Tarefa salva com sucesso!').should('exist');
  });
});



