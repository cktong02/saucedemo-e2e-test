import { expect } from 'chai';
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
// import loginPage from '@pageObjects/Login';
import loginPage from '../../../support/pageObjects/Login';
import productPage from '../../../support/pageObjects/Product';
import cartPage from '../../../support/pageObjects/Cart';
import checkoutStep1Page from '../../../support/pageObjects/CheckoutStep1';
import checkoutStep2Page from '../../../support/pageObjects/CheckoutStep2';

defineParameterType({
    name: "number",
    regexp: /\d+/
});

Given('user opens login page', () => {
    loginPage.navigate();
})

Given('user is in product items page', () => {
    if(!productPage.isCurrentPage()) {
        productPage.navigate();
    }
})

Given('there are product items', () => {
    productPage.hasProductItems();
})

Given('basket is empty', () => {
    productPage.hasEmptyBasket();
})

Given('there exist cart item', () => {
    cartPage.hasItem();
})

When('user logins as {string}', (userType) => {
    cy.fixture('users').then(users => {
        const targetUser = users[userType];
        if (!targetUser) {
            const errorMessage = `User type "${userType}" not found in test data.`;
            cy.log(errorMessage);
            throw errorMessage;
        }
        const {username, password} = targetUser;
        loginPage.login(username, password);
    });
})

When('user sorts items by price high to low', () => {
    productPage.sortItemsByPriceHighToLow();
})

When('user adds the cheapest & costliest products to basket', () => {
    productPage.addFirstItemToBasket();
    productPage.addLastItemToBasket();
})

When('user opens basket', () => {
    productPage.openBasket();
})

When('user checkout', () => {
    cartPage.checkout();
})

When('{string} confirms payment info', (userType) => {
    cy.fixture('users').then(users => {
        const targetUser = users[userType];
        if (!targetUser) {
            const errorMessage = `User type "${userType}" not found in test data.`;
            cy.log(errorMessage);
            throw errorMessage;
        }
        const {firstName, lastName, postalCode} = targetUser;
        checkoutStep1Page.fillPaymentInfo(firstName, lastName, postalCode)
            .continuePayment();
        checkoutStep2Page.finishPayment();
    });
})

Then(/user lands on (product|cart|checkout complete) page/, (pageName) => {
    cy.url().should('eq', `${Cypress.config().baseUrl}${Cypress.config().pageUrl[pageName]}`)
})

Then(/each item is (more|less) expensive than following item/, (ranking) => {
    productPage.itemPrices.then(($elements) => {
        const actualPrices = Cypress.$.makeArray($elements)
            .map((element) => Number(element.innerText.replace('$', '')));
        
        let expectedPrices = Array.from(actualPrices);
        switch(ranking) {
            case 'more':
                //sort price high to low
                expectedPrices.sort(function(a, b) {
                    return b - a
                });
                break;
            case 'less':
                //sort price low to high
                expectedPrices.sort(function(a, b) {
                    return a - b
                });
                break;
            default:
                throw `Unexpected terms "${ranking} expensive than"`;
        }
        expect(expectedPrices).to.deep.equal(actualPrices);
    });
})

Then('user sees {number} items in basket', (count) => {
    productPage.cartBadge.should('have.text', count);
})