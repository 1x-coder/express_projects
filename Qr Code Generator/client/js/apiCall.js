export default async function apiCall(url, inputData, cb) {
  try {
    await $.get(url + inputData, inputData, (res, status, req) => {
      if (req.status === 200 && status === "success") {
        cb(req);
      }
    });
  } catch (error) {
    cb(error);
  }
}
