const TOAST_DURATION = 3000

const toastQueue = []
let active = false

export default function toast(req, res){
    // console.log(req, res)
    // res for onclick
    toastQueue.push({ req, res })
    if(!active){
        doToast()
    }
}

function doToast(){
    active = true
    const item = toastQueue.shift()
    // console.log(item)
    if(item){
        App.set("toast", item.req) 
        App.set("toast.res", item.res)
        
        App.$.toastElement.open()
        // 3 seconds per toast
        setTimeout(() => {
            App.$.toastElement.close()
            // if(item.req.expectResponse){
            //     res({
            //         clicked: false
            //     })
            // }
            doToast()
        }, TOAST_DURATION)
    } else{
        active = false
    }
}