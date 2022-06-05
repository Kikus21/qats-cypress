const email = 'tech_task@qats.sk';
const password = '124lkjAF89as';
const publishArticleRequestId = 'publishArticle';

export function clickOnSignIn() {
    cy.log('Login to SUT using Test User');

    cy.get('a[href="#login"]')
        .should('contain', 'Sign in')
        .click();
};

export function logIn() {
    cy.intercept('POST', '/api/users/login').as('logIn')

    cy.get('input[type="email"]')
        .type(email)

    cy.get('input[type="password"]')
        .type(password)

    cy.get('button[type="submit"]')
        .click()

    cy.wait('@logIn')
};

export function clickOnNewPostLink () {
    cy.get('a[href="#editor"]')
        .should('contain', 'New Post')
        .click()
};

export function typeInArticleTitleInput(articleId) { //articleId náhodné 3 ciferne číslo
    cy.log('type in textbox Article title whit some random number');

    cy.get('input[placeholder="Article Title"]')
        .click()
        .type('Article Title ' + articleId); //nechávame si articleId aj na asserty nižšie
        
};

export function typeInWhatIsAboutInput () {
    cy.log('type in textbox What is about');

    cy.get('input[type="text"]').eq(1)
        .click()
        .type("What's this article about ?");
};

export function typeInArticleDescriptionInput () {
    cy.log('type in textbox Article description');

    cy.get('textarea')
        .type('Write your article (in markdown)');
};

export function typeInTagsInput () {
    cy.log('type in textbox Tags input');

    cy.get('input[type="text"]').eq(2)
        .type('Enter tags');
};

export function clickOnBtnPublishArticle() {
    cy.log('Create and publish &apos;New Post&apos; (New Post > Publish Article)');

    cy.intercept('POST', '/api/articles').as(publishArticleRequestId);

    cy.get('button[type="button"]')
        .contains('Publish Article')
        .click()
};

export function assertPublishedArticle(articleId) {
    cy.log('Assert that your Post was created properly');
    cy.log('Check request status');

    cy.wait('@' + publishArticleRequestId); // 307 redirect
    cy.wait('@' + publishArticleRequestId).then(xhr => { // 200 publish articel
        expect(xhr.response.statusCode).to.eq(200);
        expect(xhr.response.body.article.body).to.equal('Write your article (in markdown)');
        expect(xhr.response.body.article.description).to.equal('What\'s this article about ?');
        expect(xhr.response.body.article.title).to.equal('Article Title ' + articleId);
    });
}

export function clickOnSettingsLink() {
    cy.wait(1000);
    cy.get('a[href="#settings"]')
        .click();
};

export function clickOnLogOutBtn() {
    cy.log('Logout from SUT(Settings > Logout).');

    cy.get('button')
        .should('have.class', 'btn-outline-danger')
        .contains('Or click here to logout.')
        .click();
};

export function clickOnGlobalFeedLink() {
    cy.contains('Global Feed')
        .click()
};

export function clickOnDeleteArticleBtn() {
    cy.log('Delete the Post');

    cy.get('button')
        .should('have.class', 'btn-sm')
        .contains('Delete Article')
        .click();
};

export function findBtnDeleteArticle() {
    cy.get('button')
        .contains('Delete Article') 
};

export function clickOnFirstArticleLink() {
    cy.wait(2000);
    cy.log('Check whether your Post from Test Case 1 is displayed.');

    cy.get('h1')
        .contains('Article Title')
        .eq(0)
        .click();
};