import { terminal } from "./components/Terminal"
import { FitAddon } from '@xterm/addon-fit';
import { useEffect, useRef } from "react"
import { WebLinksAddon } from 'xterm-addon-web-links'
import styles from './App.module.css'
import toast, { Toaster } from "react-hot-toast";
import { handleCommand } from './components/Commands'


class TrieNode {
  letter: string;
  map: Map<string, TrieNode> = new Map();
  isEnd?: boolean = true;
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
    this.temp = this.HEAD;
    this.temp.isEnd = false;
    for (let i of current_command) {
      if (this.temp.map.has(i)) {
        this.temp.isEnd = false;
        this.temp = this.temp.map.get(i);
      } else {
        const trieNode = new TrieNode(i);
        this.temp.map?.set(i, trieNode);
        this.temp = trieNode;
      }
    }
  }

  dfs = (letter: string, node: TrieNode | any, res = '') => {
    if (node.isEnd) return res;

    res += letter
    for (const [key, value] of node.map)
      this.dfs(key, value.map?.get(key), res);

  }

  fetch(current_command: string) {
    this.reset();
    if (this.temp?.isEnd) return;
    for (let i of current_command)
      if (this.temp.map.has(i))
        this.temp = this.temp.map.get(i);

    for (const [key, _] of this.temp.map) {
      let temp_str = current_command;
      let temp_Trie = this.temp;
      temp_str += this.dfs(key, temp_Trie);
      terminal.writeln(temp_str);
    }

  }

}

let rootNode: Trie;
let clearTimeoutID: number;


function App() {

  const terminalRef = useRef<HTMLDivElement | any>(null);

  useEffect(() => {
    rootNode = new Trie();
    const debouncer = function () {
      if (clearTimeoutID)
        clearInterval(clearTimeoutID);
      clearTimeoutID = setTimeout(() => {
        if (!commands.length)
          terminal.write("Try : man ▶▷ ")
      }, 4000);
    }

    const webLinksAddon = new WebLinksAddon();
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.loadAddon(webLinksAddon);
    const commands = [];
    let current_command = ''
    terminal.open(terminalRef.current);
    fitAddon.fit();
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

    terminal.writeln('')

    terminal.focus();

    const barrier_column = 21;
    terminal.element?.addEventListener('touchstart', () => {
      terminal.focus()
    })
    document.addEventListener('keydown', () => {
      terminal.focus();
    });
    terminal.onData(async (key) => {
      if (key.charCodeAt(0) === 127) {
        console.log(terminal.buffer.active.cursorX)
        if (barrier_column >= terminal.buffer.active.cursorX)
          return;
        else {
          current_command = current_command.slice(0, current_command.length - 1)
          terminal.write('\b \b')
        }
      }

      else if (key.charCodeAt(0) === 13) {
        if (current_command == 'ls') {
          console.log(rootNode);
          return;
        }
        if (!current_command) toast.error('empty-command$')
        try {
          handleCommand(current_command.trim());
          rootNode.addNext(current_command.trim())
          if (current_command) commands.push(current_command)
        } catch (e) {
          toast.error("command do not exist!");
          return;
        }
        current_command = ''
      }
      else {
        current_command += key;
        terminal.write(key)
      }

      if (!current_command) debouncer();
      else {
        clearTimeout(clearTimeoutID);
        // rootNode.fetch(current_command);
      }

    })
    debouncer();
    terminal.options.theme = {
      background: '#090a26',

    }

    function createArrowText() {
      return `\x1b[107m \x1b[30mWelcome {User} \x1b[0m▶ \x1b[48;5;205m \x1b[30m~ \x1b[30mKnow \x1b[30mAbout \x1b[30mme ~ \x1b[0m▶ \n`;

    }

    const renderText = createArrowText();
    terminal.write(renderText)
    terminal.write("\n\x1b[103m \x1b[30m$command/here $ ↵ \x1b[0m\x1b[93m▶\x1b[0m ");
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


