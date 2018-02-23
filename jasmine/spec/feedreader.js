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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it(' allFeeds variable is defined and not empty', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('A URL is defined for all feeds', function() {
             var loopStop = allFeeds.length;
             for (loop = 0; loop < loopStop; loop++) {
                  expect(allFeeds[loop].url).toBeDefined();
                  expect(allFeeds[loop].url).not.toBe('');
             }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('A name is defined for all feeds', function() {
             var loopStop = allFeeds.length;
             for (loop = 0; loop < loopStop; loop++) {
                  expect(allFeeds[loop].name).toBeDefined();
                  expect(allFeeds[loop].name).not.toBe('');
             }
        });
    });



    /* TODO: Write a new test suite named "The menu" */
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
                 bodyClassInitial = bodyClassChangedTo;
            }

         });

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('Menu is hidden on page load', function() {
              expect(bodyClassInitial).toBe('menu-hidden');
         });


         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
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


    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         // Call the function loadfeed before each test.
         // The callback function calls the jasmine done() function
         beforeEach(function(done) {
              loadFeed(0, function() {
                   done();
              });
         });

         // test for .feed .entry to have at least 1 entry
         it('Test for loadFeed to have at least 1 entry', function(done) {
              var qtyEntries = $('.feed .entry').length;
              expect(qtyEntries).toBeGreaterThan(0);
              done();
         });
    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
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
