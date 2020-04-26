const fs = require('fs');

exports.createDirIfNotExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
};

exports.listSubFolders = (basePath) => {
    const results = [];
    const fixedBasePath = basePath.endsWith('/') ? basePath : basePath + '/';
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
    const fixedBasePath = basePath.endsWith('/') ? basePath : basePath + '/';
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