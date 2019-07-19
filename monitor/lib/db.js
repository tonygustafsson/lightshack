const loki = require('lokijs');
const path = require('path');

const dbLocation = path.resolve(__dirname, `../database.json`);
const lokiDB = new loki(dbLocation);

let table = null;

const init = tableName => {
    return new Promise((resolve, reject) => {
        lokiDB.loadDatabase({}, () => {
            table = lokiDB.getCollection(tableName);

            if (table === null) {
                table = lokiDB.addCollection(tableName);
            }

            resolve(tableName);
        });
    });
};

const saveStatistics = data => {
    if (table) {
        table.insert(data);
    } else {
        console.error('Could not insert statistics!');
    }

    lokiDB.saveDatabase(function(err) {
        if (err) console.error('error saving');
    });
};

module.exports = {
    saveStatistics: data => {
        saveStatistics(data);
    },
    init: id => {
        return init(id);
    }
};
