const fs = require('fs');

const mca_data = {
  title: "Master of Computer Applications",
  semesters: [
    { term: "SEMESTER - I", gpa: "9.12" },
    { term: "SEMESTER - II", gpa: "8.41" },
    { term: "SEMESTER - III", gpa: "8.81" },
    { term: "SEMESTER - IV", gpa: "9.04" },
  ],
  years: [
    { year: "Year - 1", gpa: "8.75" },
    { year: "Year - 2", gpa: "8.92" },
  ],
  overall: { label: "DGPA (Overall):", score: "8.84" }
};

const bsc_data = {
  title: "Bachelor of Science (Honours)",
  semesters: [
    { term: "SEMESTER - I", gpa: "6.676" },
    { term: "SEMESTER - II", gpa: "7.918" },
    { term: "SEMESTER - III", gpa: "8.573" },
    { term: "SEMESTER - IV", gpa: "8.726" },
    { term: "SEMESTER - V", gpa: "8.917" },
    { term: "SEMESTER - VI", gpa: "8.079" },
  ],
  years: [
    { year: "Year - 1", gpa: "7.297" },
    { year: "Year - 2", gpa: "8.650" },
    { year: "Year - 3", gpa: "8.498" },
  ],
  overall: { label: "CGPA (Overall):", score: "8.211" }
};

const hs_data = {
  title: "Higher Secondary Education",
  subjects: [
    { sub: "ENGLISH", marks: "82" },
    { sub: "BENGALI", marks: "85" },
    { sub: "MATHEMATICS", marks: "71" },
    { sub: "PHYSICS", marks: "79" },
    { sub: "CHEMISTRY", marks: "79" },
    { sub: "COMPUTER SCIENCE", marks: "82" },
  ],
  overall: { label: "Total Score:", score: "478" }
};

const icse_data = {
  title: "Secondary Education (ICSE)",
  subjects: [
    { sub: "ENGLISH", marks: "82" },
    { sub: "BENGALI", marks: "84" },
    { sub: "HCS-A & GEO-B", marks: "84" },
    { sub: "MATHEMATICS", marks: "91" },
    { sub: "SCIENCE", marks: "79" },
    { sub: "COMPUTER APPLICATION", marks: "96" },
  ],
  overall: { label: "Total Score:", score: "522" }
};

const TOTAL_WIDTH = 64; // Without leading spaces
const INNER_WIDTH = TOTAL_WIDTH - 2;

