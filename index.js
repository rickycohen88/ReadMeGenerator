const determineSections = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);



const promtUser = () => {
return determineSections
.prompt([
    {
        type: "input",
        name: "Title",
        message: "Please enter your project title"
    },
    {
        type: "input",
        name: "Description",
        message: "Please enter your project Description"
    },
    {
        type: "input",
        name: "Github",
        message: "Please enter your github user name."
    },
    {
        type: "input",
        name: "Email",
        message: "Please enter your email address."
    },
    {
        type:"checkbox",
        name:"Licences",
        message:"Please choose from the list of licences here.",
        choices:[
            {name:"MIT"},
            {name:"Apache"},
            {name:"GNU"},
            {name:"Creative Commons"}
        ]

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
            return responce.listOfSections.indexOf('motivation')>-1
        },
        
    },
    {
        type: "input",
        name: "buildStatusEntry",
        message: "Please enter your Build Status written entry, you will be asked if you would like to include a badge later.",
        when: function (responce){
            return responce.listOfSections.indexOf('buildStatus')>-1
        },
 
    },
        {
            type: "confirm",
            name: "buildStatusBadgesConfirm",
            message: "Would you like to incude badges?",
            when: function (responce){
                return responce.listOfSections.indexOf('buildStatus')>-1
            }
        },
            {
                type: "input",
                name: "buildStatusBadges",
                message: "Please enter your Badges url seperated by one(1) space.",
                when: function (responce){
                    if(responce.buildStatusBadgesConfirm == true){
                        return true;
                    }
                }
            },
    {
        type: "input",
        name: "codeStyleEntry",
        message: "Please enter your Code Style entry",
        when: function (responce){
            return responce.listOfSections.indexOf('codeStyle')>-1
        },
    
    },
    {
        type: "input",
        name: "screenshotsEntry",
        message: "Please enter your Screenshots urls seperated by one(1) space.",
        when: function (responce){
            return responce.listOfSections.indexOf('screenshots')>-1
        },
    
    },
    {
        type: "input",
        name: "techFrameworkEntry",
        message: "Please enter your Tech/Framework entry",
        when: function (responce){
            return responce.listOfSections.indexOf('techFramework')>-1
        },
      
    },
    {
        type: "input",
        name: "featuresEntry",
        message: "Please enter your features entry",
        when: function (responce){
            return responce.listOfSections.indexOf('features')>-1
        },
       
    },
    {
        type: "input",
        name: "codeExampleEntry",
        message: "Please enter your codeExample entryies seperated by a space(this is for images)",
        when: function (responce){
            return responce.listOfSections.indexOf('codeExample')>-1
        },
        
    },
    {
        type: "input",
        name: "installationEntry",
        message: "Please enter your installation entry",
        when: function (responce){
            return responce.listOfSections.indexOf('installation')>-1
        },
    
    },
    {
        type: "input",
        name: "apiReferenceEntry",
        message: "Please enter your API Reference entry",
        when: function (responce){
            return responce.listOfSections.indexOf('apiReference')>-1
        },

    },
    {
        type: "input",
        name: "howToUseEntry",
        message: "Please enter your How To Use entry",
        when: function (responce){
            return responce.listOfSections.indexOf('howToUse')>-1
        },

    },
    {
        type: "input",
        name: "contributeEntry",
        message: "Please enter your Contribute entry",
        when: function (responce){
            return responce.listOfSections.indexOf('contribute')>-1
        },

    },
    {
        type: "input",
        name: "creditsEntry",
        message: "Please enter your Credits entry",
        when: function (responce){
            return responce.listOfSections.indexOf('credits')>-1
        },

    },
    {
        type: "input",
        name: "licenceEntry",
        message: "Please enter your licence entry",
        when: function (responce){
            return responce.listOfSections.indexOf('licence')>-1
        },

    },
    ]);
}

 const generateMarkDown = (responce) =>{
     let genFile="";
        genFile +=`# ${responce.Title}\r\n![Image](https://img.sheilds.io/badge/Licence-${responce.Licences}-green)\r\n`;
        genFile +=`## Description\r\n`;
        genFile +=`${responce.Description}\r\n`
        genFile +=`## Table of Contents\r\n`;
        genFile +=`[Licence](#Licence)\r\n [Questions](#Questions)\r\n`;
        toc = responce.listOfSections;
        for(i=0;i<toc.length;i++){
            genFile += `[`+toc[i]+`](#`+toc[i]+`)`;
        }
        genFile+=`\r\n`;
        if(responce.listOfSections.indexOf('motivation')>-1){
            genFile += `## Motivation <a name="motivation"></a>\r\n`;
            genFile += `${responce.motivationEntry}\r\n`;
        }
        if(responce.listOfSections.indexOf('buildStatus')>-1){
            genFile += `## Build Status <a name="buildStatus"></a>\r\n`;
                if(responce.buildStatusBadges){
                    arrOfBadges=responce.buildStatusBadges.split(" ");
                    for(i=0;i<arrOfBadges;i++){
                        genFile += `![Image](`+arrOfBadges[i]+`)\r\n`; 
                    }
                }
            genFile += `${responce.buildStatusEntry}\r\n`;
        }
        if(responce.listOfSections.indexOf('codeStyle')>-1){
            genFile += `## Code Style <a name="codeStyle"></a>\r\n`;
            genFile += `${responce.codeStyleEntry}\r\n`;
        }
        if(responce.listOfSections.indexOf('screenshots')>-1){
            genFile += `## Screenshots <a name="screenshots"></a>\r\n`;
            arrOfScreenshots = responce.screenshotsEntry.split(" ");
            for(i=0;i<arrOfScreenshots;i++){
                genFile += `![Image](`+arrOfScreenshots[i]+`)\r\n`; 
            }
            genFile += `${responce.screenshotsEntry}\r\n`;
        }
        if(responce.listOfSections.indexOf('techFramework')>-1){
            genFile += `## Tech/Framework <a name="techFramework"></a>\r\n`;
            genFile += `${responce.techFrameworkEntry}\r\n`;
        }
        if(responce.listOfSections.indexOf('features')>-1){
            genFile += `## Features <a name="features"></a>\r\n`;
            genFile += `${responce.featuresEntry}\r\n`;
        }
        if(responce.listOfSections.indexOf('codeExample')>-1){
            genFile += `## Code Examples <a name="codeExamples"></a>\r\n`;
            arrOfCodeExamples = responce.codeExampleEntry.split(" ");
            for(i=0;i<arrOfCodeExamples;i++){
                genFile += `![Image](`+arrOfCodeExamples[i]+`)\r\n`;
        }
        if(responce.listOfSections.indexOf('installation')>-1){
            genFile += `## Installation <a name="installation"></a>\r\n`;
            genFile += `${responce.installationEntry}\r\n`;
        }
        if(responce.listOfSections.indexOf('apiReference')>-1){
            genFile += `## API Reference <a name="apiReference"></a>\r\n`;
            genFile += `${responce.apiReferenceEntry}\r\n`
        }
        if(responce.listOfSections.indexOf('howToUse')>-1){
            genFile += `## How To Use <a name="howToUse"></a>\r\n`;
            genFile += `${responce.howToUseEntry}\r\n`;
        }
        genFile += `## Questions? <a name="Questions"></a>\r\n [Github](https://github.com/${responce.Github})<br>### *Email*:<${responce.Email}>\r\n`
        if(responce.listOfSections.indexOf('contribute')>-1){
            genFile += `## Contribute <a name="contribute"></a>\r\n`;
            genFile += `${responce.contributeEntry}\r\n`;
        }
        if(responce.listOfSections.indexOf('credits')>-1){
            genFile += `## Credits <a name="credits"></a>\r\n`;
            genFile += `${responce.creditsEntry}\r\n`;
        }
        genFile += `## Licence <a name="Licence"></a>\r\n`;
        genFile += `${responce.licenceEntry}\r\n`;
        switch(responce.listOfSections.indexOf('licence')>-1){
            case (responce.Licences.indexOf("MIT")>-1):
                genFile += `\r\n Copyright (c) <2020> <${responce.Github}>

                Permission is hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the "Software"), to deal
                in the Software without restriction, including without limitation the rights
                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                copies of the Software, and to permit persons to whom the Software is
                furnished to do so, subject to the following conditions:
                
                The above copyright notice and this permission notice shall be included in all
                copies or substantial portions of the Software.
                
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                SOFTWARE.`
                break;
            case (responce.Licences.indexOf(`Apache`)>-1):
                genFile += `\r\n
                        Copyright [2020] [${responce.Github}]

                        Licensed under the Apache License, Version 2.0 (the "License");
                        you may not use this file except in compliance with the License.
                        You may obtain a copy of the License at

                        http://www.apache.org/licenses/LICENSE-2.0

                        Unless required by applicable law or agreed to in writing, software
                        distributed under the License is distributed on an "AS IS" BASIS,
                        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                        See the License for the specific language governing permissions and
                        limitations under the License.`
                        break;
            
            case (responce.Licences.indexOf(`GNU`)>-1):
                genFile += `\r\n
                <one line to give the program's name and a brief idea of what it does.>
                Copyright (C) <2020>  <${responce.Github}>

                This program is free software: you can redistribute it and/or modify
                it under the terms of the GNU General Public License as published by
                the Free Software Foundation, either version 3 of the License, or
                (at your option) any later version.

                This program is distributed in the hope that it will be useful,
                but WITHOUT ANY WARRANTY; without even the implied warranty of
                MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
                GNU General Public License for more details.
                `
                break;
            case (responce.Licences.indexOf(`Creative Commons`)>-1):
                genFile += `\r\n
                Creative Commons Attribution 4.0 International Public License
                By exercising the Licensed Rights (defined below), You accept and agree to be bound by the terms and conditions of this Creative Commons Attribution 4.0 International Public License ("Public License"). To the extent this Public License may be interpreted as a contract, You are granted the Licensed Rights in consideration of Your acceptance of these terms and conditions, and the Licensor grants You such rights in consideration of benefits the Licensor receives from making the Licensed Material available under these terms and conditions.

                Section 1 – Definitions.

                Adapted Material means material subject to Copyright and Similar Rights that is derived from or based upon the Licensed Material and in which the Licensed Material is translated, altered, arranged, transformed, or otherwise modified in a manner requiring permission under the Copyright and Similar Rights held by the Licensor. For purposes of this Public License, where the Licensed Material is a musical work, performance, or sound recording, Adapted Material is always produced where the Licensed Material is synched in timed relation with a moving image.
                Adapter's License means the license You apply to Your Copyright and Similar Rights in Your contributions to Adapted Material in accordance with the terms and conditions of this Public License.
                Copyright and Similar Rights means copyright and/or similar rights closely related to copyright including, without limitation, performance, broadcast, sound recording, and Sui Generis Database Rights, without regard to how the rights are labeled or categorized. For purposes of this Public License, the rights specified in Section 2(b)(1)-(2) are not Copyright and Similar Rights.
                Effective Technological Measures means those measures that, in the absence of proper authority, may not be circumvented under laws fulfilling obligations under Article 11 of the WIPO Copyright Treaty adopted on December 20, 1996, and/or similar international agreements.
                Exceptions and Limitations means fair use, fair dealing, and/or any other exception or limitation to Copyright and Similar Rights that applies to Your use of the Licensed Material.
                Licensed Material means the artistic or literary work, database, or other material to which the Licensor applied this Public License.
                Licensed Rights means the rights granted to You subject to the terms and conditions of this Public License, which are limited to all Copyright and Similar Rights that apply to Your use of the Licensed Material and that the Licensor has authority to license.
                Licensor means the individual(s) or entity(ies) granting rights under this Public License.
                Share means to provide material to the public by any means or process that requires permission under the Licensed Rights, such as reproduction, public display, public performance, distribution, dissemination, communication, or importation, and to make material available to the public including in ways that members of the public may access the material from a place and at a time individually chosen by them.
                Sui Generis Database Rights means rights other than copyright resulting from Directive 96/9/EC of the European Parliament and of the Council of 11 March 1996 on the legal protection of databases, as amended and/or succeeded, as well as other essentially equivalent rights anywhere in the world.
                You means the individual or entity exercising the Licensed Rights under this Public License. Your has a corresponding meaning.
                Section 2 – Scope.

                License grant.
                Subject to the terms and conditions of this Public License, the Licensor hereby grants You a worldwide, royalty-free, non-sublicensable, non-exclusive, irrevocable license to exercise the Licensed Rights in the Licensed Material to:
                reproduce and Share the Licensed Material, in whole or in part; and
                produce, reproduce, and Share Adapted Material.
                Exceptions and Limitations. For the avoidance of doubt, where Exceptions and Limitations apply to Your use, this Public License does not apply, and You do not need to comply with its terms and conditions.
                Term. The term of this Public License is specified in Section 6(a).
                Media and formats; technical modifications allowed. The Licensor authorizes You to exercise the Licensed Rights in all media and formats whether now known or hereafter created, and to make technical modifications necessary to do so. The Licensor waives and/or agrees not to assert any right or authority to forbid You from making technical modifications necessary to exercise the Licensed Rights, including technical modifications necessary to circumvent Effective Technological Measures. For purposes of this Public License, simply making modifications authorized by this Section 2(a)(4) never produces Adapted Material.
                Downstream recipients.
                Offer from the Licensor – Licensed Material. Every recipient of the Licensed Material automatically receives an offer from the Licensor to exercise the Licensed Rights under the terms and conditions of this Public License.
                No downstream restrictions. You may not offer or impose any additional or different terms or conditions on, or apply any Effective Technological Measures to, the Licensed Material if doing so restricts exercise of the Licensed Rights by any recipient of the Licensed Material.
                No endorsement. Nothing in this Public License constitutes or may be construed as permission to assert or imply that You are, or that Your use of the Licensed Material is, connected with, or sponsored, endorsed, or granted official status by, the Licensor or others designated to receive attribution as provided in Section 3(a)(1)(A)(i).
                Other rights.

                Moral rights, such as the right of integrity, are not licensed under this Public License, nor are publicity, privacy, and/or other similar personality rights; however, to the extent possible, the Licensor waives and/or agrees not to assert any such rights held by the Licensor to the limited extent necessary to allow You to exercise the Licensed Rights, but not otherwise.
                Patent and trademark rights are not licensed under this Public License.
                To the extent possible, the Licensor waives any right to collect royalties from You for the exercise of the Licensed Rights, whether directly or through a collecting society under any voluntary or waivable statutory or compulsory licensing scheme. In all other cases the Licensor expressly reserves any right to collect such royalties.
                Section 3 – License Conditions.

                Your exercise of the Licensed Rights is expressly made subject to the following conditions.

                Attribution.

                If You Share the Licensed Material (including in modified form), You must:

                retain the following if it is supplied by the Licensor with the Licensed Material:
                identification of the creator(s) of the Licensed Material and any others designated to receive attribution, in any reasonable manner requested by the Licensor (including by pseudonym if designated);
                a copyright notice;
                a notice that refers to this Public License;
                a notice that refers to the disclaimer of warranties;
                a URI or hyperlink to the Licensed Material to the extent reasonably practicable;
                indicate if You modified the Licensed Material and retain an indication of any previous modifications; and
                indicate the Licensed Material is licensed under this Public License, and include the text of, or the URI or hyperlink to, this Public License.
                You may satisfy the conditions in Section 3(a)(1) in any reasonable manner based on the medium, means, and context in which You Share the Licensed Material. For example, it may be reasonable to satisfy the conditions by providing a URI or hyperlink to a resource that includes the required information.
                If requested by the Licensor, You must remove any of the information required by Section 3(a)(1)(A) to the extent reasonably practicable.
                If You Share Adapted Material You produce, the Adapter's License You apply must not prevent recipients of the Adapted Material from complying with this Public License.
                Section 4 – Sui Generis Database Rights.

                Where the Licensed Rights include Sui Generis Database Rights that apply to Your use of the Licensed Material:

                for the avoidance of doubt, Section 2(a)(1) grants You the right to extract, reuse, reproduce, and Share all or a substantial portion of the contents of the database;
                if You include all or a substantial portion of the database contents in a database in which You have Sui Generis Database Rights, then the database in which You have Sui Generis Database Rights (but not its individual contents) is Adapted Material; and
                You must comply with the conditions in Section 3(a) if You Share all or a substantial portion of the contents of the database.
                For the avoidance of doubt, this Section 4 supplements and does not replace Your obligations under this Public License where the Licensed Rights include other Copyright and Similar Rights.
                Section 5 – Disclaimer of Warranties and Limitation of Liability.

                Unless otherwise separately undertaken by the Licensor, to the extent possible, the Licensor offers the Licensed Material as-is and as-available, and makes no representations or warranties of any kind concerning the Licensed Material, whether express, implied, statutory, or other. This includes, without limitation, warranties of title, merchantability, fitness for a particular purpose, non-infringement, absence of latent or other defects, accuracy, or the presence or absence of errors, whether or not known or discoverable. Where disclaimers of warranties are not allowed in full or in part, this disclaimer may not apply to You.
                To the extent possible, in no event will the Licensor be liable to You on any legal theory (including, without limitation, negligence) or otherwise for any direct, special, indirect, incidental, consequential, punitive, exemplary, or other losses, costs, expenses, or damages arising out of this Public License or use of the Licensed Material, even if the Licensor has been advised of the possibility of such losses, costs, expenses, or damages. Where a limitation of liability is not allowed in full or in part, this limitation may not apply to You.
                The disclaimer of warranties and limitation of liability provided above shall be interpreted in a manner that, to the extent possible, most closely approximates an absolute disclaimer and waiver of all liability.
                Section 6 – Term and Termination.

                This Public License applies for the term of the Copyright and Similar Rights licensed here. However, if You fail to comply with this Public License, then Your rights under this Public License terminate automatically.
                Where Your right to use the Licensed Material has terminated under Section 6(a), it reinstates:

                automatically as of the date the violation is cured, provided it is cured within 30 days of Your discovery of the violation; or
                upon express reinstatement by the Licensor.
                For the avoidance of doubt, this Section 6(b) does not affect any right the Licensor may have to seek remedies for Your violations of this Public License.
                For the avoidance of doubt, the Licensor may also offer the Licensed Material under separate terms or conditions or stop distributing the Licensed Material at any time; however, doing so will not terminate this Public License.
                Sections 1, 5, 6, 7, and 8 survive termination of this Public License.
                Section 7 – Other Terms and Conditions.

                The Licensor shall not be bound by any additional or different terms or conditions communicated by You unless expressly agreed.
                Any arrangements, understandings, or agreements regarding the Licensed Material not stated herein are separate from and independent of the terms and conditions of this Public License.
                Section 8 – Interpretation.

                For the avoidance of doubt, this Public License does not, and shall not be interpreted to, reduce, limit, restrict, or impose conditions on any use of the Licensed Material that could lawfully be made without permission under this Public License.
                To the extent possible, if any provision of this Public License is deemed unenforceable, it shall be automatically reformed to the minimum extent necessary to make it enforceable. If the provision cannot be reformed, it shall be severed from this Public License without affecting the enforceability of the remaining terms and conditions.
                No term or condition of this Public License will be waived and no failure to comply consented to unless expressly agreed to by the Licensor.
                Nothing in this Public License constitutes or may be interpreted as a limitation upon, or waiver of, any privileges and immunities that apply to the Licensor or You, including from the legal processes of any jurisdiction or authority.
                `
                break;
            default:
        }
        return genFile;
    }
}
promtUser()
.then((responce) => writeFileAsync('readME.md', generateMarkDown(responce))
)
.catch(err =>{console.log ("there was an ErRoR.. with determineSelections ",err);});
 
