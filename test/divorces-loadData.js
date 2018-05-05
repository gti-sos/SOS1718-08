var fs = require("fs");
var path = require("path");

describe('data is loaded', function() {

    it('should be the same number', function() {
        //código del test (comprueba que 1=1)
        expect(1).toEqual(1);
    });

    it('should show some divorces', function() {
        browser
            .get('https://sos1718-08.herokuapp.com/#!/divorces-an')
            .then(function() {
                element
                    .all(by.repeater('a in divorces'))
                    .then(function(divorces) {
                        browser
                            .takeScreenshot()
                            .then(function(png){
                                var stream = fs.createWriteStream(path.join(process.cwd(),'test','outputdivorces','captura1.png'));
                                stream.write(new Buffer(png,'base64'));
                                stream.end();
                            });
                        expect(divorces.length).toBeGreaterThan(0);
                    });
            });
    });

});