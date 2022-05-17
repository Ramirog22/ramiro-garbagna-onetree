// Go to cypress > fixtures > user_registration_fixture.json to change the test data

// Import all the necessary POMs
import loginPage from '../../pages/loginPage';
import homePage from '../../pages/homePage';

// Data
let testData;

describe('User Login Tests', () => {
    // This function will be called before the fisrt test begin
    before(() => {
        // Load the data to execute the test
        cy.fixture('userLoginFixture').then((data) => {
            testData = data;
        })
    })

    // This function will be executed every time a new test start
    beforeEach(() => {
        // Goes to the login page
        loginPage.goToLogInPage();
    });

    // Successfull login test
    it('User login success', () => {
        // Type Username, Password and a user description
        loginPage.typeUsername(testData.username);
        loginPage.typePassword(testData.password);
        loginPage.typeUserDescription(testData.description);

        // Click on Login
        loginPage.clickLogInBtn();

        // Check that the Home Page loads correctly
        homePage.elements.LoggedInText().should('include.text', "You're logged in!!");
    });
    
    it('User login fail by wrong username', () => {
        // Type Username, Password and a user description 
        loginPage.typeUsername('wrong-username');
        loginPage.typePassword(testData.password);
        loginPage.typeUserDescription(testData.description);
        
        // Click on Login
        loginPage.clickLogInBtn();

        // Check that the error msg shows
        loginPage.elements.ErrorMsg().should('be.visible');
    });

    it('Check that alert from not entering a username and password shows', () => {
        // Check that both username and password info text says that there's no content written 
        loginPage.elements.UsernameInfoTxt().should('include.text', "You did not enter a username");
        loginPage.elements.PasswordInfoTxt().should('include.text', "You did not enter a username");
    })

    it('Check that alert from minimum characters for user and pass are visible', () => {
        // Type Username, Password and a user description
        loginPage.typeUsername('as');
        loginPage.typePassword('as');

        // Check that the info text shows the correct msg
        loginPage.elements.UsernameInfoTxt().should('include.text', "Your username must be between 3 and 50 characters long");
        loginPage.elements.PasswordInfoTxt().should('include.text', "Your username must be between 3 and 100 characters long");
    });

    it('LOGIN btn should be disabled with no user or password entered', () => {
        loginPage.elements.LoginBtn().should('be.disabled');
    });

    it('Check that the LOGIN btn gets enabled only when user, pass and description are typed', () => {
        // Type Username and check that the login button is disabled
        loginPage.typeUsername(testData.username);
        loginPage.elements.LoginBtn().should('be.disabled');

        // Type Username and check that the login button is disabled
        loginPage.typePassword(testData.password);
        loginPage.elements.LoginBtn().should('be.disabled');

        // Type Username description and check that the login button is enabled
        loginPage.typeUserDescription(testData.description);
        loginPage.elements.LoginBtn().should('not.be.disabled');
    });

    it('User Logout', () => {
        // Type Username, Password and a user description
        loginPage.typeUsername(testData.username);
        loginPage.typePassword(testData.password);
        loginPage.typeUserDescription(testData.description);

        // Click on Login
        loginPage.clickLogInBtn();

        // Check that the Home Page loads correctly
        homePage.elements.LoggedInText().should('include.text', "You're logged in!!");

        // Clicks Logout btn
        homePage.logout();

        // Checks that it returned to the login page
        loginPage.elements.UsernameText().should('exist');
    })
});