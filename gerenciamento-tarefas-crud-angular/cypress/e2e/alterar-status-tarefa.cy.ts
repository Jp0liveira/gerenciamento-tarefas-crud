describe('Alteração de Status da Tarefa', () => {
  it('Deve marcar a tarefa como concluída', () => {
    cy.visit('/tarefas');

    cy.get('mat-checkbox input[type="checkbox"]').first().click({ force: true });

    cy.get('.status-text').first().should('contain.text', 'Concluída');
  });
});
