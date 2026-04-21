const text = '  \\x1b[38;5;147mSemester Performance:\\x1b[0m';
const vis = text.replace(/\\x1b\[[0-9;]*m/g, '');
console.log("Text:", text);
console.log("Vis length:", vis.length, "Vis:", vis);
