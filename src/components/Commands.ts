import { terminal, lastBarrier } from './Terminal';
import {
    bsc_final, fetchGithubRepos, redirectToRepo, showSkills, showLeetCode,
    certificates, github, hs_result, icse_result, linkedIn, mca_final,
    twitter
} from './documents'

//I took the help of ASCII chart.. do the same if you want too :)
export function clearUpToRow() {
    terminal.clear();
    terminal.write('\x1b[2K');
    terminal.write('\n\x1b[38;5;39m');  // Set blue color
    const isMobile = window.innerWidth < 768;
    terminal.write(isMobile ? `
   ╭───────────────────────────╮
   │\x1b[38;5;39m╔═╗╔═╗╦═╗╔╦╗╔═╗╔═╗╦  ╦╔═╗│
   │╠═╝║ ║╠╦╝ ║ ╠╣ ║ ║║  ║║ ║│
   │╩  ╚═╝╩╚═ ╩ ╚  ╚═╝╩═╝╩╚═╝│
   ╰───────────────────────────╯

    \x1b[38;5;147m⚡ NILADRI CHATTERJEE \x1b[38;5;240m<Full Stack Developer/>\x1b[38;5;39m\n` : `
   ╭──────────────────────────────────────────╮
   │\x1b[38;5;39m██████╗ ██████╗ ██████╗ ████████╗███████╗  ██████╗ ██╗     ██╗ ██████╗ │
   │██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗│
   │██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║│
   │██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║│
   │██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝│
   │╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ │
   ╰──────────────────────────────────────────╯

   \x1b[38;5;147m⚡ NILADRI CHATTERJEE \x1b[38;5;240m<Full Stack Developer/>\x1b[38;5;39m\n`);

    // Add decorative line below the header
    terminal.write('\x1b[38;5;39m   ┏');
    terminal.write('\x1b[38;5;39m┓\n\n');

    // Add separator line in blue
    terminal.write('\x1b[38;5;39m');  // Set blue color
    for (let i = 0; i < terminal.cols; i++) {
        terminal.write('━');
    }
    terminal.write('\x1b[0m\n');

    const date = new Date().toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    const welcomeMessage = `\x1b[38;5;147m┌─══ \x1b[38;5;231mWelcome Guest \x1b[38;5;147m══─┐
│ \x1b[38;5;231m${date} \x1b[38;5;147m           │
├────────────────────┘
│
│ \x1b[38;5;231mType 'man' to see available commands
│ \x1b[38;5;231mType 'cls' to clear the terminal
│ \x1b[38;5;231mUse Tab for command completion
\x1b[38;5;147m└─────────────────────────────────\n`;

    terminal.write(welcomeMessage)
    terminal.write("\n\x1b[38;5;231m┌─[\x1b[38;5;231mportfolio\x1b[38;5;231m]─[\x1b[38;5;231m~/console\x1b[38;5;231m]\n└──╼ \x1b[38;5;231m❯\x1b[0m ");
    lastBarrier.lastBarrier = terminal.buffer.active.cursorX;
}

function showMCAResult() {
    terminal.writeln(mca_final);
    terminal.write("\n\x1b[38;5;231m┌─[\x1b[38;5;231mportfolio\x1b[38;5;231m]─[\x1b[38;5;231m~/console\x1b[38;5;231m]\n└──╼ \x1b[38;5;231m❯\x1b[0m ");
}



