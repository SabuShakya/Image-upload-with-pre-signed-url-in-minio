import React from "react";
import "./styles.css";
import {upload} from './ImageUploader'

export default function App() {
  const uploadImage = () => {
    var files = document.querySelector("#selector").files;
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      // Retrieve a URL from our server.
      upload(file)
      console.log(file);
     
    }
  };

  return (
    <div className="App">
      <input type="file" id="selector" multiple />
      <button onClick={uploadImage}>Upload</button>

      <div id="status">No uploads</div>
    </div>
  );
}
