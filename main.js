const { app, BrowserWindow, ipcMain } = require("electron");

let mainWindow; // Variável global para armazenar a janela

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 400,
    maximizable: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();
});

ipcMain.on("close-window", () => {
  if (mainWindow) {
    mainWindow.close();
  }
});
