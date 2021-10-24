const {app, BrowserWindow} = require('electron')
const path = require("path")
function createWindow(){
    const window = new BrowserWindow({
        width: 500, height: 500,
        webPreferences:{
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true, contextIsolation: false,
        }
    })
    window.loadFile('index.html')
    window.openDevTools();
}
app.whenReady().then(() =>{
    createWindow()
    app.on('activate',() =>{
        if(BrowserWindow.getAllWindows().length===0){
            createWindow()
        }
    })
})
app.on('window-all-closed',()=>{
    if(process.platform !== 'darwin'){
        app.quit()
    }
})