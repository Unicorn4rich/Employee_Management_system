#! /usr/bin/env node

import inquirer from 'inquirer';

// Ye hmara main data base hai
let main_data = [];

// Loop ko true/false condition assign karne wala variable 
let condition = true;

// Ye hmara loop hai. ye ham hain. or ye hmara project tayyar ho rha hai..........
while (condition) {

    // Objects se aai sari information yahan store ho rahi hai... 
    let information = await inquirer.prompt([
        {
            name: "name",
            message: "What is your name?",
            type: "string"
        },
        {
            name: "id",
            message: "What is your id?",
            type: "number"
        },
        {
            name: "salary",
            message: "How much is your Salary?",
            type: "number"
        }
    ]);

    // Objects se aai information main array mein transfer kar rahe hain...
    main_data.push(information);
    console.log(main_data);

    // Yahan ham user se pooch rahe hain ke variable dobara chalaya jaye ya nahi?...
    let again = await inquirer.prompt([
        {
            name: "ques",
            message: "Do you want to add more employees?",
            type: "confirm",
            default: "true"
        }
    ]);

    // Is question se aai true ya false ki value condition ke variable ko de rahe hain...
    if (again.ques === false) {
        condition = false;
        console.log("Your final list: ", main_data);
    }
}

// Feature provide karne ke liye user ka input le rahe hain 
let feature = await inquirer.prompt(
    {
        name: "modify",
        message: "Do you want to modify your list?",
        type: "confirm",
        default: "true"
    }
);

// User agar modification karna chahta hai to usay ye list show karwa rahe hain main_data ki...
if (feature.modify === true) {

    let choice = await inquirer.prompt(
        {
            name: "list",
            message: "Please select option",
            type: "list",
            choices: ["Edit", "Delete", "Updated_function"]
        }
    );

    // Edit ka feature apply kar rahe hain...
    if (choice.list === "Edit") {


        // ye method main_data ke andar jitne bhi objects hain un sab ko alag alag kar deta hai... 
        let edit_steps = main_data.map((item, index) => {
            return {
                name: `Name: ${item.name}, ID: ${item.id}, Salary: ${item.salary}`,
                value: index
            };
        });


        // employee list mein se jis par modification krwani ho usy select krwa rhy hain...
        let selected = await inquirer.prompt([
            {
                name: "it",
                message: "Which employee do you want to edit?",
                type: "list",
                choices: edit_steps
            }
        ]);


            // user se object ke items choose krwa rhy hain taky un par modification krwa saken...
        let item = await inquirer.prompt([
            {
                name: "choose",
                message: "Please select what you want to edit?",
                type: "list",
                choices: ["Name", "ID", "Salary"]
            },
            {
                name: 'new',
                message: "Enter new value to edit?",
                type: "input"
            }
        ]);


          // object ke har item ko user se choose krwany ke bad replace kar rhy hain....
        switch (item.choose) {
            case "Name":
                main_data[selected.it].name = item.new;
                break;
            case "ID":
                main_data[selected.it].id = Number(item.new);
                break;
            case "Salary":
                main_data[selected.it].salary = Number(item.new);
                break;
        }

        console.log("Your list after Edit", main_data);
    };


    // object information delete karne ka feature
    if(choice.list === "Delete"){

      // ye method main_data ke andar jitne bhi objects hain un sab ko alag alag kar deta hai... 
        let step_by_step = main_data.map((item, index) => {
            return {
                name: `Name: ${item.name}, ID: ${item.id}, Salary: ${item.salary}`,
                value: index
            };
        });

    // yahn se ham wo list choose krwa rhy hain jise user delete karna chahta hai
        let Del = await inquirer.prompt(
            {
                name:"delete",
                message: "Which employee information you want to delete ?",
                type: "list",
                choices: step_by_step
            }
        );

        // object ki deleted value ko aik new veriable mein assign krwa diyya
        let deleted_val = Del.delete;

        // or yahn se delete krwa diyya us value ko
        if (deleted_val >= 0) {
            let deleted = main_data.splice(deleted_val, 1);
            console.log("Your deleted: ", deleted);
            console.log("Your list after Employee information delete: ", main_data);
        }
    };


    if(choice.list === 'Updated_function'){

        let extract =  main_data.map((item, indo) => {
            return{
                name: `name: ${item.name} id: ${item.id} salary: ${item.salary}`,
                value: indo
            }
         });


         let change = await inquirer.prompt([
            {
                name: "data",
                message: "Please select option to Update Data",
                type: "list",
                choices: extract
            }
         ]);

         let Exchan = change.data;


        let newData = await inquirer.prompt([
            {
                name: "name",
                message: "What is your name?",
                type: "string"
            },
            {
                name: "id",
                message: "What is your id?",
                type: "number"
            },
            {
                name: "salary",
                message: "How much is your Salary?",
                type: "number"
            }
        ]);

        main_data[Exchan] = newData;
        // console.log("Your old data: ", change.data);
        console.log("Your data after Update: ", main_data);
      
    }

};


// <-----------------------------------------------END--------------------------------------------------->

