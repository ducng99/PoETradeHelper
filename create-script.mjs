import fs from 'fs';
import path from 'path'

const directoryPath = path.join('dist', 'assets');

let indexJS, indexCSS, vendorJS;

fs.readdir(directoryPath, function (err, files)
{
    //handling error
    if (err)
    {
        return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach((file) =>
    {
        if (file.startsWith('index')) {
            if (file.endsWith('.css')) {
                indexCSS = file;
            }
            else {
                indexJS = file;
            }
        }
        else {
            vendorJS = file;
        }
    });
    
    fs.rename(path.join(directoryPath, indexJS), path.join(directoryPath, 'index.js'), console.log);
    fs.rename(path.join(directoryPath, indexCSS), path.join(directoryPath, 'index.css'), console.log);
    fs.rename(path.join(directoryPath, vendorJS), path.join(directoryPath, 'vendor.js'), console.log);
});