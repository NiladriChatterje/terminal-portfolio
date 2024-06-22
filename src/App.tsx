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
  }

  dfs = (node: TrieNode | any, res = '', actual_cmd: string = '', arr: string[] = []) => {
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

  fetch(current_command: string) {
    this.reset();
    if (this.temp?.isEnd) return;
    for (let i of current_command)
      if (this.temp.map.has(i))
        this.temp = this.temp.map.get(i);
      else return;

    //getting to last node

    // for (const [key, _] of this.temp.map) {
    let temp_str: string[];
    temp_str = this.dfs(this.temp, current_command, current_command);
    // terminal.writeln(temp_str);
    console.log(temp_str)


  }

}

let rootNode: Trie;
let clearTimeoutID: number;
let val: string;

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
      if (terminal.buffer.active.cursorY <= 11 && key.charCodeAt(0) === 27) return;
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
        console.log(rootNode)
        if (!current_command) toast.error('empty-command$')
        try {
          val = current_command.trim()
          handleCommand(val);
          rootNode.addNext(val)
          if (current_command) commands.push(val)
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
        rootNode.fetch(current_command);
      }

    })
    debouncer();


    function createArrowText() {
      return `\x1b[107m \x1b[30mWelcome {User} \x1b[48;5;205m\x1b[37m▶ \x1b[30m~ \x1b[30mKnow \x1b[30mAbout \x1b[30mme ~ \x1b[0m\x1b[38;5;205m▶\n`;

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


