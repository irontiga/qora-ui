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
and electron will pop up or you can acess it at [http://127.0.0.1:9080/qora](127.0.0.1:9080/qora) in chrome

### Docs
Check the wiki

### TODOS
- Theming: Address colors to be sent seperately, or even stored in the app-theme or whatever it is. Will probably do light/dark theme via seperate imports and address-colors via a wimp listener
- ADD SASS OR LESS SUPPORTTT
- Sort elements into correct folders with their respective js
- Webpack chunks (common.js) and get rid of unneeded imports from asmCrypto.js
- Move paper-element etc. deps into the element which depends on them (even if it menas duplication)
- Clean up all the crypto stuff (use asmCrypto for everything)
- *"Finalize"* apis for the below
- Documentation website - perhaps some js file comments stuff. Really needed so that I can get other plugin developers to help
- Wallet plugin:
  - Sort out the whole polling for unconfirmed transactions stuff
  - In browser database. Loki or pouch or whatever. This makes all this far easier and far more efficient
    - Addresses DB which is kept up to date when the address is logged in. If an address has not been used in 30 days it will be deleted, along with it's transactions in their corresponding table. Each address is stored with a lastBlock field to check for the 30 days
    - Transations table. Stores each watched address's n most recent transactions
    - Unconfirmed tx.s table. Will have to be checked upon every unconfirmed transactions check.
 - Set/edit primary name
- Bundle and make tiny
- Random sentence generator - verb tenses and plural nouns
- Electrom custom navigation bar
- Check that encryption/decryption of stored passphrases works correctly
- Find out why ripemd160 is used in Qora rather than truncated sha256 or whatever
- Package electron as an installer
- POLYMER THREE PLEASE
- Worker / service workers. Worker for pbkdf2 password derivations, will need to make sure origins within WIMP are working properly. Service workers can allow the wallet to function even in an offline state, due to caching.

Might be handy https://gist.github.com/Couto/b29676dd1ab8714a818f