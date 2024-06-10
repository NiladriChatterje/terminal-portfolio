import { terminal } from "../App";
import {
    bsc_final, fetchGithubRepos, redirectToRepo, photo, showSkills,
    certificates, github, hs_result, icse_result, linkedIn, mca_final
} from './documents'

//I took the help of ASCII chart.. do the same if you want too :)
function clearUpToRow(row: number = 10) {
    terminal.write(`\x1b[${row};1H`);
    for (let i = row + 1; i < terminal.rows; i++) {
        terminal.write('\x1b[2K'); // Clear the entire line
        terminal.write('\x1b[B'); // Move cursor down
    }
    // Move cursor to the specified row and clear from the cursor to the end of the screen
    terminal.write(`\x1b[${row};1H\x1b[J`);
}

function showMCAResult() {
    terminal.writeln(mca_final);
}



const ExistingCommand = new Map<string | RegExp, any>(
    [
        ['man', `
  ${"ls".padEnd(window.innerWidth > 1200 ? 35 : 20)}${"list all the documents available"}
  ${"ls cf".padEnd(window.innerWidth > 1200 ? 35 : 20)}${"list all but only certificates"}
  ${"cls".padEnd(window.innerWidth > 1200 ? 35 : 20)}${"clear the console."}
  ${"show mca".padEnd(window.innerWidth > 1200 ? 35 : 20)}${"Display MCA result."}
  ${"show bsc".padEnd(window.innerWidth > 1200 ? 35 : 20)}${"Display BSc(H) result."}
  ${"show hs".padEnd(window.innerWidth > 1200 ? 35 : 20)}${"display Higher Secondary result"}
  ${"show icse".padEnd(window.innerWidth > 1200 ? 35 : 20)}${"display Secondary result"}
  ${"fetch github".padEnd(window.innerWidth > 1200 ? 35 : 20)}${"provide github link"}
  ${"fetch linkedin".padEnd(window.innerWidth > 1200 ? 35 : 20)}${"provide linkedin link"}
  ${"fetch x".padEnd(window.innerWidth > 1200 ? 35 : 20)}${"provide twitter(X) link"}
  ${"github ls".padEnd(window.innerWidth > 1200 ? 35 : 20)}${"list some of my top projects"}
  ${"github show <repo>".padEnd(window.innerWidth > 1200 ? 35 : 20)}${"redirect to the repository"}
  ${"reveal face".padEnd(window.innerWidth > 1200 ? 35 : 20)}${"ASCII photo of mine (Just for fun :) )"}
       
        `],
        ["cls", clearUpToRow],
        ["show mca", showMCAResult],
        ["show bsc", () => { terminal.writeln(bsc_final) }],
        ["show hs", () => { terminal.writeln(hs_result) }],
        ["show icse", () => { terminal.writeln(icse_result) }],
        ["ls cf", () => { terminal.writeln(certificates) }],
        ["fetch linkedin", () => { terminal.writeln(linkedIn) }],
        ["fetch github", () => { terminal.writeln(github) }],
        ["github ls", fetchGithubRepos],
        ["reveal face", () => { terminal.writeln(photo) }],
        ["ls skill", showSkills]
    ]
);

export const handleCommand = (command: string) => {
    if (command.includes("github show")) {
        const tokenization = command.split(" ");
        if (tokenization.length < 3) throw new Error();

        const project: string | any = tokenization.pop();
        redirectToRepo(project.trim());
        return;
    }

    if (!ExistingCommand.has(command)) throw new Error();
    if (command != 'man')
        ExistingCommand.get(command)();

    else
        terminal.writeln(ExistingCommand.get('man'));

}
