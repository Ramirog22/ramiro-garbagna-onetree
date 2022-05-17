// Generic URL of the Login page
const LOGIN_URL = "https://www.way2automation.com/angularjs-protractor/registeration/#/login";

class loginPage {
    // Set every object in the page
    elements = {
        UsernameText: () => cy.get('#username'),
        PasswordText: () => cy.get('#password'),
        UserDescriptionText: () => cy.get('#formly_1_input_username_0'),
        LoginBtn: () => cy.get('.btn'),
        ErrorMsg: () => cy.get('.alert-danger'),
        UsernameInfoTxt: () => cy.get(".ng-scope").eq(3),
        PasswordInfoTxt: () => cy.get(".ng-scope").eq(4)
    }

    // Set Functions

    goToLogInPage() {
        cy.visit(LOGIN_URL);
    }

    typeUsername(user) {
        this.elements.UsernameText().type(user);
    }

    typePassword(pass) {
        this.elements.PasswordText().type(pass);
    }

    typeUserDescription(des) {
        this.elements.UserDescriptionText().type(des);
    }

    clickLogInBtn() {
        this.elements.LoginBtn().click();
    }
}

module.exports = new loginPage();