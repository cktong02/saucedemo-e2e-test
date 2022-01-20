export class Cart {
    navigate() {
        cy.visit(Cypress.config().pageUrl.cart);
        return this;
    }
}

export default new Cart();