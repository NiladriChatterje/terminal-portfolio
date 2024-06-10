import { terminal } from "../App";

//I took the help of ASCII chart.. do the same if you want too :)
function clearUpToRow(row: number = 10) {
    // Move cursor to the specified row
    for (let i = 1; i < row; i++) {
        terminal.write('\x1b[2K'); // Clear the entire line
        terminal.write('\x1b[E'); // Move cursor down
    }

    // Move cursor to the specified row and clear from the cursor to the end of the screen
    terminal.write(`\x1b[${row};1H\x1b[J`);

}

const ExistingCommand = new Map<string, any>(
    [
        ['man', `
        ${"ls".padEnd(15)}${"list all the documents available"}
        ${"cls".padEnd(15)}${"clear the console."}
        ${"show mca".padEnd(15)}${"Display MCA final result."}
        ${"show bsc".padEnd(15)}${"Display BSc(H) final result."}
        ${"ls cf".padEnd(15)}${"list all but only certificates"}
        ${"ls".padEnd(15)}${"list all the documents available"}
       
        `],
        ["cls", clearUpToRow]
    ]
);

export const handleCommand = (command: string) => {
    if (!ExistingCommand.has(command)) throw new Error();
    if (command != 'man') {
        ExistingCommand.get(command)();
    } else {
        terminal.writeln(ExistingCommand.get('man'));
    }
}
