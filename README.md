# lightshack

POC: A monitor using lighthouse CLI

Not working yet.

More info:

-   https://github.com/GoogleChrome/lighthouse
-   https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md#using-programmatically

## Run it

```
npm install
npm start
```

## Output example

```
{
  "bootupTime": {
    "value": 967.8720000000006,
    "score": 0.95
  },
  "firstConsenfulPaint": {
    "value": 2074.337,
    "score": 0.94
  },
  "firstCpuIdle": {
    "value": 5453.808000000001,
    "score": 0.65
  },
  "firstMeaningfulPaint": {
    "value": 2632.531,
    "score": 0.84
  },
  "interactive": {
    "value": 6436.212,
    "score": 0.6
  },
  "images": {
    "requests": 18,
    "size": 317687
  },
  "fonts": {
    "requests": 8,
    "size": 260085
  },
  "stylesheets": {
    "requests": 5,
    "size": 113421
  },
  "document": {
    "requests": 4,
    "size": 106985
  },
  "other": {
    "requests": 2,
    "size": 75666
  },
  "media": {
    "requests": 11,
    "size": 30891
  },
  "thirdParty": {
    "requests": 0,
    "size": 0
  },
  "fetchTime": "2019-07-19T09:16:33.449Z",
  "url": "https://www.idg.se/",
  "speedIndex": 2742,
  "performanceScore": 0.79,
  "numRequests": 48,
  "numScripts": 8,
  "numStylesheets": 4,
  "totalByteWeight": 904735,
  "errorsInConsole": 1
}
```
