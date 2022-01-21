export class Login {
    get usernameField() {
        return cy.get('[data-test=username]');
    }

    get passwordField() {
        return cy.get('[data-test=password]');
    }

    get loginButton() {
        return cy.get('[data-test=login-button]');
    }

    get errorMessage() {
        return cy.get('[data-test=error]');
    }

    navigate() {
        cy.visit(Cypress.config().pageUrl.login);
        return this;
    }

    login(username, password) {
        this.usernameField.type(username);
        this.passwordField.type(password);
        this.loginButton.click();
        return this;
    }
}

export default new Login();