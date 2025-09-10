import { terminal, lastBarrier } from "./components/Terminal"
import { FitAddon } from '@xterm/addon-fit';
import { useEffect, useRef } from "react"
import { WebLinksAddon } from 'xterm-addon-web-links'
import styles from './App.module.css'
import toast, { Toaster } from "react-hot-toast";
import { handleCommand } from './components/Commands'

let temp_str: string[] = [];
class TrieNode {
  letter: string;
  map: Map<string, TrieNode> = new Map();
  isEnd: boolean = true;
  constructor(letter: string) {
    this.letter = letter;
  }
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
        }\x1b[38;5;240m [history]\x1b[0m\n`)
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
   ╭────────────────────╮
   │\x1b[38;5;39m██████╗  ██████╗ │
   │██╔══██╗██╔═══██╗│
   │██████╔╝██║   ██║│
   │██╔═══╝ ██║   ██║│
   │██║     ╚██████╔╝│
   │╚═╝      ╚═════╝ │
   ╰────────────────────╯

   \x1b[38;5;147m⚡ NILADRI\x1b[38;5;240m <Dev/>\x1b[38;5;39m\n` : `
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

    // Add separator line
    terminal.write('\x1b[38;5;39m');  // Set blue color
    for (let i = 0; i < terminal.cols; i++) {
      terminal.write('━');
    }
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
          terminal.write('\x1b[D \x1b[D'); // Move left, write space, move left again
          current_command = current_command.slice(0, -1);
        }
      }
      else if (key.charCodeAt(0) === 27) {
        if (terminal.buffer.active.cursorX <= lastBarrier.lastBarrier)
          return;
      }
      else {
        current_command += key;
        terminal.write(key)
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


    function createWelcomeMessage() {
      const username = 'Guest';
      const date = new Date().toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });

      return `\x1b[38;5;147m┌─══ \x1b[38;5;231mWelcome ${username} \x1b[38;5;147m══─┐
│ \x1b[38;5;231m${date} \x1b[38;5;147m           │
├────────────────────┘
│
│ \x1b[38;5;231mType 'man' to see available commands
│ \x1b[38;5;231mType 'cls' to clear the terminal
│ \x1b[38;5;231mUse Tab for command completion
\x1b[38;5;147m└─────────────────────────────────\n`;
    }

    const welcomeMessage = createWelcomeMessage();
    terminal.write(welcomeMessage);
    terminal.write("\n\x1b[38;5;39m┌─[\x1b[38;5;231mportfolio\x1b[38;5;39m]─[\x1b[38;5;231m~/console\x1b[38;5;39m]\n└──╼ \x1b[38;5;231m❯\x1b[0m ");
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


