/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
 *
 * ESTA WebJS: Page Object für die About-Seite.
 *
 * @author u218609 (Kevin Kreuzer)
 * @version: 0.0.11
 * @since 16.05.2017, 2017.
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