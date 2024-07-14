#! /usr/bin/env node
import inquirer from "inquirer";
let todos = [];
let condition = true;
while (condition) {
    let ans = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: "select an operation",
            choices: ["add", "update", "view", "delete", "exit"],
        }
        // {
        //     name: "addMore",
        //     type: "confirm",
        //     message: "do you want to add more todo?",
        //     default: "false"
        // }
    ]);
    if (ans.select === "add") {
        let addTodo = await inquirer.prompt({
            name: "todo",
            type: "input",
            message: "add items in the list",
            validate: function (input) {
                if (input.trim() == "") {
                    return "please enter a non empty item.";
                }
                return true;
            }
        });
        if (addTodo.todo.trim() !== "") {
            todos.push(addTodo.todo);
            todos.forEach(todo => console.log(todo));
        }
    }
    if (ans.select === "update") {
        let updateTodo = await inquirer.prompt({
            name: "todo",
            type: "list",
            message: "update items in the list",
            choices: todos.map(item => item)
        });
        let addTodo = await inquirer.prompt({
            name: "todo",
            type: "input",
            message: "add items in the list",
        });
        let newTodo = todos.filter(val => val !== updateTodo.todo);
        todos = [...newTodo, addTodo.todo];
        todos.forEach(todo => console.log(todo));
    }
    if (ans.select === "view") {
        console.log("***** TO-DO List *****");
        todos.forEach(todo => console.log(todo));
    }
    if (ans.select === "delete") {
        let deleteTodo = await inquirer.prompt({
            name: "todo",
            type: "list",
            message: "select items to delete",
            choices: todos.map(item => item)
        });
        let newTodo = todos.filter(val => val !== deleteTodo.todo);
        todos = [...newTodo];
        todos.forEach(todo => console.log(todo));
    }
    if (ans.select === "exit") {
        console.log("exiting the program");
        condition = false;
    }
    // todos.push(addTask.todo);
    // condition = addTask.addMore;
    // console.log(ans);
}
