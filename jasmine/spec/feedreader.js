/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
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


  /* This is a test suite named "The menu" */
  describe('The menu', function() {
    // ensures the menu element is hidden by default. 
    it('hides by default', function() {
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    /* This is a test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * has two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    describe('changes visibility when the menu icon is clicked', function() {
      // before expectations functions run, trigger click event on menu icon	
      beforeEach(function() {
        $('.menu-icon-link').trigger('click');
      });
      // expect the menu displays correctly
      it('displays menu correctly', function() {
        expect($('body').hasClass('menu-hidden')).toBe(false);
      });
      // expect the menu hides correctly
      it('hides menu correctly', function() {
        expect($('body').hasClass('menu-hidden')).toBe(true);
      });
    });
      
  });

  /* This is a test suite named "Initial Entries" */
  describe('Initial Entries', function() {
    /* This is a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Because loadFeed() is asynchronous so this test uses
     * the Jasmine's beforeEach and asynchronous done() function.
     */
    // before expectation function run, run loadFeed function with first feed source
    beforeEach(function (done){
      loadFeed(0, done);
    });
    // after feed loads, ensure there is at least one entry
    it('after feed loads, it should have at least one entry', function (done) {
        expect($('.feed').find('.entry').length).toBeGreaterThan(0);
        done();
    });
  });


  /* This is a test suite named "New Feed Selection" */
  describe('New Feed Selection', function () {
    /* This is a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */
    var initialContent, newContent;
    // before test functions run, retrieve the content in each feed entry
    // afterwards, run loadFeed function with the second feed source
    beforeEach(function (done) {
      initialContent = $('.feed').find('.entry');
      loadFeed(1, done);
    });
    // ensure the content has been changed compared to the initial content
    it('content should change', function (done) {
      newContent = $('.feed').find('.entry');
      expect(initialContent).not.toBe(newContent);
      done();
    });
    // load the first feed source after above test is completed
    afterEach(function (done) {
      loadFeed(0, done);
    });

  });

}());
