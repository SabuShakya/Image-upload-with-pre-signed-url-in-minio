const Minio = require("minio");

var client = new Minio.Client({
  endPoint: "play.min.io",
  port: 9000,
  useSSL: true,
  accessKey: "Q3AM3UQ867SPQQA43P2F",
  secretKey: "zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG"
});

// Instantiate an `express` server and expose an endpoint called `/presignedUrl` as a `GET` request that
// accepts a filename through a query parameter called `name`. For the implementation of this endpoint,
// invoke [`presignedPutObject`](https://docs.min.io/docs/javascript-client-api-reference#presignedPutObject)
// on the `Minio.Client` instance to generate a pre-signed URL, and return that URL in the response:

// express is a small HTTP server wrapper, but this works with any HTTP server
const server = require("express")();

// var file = '/tmp/40mbfile'
var metaData = {
  "Content-Type": "text/html",
  "Content-Language": 123,
  "X-Amz-Meta-Testing": 1234,
  example: 5678
};
server.use(server.urlencoded({ extended: true }));
server.get("/presignedUrl", (req, res) => {
  console.log("REquest quesry name", req.query);
  client.fPutObject("test-sabu", "40mbfile", req.file, metaData, function(
    err,
    etag
  ) {
    return console.log(err, etag); // err should be null
  });
  // client.presignedPutObject("test-sabu", req.query.name, (err, url) => {
  //   if (err) throw err;
  //   return res.status(200).send(url);
  // });
});

// File that needs to be uploaded.
// var file = "/src/child.jpg";

// // Make a bucket called europetrip.
// client.makeBucket("test-minio", "us-east-1", function(err) {
//   if (err) return console.log(err);

//   console.log('Bucket created successfully in "us-east-1".');

//   var metaData = {
//     "Content-Type": "application/octet-stream",
//     "X-Amz-Meta-Testing": 1234,
//     example: 5678
//   };
//   // Using fPutObject API upload your file to the bucket europetrip.
//   client.fPutObject("test-minio", "photos-europe.tar", file, metaData, function(
//     err,
//     etag
//   ) {
//     if (err) return console.log(err);
//     console.log("File uploaded successfully.");
//   });
// });

server.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(8080);
