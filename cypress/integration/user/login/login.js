import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import loginPage from '../../../support/pageObjects/Login';

Given('user opens login page', () => {
    loginPage.navigate();
})

When('user logins as {string}', (userType) => {
    cy.getUser(userType)
        .then(targetUser => {
            const {username, password} = targetUser;
            loginPage.login(username, password);
        });
})

Then('there is incorrect credential error', (pageName) => {
    loginPage.errorMessage.should('be.visible');
})