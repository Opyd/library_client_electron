const {app, BrowserWindow, Menu} = require('electron')
const path = require("path")

function addWindow(){
    const window = new BrowserWindow({
        width: 400, height: 400,
        title: "Dodawanie rekordów",
        webPreferences:{
            //preload: path.join(__dirname+"/JS", 'adding.js'),
            nodeIntegration: true, contextIsolation: false,
        }
    })
    window.loadFile('addNew.html')
}
function showWindow(){
    const window = new BrowserWindow({
        width: 1200, height: 800,
        title: "Wyswietlanie rekordów",
        webPreferences:{
            //preload: path.join(__dirname+"/JS", 'adding.js'),
            nodeIntegration: true, contextIsolation: false,
        }
    })
    window.loadFile('displayTables.html')
}

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
    //window.openDevTools();
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
        label: "Dodaj wiersz", click(){
            addWindow();
        }
    },
    {
        label: "Wyświetl wiersze", click(){
            showWindow();
        }
    },
    {
        label : "Wyjdź",click(){
            app.quit();
        }
    }
    ]
}
]