const toastQueue = []
let active = false

export default function toast(req, res){
    // res for onclick
    toastQueue.push({ req, res })
    if(!active){
        doToast()
    }
}

function doToast(){
    active = true
    const item = toastQueue.shift()
    if(item){
        App.toast = item.req.data
        App.toast.res = item.res
        App.$.toastElement.show()
        // 3 seconds per toast
        setTimeout(() => {
            if(item.req.expectResponse){
                res({
                    clicked: false
                })
            }
            doToast()
        }, 3000)
    } else{
        active = false
    }
}