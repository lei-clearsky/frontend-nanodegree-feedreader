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
        /* This test makes sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URLs', function(){
            allFeeds.forEach(function(feed) {
                // expect each feed url is defined 
                expect(feed.url).toBeDefined();
                // expect each feed url is string 
                expect(typeof feed.url).toBe('string');
                // expect the feed url is not empty
                expect(feed.url.length).not.toBe(0);

            });
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names', function(){
            allFeeds.forEach(function(feed) {
                // expect each feed name is defined
                expect(feed.name).toBeDefined();
                // expect each feed url is string 
                expect(typeof feed.name).toBeDefined();
                // expect the feed name is not empty
                expect(feed.name.length).not.toBe(0);

            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        // ensures the menu element is hidden by default. 
        it('hides by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        describe('changes visibility when the menu icon is clicked', function() {

            beforeEach(function() {
                $('.menu-icon-link').trigger('click');
            });

            it('displays menu correctly', function() {
                expect($('body').hasClass('menu-hidden')).toBe(false);
            });

            it('hides menu correctly', function() {
                expect($('body').hasClass('menu-hidden')).toBe(true);
            });
        });
        
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done){
            loadFeed(0, done);
        });

        it('after feed loads, it should have at least one entry', function (done) {
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
            done();
        });
    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var initialContentl;

        beforeEach(function (done) {
            initialContent = $('.feed').find('.entry');
            loadFeed(1, done);
        });

        it('content should change', function (done) {
            var newContent = $('.feed').find('.entry');
            expect(initialContent).not.toBe(newContent);
            done();
        });

        afterEach(function (done) {
            loadFeed(0, done);
        });
    });

}());
