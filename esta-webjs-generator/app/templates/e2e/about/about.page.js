/*
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2016.
 */
export default class AboutPage {

    constructor(){
        this.changeToGermanButton = element(by.id('change-to-german-button'));
        this.changeToEnglishButton = element(by.id('change-to-english-button'));
        this.subtitle = element(by.id('about-subtitle'));
        this.text = element(by.id('about-text'));
    }

    clickChangeToGerman(){
        this.changeToGermanButton.click();
    }

    clickChangeToEnglish(){
        this.changeToEnglishButton.click();
    }
}