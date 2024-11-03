import fs from 'fs';

export const readFileAsync = (filePath: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err: any, data: string | PromiseLike<string>) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};




