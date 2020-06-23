import React from "react";
import "./styles.css";

export default function App() {
  const upload = () => {
    var files = document.querySelector("#selector").files;
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      // Retrieve a URL from our server.
      console.log(file);
      retrieveNewURL(file, (file, url) => {
        // Upload the file to the server.
        uploadFile(file, url);
      });
    }
  };

  // `retrieveNewURL` accepts the name of the current file and invokes the `/presignedUrl` endpoint to
  // generate a pre-signed URL for use in uploading that file:
  function retrieveNewURL(file, cb) {
    console.log("FileName", file.name);

    fetch(`http://localhost:8080/presignedUrl?name=${file.name}`)
      .then(response => {
      
        console.log("response", response);
        response.text().then(url => {
          cb(file, url);
        });
      })
      .catch(e => {
        console.error(e);
      });
  }

  // ``uploadFile` accepts the current filename and the pre-signed URL. It then uses `Fetch API`
  // to upload this file to S3 at `play.min.io:9000` using the URL:
  function uploadFile(file, url) {
    if (document.querySelector("#status").innerText === "No uploads") {
      document.querySelector("#status").innerHTML = "";
    }
    console.log("URLLLLLL",url)
    fetch(url, {
      method: "PUT",
      body: file
    })
      .then((res) => {
        // If multiple files are uploaded, append upload status on the next line.
        document.querySelector("#status").innerHTML += `<br>Uploaded ${
          file.name
        }.`;
        fetch(`http://localhost:8080/getPresignedUrl?name=${file.name}`)
        .then((url)=>{
          console.log("GET URL", url);
        })
        .catch(e => {
          console.error(e);
          });
      })
      .catch(e => {
        console.error(e);
      });
  }
  return (
    <div className="App">
      <input type="file" id="selector" multiple />
      <button onClick={upload}>Upload</button>

      <div id="status">No uploads</div>
    </div>
  );
}
