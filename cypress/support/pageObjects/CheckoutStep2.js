export class CheckoutStep2 {
    get finishButton() {
        return cy.get('[data-test=finish]');
    }

    finishPayment() {
        this.finishButton.click();
        return this;
    }
}

export default new CheckoutStep2();