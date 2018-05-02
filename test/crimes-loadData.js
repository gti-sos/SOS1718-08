var fs = require("fs");
var path = require("path");

describe('data is loaded', function() {

    it('should be the same number', function() {
        //código del test (comprueba que 1=1)
        expect(1).toEqual(1);
    });

    it('should show some crimes', function() {
        browser
            .get('https://sos171808jepm-sandbox-sos171808jepm.c9users.io/#!/crimes-an')
            .then(function() {
                element
                    .all(by.repeater('a in crimes'))
                    .then(function(crimes) {
                        browser
                            .takeScreenshot()
                            .then(function(png){
                                var stream = fs.createWriteStream(path.join(process.cwd(),'test','outputcrimes','captura1.png'));
                                stream.write(new Buffer(png,'base64'));
                                stream.end();
                            });
                        expect(crimes.length).toBeGreaterThan(0);
                    });
            });
    });

});