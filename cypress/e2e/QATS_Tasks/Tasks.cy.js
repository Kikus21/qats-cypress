// @ts-nocheck
/// <reference types="cypress" />

//#region import functions from Locators.js
import {  
    clickOnSettingsLink, clickOnSignIn, logIn, 
    clickOnBtnPublishArticle, typeInArticleDescriptionInput, 
    clickOnFirstArticleLink, clickOnDeleteArticleBtn, clickOnLogOutBtn, 
    typeInArticleTitleInput, clickOnGlobalFeedLink, typeInWhatIsAboutInput,
    typeInTagsInput, clickOnNewPostLink, assertPublishedArticle
} from '../../Locators';
//#endregion

const articleId = Math.floor((Math.random() * 1000) + 10);

context('Tasks from QATS', () => {

    beforeEach(() => {
        cy.visit('https://react-redux.realworld.io/');

        clickOnSignIn();

        logIn();
    });

    it('Test Case 1 – Create post', () => {
        clickOnNewPostLink();

        typeInArticleTitleInput(articleId);

        typeInWhatIsAboutInput();

        typeInArticleDescriptionInput();

        typeInTagsInput();

        clickOnBtnPublishArticle(articleId);

        assertPublishedArticle(articleId);

        clickOnSettingsLink();

        clickOnLogOutBtn();

    });

    it('Test Case 2 – Delete post', () => {

        clickOnGlobalFeedLink();

        clickOnFirstArticleLink();

        clickOnDeleteArticleBtn();

        clickOnSettingsLink();
        
        clickOnLogOutBtn();

    });
});