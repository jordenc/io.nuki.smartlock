# Nuki Smartlock app for Athom Homey

Control your Nuki Smartlock (www.nuki.io) using the Homey by Athom B.V.
Requires a bridge (which can be either the hardware bridge or the bridge app on an Android smartphone)

Provides the following cards:
- [CONDITION] Is (not) locked
- [ACTION] Lock
- [ACTION] Unlock
- [ACTION] Set state: Locked, Unlocked, Unlatch, Lock 'n go, Lock 'n go with unlatch
- [TRIGGER] Smartlock got locked
- [TRIGGER] Smartlock got unlocked
- [TRIGGER] Battery is critical

The application keeps polling the lock every 30 seconds. So it should take a maximum of approximately 35 seconds before Homey gets triggered (polling the bridge takes a few seconds).
It could be that your Nuki app gets slower when Homey is polling. Since this is still an early version, we will see what happens. Polling can be made "optional" in a next version, if neccessary.

**Want to show your appreciation for this app? A donation is possible via http://www.d2c.nl **

**Version 0.1.2**
Homey now keeps an eye on the lock(s) state, and can trigger when a lock gets (un)locked. 

**Version 0.1.1**
Updated documentation

**Version 0.1.0:**
First release