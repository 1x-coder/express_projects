const QRCode = require("qrcode");
const fs = require("fs");
const Jimp = require("jimp");

const timestamp = new Date();

const paths = [
  { path: "./qrcodes/" + timestamp + ".png" },
  { path: "./qrcodes/" + timestamp + "-jimped.png" },
];

function watermarkImg(url, img, path) {
  return new Promise((resolve, reject) => {
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
          if (err) {
            console.log(err);
            throw err;
          } else {
            resolve();
          }
        });
      })
      .catch((err) => {
        console.log("watermark error: ", err);
        reject(err);
      });
  });
}

const jimpify = (path, jimpPath, watermarkText) =>
  new Promise((resolve, reject) => {
    Jimp.read(path)
      .then((image) => {
        const jimpData = {
          original: image,
          width: image.bitmap.width, // the width of the image
          height: image.bitmap.height, // the height of the image
          watermarkUrl:
            "https://via.placeholder.com/" +
            image.bitmap.width +
            "x" +
            image.bitmap.height +
            "?text=" +
            watermarkText,
        };
        return jimpData;
      })
      .then(async (jimpData) => {
        const watermarked = await watermarkImg(
          jimpData.watermarkUrl,
          jimpData.original,
          jimpPath
        );
        return jimpData;
        // console.log("watermarked is now", watermarked);
        // resolve(jimpData);
      })
      .then((jimpData) => {
        const result = fs.readFileSync(paths[1].path, "base64");
        jimpData.codeJimped = result;
        resolve(jimpData);
      })
      .catch((err) => {
        console.log("jimp error: ", err);
        reject(err);
      });
  });

class QR {
  constructor(value) {
    this.code = String;
    this.value = value;
    this.height = Number;
    this.width = Number;
    this.watermarkText = "WATERMARK";
    this.watermarkUrl = String;
  }
  async produce(watermark, deleteFiles) {
    try {
      const dataURL = await QRCode.toDataURL(this.value, { type: "png" })
        .then((dataUrl) => {
          if (watermark == true) {
            return dataUrl.toString().replace(/^data:image\/png;base64,/, "");
          } else {
            this.code = dataUrl;
            return 0;
          }
        })
        .then(async (codeJimped) => {
          if (codeJimped != 0) {
            await fs.writeFileSync(paths[0].path, codeJimped, "base64");
            const jimpified = await jimpify(
              paths[0].path,
              paths[1].path,
              this.watermarkText
            );
            this.width = jimpified.width;
            this.height = jimpified.height;
            this.watermarkUrl = jimpified.watermarkUrl;
            this.code = "data:image/png;base64," + jimpified.codeJimped;
            if (deleteFiles == true) {
              await fs.unlinkSync(paths[0].path);
              await fs.unlinkSync(paths[1].path);
            }
          } else {
            return;
          }
        });
    } catch (error) {
      let err = {
        msg: "Error in produce QR:" + error,
      };
      console.log(err);
    }
  }
}

exports.create_qr = async (req, res, next) => {
  if (res.statusCode === 200) {
    const qr = await new QR(req.params.value);
    await qr.produce(true, true);
    if (qr.code.length > 0) {
      res.status(200).json(qr);
    } else {
      res.status(500).json({
        message: `The Server failed to create QR code from value "${req.params.value}".`,
      });
    }
  } else {
    let err = {
      message: `Failed to connect to server.`,
    };
    res.status(500).json(err);
  }
};