const ExistingCommand = new Map<string | RegExp, any>(
    [
        ['man', `\n
  ${`ls skill`.padEnd(window.innerWidth > 1200 ? 35 : 23)}${`list all the skills acquired`}
  ${`ls cf`.padEnd(window.innerWidth > 1200 ? 35 : 23)}${`list all but only certificates`}
  ${`cls`.padEnd(window.innerWidth > 1200 ? 35 : 23)}${`clear the console.`}
  ${`show mca`.padEnd(window.innerWidth > 1200 ? 35 : 23)}${`Display MCA result.`}
  ${`show bsc`.padEnd(window.innerWidth > 1200 ? 35 : 23)}${`Display BSc(H) result.`}
  ${`show hs`.padEnd(window.innerWidth > 1200 ? 35 : 23)}${`display Higher Secondary result`}
  ${`show icse`.padEnd(window.innerWidth > 1200 ? 35 : 23)}${`display Secondary result`}
  ${`fetch github`.padEnd(window.innerWidth > 1200 ? 35 : 23)}${`Provide github Profile`}
  ${`fetch leetcode`.padEnd(window.innerWidth > 1200 ? 35 : 23)}${`Provide Leetcode Profile`}
  ${`fetch linkedin`.padEnd(window.innerWidth > 1200 ? 35 : 23)}${`Provide linkedin Profile`}
  ${`fetch x`.padEnd(window.innerWidth > 1200 ? 35 : 23)}${`provide twitter(X) link`}
  ${`github ls`.padEnd(window.innerWidth > 1200 ? 35 : 23)}${`list some of my top projects`}
  ${`show work_experience`.padEnd(window.innerWidth > 1200 ? 35 : 23)}${`places where I have worked in`}
  ${`github show <repo>`.padEnd(window.innerWidth > 1200 ? 35 : 23)}${`redirect to the repository`}\n`],
        [`cls`, clearUpToRow],
        [`show mca`, showMCAResult],
        [`show bsc`, () => { terminal.writeln(bsc_final); terminal.write("\n\x1b[38;5;231m┌─[\x1b[38;5;231mportfolio\x1b[38;5;231m]─[\x1b[38;5;231m~/console\x1b[38;5;231m]\n└──╼ \x1b[38;5;231m❯\x1b[0m "); }],
        [`show hs`, () => { terminal.writeln(hs_result); terminal.write("\n\x1b[38;5;231m┌─[\x1b[38;5;231mportfolio\x1b[38;5;231m]─[\x1b[38;5;231m~/console\x1b[38;5;231m]\n└──╼ \x1b[38;5;231m❯\x1b[0m "); }],
        [`show icse`, () => { terminal.writeln(icse_result); terminal.write("\n\x1b[38;5;231m┌─[\x1b[38;5;231mportfolio\x1b[38;5;231m]─[\x1b[38;5;231m~/console\x1b[38;5;231m]\n└──╼ \x1b[38;5;231m❯\x1b[0m "); }],
        [`ls cf`, () => { terminal.writeln(certificates); terminal.write("\n\x1b[38;5;231m┌─[\x1b[38;5;231mportfolio\x1b[38;5;231m]─[\x1b[38;5;231m~/console\x1b[38;5;231m]\n└──╼ \x1b[38;5;231m❯\x1b[0m "); }],
        [`fetch linkedin`, () => { terminal.writeln(linkedIn); terminal.write("\n\x1b[38;5;231m┌─[\x1b[38;5;231mportfolio\x1b[38;5;231m]─[\x1b[38;5;231m~/console\x1b[38;5;231m]\n└──╼ \x1b[38;5;231m❯\x1b[0m "); }],
        [`fetch github`, () => { terminal.writeln(github); terminal.write("\n\x1b[38;5;231m┌─[\x1b[38;5;231mportfolio\x1b[38;5;231m]─[\x1b[38;5;231m~/console\x1b[38;5;231m]\n└──╼ \x1b[38;5;231m❯\x1b[0m "); }],
        [`fetch x`, () => { terminal.writeln(twitter); terminal.write("\n\x1b[38;5;231m┌─[\x1b[38;5;231mportfolio\x1b[38;5;231m]─[\x1b[38;5;231m~/console\x1b[38;5;231m]\n└──╼ \x1b[38;5;231m❯\x1b[0m "); }],
        [`github ls`, fetchGithubRepos],
        [`ls skill`, showSkills],
        [`fetch leetcode`, () => { terminal.write(showLeetCode); terminal.write("\n\x1b[38;5;231m┌─[\x1b[38;5;231mportfolio\x1b[38;5;231m]─[\x1b[38;5;231m~/console\x1b[38;5;231m]\n└──╼ \x1b[38;5;231m❯\x1b[0m "); }],
    ]
);

export const handleCommand = (command: string) => {
    if (command.includes(`github show`)) {
        const tokenization = command.split(` `);
        if (tokenization.length < 3) throw new Error();

        const project: string | any = tokenization.pop();
        redirectToRepo(project.trim());
        return;
    }
    if (!ExistingCommand.has(command)) throw new Error();
    if (command != 'man')
        ExistingCommand.get(command)();
    else {
        terminal.write('\x1b[J');
        terminal.writeln(ExistingCommand.get('man'));
        terminal.write("\n\x1b[38;5;231m┌─[\x1b[38;5;231mportfolio\x1b[38;5;231m]─[\x1b[38;5;231m~/console\x1b[38;5;231m]\n└──╼ \x1b[38;5;231m❯\x1b[0m ");
    }
}
