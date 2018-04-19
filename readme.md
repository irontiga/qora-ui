## Qora UI

### Requirements
Requires npm, bower and optionally Google Chrome / Chromium and a running Qora wallet (which in turn requires Java)

### Installation
`install.bat` in windows...or 

`npm install`

`bower install`
### Run
Just hit `run.bat` in windows and electron will pop up, or from commandline use
`npm start`
and electron will pop up or you can acess it at [http://127.0.0.1:3000/qora](127.0.0.1:3000/qora) in chrome

### Docs
Check the wiki


### TODOS
- Theming: Address colors to be sent seperately, or even stored in the app-theme or whatever it is. Will probably do light/dark theme via seperate imports and address-colors via a wimp listener
- Sort elements into correct folders with their respective js
- Clean up all the crypto stuff
- *"Finalize"* apis for the below
- Documentation website - perhaps some js file comments stuff. Really needed so that I can get other plugin developers to help
- Wallet plugin:
 - Sort out the whole polling for unconfirmed transactions stuff
 - Set/edit primary name
- Bundle and make tiny
- Random sentence generator - verb tenses and plural nouns
- Electrom custom navigation bar
- Check that encryption/decryption of stored passphrases works correctly
- Find out why ripemd160 is used in Qora rather than truncated sha256 or whatever
- POLYMER THREE PLEASE