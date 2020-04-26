# mp3cutter

|Soft   | Version |
|-------|--------:|
|NodeJS | 12.16.1 |
|NPM    | 6.13.4  |

## Install

```bash
npm install
```

## Usage

```bash
node cutThatShit.js
```

## Purpose
Cut at random position for 30s and extract metadata from mp3 in the **mp3src** sub folders.

The cut will not corrupt original files, it will create the same sub folders in **mp3dest** folder, in which you will find **000x.mp3** cut files and a **metadata.json** file with artist, title and the file name for each mp3.
 
## Metadata
The metadata are extracted from the ID3Tag original file.

```json
{
    "folder": "sample",
    "files": [
        {
            "artist": "Ona",
            "title": "Poison",
            "file": "00001.mp3"
        }
    ]
}
```

## Sample
Sample downloaded on https://www.auboutdufil.com/

Titre:  Poison

Auteur: Ona

Source: https://www.youtube.com/channel/UCnnBCffappJ4k2zjnRjLt_w

Licence: https://creativecommons.org/licenses/by/3.0/deed.fr

Téléchargement (6MB): https://auboutdufil.com/?id=559