function stripAnsi(s) {
    return s.replace(/\\x1b\[[0-9;]*m/g, '');
}

function padRow(text) {
    let vis = stripAnsi(text);
    let padding = Math.max(0, INNER_WIDTH - vis.length);
    return `  \\x1b[38;5;39m│\\x1b[0m${text}${" ".repeat(padding)}\\x1b[38;5;39m│\\x1b[0m`;
}

function centerTitle(title) {
    let titleStr = ` ${title} `;
    let dashLen = INNER_WIDTH - titleStr.length;
    let left = Math.floor(dashLen / 2);
    let right = dashLen - left;
    return `  \\x1b[38;5;147m┌${"─".repeat(left)}${titleStr}${"─".repeat(right)}┐\\x1b[0m`;
}

function generateTable(data, type) {
    let lines = [];
    
    // Top border
    lines.push(centerTitle(data.title));
    
    // Empty row
    lines.push(padRow(""));
    
    if (type === 'semester') {
        lines.push(padRow(`  \\x1b[38;5;147mSemester Performance:\\x1b[0m`));
        
        let t1W = 25; // Term
        let t2W = 17; // GPA
        
        lines.push(padRow(`  ┌${"─".repeat(t1W)}┬${"─".repeat(t2W)}┐`));
        lines.push(padRow(`  │ \\x1b[38;5;147m${"Term".padEnd(t1W-1)}\\x1b[0m│     \\x1b[38;5;147m${"GPA".padEnd(t2W-5)}\\x1b[0m│`));
        lines.push(padRow(`  ├${"─".repeat(t1W)}┼${"─".repeat(t2W)}┤`));
        data.semesters.forEach(row => {
            lines.push(padRow(`  │ ${row.term.padEnd(t1W-1)}│     \\x1b[38;5;231m${row.gpa.padEnd(t2W-5)}\\x1b[0m│`));
        });
        lines.push(padRow(`  └${"─".repeat(t1W)}┴${"─".repeat(t2W)}┘`));
        
        lines.push(padRow(""));
        
        lines.push(padRow(`  \\x1b[38;5;147mYearly Performance:\\x1b[0m`));
        lines.push(padRow(`  ┌${"─".repeat(t1W)}┬${"─".repeat(t2W)}┐`));
        data.years.forEach(row => {
            lines.push(padRow(`  │ ${row.year.padEnd(t1W-1)}│     \\x1b[38;5;231m${row.gpa.padEnd(t2W-5)}\\x1b[0m│`));
        });
        lines.push(padRow(`  └${"─".repeat(t1W)}┴${"─".repeat(t2W)}┘`));
        
        lines.push(padRow(""));
        
        lines.push(padRow(`  \\x1b[38;5;147mOverall Performance:\\x1b[0m`));
        let oInnerW = 43;
        lines.push(padRow(`  ┌${"─".repeat(oInnerW)}┐`));
        let oText = `     ${data.overall.label}  ${data.overall.score}`;
        lines.push(padRow(`  │\\x1b[47m\\x1b[30m${oText.padEnd(oInnerW)}\\x1b[0m│`));
        lines.push(padRow(`  └${"─".repeat(oInnerW)}┘`));
        
        lines.push(padRow(""));
    } else {
        lines.push(padRow(`  \\x1b[38;5;147mSubject-wise Performance:\\x1b[0m`));
        
        let t1W = 23; // Subject
        let t2W = 13; // Marks
        
        lines.push(padRow(`  ┌${"─".repeat(t1W)}┬${"─".repeat(t2W)}┐`));
        lines.push(padRow(`  │ \\x1b[38;5;147m${"Subject".padEnd(t1W-1)}\\x1b[0m│  \\x1b[38;5;147m${"Marks".padEnd(t2W-2)}\\x1b[0m│`));
        lines.push(padRow(`  ├${"─".repeat(t1W)}┼${"─".repeat(t2W)}┤`));
        data.subjects.forEach(row => {
            lines.push(padRow(`  │ ${row.sub.padEnd(t1W-1)}│    \\x1b[38;5;231m${row.marks.padEnd(t2W-4)}\\x1b[0m│`));
        });
        lines.push(padRow(`  └${"─".repeat(t1W)}┴${"─".repeat(t2W)}┘`));
        
        lines.push(padRow(""));
        
        lines.push(padRow(`  \\x1b[38;5;147mOverall Performance:\\x1b[0m`));
        let oInnerW = 37;
        lines.push(padRow(`  ┌${"─".repeat(oInnerW)}┐`));
        let oText = `     ${data.overall.label}  ${data.overall.score}`;
        lines.push(padRow(`  │\\x1b[47m\\x1b[30m${oText.padEnd(oInnerW)}\\x1b[0m│`));
        lines.push(padRow(`  └${"─".repeat(oInnerW)}┘`));
        
        lines.push(padRow(""));
    }
    
    // Bottom border
    lines.push(`  \\x1b[38;5;147m└${"─".repeat(INNER_WIDTH)}┘\\x1b[0m`);
    
    return '\\n' + lines.join('\\n');
}

let mca_final = generateTable(mca_data, 'semester');
let bsc_final = generateTable(bsc_data, 'semester');
let hs_result = generateTable(hs_data, 'subject');
let icse_result = generateTable(icse_data, 'subject');

let content = fs.readFileSync('src/components/documents.ts', 'utf8');

content = content.replace(/const mca_final = \`[\s\S]*?\`;?/, 'const mca_final = `' + mca_final + '`;');
content = content.replace(/const bsc_final = \`[\s\S]*?\`;?/, 'const bsc_final = `' + bsc_final + '`;');
content = content.replace(/const hs_result = \`[\s\S]*?\`;?/, 'const hs_result = `' + hs_result + '`;');
content = content.replace(/const icse_result = \`[\s\S]*?\`;?/, 'const icse_result = `' + icse_result + '`;');

fs.writeFileSync('src/components/documents.ts', content);
console.log("Tables regenerated with robust padding.");
