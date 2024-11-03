// import multer from "multer";
// import multerS3 from "multer-s3";
// import { S3Client } from "@aws-sdk/client-s3";
// // import fs from "fs";
// import  { Readable } from "stream";

// import AWS from "aws-sdk";
// import { config } from '../entrova-web-api/config';

// const region = config.client.mediaClient.aws.region as string;

// const s3Aws = new AWS.S3({
//   region,
//   credentials: {
//     accessKeyId: config.client.mediaClient.aws.accessKeyId as string,
//     secretAccessKey: config.client.mediaClient.aws.secretAccessKey as string,
//   },
// });

// const s3Client = new S3Client({
//   region: region,
//   credentials: {
//     accessKeyId: config.client.mediaClient.aws.accessKeyId as string,
//     secretAccessKey: config.client.mediaClient.aws.secretAccessKey as string,
//   },
// });

// // const bucket = config.store.aws.avatarBucketName as string;

// export const multiUpload = (bucket: string) => {
//   return multer({
//     storage: multerS3({
//       s3: s3Client,
//       bucket: bucket,
//       metadata: function (req, file, cb) {
//         cb(null, { fieldName: file.fieldname });
//       },
//       key: function (req, file, cb) {
//         cb(null, Date.now().toString());
//       },
//     }),
//     fileFilter: function (req, file, cb: any) {
//       const allowedFieldNames = ["avatar", "logo", "attachment"];
//       if (!allowedFieldNames.includes(file.fieldname)) {
//         return cb(new Error("Invalid fieldname"), false);
//       }
//       cb(null, true);
//     },
//   });
// };



// // export const multiUpload = multer({
// //   storage: multerS3({
// //     s3: s3Client,
// //     bucket: bucket,
// //     metadata: function (req, file, cb) {
// //       cb(null, { fieldName: file.fieldname });
// //     },
// //     key: function (req, file, cb) {
// //       cb(null, Date.now().toString());
// //     },
// //   }),
// //   fileFilter: function (req, file, cb: any) {
// //     const allowedFieldNames = ["avatar", "cacDoc", "businessIdentityDoc"];
// //     if (!allowedFieldNames.includes(file.fieldname)) {
// //       return cb(new Error("Invalid fieldname"), false); // Argument of type 'Error' is not assignable to parameter of type 'null'
// //     }
// //     cb(null, true);
// //   },
// //   // fields: [{ name: "attachment" }, { name: "image" }]
// // });


// const whitelist = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

// const fileUpload = multer({
//   fileFilter(_req, file, callback) {
//     if (whitelist.includes(file.mimetype)) {
//       callback(null, true);
//     } else {
//       callback(null, false);
//       return callback(new Error('Only .png, .jpg and .jpeg format allowed!'));
//     }
//   },
// });

// export const singleFileUpload = async (file: Express.Multer.File, bucket: string) => {
//   const fileStream = Readable.from(file.buffer);

//   const uploadParams = {
//     Bucket: bucket,
//     Body: fileStream,
//     Key: file.originalname,
//   };

//   return s3Aws.upload(uploadParams as any).promise();
// };

// export const singleFileUploadMiddleware = fileUpload;

// export const uploadFiles = async (files: Express.Multer.File[], bucket: string) => {
//   const uploadPromises = files.map(async (file) => {
//     const fileStream = Readable.from(file.buffer);
//     const uploadParams = {
//       Bucket: bucket,
//       Body: fileStream,
//       Key: file.filename,
//     };
//     return s3Aws.upload(uploadParams as any).promise();
//   });
//   return Promise.all(uploadPromises);
// };


// // export const singleFileUpload = async (request: Request) => {
// //   if (!request.file) throw new Error('File not included in the request');

// //   const { fileTypeFromBuffer } = await import('file-type');
// //   const meta = await fileTypeFromBuffer(request.file.buffer);

// //   if (!whitelist.includes(meta?.mime as string)) {
// //     throw new Error(`${meta?.mime} file is not allowed`);
// //   }

// //   return uploadFile(request.file);
// // };

// // export const multFileUpload = async <T extends keyof any>(
// //   files: Record<T, Express.Multer.File[]>
// // ) => {
// //   const imageMap: Record<T, any> = {} as Record<T, any>;

// //   await Promise.all(
// //     Object.keys(files).map(async (filename) => {
// //       const file = files[filename as T][0] as Express.Multer.File;
// //       imageMap[filename as T] = await uploadFile(file);
// //     })
// //   );

// //   return imageMap;
// // };





// // export const fetchDataImageFromImageURL = async (url: string) => {
// //   try {
// //     const resp = await axios.get(url);

// //     const filename = `${strongRandomString(4)}.png`;
// //     const file = fs.createWriteStream(filename);

// //     const getData = (): Promise<string> => new Promise((resolve) => {
// //       https.get(resp.request.res.responseUrl, function (response) {
// //         response.pipe(file);

// //         file.on('finish', async () => {
// //           file.close();
// //           console.log('Download Completed');

// //           const { fileTypeFromFile } = await import('file-type');
// //           const fileType = await fileTypeFromFile(filename);

// //           if (fileType) {
// //             const content = fs.readFileSync(filename, 'base64');
// //             const data = `data:${fileType.mime};base64,${content}`;
// //             resolve(data);

// //             fs.unlink(filename, (err) => {
// //               if (err) throw err;
// //               console.log(`${filename} was deleted`);
// //             });
// //           }
// //         });
// //       });
// //     });

