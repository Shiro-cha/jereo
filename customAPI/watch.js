const path = require("path");
const fs = require("fs");
const process = require("process");

class DirectoryWatcher {
    constructor(fileSystem, process, path, callback) {
        this.fs = fileSystem;
        this.process = process;
        this.path = path;
        this.callback = callback;
    }

    getFolderPath(file) {
        return file ? (this.path.isAbsolute(file) ? file : this.path.join(this.process.cwd(), file)) : this.process.cwd();
    }

    watch(file) {
        const folder = this.getFolderPath(file);
        this.fs.stat(folder, (err, stats) => {
            if (err) {
                console.log(err.message);
                return;
            }

            if (stats.isDirectory()) {
                this.watchAllFolders(folder);
                this.watchFolder(folder);
            }
        });
    }

    watchFolder(folder) {
        this.fs.watch(folder, (evt, filename) => {
            this.callback(evt, filename);
        });
    }

    watchAllFolders(folder) {
        if (folder.includes(".git")) return;

        console.log(folder);
        this.fs.readdir(folder, (err, files) => {
            if (err) {
                console.log(err.message);
                return;
            }

            files.forEach(file => {
                const filePath = this.path.join(folder, file);

                this.fs.stat(filePath, (err, stats) => {
                    if (err) {
                        console.log(err.message);
                        return;
                    }

                    if (stats.isDirectory() && file[0] !== '.') {
                        this.watchFolder(filePath);
                        this.watchAllFolders(filePath);
                    }
                });
            });
        });
    }
}

module.exports = function (file, callback) {
    const directoryWatcher = new DirectoryWatcher(fs, process, path, callback);
    directoryWatcher.watch(file);
};
