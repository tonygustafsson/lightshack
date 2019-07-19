# lightshack

POC: A monitor using lighthouse CLI

Not working yet.

More info:

-   https://github.com/GoogleChrome/lighthouse
-   https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md#using-programmatically

## Plans

-   Monitor: Scheduler to automatically check statistics in given intervals for x number of sites. Saves to LokiDB. Could also give warnings to Slack and Email.
-   Web server: A web socket server that listens to LokiDB and when updated it pushes data to client.
-   Web client: A React client that get's updates from web server.

## Run it

```
npm install
npm start
```

## Output example

```
{
  "fetchTime": "2019-07-19T09:22:22.001Z",
  "url": "https://www.idg.se/",
  "metrics": {
    "bootupTime": {
      "value": 730.1120000000004,
      "score": 0.98
    },
    "firstConsenfulPaint": {
      "value": 2216.769,
      "score": 0.92
    },
    "firstCpuIdle": {
      "value": 3936.9889999999996,
      "score": 0.86
    },
    "firstMeaningfulPaint": {
      "value": 2777.5984999999996,
      "score": 0.81
    },
    "interactive": {
      "value": 4970.632,
      "score": 0.77
    }
  },
  "requests": {
    "total": 46,
    "totalSize": 894324,
    "images": {
      "requests": 19,
      "size": 319589
    },
    "fonts": {
      "requests": 8,
      "size": 259910
    },
    "stylesheets": {
      "requests": 5,
      "size": 113419
    },
    "document": {
      "requests": 3,
      "size": 100630
    },
    "other": {
      "requests": 1,
      "size": 74530
    },
    "media": {
      "requests": 10,
      "size": 26246
    },
    "thirdParty": {
      "requests": 0,
      "size": 0
    }
  },
  "speedIndex": 2716,
  "performanceScore": 0.87,
  "errorsInConsole": 1
}
```
