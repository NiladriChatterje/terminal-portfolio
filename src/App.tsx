import { terminal, lastBarrier } from "./components/Terminal"
import { handleCommand, getMatchingCommands } from './components/Commands'
import { FitAddon } from '@xterm/addon-fit';
import { useEffect, useRef } from "react"
import { WebLinksAddon } from 'xterm-addon-web-links'
import styles from './App.module.css'
import toast, { Toaster } from "react-hot-toast";

let temp_str: string[] = [];
class TrieNode {
  letter: string;
  map: Map<string, TrieNode> = new Map();
  isEnd: boolean = true;
  constructor(letter: string) {
    this.letter = letter;
  }
}
export function createWelcomeMessage() {
  const username = 'Guest';
  const date = new Date().toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  return `\x1b[38;5;147m┌────────\x1b[38;5;39m═\x1b[38;5;147m[ \x1b[38;5;231mWelcome ${username} \x1b[38;5;147m]\x1b[38;5;39m═\x1b[38;5;147m──────────────┐
\x1b[38;5;147m│ \x1b[38;5;147m[\x1b[38;5;39m⌚\x1b[38;5;147m] \x1b[38;5;231m${date.padEnd(36)}\x1b[38;5;147m│
\x1b[38;5;147m├─────────────────────────────────────────┤
\x1b[38;5;147m│                                         │
\x1b[38;5;147m│ \x1b[38;5;39m❯\x1b[38;5;231m Type \x1b[38;5;147mman\x1b[38;5;231m for available commands       \x1b[38;5;147m│
\x1b[38;5;147m│ \x1b[38;5;39m❯\x1b[38;5;231m Type \x1b[38;5;147mcls\x1b[38;5;231m to clear terminal            \x1b[38;5;147m│
\x1b[38;5;147m│ \x1b[38;5;39m❯\x1b[38;5;231m Use \x1b[38;5;147mTab\x1b[38;5;231m for auto-completion           \x1b[38;5;147m│
\x1b[38;5;147m└─────────────────────────────────────────┘\n`;
}
class Trie {
  HEAD: TrieNode;
  temp: TrieNode | any;

  constructor() {
    this.HEAD = new TrieNode(' ');
    this.temp = this.HEAD;
  }
  reset() {
    this.temp = this.HEAD;
  }
  addNext(current_command: string) {
    this.reset();
    for (let i of current_command) {
      if (this.temp.map.has(i)) {
        this.temp.isEnd = false;
        this.temp = this.temp.map.get(i);
      } else {
        const trieNode = new TrieNode(i);
        this.temp.map.set(i, trieNode);
        this.temp.isEnd = false;
        this.temp = trieNode;
      }
    }
    this.clearTerminalHistory();
  }

  dfs = (node: TrieNode | any, res = '', actual_cmd: string = '', arr: string[] = []): string[] => {
    if (node?.isEnd) {
      arr.push(res);
      res = actual_cmd;
      return arr;
    }

    for (const [_, value] of node.map) {
      this.dfs(value, res + value.letter, actual_cmd, arr);
    }
    return arr;
  }

  clearTerminalHistory() {
    terminal.write('\x1b7');
    terminal.write('\x1b[J');
    let k = 5;
    while (k-- > 0)
      terminal.write('\n');
    terminal.write('\x1b8');
  }

  fetch(current_command: string) {
    this.reset();
    if (this.temp?.isEnd) return;

    for (let i of current_command) {
      if (this.temp.map.has(i))
        this.temp = this.temp.map.get(i);

      else
        return
      this.clearTerminalHistory()
    }

    // this.clearTerminalHistory()

    temp_str = this.dfs(this.temp, current_command, current_command);

    console.log(temp_str);
    terminal.writeln('\n');
    temp_str.map(item => {
      terminal.write('\x1b[2K')
      terminal.write(` \x1b[38;5;39m│\x1b[38;5;147m❯ \x1b[38;5;231m${item.length > 25
        ? `${item.slice(0, 23)}...`.padEnd(window.innerWidth < 1200 ? 30 : 45)
        : item.padEnd(window.innerWidth < 1200 ? 30 : 45)
        }\x1b[38;5;39m[\x1b[38;5;147mhistory\x1b[38;5;39m]\x1b[0m\n`)
    })

    for (let i = 0; i <= temp_str.length; i++)
      terminal.write('\x1b[1A');
    terminal.write('\x1b8');
  }

}

