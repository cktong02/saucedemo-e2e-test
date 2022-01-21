export class Cart {
    get cartItems() {
        return cy.get('.cart_item');
    }

    get checkoutButton() {
        return cy.get('[data-test=checkout]');
    }

    hasItem() {
        this.cartItems.should('have.length.of.at.least', 1);
        return this;
    }

    checkout() {
        this.checkoutButton.click();
        return this;
    }
}

export default new Cart();