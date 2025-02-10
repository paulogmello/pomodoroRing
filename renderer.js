const { ipcRenderer } = require("electron");

document.getElementById("close").addEventListener("click", () => {
  ipcRenderer.send("close-window");
});
document.getElementById("minimize").addEventListener("click", () => {
  ipcRenderer.send("minimize-window");
});
 