var Tinkerforge = require('tinkerforge');

var HOST = 'localhost';
var PORT = 4223;
var UID = 'XYZ'; // Change XYZ to the UID of your Industrial Dual Relay Bricklet

var ipcon = new Tinkerforge.IPConnection(); // Create IP connection
var idr = new Tinkerforge.BrickletIndustrialDualRelay(UID, ipcon); // Create device object

ipcon.connect(HOST, PORT,
    function (error) {
        console.log('Error: ' + error);
    }
); // Connect to brickd
// Don't use device before ipcon is connected

ipcon.on(Tinkerforge.IPConnection.CALLBACK_CONNECTED,
    function (connectReason) {
        // Turn relays alternating on/off 10 times with 1 second delay
        for(var i = 0; i < 5; ++i) {
            setTimeout(function () {
                idr.setValue(true, false);
            }, 2000 * i + 1000);
            setTimeout(function () {
                idr.setValue(false, true);
            }, 2000 * i + 2000);
        }
    }
);

console.log('Press key to exit');
process.stdin.on('data',
    function (data) {
        ipcon.disconnect();
        process.exit(0);
    }
);
