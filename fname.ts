//import inquireer and chalk

import inquirer from "inquirer";
import chalk from "chalk";

//make a type for Friends class
type Fname = {
  friendName: string;
};

//make a class

class friends {
  //MAKE AN ATTRIBUTE OF CLASS:
  private friendName: Fname[] = [];

  // CREAT A FUNCTION (manageFriends):
  async manageFriends(): Promise<void> {
    let exit = false;

    do {
      const answer = await inquirer.prompt([
        {
          name: "action",
          type: "list",
          message: "Choose an action",
          choices: [
            "Add Friend Name",
            "View Friend Names",
            "Delete Friend Name",
            "Exit",
          ],
        },
      ]);

      switch (answer.action) {
        case "Add Friend Name":
          await this.addFname();
          break;
        case "View Friend Names":
          this.viewFname();
          break;
        case "Delete Friend Name":
          await this.deleteFname();
          break;
        case "Exit":
          console.log(chalk.yellow("Exiting Name Manager. Goodbye!"));
          exit = true;
          break;
        default:
          break;
      }
    } while (!exit);
  }


  // CREAT A FUNCTION (addFnam):
  private async addFname(): Promise<void> {
    const nameDetails = await inquirer.prompt({
      name: "friendName",
      message: "Enter your friend name",
    });

    const newFriend: Fname = {
      friendName: nameDetails.friendName,
    };

    this.friendName.push(newFriend);
    console.log(chalk.greenBright("Name added successfully!"));
  }



  // CREAT A FUNCTION (viewFname):
  private viewFname(): void {
    this.friendName.forEach((friend, index) => {
      console.log(
        chalk.yellow(`${index + 1}.Friend Name: ${friend.friendName} `)
      );
    });
    console.log(chalk.magenta("-------------"));
  }

  // CREAT A FUNCTION (deleteFname):
  private async deleteFname(): Promise<void> {
    if (this.friendName.length === 0) {
        console.log(chalk.blueBright("No names to delete."));
        return;
    }

    console.log(chalk.magenta("--- Names ---"));
    this.friendName.forEach((person, index) => {
        console.log(chalk.yellow(`${index + 1}. Name: ${person.friendName}`));
    });
    console.log(chalk.magenta("-------------"));

    const deleteName = await inquirer.prompt({
      name: "deleteIndex",
      type: "input",
      message:
        "Enter the number of the name you want to delete (Press Enter to cancel):",
    });
    const deleteIndex = parseInt(deleteName.deleteIndex);

    if (isNaN(deleteIndex)) {
      console.log(chalk.yellow("Delete canceled."));
    } else if (deleteIndex < 1 || deleteIndex > this.friendName.length) {
      console.log(chalk.redBright("Invalid name number. Please enter a valid number."));
    } else {
      this.friendName.splice(deleteIndex - 1, 1);
      console.log(chalk.greenBright("Name deleted successfully!"));
    }
  }
}
//here make an instance of your class
const nameOfFriends = new friends();
nameOfFriends.manageFriends();
