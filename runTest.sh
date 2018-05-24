#!/bin/bash

case $1 in
    herokuCrimes)
    npm test -- --params.host=https://sos1718-08.herokuapp.com/#!/crimes-an --params.port=80
    ;;
    *)
    npm test
    ;;
esac