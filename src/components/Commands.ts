import { terminal, lastBarrier } from './Terminal';
import {
    bsc_final, fetchGithubRepos, redirectToRepo, showSkills, showLeetCode,
    certificates, github, hs_result, icse_result, linkedIn, mca_final,
    twitter, showWorkExperience
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
    terminal.write("\n\x1b[38;5;39m┌─[\x1b[38;5;147mportfolio\x1b[38;5;39m]─[\x1b[38;5;147m~/console\x1b[38;5;39m]\n└─╼ \x1b[38;5;231m❯\x1b[38;5;147m❯\x1b[38;5;39m❯\x1b[0m ");
    lastBarrier.lastBarrier = terminal.buffer.active.cursorX;
}

function showMCAResult() {
    terminal.writeln(mca_final);
    terminal.write("\n\x1b[38;5;39m┌─[\x1b[38;5;147mportfolio\x1b[38;5;39m]─[\x1b[38;5;147m~/console\x1b[38;5;39m]\n└─╼ \x1b[38;5;231m❯\x1b[38;5;147m❯\x1b[38;5;39m❯\x1b[0m ");
}



const ExistingCommand = new Map<string | RegExp, any>(
    [
        ['man', `\n\x1b[38;5;147m┌────────────────── Available Commands ──────────────────┐\x1b[0m\n
  \x1b[38;5;39m│\x1b[0m \x1b[38;5;147m${`ls skill`.padEnd(window.innerWidth > 1200 ? 35 : 23)}\x1b[38;5;39m│\x1b[0m List all the skills acquired
  \x1b[38;5;39m│\x1b[0m \x1b[38;5;147m${`ls cf`.padEnd(window.innerWidth > 1200 ? 35 : 23)}\x1b[38;5;39m│\x1b[0m List certificates and achievements
  \x1b[38;5;39m│\x1b[0m \x1b[38;5;147m${`cls`.padEnd(window.innerWidth > 1200 ? 35 : 23)}\x1b[38;5;39m│\x1b[0m Clear the terminal
  \x1b[38;5;39m│\x1b[0m \x1b[38;5;147m${`show mca`.padEnd(window.innerWidth > 1200 ? 35 : 23)}\x1b[38;5;39m│\x1b[0m Display MCA academic results
  \x1b[38;5;39m│\x1b[0m \x1b[38;5;147m${`show bsc`.padEnd(window.innerWidth > 1200 ? 35 : 23)}\x1b[38;5;39m│\x1b[0m Display BSc(H) academic results
  \x1b[38;5;39m│\x1b[0m \x1b[38;5;147m${`show hs`.padEnd(window.innerWidth > 1200 ? 35 : 23)}\x1b[38;5;39m│\x1b[0m Display Higher Secondary results
  \x1b[38;5;39m│\x1b[0m \x1b[38;5;147m${`show icse`.padEnd(window.innerWidth > 1200 ? 35 : 23)}\x1b[38;5;39m│\x1b[0m Display Secondary results
  \x1b[38;5;39m│\x1b[0m \x1b[38;5;147m${`fetch github`.padEnd(window.innerWidth > 1200 ? 35 : 23)}\x1b[38;5;39m│\x1b[0m View GitHub profile
  \x1b[38;5;39m│\x1b[0m \x1b[38;5;147m${`fetch leetcode`.padEnd(window.innerWidth > 1200 ? 35 : 23)}\x1b[38;5;39m│\x1b[0m View LeetCode profile
  \x1b[38;5;39m│\x1b[0m \x1b[38;5;147m${`fetch linkedin`.padEnd(window.innerWidth > 1200 ? 35 : 23)}\x1b[38;5;39m│\x1b[0m View LinkedIn profile
  \x1b[38;5;39m│\x1b[0m \x1b[38;5;147m${`fetch x`.padEnd(window.innerWidth > 1200 ? 35 : 23)}\x1b[38;5;39m│\x1b[0m View Twitter/X profile
  \x1b[38;5;39m│\x1b[0m \x1b[38;5;147m${`github ls`.padEnd(window.innerWidth > 1200 ? 35 : 23)}\x1b[38;5;39m│\x1b[0m List featured projects
  \x1b[38;5;39m│\x1b[0m \x1b[38;5;147m${`show work_experience`.padEnd(window.innerWidth > 1200 ? 35 : 23)}\x1b[38;5;39m│\x1b[0m View work experience timeline
  \x1b[38;5;39m│\x1b[0m \x1b[38;5;147m${`github show <repo>`.padEnd(window.innerWidth > 1200 ? 35 : 23)}\x1b[38;5;39m│\x1b[0m Open repository in browser
\x1b[38;5;147m└──────────────────────────────────────────────────────┘\x1b[0m\n`],
        [`cls`, clearUpToRow],
        [`show mca`, showMCAResult],
        [`show bsc`, () => { terminal.writeln(bsc_final); terminal.write("\n\x1b[38;5;39m┌─[\x1b[38;5;147mportfolio\x1b[38;5;39m]─[\x1b[38;5;147m~/console\x1b[38;5;39m]\n└─╼ \x1b[38;5;231m❯\x1b[38;5;147m❯\x1b[38;5;39m❯\x1b[0m "); }],
        [`show hs`, () => { terminal.writeln(hs_result); terminal.write("\n\x1b[38;5;39m┌─[\x1b[38;5;147mportfolio\x1b[38;5;39m]─[\x1b[38;5;147m~/console\x1b[38;5;39m]\n└─╼ \x1b[38;5;231m❯\x1b[38;5;147m❯\x1b[38;5;39m❯\x1b[0m "); }],
        [`show icse`, () => { terminal.writeln(icse_result); terminal.write("\n\x1b[38;5;39m┌─[\x1b[38;5;147mportfolio\x1b[38;5;39m]─[\x1b[38;5;147m~/console\x1b[38;5;39m]\n└─╼ \x1b[38;5;231m❯\x1b[38;5;147m❯\x1b[38;5;39m❯\x1b[0m "); }],
        [`ls cf`, () => { terminal.writeln(certificates); terminal.write("\n\x1b[38;5;39m┌─[\x1b[38;5;147mportfolio\x1b[38;5;39m]─[\x1b[38;5;147m~/console\x1b[38;5;39m]\n└─╼ \x1b[38;5;231m❯\x1b[38;5;147m❯\x1b[38;5;39m❯\x1b[0m "); }],
        [`fetch linkedin`, () => { terminal.writeln(linkedIn); terminal.write("\n\x1b[38;5;39m┌─[\x1b[38;5;147mportfolio\x1b[38;5;39m]─[\x1b[38;5;147m~/console\x1b[38;5;39m]\n└─╼ \x1b[38;5;231m❯\x1b[38;5;147m❯\x1b[38;5;39m❯\x1b[0m "); }],
        [`fetch github`, () => { terminal.writeln(github); terminal.write("\n\x1b[38;5;39m┌─[\x1b[38;5;147mportfolio\x1b[38;5;39m]─[\x1b[38;5;147m~/console\x1b[38;5;39m]\n└─╼ \x1b[38;5;231m❯\x1b[38;5;147m❯\x1b[38;5;39m❯\x1b[0m "); }],
        [`fetch x`, () => { terminal.writeln(twitter); terminal.write("\n\x1b[38;5;39m┌─[\x1b[38;5;147mportfolio\x1b[38;5;39m]─[\x1b[38;5;147m~/console\x1b[38;5;39m]\n└─╼ \x1b[38;5;231m❯\x1b[38;5;147m❯\x1b[38;5;39m❯\x1b[0m "); }],
        [`github ls`, fetchGithubRepos],
        [`ls skill`, showSkills],
        [`fetch leetcode`, () => { terminal.write(showLeetCode); terminal.write("\n\x1b[38;5;39m┌─[\x1b[38;5;147mportfolio\x1b[38;5;39m]─[\x1b[38;5;147m~/console\x1b[38;5;39m]\n└─╼ \x1b[38;5;231m❯\x1b[38;5;147m❯\x1b[38;5;39m❯\x1b[0m "); }],
        [`show work_experience`, showWorkExperience],
    ]
);

export const getMatchingCommands = (partial: string): string[] => {
    const matches: string[] = [];
    ExistingCommand.forEach((_, cmd) => {
        if (typeof cmd === 'string' && cmd.startsWith(partial)) {
            matches.push(cmd);
        }
    });
    return matches;
};

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
