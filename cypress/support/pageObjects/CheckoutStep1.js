export class CheckoutStep1 {
    get firstNameField() {
        return cy.get('[data-test=firstName]');
    }

    get lastNameField() {
        return cy.get('[data-test=lastName]');
    }

    get postalCodeField() {
        return cy.get('[data-test=postalCode]');
    }

    get continueButton() {
        return cy.get('[data-test=continue]');
    }

    fillPaymentInfo(firstName, lastName, postalCode) {
        this.firstNameField.type(firstName);
        this.lastNameField.type(lastName);
        this.postalCodeField.type(postalCode);
        return this;
    }

    continuePayment() {
        this.continueButton.click();
        return this;
    }
}

export default new CheckoutStep1();