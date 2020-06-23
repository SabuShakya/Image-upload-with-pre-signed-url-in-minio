 import {getPresignedPutUrl,getPresignedGetUrl} from './fileUploader.js';
 
 export  const upload = (file) => {
     retrieveNewURL(file);
    }

  async function retrieveNewURL(file) {
     let putUrl = await getPresignedPutUrl(file.name)
     uploadFile(file,putUrl);
  }

  async function uploadFile(file, url) {
    fetch(url, {
      method: "PUT",
      body: file
    })
      .then(async (res) => {
        // If multiple files are uploaded, append upload status on the next line.
        document.querySelector("#status").innerHTML += `<br>Uploaded ${
          file.name
        }.`;
       let getUrl= await getPresignedGetUrl(file.name);
       console.log("IMAGE GET URL",getUrl);
      })
      .catch(e => {
        console.error(e);
      });
  }