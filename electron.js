
const electron = require('electron');
const path = require('path');
const url = require('url');

let app = electron.app;
let BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {

	mainWindow = new BrowserWindow({
		width: 1200,
		minWidth: 1200,
		height: 800,
		minHeight: 800
	});

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'dist/index.html'),
		protocol: 'file:',
		slashes: true
	}));

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()

	mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', () => createWindow());

app.on('window-all-closed', () => {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow();
	}
});