// //     return await getData();
// //   } catch (error) {
// //     console.error('Error:', error.message);
// //     throw new Error('Failed to fetch data from image URL');
// //   }
// // };








// // import fs from "fs";
// // import axios from "axios";
// // import https from 'https';
// // import { Request } from "express";
// // import multer from "multer";
// // // import multerS3 from "multer-s3";
// // // import { S3Client } from "@aws-sdk/client-s3";
// // import AWS from "aws-sdk";
// // import  { Readable } from "stream";
// // // import stream, { ReadableOptions } from "stream";

// // import { config } from "../entrova-web-api/config";

// // import { strongRandomString } from "./auth";

// // const region = config.store.aws.region as string;


// // const s3Aws = new AWS.S3({
// //     region,
// //     credentials: {
// //         accessKeyId: config.store.aws.accessKeyId as string,
// //         secretAccessKey: config.store.aws.secretAccessKey as string,
// //     },
// // });


// // type ReadableStream = Buffer | string | null;
// // type ReadableOptions = { highWaterMark?: number; encoding?: BufferEncoding };

// // const createReadStream = (
// //   object: ReadableStream,
// //   options?: ReadableOptions
// // ) => {
// //   return new MultiStream(object, options);
// // };


// // class MultiStream extends Readable {
// //   _object: ReadableStream;

// //   constructor(object: ReadableStream, options?: ReadableOptions) {
// //     super(options);
// //     if (object instanceof Buffer || typeof object === "string") {
// //       options = options || {};
// //       Readable.call(this, {
// //         highWaterMark: options.highWaterMark,
// //         encoding: options.encoding,
// //       });
// //     } else {
// //       Readable.call(this, { objectMode: true });
// //     }
// //     this._object = object;
// //   }
// //   _read() {
// //     this.push(this._object);
// //     this._object = null;
// //   }
// // }

// // const whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

// // const fileUpload = multer({
// //   fileFilter(_req, file, callback) {
// //     if (whitelist.includes(file.mimetype)) {
// //       callback(null, true);
// //     } else {
// //       callback(null, false);
// //       return callback(new Error("Only .png, .jpg and .jpeg format allowed!"));
// //     }
// //   },
// // });

// // export const uploadFile = async (file: any) => {
// //     const fileStream = fs.createReadStream(file.path);

// //     const uploadParams = {
// //         Bucket: process.env.AWS_S3_BUCKET_NAME_AVATAR as string,
// //         Body: fileStream,
// //         Key: file.filename,
// //     };

// //     return s3Aws.upload(uploadParams as any).promise();
// // };

// // export const singleFileUploadMiddleware = fileUpload;

// // export const singleFileUpload = async (request: Request) => {
// //   const streamUpload = (req: Request) => {
// //       return new Promise((resolve, reject) => {
// //           try {
// //             const  stream = uploadFile(req.file)
// //               resolve(stream)
// //           } catch (error) {
// //               reject(error)
// //           }
// //         });
// //       };


// //   // https://stackoverflow.com/questions/60408575/how-to-validate-file-extension-with-multer-middleware
// //   // https://github.com/sindresorhus/file-type/issues/535#issuecomment-1065952695
// //   const { fileTypeFromStream } = await (eval('import("file-type")') as Promise<
// //     typeof import("file-type")
// //   >);
// //   if (!request.file) throw new Error("file not included in request");
// //   const stream = createReadStream(request.file.buffer);
// //   const meta = (await fileTypeFromStream(stream))!;
// //   if (!whitelist.includes(meta.mime))
// //     throw new Error(`${meta.mime} file is not allowed`);
// //   return (await streamUpload(request)) as any;
// // };

// // export const multFileUpload = async <T>(files: any) => {
// //   let streamUpload = (file: Express.Multer.File) => {
// //       return new Promise((resolve, reject) => {
// //           return new Promise((resolve, reject) => {
// //               try {
// //                   const stream = uploadFile(file)
// //                   resolve(stream)
// //               } catch (error) {
// //                   reject(error)
// //               }
// //           });
// //       });
// //   };

// //   const imageMap: Map<T, any> = new Map();
// //   await Promise.all(
// //     Object.keys(files).map(async (filename) => {
// //       const _file = files[filename][0];
// //       imageMap.set(
// //         filename as unknown as T,
// //         (await streamUpload(_file)) as any
// //       );
// //       return imageMap;
// //     })
// //   );

// //   return imageMap;
// // };



// // export const fetchDataImageFromImageURL = async (url: string) => {
// //   let data = "";
// //   try {
// //     const resp = await axios.get(url);

// //     const filename = `${strongRandomString(4)}.png`;
// //     const file = fs.createWriteStream(filename);
// //     const getData = (): Promise<string> => new Promise(resolve => {
// //       https.get(resp.request.res.responseUrl, function(response) {
// //         response.pipe(file);
  
// //         file.on("finish", async () => {
// //             file.close();
// //             console.log("Download Completed");
            
// //             const {fileTypeFromFile} = await (eval('import("file-type")') as Promise<typeof import("file-type")>);
// //             const fileType = await fileTypeFromFile(filename);
// //             const content = fs.readFileSync(filename, 'base64');
// //             if (fileType) {
// //               data = `data:${fileType.mime};base64,` + content;
// //               resolve(data);

// //               if (data){
// //                 fs.unlink(filename, (err) => {
// //                   if (err) throw err;
// //                   console.log(`${filename} was deleted`);
// //                 });
// //               }
// //             }
  
// //         });
// //       });
// //     });
// //     data = await getData();

// //   } catch (error) {
// //     console.error("")
// //   }
// //   return data;
// // }
