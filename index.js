const { exec } = require('child_process');

const lightHousePath = './node_modules/lighthouse/lighthouse-cli/index.js';
const reportFileName = `./reports/report_${new Date().toISOString()}.json`;
const parameters = `--quiet --chrome-flags="--headless" --output="json" --output-path="${reportFileName}"`;
const url = 'https://www.idg.se';

exec(`node ${lightHousePath} ${url} ${parameters}`, (err, stdout, stderr) => {
    if (err) {
        return console.error(err);
    }

    console.log(stdout);
});
