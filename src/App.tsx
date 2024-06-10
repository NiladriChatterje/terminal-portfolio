import { Terminal } from "@xterm/xterm"
import { FitAddon } from '@xterm/addon-fit';
import { useEffect, useRef } from "react"
import styles from './App.module.css'
import toast, { Toaster } from "react-hot-toast";

class TrieNode {
  constructor(letter: string, map = new Map()) {

  }
}

function App() {

  const terminalRef = useRef<HTMLDivElement | any>(null);

  useEffect(() => {
    const terminal = new Terminal({
      allowTransparency: true,
      convertEol: true,
      cursorInactiveStyle: 'outline',
      cursorBlink: true,
      fontWeight: 900,
      fontWeightBold: 900,
      cursorWidth: 10,
      customGlyphs: true,
      lineHeight: 0.6,
      cursorStyle: 'bar',

    });
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
    const barrier_column = 20;
    terminal.onKey(async ({ key }) => {
      if (key.charCodeAt(0) === 127) {
        console.log(terminal.buffer.active.cursorX)
        if (barrier_column >= terminal.buffer.active.cursorX)
          return;
        else
          terminal.write('\b \b')
      }

      else if (key.charCodeAt(0) === 13) {
        if (current_command) commands.push(current_command)
        if (!current_command) toast.error('empty-command$')
        current_command = ''
        terminal.write("\nwelcome/{user}/$ >> ");
      }
      else {
        current_command += key;
        terminal.write(key)
      }
    })

    terminal.options.theme = {
      background: '#090a26',

    }
    function createArrowText(text: string) {
      return "\x1b[107m " + `\x1b[30m${text}` + " \x1b[0m► \n";

    }

    const renderText = createArrowText("Welcome {User}");
    terminal.write(renderText)
    terminal.write("\nwelcome/{user}/$ >> ");
  }, [])
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


