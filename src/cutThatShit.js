const fs = require('fs');
const {srcFolder, destFolder, cutMp3CutDuration, cutMp3Bitrate} = require("./conf");
const {mp3duration} = require("./helpers/MP3Helper");
const {readID3Tags} = require("./helpers/MP3Helper");
const {isMp3} = require("./helpers/FileHelper");
const {listFilesFromFolder} = require("./helpers/FileHelper");
const {listSubFolders} = require("./helpers/FileHelper");
const {createDirIfNotExists} = require("./helpers/FileHelper");
const {getRandomInt} = require("./helpers/IntegerHelper");

const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require("ffmpeg-static");

const subFolderObject = listSubFolders(srcFolder);
subFolderObject.subFolders.forEach(subFolderPath => {
    console.log(`Handle folder ${subFolderPath.currentFolder}`);
    const baseDestPath =`${destFolder}/${subFolderPath.currentFolder}`;
    createDirIfNotExists(baseDestPath);

    const filesPath = listFilesFromFolder(subFolderPath.fullPath);
    const results = handleFiles(subFolderPath.currentFolder, baseDestPath, filesPath);
    console.log(`handled ${results.fileNameCounter} mp3`);
    console.log(`write metadata`);
    fs.writeFileSync(`${baseDestPath}/metadata.json`, JSON.stringify(results.metadata, null, 4));
});

function handleFiles(currentFolderName, baseDestPath, filesPath) {
    let fileNameCounter = 0;
    const metadata = {
        folder: currentFolderName,
        files: []
    };
    for (let j in filesPath) {
        const fileObject = filesPath[j];
        if (isMp3(fileObject.fileFullPath)) {
            console.log(`'Handle file : ${fileObject.fileName}`);
            fileNameCounter++;
            const tags = readID3Tags(fileObject.fileFullPath);
            const duration = Math.round(mp3duration(fileObject.fileFullPath) / 1000);
            const title = tags.title;
            const artist = tags.artist || tags.performerInfo;

            const fileName = fileNameCounter.toString().padStart(5, '0') + '.mp3';
            const start = getRandomInt(0, duration - 30);
            const targetFile = `${baseDestPath}/${fileName}`;

            cutFile(targetFile, fileObject, start);

            metadata.files.push({
                artist: artist,
                title: title,
                file: fileName
            });
        }
    }

    return {
        metadata,
        fileNameCounter
    }
}

function cutFile(targetFile, fileObject, start) {
    ffmpeg.setFfmpegPath(ffmpegPath);
    const command = new ffmpeg()
        .input(fileObject.fileFullPath)
        .format('mp3')
        .audioBitrate(cutMp3Bitrate)
        .setStartTime(start)
        .setDuration(cutMp3CutDuration)
        .output(targetFile)
        .on('end', () => {
            console.log(`${fileObject.fileName} cut !`);
        })
        .on('error', (error) => {
            console.log(`Error on cut : [${fileObject.fileName}] ${error}`);
        });
    command.run();
}