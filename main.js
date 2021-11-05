const {app, BrowserWindow, Menu} = require('electron')
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
const template = [
    {
        label: 'File',
        submenu:[{
            label:'close',
            click: app.quit()
        }]
    }
]
app.whenReady().then(() =>{
    createWindow()
    app.on('activate',() =>{
        if(BrowserWindow.getAllWindows().length===0){
            createWindow()
        }
    })
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
})
app.on('window-all-closed',()=>{
    if(process.platform !== 'darwin'){
        app.quit()
    }
})