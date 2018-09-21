import Wimp from "../../modules/wimp/wimp.js"
import parentWimpAPI from "../../modules/parentWimpAPI.js"
import pluginLoader from "../../modules/pluginLoader.js"
import addModalRoutes from "./modal-routes.js"
import QoraAPI from "../../qora/QoraAPI.js"
import Sha256 from "../../qora/deps/sha256.js"
import utils from '../../qora/deps/utils.js'
import { ERROR_CODES } from "../../qora/constants.js"

export default class MainApp extends Polymer.Element {
    static get is() {
        return "main-app"
    }
    static get properties() {
        return {
            plugins: {
                type: Array,
                value: [],
                notify: true
            },
            urls: {
                type: Array,
                value: []
            },
            topMenuItems: {
                type: Array,
                value: []
            },
            selectedModal: {
                type: Object,
                value: {
                    page: "404" // This way browser won't throw an error at the default url
                }
            },
            routeData: {
                type: Object,
                value: {}
            },
            route: {
                type: Object
            },
            loggedIn: {
                type: Boolean,
                value: false,
                observer: "_loginObserver"
            },
            data: {
                type: Object
            },
            activeUrl: {
                type: Object,
                computed: "_getActiveUrl(routeData, urls)",
                notify: true
            },
            pluginsLoaded: {
                type: Boolean,
                value: false,
                notify: true
            },
            passphrase: {
                type: String,
                value: ""
            },
            pin: {
                type: Number
            },
            // qoraNode: {
            //     type: Object,
            //     value: QORA_CONFIG.qoraNode
            // },
            config: {
                type: Object,
                value: {}
            },
            addressCount: {
                type: Object
            },
            addresses: {
                type: Object,
                value: []
            },
            sendMoneyPrompt: {
                type: Object,
                value: {
                    open: false
                }
            },
            addressColors: {
                type: Array,
                computed: "_getAddressColors(config.addressColors)"
            },
            selectedAddress: {
                type: Object,
                value: {
                    address: "",
                    color:"#000",
                    nonce: 0
                }
            },
            currentPluginFrame: {
                type: Object
            },
            loaderIframes: {
                type: Array,
                value: []
            },
            selectedModal: {
                type: Object,
                value: {}
            },
            transactionRequest: {
                type: Object,
                value: {
                
                }
            },
            toast: {
                type: Object,
                value: {
                    req: {
                        text: "Some toast text",
                        action: "Click me!"
                    },
                    res: () => {}
                }
            },
            streams: {
                type: Object,
                value: {}
            },
            lastSelectedAddress: {
                type:Object,
                value: {}
            },
            setNameShowProgress: {
                type:Boolean,
                value: false
            },
            addressNameStore: {
                type: Object,
                value: {}
            },
            showName: {
                type: Boolean,
                value: false
            },
            saveSeedUseExistingIDAndPassword: {
                type: Boolean,
                value: false
            },
            loginHandler: {
                type: Object
            }
        }
    }

    static get observers(){
        return  [
            '_addressChanged(selectedAddress)',
            '_configChanged(config)'
        ]

    }

    _configChanged(config) {
        if(!this.streams.config) return
        this.streams.config.forEach(stream => {
            stream.emit(config || {})
        })
    }
    
    constructor() {
        super()
        this.wimps = {}
        this.streams = {}
    }

    _joinPluginUrl(url, hash) {
        return "/plugins/" + url + "#" + hash
    }

    _genIframeUrl(url) {
        return "/qora/" + url
    }

    _getActiveUrl(routeData, urls) {
        const activeUrl = routeData.currentPluginUrl
        console.log(activeUrl)
        let activePlugin = {
            url: "404",
            title: "404",
            menus: [],
            page: "404",
            parent: false
        }
        for (let i = 0; i < urls.length; i++) {
            if (activeUrl == urls[i].url) {
                activePlugin = urls[i]
            }
        }
        return activePlugin
    }

    _acceptSendMoney(e) {
        const data = this.sendMoneyPrompt
        data.accept(data)
    }
    _rejectSendMoney(e) {
        const data = this.sendMoneyPrompt
        this.sendMoneyPrompt = {
            open: false
        }
        data.reject()
    }
    
    getOpenSettings(){
        return this.openSettings.bind(this)
    }
    
    openSettings(){
        this.$.settingsDialog.open()
    }
    
    acceptTransactionRequest(e) {
        this.transactionRequest.accept()

    }
    rejectTransactionRequest(e) {
        this.transactionRequest.reject()
    }
    
    _toggleDrawer(e) {
        this.$.appdrawer.toggle()
    }

    _registerMessageHandler(handlerClass) {
        console.log("NO WAYYYYY")

    }

    connectedCallback() {
        super.connectedCallback()
    }

    _openTopMenuModal(e) {
        const prev = this.selectedModal.page
        this.selectedModal = e.model.item
        
        if(prev){
            console.log("resseting")
            const reset = true
            this.wimps.modal.readyCheck(reset)
        }
        
        this.$.topMenuDialog.toggle()
    }

