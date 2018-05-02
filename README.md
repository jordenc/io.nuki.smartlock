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
- [TRIGGER] Smartlock lockstate changes
- [TRIGGER] Battery is critical

**Make sure to give your Nuki lock AND Homey a static IP!**

Want to show your appreciation for this app? A donation is possible via http://www.d2c.nl



**Version 0.2.2**
- Fixed the realtime state of the lock

**Version 0.2.1**
- Typo fixed
- Updated Readme to instruct to give Homey a static IP as well

**Version 0.2.0**
- Fixed a bug in Homey software 1.5.0+
- Homey now displays the realtime lockstate correctly

**Version 0.1.9**
- Fixed a bug that keeps on adding the Homey webhook URL to the Nuki bridge.

**Version 0.1.8**
- Fixed a bug that might cause the Nuki app to crash after adding your first lock.
- Fixed a bug that caused the URL of the webhook not being set into the Nuki bridge, therefor it was impossible to get triggered after lockstate changes

**Version 0.1.7**
- Bugfix

**Version 0.1.6**
- Small internal changes (Thanks BasKiers!)

**Version 0.1.5**
- App now no longer uses polling to check lockstate, but instead sets a Webhook URL. *Make sure to set a static IP for your Homey as well*

**Version 0.1.4**
- Polling made optional (off by default) and changed to every 60 seconds to prevent battery drain

**Version 0.1.3**
- Bugfix which caused a crash on adding a device
- Updated so a "Battery is critical" card only triggers once a day

**Version 0.1.2**
- Homey now keeps an eye on the lock(s) state, and can trigger when a lock gets (un)locked. 

**Version 0.1.1**
- Updated documentation

**Version 0.1.0:**
- First release
