var newman = require("newman");
var path = require("path");
//var config = require("./config");

describe('API backend should work', function() {
    newman.run({
            collection: require(path.join(process.cwd(),"test","students-an.postman_collection.json")),
            reporters: "cli"
    }, function(err){
        if(err)
            throw err;
        else
            console.log("Newman collection run complete!")
    });
});