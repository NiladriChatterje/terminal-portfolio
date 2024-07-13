import { terminal } from "./Terminal";

const mca_final = `\n
  -------------------------------------
  |   SEMESTER - I    |       9.12    |
  |   SEMESTER - II   |       8.41    |
  |   SEMESTER - III  |       8.81    |
  |   SEMESTER - IV   |       9.04    |
  |------------------------------------
  |   Year - 1 (YGPA) |       8.75    |
  |------------------------------------
  |   Year - 2 (YGPA) |       8.92    |
  -------------------------------------
  |   DGPA - (Overall)|       8.84    |
  -------------------------------------
`

const bsc_final = `\n
  -------------------------------------
  |   SEMESTER - I    |       6.676   |
  |   SEMESTER - II   |       7.918   |
  |   SEMESTER - III  |       8.573   |
  |   SEMESTER - IV   |       8.726   |
  |   SEMESTER -  V   |       8.917   |
  |   SEMESTER - VI   |       8.079   |
  |------------------------------------
  |   Year - 1 (YGPA) |       7.297   |
  |------------------------------------
  |   Year - 2 (YGPA) |       8.650   |
  |------------------------------------
  |   Year - 3 (YGPA) |       8.498   |
  -------------------------------------
  |   CGPA - (Overall)|       8.211   |
  -------------------------------------
`

const hs_result = `\n
  -------------------------------------
  |   ENGLISH         |       82      |
  |   BENGALI         |       85      |
  |   MATHEMATICS     |       71      |
  |   PHYSICS         |       79      |
  |   CHEMISTRY       |       79      |
  |   COMPUTER SCIENCE|       82      |
  -------------------------------------
  |    (Overall)      |      478      |
  -------------------------------------
`;

const icse_result = `\n
  ---------------------------------------
  | ENGLISH             |       82      |
  | BENGALI             |       84      |
  | (HCS-A, GEO-B)      |       84      |
  | MATHEMATICS         |       91      |
  | SCIENCE(PHY,CHE,BIO)|       79      |
  | COMPUTER APPLICATION|       96      |
  ---------------------------------------
  |    (Overall)        |      522      |
  ---------------------------------------
`;

const certificates = `\n
 ${"React(basics)".padEnd(35)}[\x1b[91mHackerrank\x1b[0m]
 https://www.hackerrank.com/certificates/25cd6205a8ab\n
 
 
 
 ${"CSS(basics)".padEnd(35)}[\x1b[91mHackerrank\x1b[0m]
 https://www.hackerrank.com/certificates/202f6ed03ac4\n
 
 
 
 ${"Machine Learning(basics)".padEnd(35)}[\x1b[91mKaggle\x1b[0m]
 https://www.kaggle.com/learn/certification/niladri2000/intro-to-machine-learning
 
 
 
 ${"Machine Learning(Intermediate)".padEnd(35)}[\x1b[91mKaggle\x1b[0m]
 https://www.kaggle.com/learn/certification/niladri2000/intermediate-machine-learning
 
 
 
 ${"APIs & microservices(Professional)".padEnd(35)}[\x1b[91mFreeCodeCamp\x1b[0m]
 https://www.freecodecamp.org/certification/NiladriChatterjee/back-end-development-and-apis



 ${"REST API(Intermediate)".padEnd(35)}[\x1b[91mHackerrank\x1b[0m]
 https://www.hackerrank.com/certificates/429912e4f318




 ${"Docker Essentials (Beginner)".padEnd(35)}[\x1b[91mHackerrank\x1b[0m]
 https://www.credly.com/earner/earned/badge/a96ef2ac-bc5c-4a7b-bd89-b5ec4a4409d4
`
const showLeetCode = `\n
[LeetCode]
https://leetcode.com/u/radongtxgpu/
`

const twitter = `\n
 [twitter(X)]
 https://x.com/NiladriCha41705
`;

const linkedIn = `\n
 [LinkedIn]:
 https://www.linkedin.com/in/niladri-chatterjee-a64059267/
`;

const github = `\n
 [Github]:
 https://github.com/NiladriChatterje
`

interface Data {
  name: string;
  pushed_at?: string;
}
async function fetchGithubRepos() {
  terminal.writeln("")
  const res = await fetch('https://api.github.com/users/NiladriChatterje/repos');
  const data: Data[] = await res.json();
  console.log(data);
  if (window.innerWidth < 1280) {
    terminal.writeln(`${"\n Repos".padEnd(38)}${"Pushed"}`)
    terminal.writeln(`-----------------------------------------------`)
    data?.map(item => terminal.writeln(` ${item.name.padEnd(35)}${item.pushed_at?.split('T')[0]}`))
  }
  else {
    terminal.writeln(` ${"\n Repos".padEnd(38)}${"Pushed"}\t\t${"Repos".padEnd(38)}${"Pushed"}`)
    terminal.writeln(`-----------------------------------------------\t\t-----------------------------------------------`)
    data?.map((item, i) => terminal.write(` ${item.name.padEnd(35)}${item.pushed_at?.split('T')[0]}${i % 2 ? '\n' : '\t\t'}`))

  }
  terminal.write("\n\x1b[103m \x1b[30m$command/here $ ↵ \x1b[0m\x1b[93m▶\x1b[0m ");
}

function redirectToRepo(project: string) {
  window.open(`https://github.com/NiladriChatterje/${project}`, '_blank');
  terminal.write("\n\x1b[103m \x1b[30m$command/here $ ↵ \x1b[0m\x1b[93m▶\x1b[0m ");
}

const skills = [{ name: "Java(SE+EE(Servlet))", progress: '65%' },
{ name: "Blockchain(Hybrid)", progress: '38%' },
{ name: "RAG", progress: '42%' },
{ name: "Docker", progress: '36%' }, { name: "Git", progress: '58%' },
{ name: "Github", progress: '40%' },
{ name: "Next.Js_14+", progress: '47%' },
{ name: "AWS(CLI+Dash)", progress: '1%' },
{ name: "Node(core+express)", progress: '37%' },
]
function showSkills() {
  terminal.writeln("");
  if (window.innerWidth < 1280)
    skills?.map(item => terminal.writeln(`◑  ${item.name.padEnd(28)}[    ${item.progress.padEnd(8)}]`))
  else
    skills?.map((item, i) => terminal.write(`◑  ${i % 3 === 2 ? item.name + '\n' : item.name.padEnd(30)}`))
  terminal.write("\n\x1b[103m \x1b[30m$command/here $ ↵ \x1b[0m\x1b[93m▶\x1b[0m ");
}
export {
  mca_final, bsc_final, hs_result, icse_result, certificates, showSkills, showLeetCode
  , redirectToRepo, linkedIn, github, fetchGithubRepos, twitter
}