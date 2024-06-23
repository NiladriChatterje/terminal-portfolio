import { terminal } from "./Terminal";
import {
    bsc_final, fetchGithubRepos, redirectToRepo, photo, showSkills,
    certificates, github, hs_result, icse_result, linkedIn, mca_final,
    twitter
} from './documents'

//I took the help of ASCII chart.. do the same if you want too :)
export function clearUpToRow() {
    terminal.clear();
    terminal.write('\x1b[2K');
    terminal.write(`
   ____            _    __       _ _       
  |  _ \\___   _ __| |_ / _| ___ | (_) ___  
  | |_) / _\\ | '__| __| |_ / _ \\| | |/ _ \\ 
  |  __/ (_) | |  | |_|  _| (_) | | | (_) |
  |_|  \\___/ |_|  \\__||_| \\___ /|_|_|\\___/     
  
  NILADRI_CHATTERJEE
`);
    for (let i = 0; i < terminal.cols; i++)
        terminal.write('_');
    function createArrowText() {
        return `\x1b[107m \x1b[30mWelcome {User} \x1b[48;5;205m\x1b[37m▶ \x1b[30m~ \x1b[30mKnow \x1b[30mAbout \x1b[30mme ~ \x1b[0m\x1b[38;5;205m▶\n`;

    }

    const renderText = createArrowText();
    terminal.write(renderText)
    terminal.write("\n\x1b[103m \x1b[30m$command/here $ ↵ \x1b[0m\x1b[93m▶\x1b[0m ");
}

function showMCAResult() {
    terminal.writeln(mca_final);
    terminal.write("\n\x1b[103m \x1b[30m$command/here $ ↵ \x1b[0m\x1b[93m▶\x1b[0m ");
}



const ExistingCommand = new Map<string | RegExp, any>(
    [
        ['man', `\n
  ${"ls skill".padEnd(window.innerWidth > 1200 ? 35 : 20)}${"list all the skills acquired"}
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
  ${"reveal face".padEnd(window.innerWidth > 1200 ? 35 : 20)}${"ASCII photo of mine (Just for fun :) )"}\n`],
        ["cls", clearUpToRow],
        ["show mca", showMCAResult],
        ["show bsc", () => { terminal.writeln(bsc_final); terminal.write("\n\x1b[103m \x1b[30m$command/here $ ↵ \x1b[0m\x1b[93m▶\x1b[0m "); }],
        ["show hs", () => { terminal.writeln(hs_result); terminal.write("\n\x1b[103m \x1b[30m$command/here $ ↵ \x1b[0m\x1b[93m▶\x1b[0m "); }],
        ["show icse", () => { terminal.writeln(icse_result); terminal.write("\n\x1b[103m \x1b[30m$command/here $ ↵ \x1b[0m\x1b[93m▶\x1b[0m "); }],
        ["ls cf", () => { terminal.writeln(certificates); terminal.write("\n\x1b[103m \x1b[30m$command/here $ ↵ \x1b[0m\x1b[93m▶\x1b[0m "); }],
        ["fetch linkedin", () => { terminal.writeln(linkedIn); terminal.write("\n\x1b[103m \x1b[30m$command/here $ ↵ \x1b[0m\x1b[93m▶\x1b[0m "); }],
        ["fetch github", () => { terminal.writeln(github); terminal.write("\n\x1b[103m \x1b[30m$command/here $ ↵ \x1b[0m\x1b[93m▶\x1b[0m "); }],
        ["fetch x", () => { terminal.writeln(twitter); terminal.write("\n\x1b[103m \x1b[30m$command/here $ ↵ \x1b[0m\x1b[93m▶\x1b[0m "); }],
        ["github ls", fetchGithubRepos],
        ["reveal face", () => { terminal.writeln(photo); terminal.write("\n\x1b[103m \x1b[30m$command/here $ ↵ \x1b[0m\x1b[93m▶\x1b[0m "); }],
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
    else {
        terminal.writeln(ExistingCommand.get('man'));
        terminal.write("\n\x1b[103m \x1b[30m$command/here $ ↵ \x1b[0m\x1b[93m▶\x1b[0m ");
    }

}
