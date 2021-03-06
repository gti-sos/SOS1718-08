exports.config = {
    
    //dirección en la que va a estar el navegador en el que vamos a lanzar las pruebas (phantom)
    seleniumAddress: 'http://localhost:8910',
    //Cuales son los archivos con los test
    //, 
    specs: ['student-loadData.js', 'student-addData.js','backendStudentsTest.js','backendCrimesTest.js','crimes-loadData.js', 'crimes-addData.js','divorces-loadData.js','backendDivorcesTest.js', 'divorces-addData.js'],
    //Indica que tipo de navegador es
    capabilities: {
        'browserName' : 'phantomjs'
    },
    
    params:{
        host: 'localhost',
        port: '8080'
    }
    
};
exports.getAppUrl = function(){
   
   return "https://" + browser.params.host + ":" + browser.params.port;
    
}