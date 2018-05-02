//import ParentRoutes from "parentRoutes.js"
//import Wimp from "./wimp/wimp.js"

export default function addModalRoutes(modalWimp, app){
    modalWimp.on("modalFrameSize", (req, res) => {
        app.modalFrameSize = {
            height: req.height,
            width: req.width
        }
        app.$.topMenuDialog.center()
    })
}