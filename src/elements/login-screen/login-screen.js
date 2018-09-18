class LoginContainer extends Polymer.Element {
    static get is() {
        return "login-screen";
    }
    static get properties() {
        return {
            selectedPage: {
                type: String,
                value: "welcome",
                observer: "_pageChange"
            },
            pages: {
                type: Object,
                value: {
                    "welcome": 0,
                    "new-account" : 1,
                    "login": 2
                }
            },
            loggedIn : {
                type: Boolean,
                notify: true
            },
            wallet: {
                type: Object,
                notify: true
            },
            addressCount: {
                type: Object
            },
            addresses : {
                type: Array,
                value: [],
                notify: true
            },
            addressColors: {
                type: Array
            }
        }
    }
    constructor() {
        super()
    }
    connectedCallback() {
        super.connectedCallback()
    }
    ready() {
        super.ready()
        this.selectedPage = "welcome"
        this.loginHandler = this.$.loginHandler
    }
    logOut(){
        // this.$["login-page"].logOut()
        // this.$.loginHandler.loggedIn = false
        this.loggedIn = false
        this.selectedPage = "welcome"
    }
    _pageChange(newPage, oldPage){
        if(!this.shadowRoot.querySelector("#loginContainerPages") || !newPage){
            return
        }
        const pages = this.shadowRoot.querySelector("#loginContainerPages").children
        // Run the animation on the newly selected page
        const newIndex = this.pages[newPage]
        if (!pages[newIndex].className.includes('animated')) {
            pages[newIndex].className += ' animated';
        }

        if (typeof oldPage !== 'undefined') {
            const oldIndex = this.pages[oldPage]
            // Stop the animation of hidden pages
            //pages[oldIndex].className = pages[oldIndex].className.split(' animated').join('');
            pages[oldIndex].classList.remove("animated")
        }
    }
    _backToWelcome(){
        this.selectedPage = "welcome"
    }

}

customElements.define(LoginContainer.is, LoginContainer)