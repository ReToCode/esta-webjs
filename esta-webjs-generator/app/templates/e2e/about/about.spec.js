/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
 *
 * ESTA WebJS: e2e Test für die About Seite.
 *
 * @author u218609 (Kevin Kreuzer)
 * @version: 0.0.11
 * @since 16.05.2017, 2017.
 */
import aboutPage from './about.page';

describe('About', () => {
    let about = new aboutPage();

    beforeEach(() => {
        browser.get('#!/about');
    });

    it('should change the language to Enlish and back to german', () => {
        //when
        about.clickChangeToEnglish();
        //then
        expect(about.subtitle.getText()).toBe('This text is translated by ngTranslate');
        expect(about.text.getText()).toBe('Here you\'ll find information about ESTA WebJS');

        //when
        about.clickChangeToGerman();
        //then
        expect(about.subtitle.getText()).toBe('Dieser Text wird von ngTranslate übersetzt');
        expect(about.text.getText()).toBe('Hier werden Informationen über ESTA WebJS gezeigt.');
    })
})