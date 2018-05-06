/*global browser*/ /*global element*/ /*global expect*/ /*global by*/
describe('Add divorces', function(){
   
   it('should add a new crime', function(){
      browser
      .get('https://sos171803jmja-sandbox-sos171803jmja.c9users.io/#!/divorces-an')
      .then(function(){
          element
            .all(by.repeater('a in divorces'))
            .then(function(initialDivorces){
                //browser.driver.sleep(2000);
                element(by.model('newDivorce.province')).sendKeys('sevilla');
                element(by.model('newDivorce.year')).sendKeys(2010);
                element(by.model('newDivorce.divorce')).sendKeys(1);
                element(by.model('newDivorce.breaj')).sendKeys(1);
                element(by.model('newDivorce.nullity')).sendKeys(1);
                
                element(by.buttonText('Add')).click().then(function(){
                   element.all(by.repeater('a in divorces')).then(function(divorces){
                       expect(divorces.length).toEqual(initialDivorces.length+1);
                   }); 
                });
            });
      });
   });
   
    
});