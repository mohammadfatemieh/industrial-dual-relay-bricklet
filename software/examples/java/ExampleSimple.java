import com.tinkerforge.IPConnection;
import com.tinkerforge.BrickletIndustrialDualRelay;

public class ExampleSimple {
	private static final String HOST = "localhost";
	private static final int PORT = 4223;

	// Change XYZ to the UID of your Industrial Dual Relay Bricklet
	private static final String UID = "XYZ";

	// Note: To make the example code cleaner we do not handle exceptions. Exceptions
	//       you might normally want to catch are described in the documentation
	public static void main(String args[]) throws Exception {
		IPConnection ipcon = new IPConnection(); // Create IP connection
		BrickletIndustrialDualRelay idr =
		  new BrickletIndustrialDualRelay(UID, ipcon); // Create device object

		ipcon.connect(HOST, PORT); // Connect to brickd
		// Don't use device before ipcon is connected

		// Turn relays alternating on/off 10 times with 1 second delay
		for(int i = 0; i < 5; i++) {
			Thread.sleep(1000);
			idr.setValue(true, false);
			Thread.sleep(1000);
			idr.setValue(false, true);
		}

		System.out.println("Press key to exit"); System.in.read();
		ipcon.disconnect();
	}
}
