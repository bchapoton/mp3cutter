const fs = require('fs');
const path = require('path');
const {srcFolderName, destFolderName} = require("../conf");

exports.createDirIfNotExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
};

exports.listSubFolders = (basePath) => {
    const results = [];
    const fixedBasePath = normalizePath(basePath);
    const folders = fs.readdirSync(fixedBasePath);
    for (let i in folders) {
        const currentFolder = fixedBasePath + folders[i];
        if (fs.statSync(currentFolder).isDirectory()) {
            results.push({
                fullPath: currentFolder,
                currentFolder: folders[i]
            });
        }
    }
    return {
        currentPath: basePath,
        subFolders: results
    };
};

exports.listFilesFromFolder = (basePath) => {
    const results = [];
    const fixedBasePath = normalizePath(basePath);
    const files = fs.readdirSync(fixedBasePath);
    for (let i in files) {
        const currentFile = fixedBasePath + files[i];
        if (!fs.statSync(currentFile).isDirectory()) {
            results.push({
                fileName: files[i],
                fileFullPath: currentFile
            });
        }
    }
    return results;
};

exports.isMp3 = (filePath) => {
    return filePath.endsWith('.mp3');
};

function normalizePath(thePath) {
    return thePath.endsWith(path.sep) ? thePath : thePath + path.sep;
}

exports.getSrcFolderPath = () => {
    console.log(getScriptBasePath());
    return getScriptBasePath() + srcFolderName;
};

exports.getDestFolderPath = () => {
    return getScriptBasePath() + destFolderName;
};

function getScriptBasePath() {
    const fullPath = normalizePath(process.cwd());
    if (fullPath.endsWith(path.sep + 'src' + path.sep)) {
        return fullPath;
    } else {
        return fullPath + 'src' + path.sep;
    }
}