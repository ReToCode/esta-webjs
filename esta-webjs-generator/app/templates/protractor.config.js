exports.config = {
    framework: 'jasmine',
    onPrepare: function onPrepare() {
        require('babel-core/register');
        browser.manage().window().setSize(1280, 1024);
        console.log('We are going to use the following baseUrl during the tests:', browser.baseUrl);
    }
}