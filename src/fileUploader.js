const Minio = require("minio");

var client = new Minio.Client({
    // endPoint: 'play.min.io',
    // port: 9000,
    // useSSL: true,
    // accessKey: 'Q3AM3UQ867SPQQA43P2F',
    // secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'
  endPoint: "192.168.1.75",
  port: 9000,
  useSSL: false,
  accessKey: "minioadmin",
  secretKey: "minioadmin"
});


export const getPresignedPutUrl = async name =>{
    try {
        const url = await client.presignedPutObject("test-sabu",name, 60);
        console.log("URL", url)
        return url;
  } catch (e) {
    throw e
  }

}

export const getPresignedGetUrl = async name =>{
    try{
        const presignedUrl = await client.presignedUrl('GET', 'test-sabu', name, 60)
        console.log("Presigned",presignedUrl)
        return presignedUrl;
  }catch(e){
     throw e;
  }  
}