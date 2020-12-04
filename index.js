const determineSections = require('inquirer');
//const buildReadMe = require('inquirer');
const fs = require('fs');
//let choicesResponce;




determineSections
.prompt([
    {
        type: "input",
        name: "Title",
        message: "Enter your project title"
    },
    {
        type: "checkbox",
        name: "listOfSections",
        message: "Please Choose The Sections You Would like to Include.",
        choices:[
            {name:"motivation"},
            {name:"buildStatus"},
            {name:"codeStyle"},
            {name:"screenshots"},
            {name:"techFramework"},
            {name:"features"},
            {name:"codeExample"},
            {name:"installation"},
            {name:"apiReference"},
            {name:"howToUse"},
            {name:"contribute"},
            {name:"credits"},
            {name:"licence"},
        ]
    },
    {
        type: "input",
        name: "motivationEntry",
        message: "Please enter your motivation entry",
        when: function (responce){
            return responce.listOfSections.indexOf('Motivation')>-1
        },
        preffix: "",
        suffix: "",
    },
    {
        type: "input",
        name: "buildStatusEntry",
        message: "Please enter your Build Status entry",
        when: function (responce){
            return responce.listOfSections.indexOf('buildStatus')>-1
        },
        preffix: "",
        suffix: "",
    },
    {
        type: "input",
        name: "codeStyleEntry",
        message: "Please enter your Code Style entry",
        when: function (responce){
            return responce.listOfSections.indexOf('codeStyle')>-1
        },
        preffix: "",
        suffix: "",
    },
    {
        type: "input",
        name: "ScreenshotsEntry",
        message: "Please enter your Screenshots entry/urls seperated by a space",
        when: function (responce){
            return responce.listOfSections.indexOf('screenshots')>-1
        },
        preffix: "",
        suffix: "",
    },
    {
        type: "input",
        name: "techFramework",
        message: "Please enter your techFramework entry",
        when: function (responce){
            return responce.listOfSections.indexOf('techFramework')>-1
        },
        preffix: "",
        suffix: "",
    },
    {
        type: "input",
        name: "features",
        message: "Please enter your features entry",
        when: function (responce){
            return responce.listOfSections.indexOf('features')>-1
        },
        preffix: "",
        suffix: "",
    },
    {
        type: "input",
        name: "codeExample",
        message: "Please enter your codeExample entry",
        when: function (responce){
            return responce.listOfSections.indexOf('codeExample')>-1
        },
        preffix: "",
        suffix: "",
    },
    {
        type: "input",
        name: "installationEntry",
        message: "Please enter your installation entry",
        when: function (responce){
            return responce.listOfSections.indexOf('installation')>-1
        },
        preffix: "",
        suffix: "",
    },
    {
        type: "input",
        name: "apiReferenceEntry",
        message: "Please enter your API Reference entry",
        when: function (responce){
            return responce.listOfSections.indexOf('apiReference')>-1
        },
        preffix: "",
        suffix: "",
    },
    {
        type: "input",
        name: "howToUseEntry",
        message: "Please enter your How To Use entry",
        when: function (responce){
            return responce.listOfSections.indexOf('howToUse')>-1
        },
        preffix: "",
        suffix: "",
    },
    {
        type: "input",
        name: "contributeEntry",
        message: "Please enter your Contribute entry",
        when: function (responce){
            return responce.listOfSections.indexOf('contribute')>-1
        },
        preffix: "",
        suffix: "",
    },
    {
        type: "input",
        name: "creditsEntry",
        message: "Please enter your Credits entry",
        when: function (responce){
            return responce.listOfSections.indexOf('Credits')>-1
        },
        preffix: "",
        suffix: "",
    },
    {
        type: "input",
        name: "licenceEntry",
        message: "Please enter your licence entry",
        when: function (responce){
            return responce.listOfSections.indexOf('licence')>-1
        },
        preffix: "",
        suffix: "",
    },
])

.then(responce =>{
    choicesResponce = JSON.stringify(responce);
    //console.log("Executed Successfully" + choicesResponce);
    //choicesResponce = responce;
    console.log(choicesResponce);
    console.log("Executed Successfully");
})

.catch(err =>{console.log ("there was an ErRoR.. with determineSelections ",err);});

// buildReadMe
// .prompt([

// ])

// .then()

// .catch(err =>{console.log ("there was an ErRoR .. with buildReadMe ",err);});