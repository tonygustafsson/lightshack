const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');

const lightHousePath = './node_modules/lighthouse/lighthouse-cli/index.js';
const reportFileName = `./reports/report_${new Date().toISOString()}.json`;
const chromeFlags = ['--headless'];
const url = 'https://www.idg.se';

function launchLighthouse(url, opts, config = null) {
    return chromeLauncher.launch({ chromeFlags: opts.chromeFlags }).then(chrome => {
        opts.port = chrome.port;
        return lighthouse(url, opts, config).then(results => {
            return chrome.kill().then(() => results.lhr);
        });
    });
}

const opts = {
    chromeFlags: chromeFlags
};

launchLighthouse(url, opts).then(results => {
    var json = JSON.stringify(results, null, 2);
    fs.writeFileSync(reportFileName, json);
});
