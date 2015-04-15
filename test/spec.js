(function () {

    function openBrowser() {
        browser.get("http://localhost:63342/E2E-testing-with-Protractor/sample.html");
    }

    describe('Book-Search', function () {
        beforeEach(function () {
            openBrowser();
        });
        it('should have correct title', function () {
            expect(browser.getTitle()).toEqual('Credit Card');
        });
        it('input box should be disabled',function(){
           expect(element(by.id('hasCard')).isEnabled()).toBe(false);
        });
        it('input box should enable when checkbox is checked',function(){
            element(by.model('data.checkCard')).click();
            expect(element(by.id('hasCard')).isEnabled()).toBe(true);
        });
        it('error message should be shown when non numeric characters are written in input',function(){
            element(by.model('data.checkCard')).click();
            element(by.model('data.cardNumber')).sendKeys("abcdefghijkikiki");
            element(by.id('save')).click();
            expect(element(by.binding('errorMessage')).getText()).toEqual("Please enter a valid credit card number");
        });
        it('success message should be shown when valid credit card number is added',function(){
            var cardNumber = "1234567899009876";
            element(by.model('data.checkCard')).click();
            element(by.model('data.cardNumber')).sendKeys(cardNumber);
            element(by.id('save')).click();
            var textToCheck =
            expect(element(by.binding('successMessage')).getText()).toEqual("Your credit card number" + " " + cardNumber + " has been saved with us.");
        });
    });
})();

