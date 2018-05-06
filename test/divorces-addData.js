/*global browser*/ /*global element*/ /*global expect*/ /*global by*/
describe('Add divorces', function(){
   
   it('should add a new divorce', function(){
      browser
      .get('https://sos1718-08.herokuapp.com/#!/divorces-an')
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