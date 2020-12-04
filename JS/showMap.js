var x = document.getElementById("myInfo");

function getLocation() {
   
    if (navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(showPosition);
      x.style.background = "green";
      x.innerHTML = "Geolocation OK"
    } 
    else
    { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  
var x = document.getElementById("myInfo");
function showError(error) 
{
    
    let denyGeolocationRequestMessage = "User denied the request for Geolocation."

    switch(error.code) 
    {
        case error.PERMISSION_DENIED:
        x.innerHTML = denyGeolocationRequestMessage;
        x.style.background = "orange";
        console.log(denyGeolocationRequestMessage);
        //x.innerHTML = "User denied the request for Geolocation."
        break;
        case error.POSITION_UNAVAILABLE:
        x.innerHTML = "Location information is unavailable."
        break;
        case error.TIMEOUT:
        x.innerHTML = "The request to get user location timed out."
        break;
        case error.UNKNOWN_ERROR:
        x.innerHTML = "An unknown error occurred."
        break;
    }
}




  function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var myHome = "48.4469598,1.0200378";

    //var mymap = L.map('myMap').setView([48.4469598,1.0200378], 7);

    // Initialisation de la carte sur le monde
    var mymap = L.map('myMap').fitWorld();

    function onLocationFound(e) {
        //var radius = e.accuracy /10;
        // var circle = L.circle(e.latlng, {
        //     color: 'red',
        //     fillColor: '#f03',
        //     fillOpacity: 0.5,
        //     radius: 2500
        // })
    
        L.marker(e.latlng, {icon: redIcon}).addTo(mymap)
            .bindPopup("Vous êtes ici").openPopup();
    
        L.circle(e.latlng, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 3000
        }).addTo(mymap);
    }
    
    mymap.on('locationfound', onLocationFound);

    //centre la carte sur la position données par la géo-localisation
    mymap.locate({setView: true, maxZoom: 16});
   
    //Icons
    var myIcon = L.icon({
    iconUrl: './Assets/person_pin_circle-black-18dp/2x/twotone_person_pin_circle_black_18dp.png',
    // shadowUrl: 'leaf-shadow.png',

    iconSize:     [38, 45], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [19, 45 ], // point of the icon which will correspond to marker's location and iconSize
    // shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [0, -20] // point from which the popup should open relative to the iconAnchor
});

var greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  var redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  
//   L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map);

    //Ajout d'un accueillant avec un cercle de 3 km
    var yanis = L.marker([48.4469598,1.0200378], {icon: greenIcon}).bindPopup("<b>Accueillant à la Ducherie</b>");
    var florence = L.marker([48.3569598,1.0000378], {icon: greenIcon}).bindPopup("<b>Accueillant à petaouchnok</b>");
    var autreLieu = L.marker([48.44905, 0.99891], {icon: greenIcon}).bindPopup("<b>Tres accueillant</b><a href='#'>test</a>");

    var accueillants = L.layerGroup([yanis, florence, autreLieu]);

    var autreTruc = L.geoJSON(serviceAreasEureEtLoir);


    // var circle = L.circle([48.4469598,1.0200378], {
    //     color: 'red',
    //     fillColor: '#f03',
    //     fillOpacity: 0.5,
    //     radius: 3000
    // }).addTo(mymap);
    // circle.bindPopup("<b>Accueillant</b>");


    var description = e.features[0].properties.description;
 

    function onEachFeature(feature, layer) {
        // does this feature have a property named popupContent?
        if (feature.properties && feature.properties.site_web)
        {
            layer.bindPopup(feature.properties.site_web);
            
        }
        else
        {
            layer.bindPopup("quedale")
        }
    }
        
    // integration de la base de données geoJson
    function getProperties(feature, layer)
    {
        L.geoJSON(serviceAreasEureEtLoir)

        if (feature && feature.properties)
        {
            var propertiesList = "";
            var propertiesLength = serviceAreasEureEtLoir.features.length;

            for (i = 0 ; i < propertiesLength ; i++)
            {
                propertiesList += serviceAreasEureEtLoir.features[i]
            }

            layer.bindPopup(propertiesList);
            
            console.log("Nombre de proprietes :" + " " + propertiesLength + propertiesList )
        }
        else
        {
            console.log("rien a afficher");
        }
        
    }
    getProperties();

    L.geoJSON(serviceAreasEureEtLoir, {
        onEachFeature: onEachFeature
    }).addTo(mymap);

    
    L.geoJSON(serviceAreasEureEtLoir, {
    style: function (feature) {
        return {color: feature.properties.color};
    }
    }).bindPopup(function (layer) {
        
        return layer.feature.properties.nom_offre;
    }).addTo(mymap);

// filtrage
    L.geoJSON(serviceAreasEureEtLoir, {
        filter: function(feature, layer) {
            return feature.properties.properties;
        }
    }).addTo(mymap);

    // var aube = L.marker([48.741678, 0.550847]).addTo(mymap);
    // aube.bindPopup("<b>Aire de service Aube (61)</b>");

    // var bonneval= L.marker([48.179167, 1.386944]).addTo(mymap);
    // bonneval.bindPopup("<b>Aire de service Bonneval (28)</b>");

    // var bretoncelles= L.marker([48.43588, 0.886786]).addTo(mymap);
    // bretoncelles.bindPopup("<b>Aire de service Bretoncelles (28)</b>");

    // var brezolles= L.marker([48.69084, 1.0973]).addTo(mymap);
    // brezolles.bindPopup("<b>Aire de service Brezolles (28)</b>");

    // var cloyesSurLeLoir= L.marker([47.99194, 1.23224]).addTo(mymap);
    // cloyesSurLeLoir.bindPopup("<b>Aire de service Cloyes sur le Loir (28)</b>");

    // var courvilleSurEure= L.marker([48.44627, 1.24151]).addTo(mymap);
    // courvilleSurEure.bindPopup("<b>Aire de service Courville sur Eure (28)</b>");

    // var dreux= L.marker([48.740656, 1.331888]).addTo(mymap);
    // dreux.bindPopup("<b>Aire de service Dreux (28)</b>");

    // var laLoupe = L.marker([48.472558, 1.017772]).addTo(mymap);
    // laLoupe.bindPopup("<b>Aire de service La loupe (28)</b>");

    // // var serviceAreasEureEtLoir = L.layerGroup([bonneval, bretoncelles, brezolles, cloyesSurLeLoir, courvilleSurEure, dreux, laLoupe]).addTo(myMap);
    // // var serviceAreasOrne = L.layerGroup[(aube)].addTo(mymap);

    // var where = L.marker([lat, lon]).addTo(mymap);
    // where.bindPopup("<b>vous êtes ici</b>").openPopup();


    console.log("coordonnees :" + lat + "," + lon)
    
    var baseMap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>, ©{GreenDev}2020',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZ3JlZW5kZXYiLCJhIjoiY2tnZmp1eWlnMHo2MTJyczEyNHYxMDlvZiJ9.b9Cv9cWQPWaelLMf02Uyfg'
}).addTo(mymap);

var baseMaps = {"Carte de base": baseMap};
var overlayMaps = {"Accueillants": accueillants, "Aires de service région Centre": autreTruc};

L.control.layers(baseMaps, overlayMaps).addTo(mymap);

}


getLocation();