exports.config = {
    
    //dirección en la que va a estar el navegador en el que vamos a lanzar las pruebas (phantom)
    seleniumAddress: 'http://localhost:8910',
    //Cuales son los archivos con los test
    specs: ['crimes-loadData.js'],
    //Indica que tipo de navegador es
    capabilities: {
        'browserName' : 'phantomjs'
    }
    
}