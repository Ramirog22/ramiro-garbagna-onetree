class homePage {
    elements = {
        LoggedInText: () => cy.get('div.ng-scope > :nth-child(2)'),
        LogOutBtn: () => cy.get('a')
    };

    // Set Function

    logout() {
        this.elements.LogOutBtn().click();
    }
}

module.exports = new homePage();