var fs = require("fs");
var path = require("path");

describe('Data is loaded',function (){
    it('should show some contacts', function (){
        browser
            .get('https://sos1718-labs-pafmon.c9users.io')
            .then(function (){
                element
                    .all(by.repeater('student in students'))
                    .then(function (contacts){
                        browser
                            .takeScreenshot()
                            .then(function (png){
                                var stream = fs.createWriteStream(path.join(process.cwd(),'test','output','T01.png'));
                                stream.write(new Buffer(png,'base64'));
                                stream.end();
                            });
                        
                        expect(contacts.length).toBeGreaterThan(0);
                    });
            });
        
        
    }); 
});