const inquirer = require('inquirer');
const fs = require('fs');

inquirer
.prompt([
    {
        type: "checkbox",
        name: "stuff",
        message: "hey chose things",
        choices:[
            {name:"one"},
            {nane: "next"},
            {name: "ohhh yeah"},
        ]
    }
])

.then(console.log("finished"))
.catch(err =>{console.log ("there was an ErRoR",err);});