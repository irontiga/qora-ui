const url = require('url')
const Path = require('path')
const { app, BrowserWindow } = require('electron')
const config = require("../config/config-loader.js")

// Run the server first
const { server, pluginServer } = require("./server.js");

let win;

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
        //frame: false,
        backgroundColor: '#eee',
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            partition: "persist:qora"
        },
        icon: Path.join(__dirname, "../", config.icon),
        autoHideMenuBar: true
    })

    // and load the index.html of the app.
    /*win.loadURL(url.format({
        pathname: Path.join(__dirname, '../client/index_electron.html'),
        protocol: 'file:',
        slashes: true
    }))*/
    
    win.loadURL(url.format({
        pathname: config.primary.domain + ":" + config.primary.port + "/qora/" + config.plugins.default,
        protocol: config.primary.protocol + ":",
        slashes: true
    }))

    win.maximize();
    
    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.