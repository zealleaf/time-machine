import shell from "shelljs";
import inquirer from "inquirer";
import chalk from "chalk";

(async () => {
  if (!shell.which("git")) {
    shell.echo("Sorry, this script requires git");
    shell.exit(1);
  }

  const year = await inquirer.prompt({
    name: "year",
    type: "input",
    message:
      "Please enter the year, you want to return to the past (1990 ~ this year):",
    validate: (input) => {
      if (input >= 1999 && input <= new Date().getFullYear) {
        return true;
      } else {
        return chalk.red("Please input correctly! Try again 😀");
      }
    },
  });

  const month = await inquirer.prompt({
    name: "month",
    type: "input",
    message: "Please enter the month (1 ~ 12):",
    validate: (input) => {
      if (input >= 1 && input <= 12) {
        return true;
      } else {
        return chalk.red("Please input correctly! Try again 😀");
      }
    },
  });

  const date = new Date(
    parseInt(year.year),
    parseInt(month.month),
    0
  ).getDate();

  const day = await inquirer.prompt({
    name: "day",
    type: "input",
    message: `Please enter the day (1 ~ ${date}):`,
    validate: (input) => {
      if (input >= 1 && input <= date) {
        return true;
      } else {
        return chalk.red("Please input correctly! Try again 😀");
      }
    },
  });

  const y = year.year;
  const m = month.month < 10 ? "0" + month.month : month.month;
  const d = day.day < 10 ? "0" + day.day : day.day;

  shell.echo(
    chalk.greenBright(`Time confirmed! ${y}-${m}-${d}. Back in time~`)
  );

  shell.exec("git init");
  shell.exec("git branch -M main");
  shell.exec("git remote add origin git@github.com:zealleaf/time-machine.git");
  shell.exec("git add .");
  shell.exec(
    `GIT_AUTHOR_DATE="${y}-${m}-${d}T18:00:00" GIT_COMMITTER_DATE="${y}-${m}-${d}T18:00:00"  git commit -m "cool~"`
  );
  shell.exec("git push -u origin main");

  shell.echo(chalk.greenBright(`Back from the trip~`));
})();
