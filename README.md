# E2E-testing-with-Protractor

We all know that end to end testing is done to test the flow of application. It can either be done manually or using some kind of automation tool/framework.

There are a hell lot of automation frameworks available but for **AngularJS**, **Protractor** is being promoted. **Protractor** combines powerful tools and technologies such as **NodeJS** , **Selenium Webdriver**, **Jasmine** , **Mocha** and **Cucumber**.

Note: **Protractor** was designed for **e2e testing** in order to cover the **acceptance criteria**. It does not replace the **unit testing** frameworks such as **Karma**. It is a sort of wrapper above **Selenium**.

Now, its time to get our hands dirty with some piece of code, but before that let's have a look at some pre-requisites:

  1. Setting up Protractor on your system(I am assuming that node is installed on your system):

    a. Install protractor globally using the command  ```npm install –g protractor``` or use the command ```npm install protractor``` if you want to install it for a particular project.
    b. To check if you have correctly installed it, use the command ```protractor --version```.

  Yes, it's that easy!!

  Now, let's have a look at the functionality that we want to test:

  a. There is checkbox, which needs to be checked when user has credit card. On checking the checkbox, "Yes" would be printed on the page and on un-checking it, "No".
  b. When the checkbox is un-checked, credit card number input field would be disabled and on checking it, input field will be enabled.
  c. There is Save button also. On clicking the Save button error/success message is displayed.
  d. Error message would be displayed in the following conditions:
    1. When input field is empty.
    2. When anything except numbers is input in the input field.
    3. When less than 16 digits are added in the input field.
  e. Success Message would be shown in the following cases:
    1. When a 16-digit number is input in the input field.
    2. Success message would also include the 16-digit number added in the input field.

  Here is plunker for the same:





  Now, let's check with the help of **protractor** if this functionality works as per the mentioned specs:

    Test Case 1 : First let's check if the title of the page is "Credit Card" or not.

  I had mentioned above that **protractor** also uses **Jasmine** and we know that **Jasmine** let us describe how describe how software should behave in a plain text. Therefore our test would look something like this, easy to understand:

  ```
     it('should have correct title', function () {
                expect(browser.getTitle()).toEqual('Credit Card');
            });
  ```

  **it** is the **Jasmine** function. **it** takes two parameters:

   1. String - This string is a kind of sentence, that explains what is being tested.
   2. function - This is a callback function

   We write all the code in the **it** block that we need for testing. Usually the tests are started by writing an **expect** function.

   So we expect our page title to be(to be equal to) "Credit Card". So we are first getting the title using ```getTitle()``` function and then comparing with the expected title using the ```toEqual``` function.

   I know this doesn't interests you at all in case you already know **Jasmine**.

   Now, let's write another test:

    Test Case 2 : Input field should be disabled when hasCreditCard checkbox is unchecked.

        ```
        it('input box should be disabled',function(){
                      expect(element(by.id('hasCard')).isEnabled()).toBe(false);
                   });

        ```

   In the above **it** block, we are first getting the element using the **id** selector and then we check if that element is enabled or not, using the ```isEnabled``` function. ```isEnabled()``` function returns a boolean value, true if element is enabled and false if it is not.
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

   Well, these were a few test cases on the simple functionality that we had built. We have used three types of selectors above. Here is a list of selectors which can be used while working with **Protractor**:

   1. by.css
   2. by.id
   3. by.model
   4. by.binding

   In case you want to play with multiple elements, you can use ```element.all()```. There are certain helper functions:```count()``` - which gives the number of elements, ```getIndex()``` - to get an element using index.

   Well, now we can now test our application using **protractor**, meanwhile you can also checkout full working source code from here.









  2. Run webdriver-manager update`
  3. Run webdriver-manager start command to start selenium server
  4. Go to Book-Search/test on terminal and type the command protractor conf.js
  5. Check the terminal window for results.


