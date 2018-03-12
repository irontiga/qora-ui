(function(){
    class ClientWimp extends Wimp {
        constructor(target, proxy){
            super(target, proxy);
        }
        
        registerURL()
    }
    
    // What am I meant to call it?
    window.QoraAPI = new ClientWimp(window.parent);
}())