let rootNode: Trie;
let clearTimeoutID: number;
let val: string;

function App() {
  const terminalRef = useRef<HTMLDivElement | any>(null);

  useEffect(() => {
    rootNode = new Trie();
    let commands = false;
    const debouncer = function () {
      if (clearTimeoutID)
        clearInterval(clearTimeoutID);
      clearTimeoutID = setTimeout(() => {
        if (!commands) {
          terminal.write('\x1b[22G');
          terminal.write('\x1b[J');
          terminal.write("\x1b[38;5;240m💡 Try: \x1b[38;5;147mman\x1b[38;5;39m ❯ \x1b[0m")
        }
      }, 1000);
    }

    const webLinksAddon = new WebLinksAddon();
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.loadAddon(webLinksAddon);
    let current_command = ''
    terminal.open(terminalRef.current);
    fitAddon.fit();
    // Write welcome header with improved styling
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

   \x1b[38;5;147m NILADRI CHATTERJEE \x1b[38;5;240m<Full Stack Developer/>\x1b[38;5;39m\n`);

    // Add decorative line below the header
    terminal.write('\x1b[38;5;39m   ┏');
    // Fill the line with ━ characters to the end of the terminal width
    const terminalWidth = Math.floor(terminal.cols);
    terminal.write('━'.repeat(terminalWidth - 5)); // -5 to account for the starting characters
    terminal.write('\x1b[38;5;39m┓\n\n');

    // Add separator line
    terminal.write('\x1b[38;5;39m');  // Set blue color

    terminal.write('\x1b[0m\n');

    terminal.focus();

    terminal.element?.addEventListener('touchstart', () => {
      terminal.focus()
    })
    terminal.element?.addEventListener('touchend', () => {
      terminal.focus()
    })
    terminal.element?.addEventListener('keydown', () => {
      terminal.focus();
      terminalRef.current.focus()
    })
    terminalRef.current.addEventListener('keydown', () => {
      terminal.focus();
      terminalRef.current.focus()
    });
    window.addEventListener('keydown', () => {
      terminal.focus();
      terminalRef.current.focus()
    });
    document.addEventListener('keypress', () => {
      terminal.focus();
      terminalRef.current.focus()
    })
    document.addEventListener('keydown', () => {
      terminal.focus();
      terminalRef.current.focus()
    });
    terminal.onData(async (key: string) => {
      // Handle Tab key for auto-completion
      if (key.charCodeAt(0) === 9) { // Tab key
        if (current_command) {
          const matches = getMatchingCommands(current_command);
          if (matches.length === 1) {
            // Clear any existing suggestion first
            const currentSuggestion = matches[0].slice(current_command.length);
            for (let i = 0; i < currentSuggestion.length; i++) {
              terminal.write('\b \b');
            }
            // Now write the completion in normal color
            terminal.write(`\x1b[38;5;231m${currentSuggestion}`);
            current_command = matches[0]; // Update current command
          } else if (matches.length > 1) {
            // Show all possible completions
            terminal.writeln('');
            matches.forEach((cmd: string) => {
              terminal.writeln(`\x1b[38;5;39m│\x1b[38;5;147m❯ \x1b[38;5;231m${cmd}`);
            });
            terminal.write("\n\x1b[38;5;39m┌─[\x1b[38;5;147mportfolio\x1b[38;5;39m]─[\x1b[38;5;147m~/console\x1b[38;5;39m]\n└─╼ \x1b[38;5;231m❯\x1b[38;5;147m❯\x1b[38;5;39m❯\x1b[0m ");
            terminal.write(current_command);
          }
        }
        return;
      }

      if (key.charCodeAt(0) === 13) {
        console.log(rootNode);
        if (!current_command) {
          toast.error('empty-command$')
          return;
        }
        try {
          val = current_command.trim()
          handleCommand(val);
          rootNode.addNext(val);
          if (val) commands = true;

        } catch (e) {

          toast.error("command do not exist!");
          return;
        }

        current_command = '';
        lastBarrier.lastBarrier = terminal.buffer.active.cursorX;
      }
      else if (key.charCodeAt(0) === 127) {
        // Only handle backspace if we have text to delete
        if (current_command.length > 0) {
          // Get current suggestion
          let currentSuggestion = '';
          const prevMatches = getMatchingCommands(current_command);
          if (prevMatches.length === 1) {
            currentSuggestion = prevMatches[0].slice(current_command.length);
          }

          // Clear the suggestion first if it exists
          if (currentSuggestion) {
            for (let i = 0; i < currentSuggestion.length; i++) {
              terminal.write('\b \b');
            }
          }

          // Delete the last typed character
          terminal.write('\b \b');
          current_command = current_command.slice(0, -1);

          // Show new suggestion if we still have text and there's a match
          if (current_command.length > 0) {
            const newMatches = getMatchingCommands(current_command);
            if (newMatches.length === 1 && newMatches[0] !== current_command) {
              const suggestion = newMatches[0].slice(current_command.length);
              terminal.write(`\x1b[38;5;240m${suggestion}\x1b[0m`);
            }
          }
        }
      }
      else if (key.charCodeAt(0) === 27) {
        if (terminal.buffer.active.cursorX <= lastBarrier.lastBarrier)
          return;
      }
      else if (key.charCodeAt(0) >= 32 && key.charCodeAt(0) <= 126) { // Printable characters
        // Get current suggestion before adding new character
        let prevSuggestion = '';
        const prevMatches = getMatchingCommands(current_command);
        if (prevMatches.length === 1) {
          prevSuggestion = prevMatches[0].slice(current_command.length);
        }

        // Clear the previous suggestion if it exists
        if (prevSuggestion) {
          for (let i = 0; i < prevSuggestion.length; i++) {
            terminal.write('\b \b');
          }
        }

        // Add new character and write it
        current_command += key;
        terminal.write(key);

        // Show new suggestion if there's a unique match
        const matches = getMatchingCommands(current_command);
        if (matches.length === 1 && matches[0] !== current_command) {
          const suggestion = matches[0].slice(current_command.length);
          terminal.write(`\x1b[38;5;240m${suggestion}\x1b[0m`); // Grey color
        }
      } else {
        // Handle any other non-printable characters
        current_command += key;
        terminal.write(key);
      }

      if (!current_command) {
        rootNode.clearTerminalHistory()
        debouncer();
      }
      else {
        clearTimeout(clearTimeoutID);
        rootNode.fetch(current_command);
      }

    })
    debouncer();




    const welcomeMessage = createWelcomeMessage();
    terminal.write(welcomeMessage);
    terminal.write("\n\x1b[38;5;39m┌─[\x1b[38;5;147mportfolio\x1b[38;5;39m]─[\x1b[38;5;147m~/console\x1b[38;5;39m]\n└─╼ \x1b[38;5;231m❯\x1b[38;5;147m❯\x1b[38;5;39m❯\x1b[0m ");

    // Live clock update for the welcome message
    const clockInterval = setInterval(() => {
      const buffer = terminal.buffer.active;
      for (let i = 0; i < buffer.length; i++) {
        const line = buffer.getLine(i);
        if (line && line.translateToString(true).includes('⌚')) {
          const viewportY = buffer.viewportY;
          const rowInViewport = i - viewportY;
          if (rowInViewport >= 0 && rowInViewport < terminal.rows) {
            const newTime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
            terminal.write('\x1b7'); // Save cursor
            terminal.write(`\x1b[${rowInViewport + 1};1H`); // Move to start of row
            terminal.write(`\x1b[38;5;147m│ \x1b[38;5;147m[\x1b[38;5;39m⌚\x1b[38;5;147m] \x1b[38;5;231m${newTime.padEnd(36)}\x1b[38;5;147m│`);
            terminal.write('\x1b8'); // Restore cursor
          }
          break; // Stop after finding the line
        }
      }
    }, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  return (
    <>
      <Toaster />
      <section id={styles.terminalContainer}>
        <div id={styles.terminal} ref={terminalRef} />
      </section>
    </>
  )
}

export default App


