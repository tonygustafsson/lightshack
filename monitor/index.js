const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

const db = require('./lib/db');

const reportFilePath = path.resolve(__dirname, `reports/report_${new Date().toISOString()}.json`);
const chromeFlags = ['--headless'];
const lighthouseConfig = require('./lighthouse.config.json');
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

launchLighthouse(url, opts, lighthouseConfig).then(results => {
    var statistics = {
        fetchTime: results.fetchTime,
        url: results.finalUrl,
        metrics: {
            bootupTime: {
                value: results.audits['bootup-time'].numericValue,
                score: results.audits['bootup-time'].score
            },
            firstConsenfulPaint: {
                value: results.audits['first-contentful-paint'].numericValue,
                score: results.audits['first-contentful-paint'].score
            },
            firstCpuIdle: {
                value: results.audits['first-cpu-idle'].numericValue,
                score: results.audits['first-cpu-idle'].score
            },
            firstMeaningfulPaint: {
                value: results.audits['first-meaningful-paint'].numericValue,
                score: results.audits['first-meaningful-paint'].score
            },
            interactive: {
                value: results.audits.interactive.numericValue,
                score: results.audits.interactive.score
            }
        },
        requests: {
            total: results.audits.diagnostics.details.items[0].numRequests,
            totalSize: results.audits.diagnostics.details.items[0].totalByteWeight,
            images: {
                requests: results.audits['resource-summary'].details.items[1].requestCount,
                size: results.audits['resource-summary'].details.items[1].size
            },
            fonts: {
                requests: results.audits['resource-summary'].details.items[2].requestCount,
                size: results.audits['resource-summary'].details.items[2].size
            },
            stylesheets: {
                requests: results.audits['resource-summary'].details.items[3].requestCount,
                size: results.audits['resource-summary'].details.items[3].size
            },
            document: {
                requests: results.audits['resource-summary'].details.items[4].requestCount,
                size: results.audits['resource-summary'].details.items[4].size
            },
            other: {
                requests: results.audits['resource-summary'].details.items[5].requestCount,
                size: results.audits['resource-summary'].details.items[5].size
            },
            media: {
                requests: results.audits['resource-summary'].details.items[6].requestCount,
                size: results.audits['resource-summary'].details.items[6].size
            },
            thirdParty: {
                requests: results.audits['resource-summary'].details.items[7].requestCount,
                size: results.audits['resource-summary'].details.items[7].size
            }
        },
        speedIndex: results.audits.metrics.details.items[0].speedIndex,
        performanceScore: results.categories.performance.score,
        errorsInConsole: results.audits['errors-in-console'].numericValue
    };

    //var json = JSON.stringify(results, null, 2);
    var json = JSON.stringify(statistics, null, 2);

    fs.writeFileSync(reportFilePath, json);

    db.init('IDG').then(() => {
        db.saveStatistics(statistics);
    });
});
