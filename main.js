const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

function addWindow() {
    const window = new BrowserWindow({
        width: 400,
        height: 400,
        title: "Dodawanie rekordów",
        webPreferences: {
            //preload: path.join(__dirname+"/JS", 'adding.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    // window.openDevTools();
    window.loadFile("addNew.html");
}
function delWindow() {
    const window = new BrowserWindow({
        width: 900,
        height: 400,
        title: "Usuwanie rekordów",
        webPreferences: {
            //preload: path.join(__dirname+"/JS", 'adding.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    // window.openDevTools();
    window.loadFile("delWindow.html");
}
function updateWindow() {
    const window = new BrowserWindow({
        width: 900,
        height: 400,
        title: "Aktualizacja rekordów",
        webPreferences: {
            //preload: path.join(__dirname+"/JS", 'adding.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    // window.openDevTools();
    window.loadFile("updateWindow.html");
}
function showWindow() {
    const window = new BrowserWindow({
        width: 1200,
        height: 800,
        title: "Wyswietlanie rekordów",
        webPreferences: {
            //preload: path.join(__dirname+"/JS", 'adding.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    window.openDevTools();
    window.loadFile("displayTables.html");
}

function createWindow() {
    const window = new BrowserWindow({
        width: 500,
        height: 500,
        title: "Portal muzyczny",
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    window.loadFile("index.html");
    //window.openDevTools();
}

function showView(){
    const window = new BrowserWindow({
        width: 500,
        height: 500,
        title: "Portal muzyczny",
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    // window.openDevTools();
    window.loadFile("views/showViews.html");
}
function addView(){
    const window = new BrowserWindow({
        width: 500,
        height: 500,
        title: "Portal muzyczny",
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    window.loadFile("views/addViews.html");
}
function delView(){
    const window = new BrowserWindow({
        width: 500,
        height: 500,
        title: "Portal muzyczny",
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    window.loadFile("views/delView.html");
}
function updateView(){
    const window = new BrowserWindow({
        width: 500,
        height: 500,
        title: "Portal muzyczny",
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    window.loadFile("views/updateView.html");
}

app.whenReady().then(() => {
    createWindow();
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

const mainMenuTemplate = [
    {
        label: "Dane",
        submenu: [
            {
                label: "Dodaj wiersz",
                click() {
                    addWindow();
                },
            },
            {
                label: "Wyświetl wiersze",
                click() {
                    showWindow();
                },
            },
            {
                label: "Usuń wiersz",
                click() {
                    delWindow();
                },
            },
            {
                label: "Aktualizuj wiersz",
                click() {
                    updateWindow();
                },
            },
            {
                label: "Wyjdź",
                accelerator: "CmdOrCtrl+Q",
                click() {
                    app.quit();
                },
            },
        ],
    },
    {
        label: "Widoki",
        submenu: [
            {
                label: "Dodaj wiersz",
                click() {
                    addView();
                },
            },
            {
                label: "Wyświetl wiersze",
                click() {
                    showView();
                },
            },
            {
                label: "Usuń wiersz",
                click() {
                    delView();
                },
            },
            {
                label: "Aktualizuj wiersz",
                click() {
                    updateView();
                },
            }
        ]
    }

];
