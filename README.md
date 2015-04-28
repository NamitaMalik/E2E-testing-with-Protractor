# E2E Testing with Protractor

We all know that **end to end testings** is done to test the flow of **application**. It can either be done manually or using some kind of **automation** tool/framework.

There are a hell lot of **automation** frameworks available but for **AngularJS**, **Protractor** is being promoted. **Protractor** combines powerful tools and technologies such as **NodeJS**, **Selenium Webdriver**, **Jasmine**, **Mocha** and **Cucumber**.

> NOTE: **Protractor** was designed for **e2e testing** in order to cover the **acceptance criteria**. It does not replace the **unit testing** frameworks such as **Karma**. It is a sort of wrapper above **Selenium**.

Now, its time to get our hands dirty with some piece of code, but before that let's have a look at some pre-requisites:

Let's set up **Protractor** on your system(I am assuming that **NodeJS** is installed on your system)
  1. Install **Protractor** globally using the command  ```npm install protractor –g``` or use the command ```npm install protractor``` if you want to install it for a particular project.
  2. To check if you have correctly installed it, use the command ```protractor --version```.
  3. **Protractor** install **Selenium webdriver manager** with it, update **Selenium webdriver manager** with command `webdriver-manager update`.

Yes, it's that easy!!

Now, let's have a look at the functionality that we want to test:

1. There is checkbox, which needs to be checked when user has credit card. On checking the checkbox, "Yes" would be printed on the page and on un-checking it, "No".
2. When the checkbox is un-checked, `credit card number` input field and `Save` button would be disabled and on checking it, both fields will be enabled.
3. On clicking the `Save` button error/success message is displayed.
4. Error message would be displayed in the following conditions.
    1. When input field is empty.
    2. When anything except numbers is input in the input field.
    3. When less than 16 digits are added in the input field.
5. Success Message would be shown in the following cases.
    1. When a 16-digit number is input in the input field.
    2. Success message would also include the 16-digit number added in the input field.

Here is the **HTML** and **JavaScript** code:

**creditCard.html**
```HTML
<!DOCTYPE html>
<html ng-app="creditCardApp">
<head lang="en">
    <meta charset="UTF-8">
    <title>Credit Card</title>
    <link href="src/css/appStyle.css" rel="stylesheet">
</head>
<body ng-controller="CardController">
<div>
    <p>Do you have a credit card?</p>
    <input type="checkbox" id="hasCreditCard" ng-true-value="'Yes'" ng-false-value="'No'" ng-model="data.checkCard"
           ng-click="checkClicked()">
    <span>{{data.checkCard}}</span>
</div>
<div>
    <p>If yes, please enter your credit card number here:</p>
    <input type="text" name="myField" id="hasCard" ng-disabled="data.checkCard != 'Yes'" ng-model="data.cardNumber"
           minlength="16" maxlength="16">
    <input type="button" value="Save" id="save" ng-disabled="data.checkCard != 'Yes'" ng-click="save();">
</div>
</br>
<div class="error" ng-if="!successMessage">
    {{errorMessage}}
</div>
<div class="success" ng-if="!errorMessage">
    {{successMessage}}
</div>
<script src="src/js/angular.min.js"></script>
<script src="src/js/appController.js"></script>
</body>
</html>
```

**appController.js**
```JavaScript
(function (ng) {
    var creditCardApp = ng.module('creditCardApp', []);
    creditCardApp.controller('CardController', ['$scope', function ($scope) {
        $scope.data = {checkCard: "", cardNumber: ""};
        $scope.save = function () {
            $scope.successMessage = "";
            $scope.errorMessage = "";
            if (!$scope.data.cardNumber) {
                $scope.errorMessage = "Please enter a valid credit card number";
            } else if (isNaN($scope.data.cardNumber)) {
                $scope.errorMessage = "Credit card number can have only Numbers(0-9)";
            } else {
                $scope.successMessage = "Your credit card number " + $scope.data.cardNumber + " has been saved with us.";
                $scope.data.cardNumber = "";
            }
        };
        $scope.checkClicked = function () {
            if ($scope.data.checkCard === "No") {
                $scope.data.cardNumber = "";
            }
        };
    }]);
})(angular);
```

You can open `creditCard.html` in your favourite browser and test it manually that is it working as expected behaviour or not? Then we will test with **Protractor**.

###How to Test with Protractor??

1. Create a **test** named folder in your project directory.
2. Now create `conf.js` named **configuration** file for our test cases and save it in test directory. We define two things in it:
    1. **seleniumAddress**: Address of **Selenium webdriver manager**.
    2. **specs**: Our test case file, which should be run.

Our `conf.js` would look something like this:

**conf.js**
```JavaScript
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['spec.js']
};
```

#####Lest write first Protractor test case:
1. First of all, we need to open our **application** in the browser, which we can do by: `browser.get("http://localhost:63342/E2E-testing-with-Protractor/creditCard.html");`. So before running any test case, our **application** must be open in the browser so we have kept this in a ```beforeEach()``` block e.g.
    
    **spec.js:**
    ```JavaScript
    (function () {
        function openApplicationInBrowser() {
            browser.get("http://localhost:63342/E2E-testing-with-Protractor/creditCard.html");
        }
        describe('Saving Credit Card Number', function () {
            beforeEach(function () {
                openApplicationInBrowser();
            });
        });
    })();
    ```
