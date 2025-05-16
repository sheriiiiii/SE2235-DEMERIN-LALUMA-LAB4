describe('Todo App Edge Cases', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('prevents adding a task without a title', () => {
        cy.contains('Add Task').click();
        cy.contains('Title is required').should('exist');
    });

    it('prevents adding a timed task with no due date', () => {
        cy.get('select').first().select('Timed');
        cy.get('input[placeholder="Task title"]').type('Task without date');
        cy.contains('Add Task').click();
        cy.contains('Due date is required').should('exist');
    });

    it('shows error when due date is in the past for timed tasks', () => {
        cy.get('select').first().select('Timed');
        const pastDate = new Date(Date.now() - 3600 * 1000).toISOString().slice(0, 16);
        cy.get('input[type="datetime-local"]').type(pastDate);
        cy.get('input[placeholder="Task title"]').type('Invalid Timed Task');
        cy.contains('Add Task').click();
        cy.contains('Due date cannot be in the past').should('exist');
    });

    it('ignores search with empty input', () => {
        cy.get('input[placeholder="Search tasks"]').clear();
        cy.contains('Search').click();
    });
});
