const QRCode = require("qrcode");
const fs = require("fs");
const Jimp = require("jimp");

function watermarkImg(url, img, path) {
  return new Promise((resolve) => {
    Jimp.read(url)
      .then((w) => {
        w.composite(img, 0, 0, {
          mode: Jimp.BLEND_DESTINATION_OVER,
          opacitySource: 0.3,
          opacityDest: 0.9,
        });
        return w;
      })
      .then((w) => {
        w.write(path, (err) => {
          // let result = fs.readFileSync(path, {
          //   encoding: "base64",
          // });
          // return result.toString();
          if (err) {
            console.log(err);
          }
        });
      });
    // .then(() => {
    //   let result = fs.readFileSync(path, {
    //     encoding: "base64",
    //   });
    //   resolve();
    // });
  });
}

exports.createQR = async (req, res) => {
  console.log("creating qr, qr data is: ", req);

  return new Promise((resolve, reject) => {
    var locationUrl = "https://www.google.com";
    setTimeout(function () {
      resolve("Here's your data");
    }, 3000);
    reject("Error");
  });

  // let qr = {
  //   status: res.status,
  //   statusCode: res.statusCode,
  //   data: {
  //     qrcode: String,
  //     qrdata: qrdata.toString(),
  //   },
  //   watermarkText: "WATERMARK",
  // };
  // const now = new Date();
  // await QRCode.toDataURL(qrdata.toString(), { type: "png" })
  //   .then((data) => {
  //     let qrData = {
  //       originalPath: "./qrcodes/" + now + ".png",
  //       jimpPath: "./qrcodes/" + now + "-jimped.png",
  //       base64DataOriginal: data.toString(),
  //       base64Data: data.toString().replace(/^data:image\/png;base64,/, ""),
  //     };
  //     // qr.data.qrcode = qrData.base64DataOriginal;
  //     fs.writeFile(qrData.originalPath, qrData.base64Data, "base64", (err) => {
  //       if (err) {
  //         console.log(err);
  //         throw "ERROR: " + err;
  //       }
  //     });
  //     return qrData;
  //   })
  //   .then((x) => {
  //     return Jimp.read(x.originalPath).then((img) => {
  //       return {
  //         originalPath: x.originalPath,
  //         originalImage: img,
  //         jimpPath: x.jimpPath,
  //         base64Data: x.base64Data,
  //         base64DataOriginal: x.base64DataOriginal,
  //         w: img.bitmap.width,
  //         h: img.bitmap.height,
  //         watermarkUrl:
  //           "https://via.placeholder.com/" +
  //           img.bitmap.width +
  //           "x" +
  //           img.bitmap.height +
  //           "?text=" +
  //           qr.watermarkText,
  //       };
  //     });
  //   })
  //   .then(async (i) => {
  //     const watermarked = await watermarkImg(
  //       i.watermarkUrl,
  //       i.originalImage,
  //       i.jimpPath
  //     );
  //     // qr.data.qrcode = watermarked;
  //     console.log("watermarked is now", watermarked);
  //     let result = await fs.readFileSync(path, {
  //       encoding: "base64",
  //     });
  //     qr.data.qrcode = result;
  //     // Jimp.read(i.watermarkUrl).then((w) => {
  //     //   w.composite(i.originalImage, 0, 0, {
  //     //     mode: Jimp.BLEND_DESTINATION_OVER,
  //     //     opacitySource: 0.3,
  //     //     opacityDest: 0.9,
  //     //   }).write(i.jimpPath, (err) => {
  //     //     let finalQr = fs.readFileSync(i.jimpPath, {
  //     //       encoding: "base64",
  //     //     });
  //     //     qr.data.qrcode = finalQr.toString();
  //     //   });
  //     // });
  //   })
  //   .catch((err) => {
  //     if (err) {
  //       console.log("Error:", err);
  //     }
  //   });
  // return qr;
};

// Jimp.read(qrpath)
//       .then((image) => {
//         var w = image.bitmap.width; //  width of the image
//         var h = image.bitmap.height; // height of the image
//         watermarkUrl =
//           "https://via.placeholder.com/" + w + "x" + h + "?text=watermark";
//         // image.color([
//         //   { apply: "hue", params: [-90] },
//         //   { apply: "lighten", params: [50] },
//         //   { apply: "xor", params: ["#06D"] },
//         // ]);

//         Jimp.read(watermarkUrl).then((watermark) => {
//           watermark.composite(image, 0, 0, {
//             mode: Jimp.BLEND_SOURCE_OVER,
//             opacitySource: 0.3,
//             opacityDest: 0.9,
//           });

//           watermark.write(jimpPath, (error) => {
//             if (!error) {
//               fs.unlink(qrpath, (err) => {
//                 if (err) {
//                   throw err;
//                 } else {
//                   console.log("Successfully deleted file: " + qrpath);
//                   let x = fs.readFileSync(jimpPath, {
//                     encoding: "base64",
//                   });
//                   qr.data.qrcode = x.toString();
//                   // let x = base64_encode(jimpPath);
//                   console.log("base 64 url: ", x);
//                 }
//               });
//             }

//             // console.log(cb);
//             // setTimeout(() => {
//             //   fs.unlink(qrpath, function (err) {
//             //     if (err) {
//             //       throw err;
//             //     } else {
//             //       console.log("Successfully deleted the file.");
//             //     }
//             //   });
//             // }, 10000);
//           });
//         });
//       })
//       .catch((err) => {
//         console.log("error", err);
//       });
