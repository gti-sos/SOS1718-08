var config = require("./config");



describe('Add crime', function(){
   
   it('should add a new crime', function(){
      browser
      .get(config.getAppUrl())
      .then(function(){
          element
            .all(by.repeater('a in crimes'))
            .then(function(initialCrimes){
                //browser.driver.sleep(2000);
                element(by.model('newCrime.province')).sendKeys('galicia');
                element(by.model('newCrime.year')).sendKeys(2000);
                element(by.model('newCrime.gender')).sendKeys('male');
                element(by.model('newCrime.onecrime')).sendKeys(0.0);
                element(by.model('newCrime.twocrime')).sendKeys(0.1);
                element(by.model('newCrime.threecrime')).sendKeys(0.2);
                element(by.model('newCrime.morethreecrime')).sendKeys(0.3);
                
                element(by.buttonText('Add')).click().then(function(){
                   element.all(by.repeater('a in crimes')).then(function(crimes){
                       expect(crimes.length).toEqual(initialCrimes.length+1);
                   }); 
                });
            });
      });
   });
   
    
});