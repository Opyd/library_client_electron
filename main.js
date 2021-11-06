const {app, BrowserWindow, Menu} = require('electron')
const path = require("path")



function createWindow(){
    const window = new BrowserWindow({
        width: 500, height: 500,
        title: "Portal muzyczny",
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
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
})
app.on('window-all-closed',()=>{
    if(process.platform !== 'darwin'){
        app.quit()
    }
})

const mainMenuTemplate = [{
    label: 'Dane',
    submenu:[{
        label: "Dodaj wiersz"
    },
    {
        label: "Wyświetl wiersze"
    },
    {
        label : "Wyjdź",click(){
            app.quit();
        }
    }]
}
]