import { Terminal } from "@xterm/xterm"
import { FitAddon } from '@xterm/addon-fit';
import { useEffect, useRef } from "react"
import styles from './App.module.css'
import toast, { Toaster } from "react-hot-toast";
import { handleCommand } from './components/Commands'

export const terminal = new Terminal({
  allowTransparency: true,
  convertEol: true,
  cursorInactiveStyle: 'outline',
  cursorBlink: true,
  fontWeight: 900,
  fontWeightBold: 900,
  fontSize: window.innerWidth < 950 ? 12 : 15,
  cursorWidth: 10,
  customGlyphs: true,
  cursorStyle: 'bar',

});

class TrieNode {
  constructor(letter: string, map = new Map()) {

  }
}
let clearTimeoutID: number;


function App() {

  const terminalRef = useRef<HTMLDivElement | any>(null);

  useEffect(() => {

    const debouncer = function () {
      if (clearTimeoutID)
        clearInterval(clearTimeoutID);
      clearTimeoutID = setTimeout(() => {
        if (!commands.length)
          terminal.write("Try : man ▶▷ ")
      }, 4000);
    }
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
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

    function clearBufferUpToLength(length: number = 12) {
      // Clear lines one by one until the specified length is reached
      while (length-- > 0)
        terminal.write('\b \b');
    }


    const barrier_column = 19;
    const barrier_command = 12;
    terminal.onKey(async ({ key }) => {
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
        if (current_command) commands.push(current_command)
        if (!current_command) toast.error('empty-command$')
        try {
          handleCommand(current_command);
        } catch (e) {
          toast.error("command do not exist!");
          return;
        }
        current_command = ''
        terminal.write("\n\x1b[103m \x1b[30m$command/here $ \x1b[0m➤  ");
      }
      else {
        current_command += key;
        terminal.write(key)
      }

      if (!current_command) debouncer();
      else
        clearTimeout(clearTimeoutID);

    })
    debouncer();
    terminal.options.theme = {
      background: '#090a26',

    }
    function createArrowText(text: string) {
      return "\x1b[107m " + `\x1b[30m${text}` + " \x1b[0m► \n";

    }

    const renderText = createArrowText("Welcome {User}");
    terminal.write(renderText)
    terminal.write("\n\x1b[103m \x1b[30m$command/here $ \x1b[0m➤ ");
  }, []);

  return (
    <>
      <Toaster />
      <section>
        <div id={styles.terminal} ref={terminalRef} />
      </section>
    </>
  )
}

export default App


