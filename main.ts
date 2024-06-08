#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { faker, Faker } from "@faker-js/faker";


console.log(chalk.red("=".repeat (70)))
console.log( chalk.yellow( "  (っ◔◡◔)っ 💘♟ 𝐖𝐞𝐥𝐜𝐨𝐦𝐞_𝐓𝐨_𝐂𝐨𝐝𝐞_𝐖𝐢𝐭𝐡_𝐀𝐲𝐚𝐧  ♢💙 (っ◔◡◔)っ" ))
console.log(chalk.red("=".repeat(70)))

//Customer Class
class Customer {
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    mobi_Number: number;
    accNumber: number;

    constructor (fName:string, lName:string, age:number, gender:string , mobiNumber:number, accNumber:number){
        this.firstName = fName;
        this.lastName = lName;
        this.age = age;
        this.gender = gender;
        this.mobi_Number = mobiNumber;
        this.accNumber = accNumber;
    }
}
// interface BankAccount
interface BankAccount {
    accNumber: number;
    balance: number;
}
// class Bank
class Bank {
    custumer : Customer[] = [];
    account : BankAccount[] = [];

    addCustomer(obj: Customer){
        this.custumer.push(obj)
    }

    addAccountNumber(obj: BankAccount){
        this.account.push(obj)
    }

    
    transaction(accObj: BankAccount){
        let NewAccounts = this.account.filter(acc => acc.accNumber !== accObj.accNumber);
        this.account = [...NewAccounts, accObj]
    }

}

let myBank = new Bank();

//customer create
for(let i:number = 1; i<=3; i++){
let fName = faker.person.firstName('male');
let lName = faker.person.lastName();
let num = parseInt(faker.phone.number("3##########"));
const cus = new Customer(fName,lName,10*i, "male",num,1000+i)
myBank.addCustomer(cus);
myBank.addAccountNumber({accNumber: cus.accNumber, balance: 100*i})

}

// Bank Functionality
async function bankServices(bank:Bank) {
    do{
        let service = await inquirer.prompt({
            type:"list",
            name: "select",
            message: chalk.yellow("Please Select the Service\n"),
            choices: ["View Balance", "Cash Withdraw", 'Cash Deposit',"Exit"]
        });
        // view Balance
        if(service.select == "View Balance"){
           let res = await inquirer.prompt({
            type: "input",
            name: "num",
            message: chalk.yellow("Please Enter Your Account Number"),
           })
           let account = myBank.account.find((acc)=> acc.accNumber == res.num)
           if (!account){
            console.log(chalk.red.italic("Invalid Account Number!"));  
           }
           if (account){
            let name = myBank.custumer.find((item)=> item.accNumber == account.accNumber)
             console.log(`Dear ${chalk.green.italic(name?.firstName)} ${chalk.green.italic(name?.lastName)} your Account Balance is ${chalk.bold.yellow("$",account.balance)}`);
            
           }
        }
        // Cash Withdraw
        if(service.select == "Cash Withdraw"){
            let res = await inquirer.prompt({
                type: "input",
                name: "num",
                message: chalk.green.italic("Please Enter Your Account Number")
               });
               let account = myBank.account.find((acc)=> acc.accNumber == res.num);
               if (!account){
                console.log(chalk.red.italic("Invalid Account Number!"));  
               }
        if (account){
            let ans = await inquirer.prompt({
                type: "number",
                name: "rupee",
                message: chalk.blueBright.italic("Please Enter Your Amount"),
            });
            if (ans.rupee > account.balance){
                console.log(chalk.red.bold("Your account balance is insufficient!"));
                
            }
            let newBalance = account.balance - ans.rupee
            // transaction Method
            bank.transaction({accNumber:account.accNumber ,balance: newBalance});
            
        }
    
    }
        // Cash Deposit
        if(service.select == 'Cash Deposit'){
            let res = await inquirer.prompt({
                type: "input",
                name: "num",
                message: chalk.blueBright("Please Enter Your Account Number")
               });
               let account = myBank.account.find((acc)=> acc.accNumber == res.num);
               if (!account){
                console.log(chalk.red.italic("Invalid Account Number!"));  
               }
        if (account){
            let ans = await inquirer.prompt({
                type: "number",
                name: "rupee",
                message: chalk.green("Please Enter Your Amount"),
            })
            let newBalance = account.balance + ans.rupee
            // transaction Method
            bank.transaction({accNumber:account.accNumber ,balance: newBalance});
            
    }
        }
        if (service.select == "Exit"){
            return;
            
        }
    }
    while(true)
}
bankServices(myBank)











