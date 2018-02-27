/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* Tests related to the Feed lists.
    */
    describe('RSS Feeds', function() {
        /* The application depends upon the allFeeds array being prepopulated with
         * feeds lists to be sent to the goold feedreader API.  The first couple
         * tests are grouped to check both the allFeeds variable is defined and
         * is prepopulated with data.  The appFeeds variable is crated in app.js
         */
        it(' allFeeds variable is defined and not empty', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* URL data check -- This spec (test) will loop through the allFeeds array making
         * sure there is a URL contained for each entry.  Some simple checks
         * are made to check the formatting to vlidate the URL data could be a
         * valid URL
         */
        it('A URL is defined for all feeds', function() {
             var loopStop = allFeeds.length;
             for (loop = 0; loop < loopStop; loop++) {
                  expect(allFeeds[loop].url).toBeDefined();
                  // url validator https://gist.github.com/dperini/729294
                  // create a regular expression and test the URL against the expression
                  // thanks to advice from Udacity on pointing this out
                  let validURL = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
                  expect(validURL.test(allFeeds[loop].url)).toBe(true);
             }
        });


        /* Name data check -- This spec (test) will loop through the allFeeds array making
         * sure there is a name contained for each entry. The Name data is used
         * to create the menu buttons so the user can select the desired feed list
         */
         it('A name is defined for all feeds', function() {
             var loopStop = allFeeds.length;
             for (loop = 0; loop < loopStop; loop++) {
                  expect(allFeeds[loop].name).toBeDefined();
                  expect(allFeeds[loop].name).not.toBe('');
             }
        });
    });

    /* Menu checks */
    describe('The menu', function() {
         var bodyClassInitial, bodyClassChangedTo, menuIcon, spyEvent, detectEvent;

         beforeAll(function() {
             // event with type and custom function to see if it was called
             // create an event object with a function that does nothing.  This will allow
             //  the spy to detect firing of the function.
             spyEvent = {
                  type: 'click',
                  eventFunction: function() {
                  }
             };

             // setup the spy object.  The spyOn parms are object, string
             detectEvent = spyOn(spyEvent, 'eventFunction');

             // get page load value for body class
             bodyClassInitial = $('body').attr('class');
         });

         afterEach(function() {
            //Update the bodyClassInitial value to current value before the next test
            if(bodyClassChangedTo !== undefined) {
                 // update the bodyClassBeforeTest to show get the current value after toggle tests
                 bodyClassInitial = bodyClassChangedTo;
            }

         });

        /* Make sure the menu is hidden upon page load.  The hidding of the menu
         * is enabled by setting the body class to menu-hidden.  It is later turned
         * on/made visible by removing the class value.  This test is a simple
         * check to see if the class is menu-hidden.  I use the includes function
         * to allow for the possibility of multiple classes being assigned.
         *
         */
         it('Menu is hidden on page load', function() {
              expect(bodyClassInitial.includes('menu-hidden')).toBe(true);
         });


         /* Make sure the menu toggles between visible and visible states Each
          * time the menu icon is clicked.  I test for this by making two loops
          * each time triggering the click event on the menu icon.  Then I compare
          * the new class value with the previous value.  After each test, the
          * new value is moved to the bodyClassInitial test to reflect the current
          * value at the time of the next loop or test.
          */
          it('Menu toggles', function() {
               //loop trhough test twice to make sure value changes through cycle
               for (loop = 0; loop < 2; loop++) {
                    // trigger spyEvent to simulate clicking menu Icon
                    $('.menu-icon-link').trigger(spyEvent);
                    // test to see if hidden class is toggled from previous value
                    expect(bodyClassInitial).not.toBe(bodyClassChangedTo);
               }
          });
    });


    /* Test suite related to the google API returned entries for the default feed at start */
    describe('Initial Entries', function() {
         /* loadFeed(0) is used to see what the api returns using the start vaules*/

         // Call the function loadfeed before each test.
         // The callback function calls the jasmine done() function
         beforeEach(function(done) {
              loadFeed(0, function() {
                   done();
              });
         });

         // test for .feed .entry to have at least 1 entry.
         it('Test for loadFeed to have at least 1 entry', function(done) {
              var qtyEntries = $('.feed .entry').length;
              expect(qtyEntries).toBeGreaterThan(0);
              done();
         });
    });


    /* Test Feed selection and changes in data */
    describe('New Feed Selection', function(){
        /* Before each test, set the displayed feed to 0 to set the display as
         * it would be if the page was freshly loaded.
         */
         var valueBeforeTest, qtyFeeds;

         // call the loadFeed function with ID 0 to store initial feedEntry
         beforeEach(function(done) {
              // get a test value at page load
              loadFeed(0, function() {
                   // get the value of the first entry of the first feed
                   valueBeforeTest = $('.feed .entry')[0].getElementsByTagName('h2')[0].innerText;
                   //get the number of feeds
                   qtyFeeds = $('.feed').length;
                   done();
              });
         });

         // Test for list change by calling second loadFeed ID and then compare to first feed entry
         it('New feed updates values', function(done) {

              loadFeed(1, function() {
                   // check to make sure there is more than 1 feed
                   expect(qtyFeeds).toBeGreaterThan(0);
                   // get value of first entry in the second feed
                   var valueOfTest = $('.feed .entry')[0].getElementsByTagName('h2')[0].innerText;
                   // pass if values are not the same
                   expect(valueOfTest).not.toBe(valueBeforeTest);
                   done();
              });
         });
    });
}());
