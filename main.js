const { app, BrowserWindow, ipcMain, nativeImage } = require("electron");
const path = require('node:path');

let mainWindow; // Variável global para armazenar a janela

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 400,
    icon: "./assets/eldenRingPomodoro.ico",
    maximizable: false,
    frame: false,
    resizable: false, 
    hasShadow: true,
    fullscreenable: false,
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
ipcMain.on("minimize-window", () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

