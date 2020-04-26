const NodeID3 = require('node-id3');
const getMP3Duration = require('get-mp3-duration');
const fs = require('fs');

exports.readID3Tags = (mp3Path) => {
    let fileTags;
    fileTags = NodeID3.read(mp3Path);
    return fileTags;
};

exports.mp3duration = (mp3path) => {
    const buffer = fs.readFileSync(mp3path);
    return getMP3Duration(buffer);
};