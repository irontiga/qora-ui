class LoginWelcomePage extends Polymer.Element{
    static get is(){
        return "login-welcome-page"
    }
    static get properties(){
        return {
            selectedPage: {
                notify : true,
                type : String
            }
        }
    }
    constructor(){
        super()
    }
    connectedCallback(){
        super.connectedCallback()
    }
    ready(){
        super.ready()
    }
    _loginClick(){
        this.selectedPage = "login"
    }
    _newAccountClick(){
        this.selectedPage = "new-account"
    }
}
customElements.define(LoginWelcomePage.is, LoginWelcomePage)