2. Let's check if the title of the page is `Credit Card` or not. I had mentioned above that **Protractor** also uses **Jasmine** and we know that **Jasmine** let us describe how describe how software should behave in a plain text. Therefore our test would look something like this, easy to understand.
   
    ```JavaScript
    it('should have correct title', function () {
        expect(browser.getTitle()).toEqual('Credit Card');
    });
    ```
    **it** is the **Jasmine** **function**. **it** takes two parameters
    1. **String** - This string is a kind of sentence, that explains what is being tested.
    2. **function** - This is a callback **function**.

    We write all the code in the **it** block that we need for **testings**. Usually the tests are started by writing an **expect** **function**.
    
    So we **expect** our page **title** to be(to be equal to) `Credit Card`. So we are first getting the title using `getTitle()` **function** and then comparing with the expected title using the ```toEqual``` **function**.
    
    **Resultant spec.js:**
    ```JavaScript
    (function () {
        function openApplicationInBrowser() {
            browser.get("http://localhost:63342/E2E-testing-with-Protractor/creditCard.html");
        }
        describe('Saving Credit Card Number', function () {
            beforeEach(function () {
                openApplicationInBrowser();
            });
            it('should have correct title', function () {
                expect(browser.getTitle()).toEqual('Credit Card');
            });
        });
    })();
    ```
    
#####How to run test case?
1. Start **Selenium webdriver manager** with command `webdriver-manager start`.
> NOTE: You don't need to install **Selenium webdriver manager** separately, Its already have installed into your system with **Protractor**.
2. Now go to your `test` directory, and run test case with command `Protractor conf.js`.
> NOTE: **spec.js** file must be saved in test directory, parallel to **conf.js**.

That's it. When you will try to run the test cases, you will see your system's default browser will open, and and will closed as test case will complete. You will see output something like this:

![result.png](https://raw.githubusercontent.com/NamitaMalik/E2E-testing-with-Protractor/master/images/result.png)

I know this doesn't interests you at all in case you already know **Jasmine**.

Now, let's write another test:

Test Case 2 : Input field should be disabled when hasCreditCard checkbox is unchecked.

```JavaScript
it('checks if the input field is by default disabled', function () {
    expect(element(by.model('data.cardNumber')).isEnabled()).toBe(false);
});
```

In the above **it** block, we are first getting the element using the **id** selector and then we check if that element is enabled or not, using the ```isEnabled``` **function**. ```isEnabled()``` **function** returns a boolean value, true if element is enabled and false if it is not.
In our case, this boolean value should be false as checkbox is un-checked.

Test Case Case 3 : Error message should appear on entering an invalid credit card number.

```
it('error message should be shown when non numeric characters are written in input',function(){
    element(by.model('data.checkCard')).click();
    element(by.model('data.cardNumber')).sendKeys("abcdefghijkikiki");
    element(by.id('save')).click();
    expect(element(by.binding('errorMessage')).getText()).toEqual("Please enter a valid credit card number");
});
```

In the previous test we had used **id** as the selector, whereas in the above test case we are using a new selector i.e. **model**.
In the above script, we are first checking the checkbox, then entering an invalid text in the input field and then finally save button is clicked.
Our expectation is that an error message should appear. We are using the binding's name and getting text from it and checking if it is equal to the expected text.

Here is the complete `spec.js` file:

**spec.js**
```JavaScript
(function () {
    function openBrowser() {
        browser.get("http://localhost:63342/E2E-testing-with-Protractor/creditCard.html");
    }
    describe('Saving Credit Card Number', function () {
        beforeEach(function () {
            openBrowser();
        });
        it('should have correct title', function () {
            expect(browser.getTitle()).toEqual('Credit Card');
        });
        it('keeps the input field disabled', function () {
            expect(element(by.id('hasCard')).isEnabled()).toBe(false);
        });
        it('enables the input field', function () {
            element(by.model('data.checkCard')).click();
            expect(element(by.id('hasCard')).isEnabled()).toBe(true);
        });
        it('gives an error message on writing invalid credit card number', function () {
            element(by.model('data.checkCard')).click();
            element(by.model('data.cardNumber')).sendKeys("abcdefghijkikiki");
            element(by.id('save')).click();
            expect(element(by.binding('errorMessage')).getText()).toEqual("Please enter a valid credit card number");
        });
        it('gives a success message on writing a valid credit card number', function () {
            var cardNumber = "1234567899009876";
            element(by.model('data.checkCard')).click();
            element(by.model('data.cardNumber')).sendKeys(cardNumber);
            element(by.id('save')).click();
            var textToCheck =
                expect(element(by.binding('successMessage')).getText()).toEqual("Your credit card number" + " " + cardNumber + " has been saved with us.");
        });
        it('gives an error message when credit card number entered is less than 16 digits', function () {
            element(by.model('data.checkCard')).click();
            element(by.model('data.cardNumber')).sendKeys("1234567890");
            element(by.id('save')).click();
            expect(element(by.binding('errorMessage')).getText()).toEqual("Please enter a valid credit card number");
        });
    });
})();
```

To run these test you will have to do the following:

1. Go to console and run webdriver-manager star command.
2. On the console go the test folder and run the command **Protractor** conf.js

You will see a **Chrome** window opening up and your tests running on it. Once the tests are completed, the window will close automatically and test results will be available on console.

Well, these were a few test cases on the simple **function**ality that we had built. We have used three types of selectors above. Here is a list of selectors which can be used while working with **Protractor**:

1. by.css
2. by.id
3. by.model
4. by.binding

In case you want to play with multiple elements, you can use ```element.all()```. There are certain helper **functions**:```count()``` - which gives the number of elements, ```getIndex()``` - to get an element using index.

Well, now we can now test our **application** using **Protractor**, meanwhile you can also checkout full working source code from [Github Repo](https://github.com/NamitaMalik/E2E-testing-with-Protractor).