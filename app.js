const nodes7 = require('nodes7');
const plc = new nodes7;

// PLC Connection Configuration
const connParams = {
    host: '10.8.252.5', // Replace with your PLC's IP address
    port: 102,
    rack: 0,
    slot: 1
};

// Define the variables to read/write
plc.initiateConnection({
    port: connParams.port,
    host: connParams.host,
    rack: connParams.rack,
    slot: connParams.slot
}, connected);

function connected(err) {
    if (err) {
        console.log(err);
        process.exit();
    }
    plc.setTranslationCB(function(tag) { return tag; });
    plc.addItems(['DB1,INT0', 'DB1,INT2']); // Replace with your DB and addresses
    plc.readAllItems(valuesRead);
}

function valuesRead(err, values) {
    if (err) {
        console.log(err);
    } else {
        console.log(values);
        // Perform further processing with the data
    }
    plc.dropConnection();
}