    closeTopMenuModal (e) {
        this.$.topMenuDialog.close()
    }
    closeSettingsModal (e) {
        this.$.settingsDialog.close()
    }
    
    textColor(color){
        console.log(color)
        return color == 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.87)'
    }

    _openBackupSeedDialog(e) {
        this.$.backupSeedDialog.open()
    }

    _openSetNameDialog(){
        this.$.setNameDialog.open()
    }

    _setName(e){
        this.setNameShowProgress = true
        this.setNameProgressMessage = "Lowercasing name"
        const name = this.newAddressName.toLowerCase()
        console.log(name)
        this.setNameProgressMessage = "Fetching last reference"

        // First check name is available
        QoraAPI.request.api({
            url: `names/${name}`,
            method: "GET"
        })
        // Throws an error if the name does not exist...so error = good, success = name already in use
        .then(nameInfo => {
            nameInfo = JSON.parse(nameInfo)
            if (nameInfo.owner){
                throw ("Name already regsitered. Please pick another.")
            }
        }, e => {
            return QoraAPI.request.api({
                url: `addresses/lastreference/${this.selectedAddress.address}/unconfirmed`,
                method: "GET"
            })
        })
        .then(lastRef => {
            this.setNameProgressMessage = "Signing transaction...."
            if (lastRef === "false"){
                // lastRef = Sha256.digest(Sha256.digest(this.selectedAddress.keyPair.privateKey))
                // lastRef = utils.appendBuffer(lastRef, lastRef)
                throw("Can not set name until account has had an incoming transaction. Try claiming airdrop first :)")
            }
            const txBytes = QoraAPI.createTransaction(
                3,
                this.selectedAddress.keyPair,
                {
                    registrantPublicKey: this.selectedAddress.keyPair.publicKey,
                    registrantAddress: this.selectedAddress.address,
                    name,
                    value: this.selectedAddress.address,
                    lastReference: lastRef
                }
            )
            this.setNameProgressMessage = "Processing transaction...."
            return QoraAPI.processTransaction(txBytes)
        })
        .then((response) => {
            response = JSON.parse(response)
            if (typeof response !== "object") {
                this.setNameErrorMessage = `Error! ${ERROR_CODES[response]}. Error code ${response}`
                this.setNameShowProgress = false
                return
            }

            this.setNameSuccessMessage = `Success! ${response}. It may take a few minutes before the newly set name shows. If it does not show within 10 minutes, try setting it again.`
            this.addressNameCheck(this.selectedAddress.address)
            this.setNameShowProgress = false
        })
        .catch(err => {
            this.setNameShowProgress = false
            this.setNameErrorMessage = `Error! ${err}`
        })

        
    }
    
    addressNameCheck(addr){
        this.set("selectedAddress.hasName", false)
        this._addressNameCheck(addr).catch(err => {
            console.error(err)
            this._addressNameCheck(addr)
        })
    }

    async _addressNameCheck(addr) {
        this.showName = false

        if(addr in this.addressNameStore) {
            this.selectedAddress.name = this.addressNameStore[addr]
            this.showName = true
            return
        }

        let names =  await QoraAPI.request.api({
            url: `names/address/${addr}`
        })
        console.log(names)
        names = JSON.parse(names)
        if (names.length > 0) {
            this.addressNameStore[addr] = names[0]
            this.selectedAddress.name = names[0]
            this.set("selectedAddress.hasName", true)
        }
        this.showName = true
        return
    }

    objectKeys(obj){
        if(!obj){
            return []
        }
        return Object.keys(obj).map(key => {
            return {
                key: key,
                value: obj[key]
            }
        })
    }
    
    logOut(){
        this.$["login-container"].logOut()
    }

    ready() {
        super.ready()
        console.log("======================================READY EVENNT FIRED====================")
        let retryLoadConfigInterval = 0
        const loadConfig = () => fetch("/getConfig")
            .then(response => response.json())
            .then(response => {
                console.log("LOADDED CONFIG", response.config)
                this.config = response.config
                return
            })
            .catch(err => {
                retryLoadConfigInterval += 1000
                console.error(err)
                console.error(`Failed loading config. Retrying in ${retryLoadConfigInterval / 1000} second(s)`)
                setTimeout(loadConfig, retryLoadConfigInterval)
            })

        let retryLoadPluginsInterval = 0
        const loadPlugins = () => fetch("/getPlugins")
            .then(response => response.json())
            .then(response => {
                const plugins = response.plugins
                pluginLoader.bind(this)(plugins, this.config)
            })
            .catch(err => {
                retryLoadPluginsInterval += 1000
                console.error(err)
                console.error(`Could not load plugins. Retrying in ${retryLoadPluginsInterval / 1000} second(s)`)
                setTimeout(loadPlugins, retryLoadPluginsInterval)
            })
        
        if(!this.config.primary){
            loadConfig()
                .then(() => loadPlugins())
        } else{
            loadPlugins()
        }
            
        Wimp.registerTarget("plugin-frame", this.currentPluginFrame.contentWindow)
        
        this.wimps.activePlugin = parentWimpAPI("plugin-frame")
        this.wimps.activePlugin.hashSync()
        
        
        Wimp.registerTarget("modal-frame", this.modalFrame.contentWindow)
        
        this.wimps.modal = parentWimpAPI("modal-frame")
        
        addModalRoutes(this.wimps.modal, this)
        // Doesn't really need to be defined before Wimp.init() because the modal can't be opened initially
        // this.wimps.modal.on("modalFrameSize", (req, res) => {
        //     this.modalFrameSize = {
        //         height: req.height,
        //         width: req.width
        //     }
        //     this.$.topMenuDialog.center()
        // })
        
        // Should be called whenever the modal is opened
        this.wimps.modal.ready(() => {
            this.wimps.modal.request("opened", {
                expectResponse: false,
                data: this.selectedModal.data
            })
        })
        
        // Clicking inside the iframe will blur the window and close the menu
        window.addEventListener("blur", e =>{
            this.$.accountMenu.close()
        })

        console.log(this.wimps)
        this.streams.selectedAddress = Object.values(this.wimps).map(w => {
            return w.createStream("Selected address", (req, res) => {
                if(!this.selectedAddress){
                    return
                }
                res({
                    address: this.selectedAddress.address,
                    color: this.selectedAddress.color,
                    nonce: this.selectedAddress.nonce,
                    textColor: this.selectedAddress.textColor
                })
            })
        })
        this.streams.config = Object.values(this.wimps).map(w=> {
            return w.createStream('config', (req, res) => {
                res(this.config)
            })
        })
    }

    _addressChanged(selectedAddress){
        console.log(selectedAddress)
        //  || selectedAddress == this.lastSelectedAddress
        if(!selectedAddress){
            return
        }
        // this.lastSelectedAddress = selectedAddress
        
        this.updateStyles({
            "--active-menu-item-color" : selectedAddress.color
        })

        clearInterval(this._addressCheckInterval)
        this._addressCheckInterval = setInterval(this.addressNameCheck(selectedAddress.address), 10000)
        
        if(!this.streams.selectedAddress) return
        console.log(this.streams)
        this.streams.selectedAddress.forEach(w => {
            console.log("EEMMMITTTINNNGGGG NEEEWWWLLLYY SEEELLLECTEEDD AADDDREESSSS")
            w.emit({
                address: selectedAddress.address,
                color: selectedAddress.color,
                nonce: selectedAddress.nonce,
                textColor: this.selectedAddress.textColor
            })
        })
    }
    
    _loginObserver(){
        if(this.loggedIn != this.lastLoginState || this.loggedIn){
            this.selectedAddress = this.addresses[0]
            for (const w in this.wimps ){
                this.wimps[w].request("login", { expectResponse: false })
            }
        }
        this.lastLoginState = this.loggedIn
    }

    _getAddressColors(addressColors){
        if(!addressColors) return []

        return addressColors.map(hexColor => {
            const hexSplit = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor)
            const rgb = hexSplit.map(color => {
                return parseInt(color, 16) / 255
            }).map(color => {
                return color <= 0.03928 ? color / 12.92 : Math.pow((color + 0.055) / 1.055, 2.4)
            })
            const luminance = 0.2126 * rgb[1] + 0.7152 * rgb[2] + 0.0722 * rgb[3]

            return {
                color: hexColor,
                textColor: luminance > 0.179 ? "dark" : "light"
            }
        })
    }

    _toastClick(){
        this.toast.res()
    }

    _closeToast(e){
        this.$.toastElement.close()
        this.toastOpened = false
        console.log("TRYING TO CLOSE ", this.$.toastElement)

        // const toastElement = this.$.querySelector("#toastElement")
        // toastElement.close()
    }

    _downloadBackupSeedClick (e){
        this._downloadBackupSeed()
    }

    async _downloadBackupSeed () {
        this.backupSeedID = ""
        console.log(this.loginHandler)
        let saveSeedData
        if (this.saveSeedUseExistingIDAndPassword) {
            saveSeedData = this.wallet.savedSeedData
        } else {
            // Check the password/id
            if (this.backupSeedPassword.length < 1) {
                throw new Error("Invalid identifier or password  length")
            }
            saveSeedData = await this.loginHandler.generateSaveSeedData(this.wallet.seed, this.wallet._walletVersion, "Karma wallet seed backup", this.backupSeedPassword)
        }

        const blob = new Blob([JSON.stringify(saveSeedData)], { type: 'application/json' });
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, `${backupSeedID}KARMA_SEED_BACKUP.json`);
        }
        else {
            // var elem = window.document.createElement('a');
            this.downloadBackSeedAnchorURL = window.URL.createObjectURL(blob)
            // elem.download = filename;
            // document.body.appendChild(elem);
            // elem.click();
            // document.body.removeChild(elem);
            this.$.downloadBackupSeedAnchor.click()
        }
        this.$.backupSeedDialog.close()

        // this.downloadBackSeedAnchorURL = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(saveSeedData))
        
        // this.$.downloadBackupSeedAnchor.click()


    }

}