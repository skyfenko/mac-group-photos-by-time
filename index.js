const fs = require('fs');
const {walk} = require('@root/walk');
const moment = require('moment');

const mapping = {};

const walkAndMap = (locale, dateFormat) => {
    console.log(`set locale to ${moment.locale(locale)}`);

    return function (err, pathname, dirent) {
        if (err) {
            throw err;
        }

        if (dirent.isDirectory()) {
            // ignore hidden folders
            if (dirent.name.startsWith(".")) {
                return false;
            }

            const parsedFolderTime = moment(dirent.name, dateFormat);
            const newFolderPath = parsedFolderTime.format('YYYY/MM/DD');

            // ignore parent directory
            if (!isNaN(parsedFolderTime.year())) {

                // map current folder path to new structure
                // for example, 10 December 2020 will be mapped to entry 2020/12/10
                if (mapping[newFolderPath]) {
                    mapping[newFolderPath].push(dirent.name);
                } else {
                    mapping[newFolderPath] = [dirent.name];
                }
            }
        }
    }
}

const makeDirRecursively = (folder, subFolders) => {

    if (subFolders.length > 0) {
        const newPath = folder + "/" + subFolders.shift();

        if (!fs.existsSync(newPath)) {
            fs.mkdirSync(newPath)
        }

        makeDirRecursively(newPath, subFolders);
    }
}

const move = (parentFolder) => {
    Object.keys(mapping).forEach(key => {
        const subFolders = key.split("/");
        makeDirRecursively(parentFolder, subFolders);

        const newPath = parentFolder + "/" + key;

        mapping[key].forEach(oldPath => {
            fs.rename(oldPath, newPath, (err) => {
                if (err) throw err;
                console.log('Rename complete!');
            });
        })

    })
}


const walkDirsAndMove = async (path, locale = 'en', dateFormat = 'DD MMMM YYYY') => {
    await walk(path, walkAndMap(locale, dateFormat));
    move(path)
    console.log("Done");
}

walkDirsAndMove("/Users/stan/Desktop/export");