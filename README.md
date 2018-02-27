# Unit Testing with jasmine

## Overview

This project demonstrates the ability to perform unit testing on a already functioning
web-based application.  The application, in this example, is a menu of URL feeds derived from Google API calls.
Each URL feed is essentially a category of feeds that are retrieved from the Google RSS API.

To implement Jasmine standalone, the web page to be tested must have at the bottom of the <head> section...

          <link rel="stylesheet" href="jasmine/lib/jasmine-2.1.2/jasmine.css">
          <script src="jasmine/lib/jasmine-2.1.2/jasmine.js"></script>
          <script src="jasmine/lib/jasmine-2.1.2/jasmine-html.js"></script>
          <script src="jasmine/lib/jasmine-2.1.2/boot.js"></script>

     At the end of the body tag, include a script with your tests.  In my case I used...

           <script src="jasmine/spec/feedreader.js"></script>

After that, to run the tests all you have to do is load the page to be tested in your browser.
The results will be displayed at the bottom of the web page below the tested content.


## Project Tasks

     * Review application to understand function and possible test points
     * Write Jasmine test scripts
          - RSS Feed Tests
               * Is the allFeeds array defined?
               * Is there at leas one RSS Feed in the allFeeds array?
               * Is there a URL for every feed?
               * Is a name defined for every feed?
          - Menu Tests
               * Is the menu hidden upon page load?
               * Does the menu toggle when clicking the hamburger icon?
          - Initial Feed Entries
               * Does the initial page load an RSS Feed load at least one entry?
          - New Feed
               * Does loading of new feeds update the displayed values?

## What I did -- see the spec/feedreader.js file for more detailed information

     * RSS Feed tests
          - This was a pretty straight forward task.  Review the spec/feedreader.js
            file for information contained there.
     * Menu tests
          - Checking for hidden is just a simple check to see if the class was
               set to the hidden values
          - Checking for the toggle between a hidden and visible states required
               a Jasmine spy to see the calls to change the class value.  I
               simulated clicking the menu icon by triggering a click event and
               then testing to see if the state had changed.

               $('.menu-icon-link').trigger(spyEvent);
               expect(bodyClassInitial).not.toBe(bodyClassChangedTo);

     * Initial Feed Entry tests
          - This test just took a count of the number of entries in the Feed and
               made sure it was greater than 0.
     * New Feed Tests
          - Before the test, I would collect the <h2> value of the first entry in
               the displayed feed.  Then I would simulate changing the feed to
               be displayed.  Lastly I would check the newly displayed first entry
               with the stored value of the previously displayed feed.



## Project Rubric from Udacity                


### Project Overview

In this project you are given a web-based application that reads RSS feeds. The original developer of this application clearly saw the value in testing, they've already included [Jasmine](http://jasmine.github.io/) and even started writing their first test suite! Unfortunately, they decided to move on to start their own company and we're now left with an application with an incomplete test suite. That's where you come in.


#### Why this Project?

Testing is an important part of the development process and many organizations practice a standard of development known as "test-driven development". This is when developers write tests first, before they ever start developing their application. All the tests initially fail and then they start writing application code to make these tests pass.

Whether you work in an organization that uses test-driven development or in an organization that uses tests to make sure future feature development doesn't break existing features, it's an important skill to have!


#### What will I learn?

You will learn how to use Jasmine to write a number of tests against a pre-existing application. These will test the underlying business logic of the application as well as the event handling and DOM manipulation.


#### How will this help my career?

* Writing effective tests requires analyzing multiple aspects of an application including the HTML, CSS and JavaScript - an extremely important skill when changing teams or joining a new company.
* Good tests give you the ability to quickly analyze whether new code breaks an existing feature within your codebase, without having to manually test all of the functionality.


### How will I complete this project?

Review the Feed Reader Testing [Project Rubric](https://review.udacity.com/#!/projects/3442558598/rubric)

1. Take the JavaScript Testing [course](https://www.udacity.com/course/ud549)
2. Download the [required project assets](http://github.com/udacity/frontend-nanodegree-feedreader).
3. Review the functionality of the application within your browser.
4. Explore the application's HTML (**./index.html**), CSS (**./css/style.css**) and JavaScript (**./js/app.js**) to gain an understanding of how it works.
5. Explore the Jasmine spec file in **./jasmine/spec/feedreader.js** and review the [Jasmine documentation](http://jasmine.github.io).
6. Edit the `allFeeds` variable in **./js/app.js** to make the provided test fail and see how Jasmine visualizes this failure in your application.
7. Return the `allFeeds` variable to a passing state.
8. Write a test that loops through each feed in the `allFeeds` object and ensures it has a URL defined and that the URL is not empty.
9. Write a test that loops through each feed in the `allFeeds` object and ensures it has a name defined and that the name is not empty.
10. Write a new test suite named `"The menu"`.
11. Write a test that ensures the menu element is hidden by default. You'll have to analyze the HTML and the CSS to determine how we're performing the hiding/showing of the menu element.
12. Write a test that ensures the menu changes visibility when the menu icon is clicked. This test should have two expectations: does the menu display when clicked and does it hide when clicked again.
13. Write a test suite named `"Initial Entries"`.
14. Write a test that ensures when the `loadFeed` function is called and completes its work, there is at least a single `.entry` element within the `.feed` container.
15. Write a test suite named `"New Feed Selection"`.
16. Write a test that ensures when a new feed is loaded by the `loadFeed` function that the content actually changes.
17. No test should be dependent on the results of another.
18. Callbacks should be used to ensure that feeds are loaded before they are tested.
19. Implement error handling for undefined variables and out-of-bound array access.
20. When complete - all of your tests should pass.
21. Write a README file detailing all steps required to successfully run the application. If you have added additional tests (for Udacious Test Coverage),  provide documentation for what these future features are and what the tests are checking for.
