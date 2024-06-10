import { terminal } from "../App";

const mca_final = `
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

const bsc_final = `
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

const hs_result = `
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

const icse_result = `
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

const certificates = `
${"React(basics)".padEnd(35)}[\x1b[91mHackerrank\x1b[0m]
https://www.hackerrank.com/certificates/25cd6205a8ab



${"CSS(basics)".padEnd(35)}[\x1b[91mHackerrank\x1b[0m]
https://www.hackerrank.com/certificates/202f6ed03ac4



${"Machine Learning(basics)".padEnd(35)}[\x1b[91mKaggle\x1b[0m]
https://www.kaggle.com/learn/certification/niladri2000/intro-to-machine-learning

`

const linkedIn = `
[LinkedIn]:
https://www.linkedin.com/in/niladri-chatterjee-a64059267/
`;

const github = `
[Github]:
https://github.com/NiladriChatterje
`

interface Data {
  name: string;
  pushed_at?: string;
}

async function fetchGithubRepos() {
  const res = await fetch('https://api.github.com/users/NiladriChatterje/repos');
  const data: Data[] = await res.json();
  console.log(data);
  if (window.innerWidth < 1280) {
    terminal.writeln(`${"\nRepos".padEnd(35)}${"Pushed"}`)
    terminal.writeln(`-----------------------------------------------`)
    data?.map(item => terminal.writeln(`${item.name.padEnd(35)}${item.pushed_at?.split('T')[0]}`))
  }
  else {
    terminal.writeln(`${"\nRepos".padEnd(35)}${"Pushed"}\t\t${"Repos".padEnd(35)}${"Pushed"}`)
    terminal.writeln(`-----------------------------------------------\t\t-----------------------------------------------`)
    data?.map((item, i) => terminal.write(`${item.name.padEnd(35)}${item.pushed_at?.split('T')[0]}${i % 2 ? '\n' : '\t\t'}`))

  }
  terminal.write("\n\x1b[103m \x1b[30m$command/here $ \x1b[0m➤  ");
}

function redirectToRepo(project: string) {
  window.open(`https://github.com/NiladriChatterje/${project}`, '_blank');
}

export {
  mca_final, bsc_final, hs_result, icse_result, certificates
  , redirectToRepo, linkedIn, github, fetchGithubRepos
}