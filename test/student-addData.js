/*global browser*/ /*global element*/ /*global expect*/ /*global by*/
describe('Add student', function() {
    it('should add a new student', function() {
        browser.get('https://sos1718-08.herokuapp.com/#!/students-an');
        element(by.buttonText('Siguiente')).click().then(function() {
            element.all(by.repeater('student in students')).then(function(initialstudents) {

                var provincias = [
                    'sevilla',
                    'cordoba',
                    'jaen',
                    'cadiz',
                    'malaga',
                    'granada',
                    'almeria',
                    'huelva'
                ]

                var genero = [
                    'male',
                    'female',
                    'both'
                ]
                var randomprov = Math.floor(Math.random() * provincias.length);
                var randomgen = Math.floor(Math.random() * genero.length);

                element(by.model('newStudent.province')).sendKeys(provincias[randomprov]);
                element(by.model('newStudent.year')).sendKeys(Math.floor(Math.random() * (2019 - 1990)) + 1990);
                element(by.model('newStudent.gender')).sendKeys(genero[randomgen]);
                element(by.model('newStudent.popilliterate')).sendKeys((Math.random() * (100 - 10)) + 10);
                element(by.model('newStudent.pophigheducation')).sendKeys((Math.random() * (500 - 50)) + 50);
                element(by.model('newStudent.popinuniversity')).sendKeys((Math.random() * (50000 - 5000)) + 5000);



                element(by.buttonText('Add')).click().then(function() {
                    element(by.buttonText('Siguiente')).click().then(function() {
                        element.all(by.repeater('student in students')).then(function(students) {
                            expect(students.length).toEqual(initialstudents.length + 1);
                        });
                    });

                });
            });
        });
    });
});
