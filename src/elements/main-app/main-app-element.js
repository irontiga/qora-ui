import Wimp from "../../modules/wimp/wimp.js"
import parentWimpAPI from "../../modules/parentWimpAPI.js"
import pluginLoader from "../../modules/pluginLoader.js"
import addModalRoutes from "./modal-routes.js"

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
            }
        }
    }

    static get observers(){
        return  [
            '_addressChanged(selectedAddress)'
        ]

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
        let retryLoadConfigInterval = 0
        const loadConfig = () => fetch("/getConfig")
            .then(response => response.json())
            .then(response => {
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
    }

    _addressChanged(selectedAddress){
        if(!selectedAddress){
            return
        }
        console.log(selectedAddress)
        
        this.updateStyles({
            "--active-menu-item-color" : selectedAddress.color
        })
        
        this.streams.selectedAddress.forEach(w => {
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

}