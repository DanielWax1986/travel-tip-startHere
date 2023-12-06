export const mapService = {
  initMap,
  addMarker,
  panTo,
  searchLocation,
};

// Var that is used throughout this Module (not global)
var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
  return _connectGoogleApi().then(() => {
    gMap = new google.maps.Map(document.querySelector("#map"), {
      center: { lat, lng },
      zoom: 15,
    });
  });
}

function addMarker(loc) {
  var marker = new google.maps.Marker({
    position: loc,
    map: gMap,
    title: "Hello World!",
  });
  return marker;
}

function panTo(lat, lng) {
  var laLatLng = new google.maps.LatLng(lat, lng);
  gMap.panTo(laLatLng);
}

function searchLocation(locName) {
  return new Promise((resolve, reject) => {
    var request = {
      query: locName,
      fields: ["name", "geometry"],
    };

    var service = new google.maps.places.PlacesService(gMap);

    service.findPlaceFromQuery(request, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        resolve(results[0].geometry.location);
      } else {
        reject("Location not found");
      }
    });
  });
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve();
  const API_KEY = ""; //TODO: Enter your API Key
  var elGoogleApi = document.createElement("script");
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
  elGoogleApi.async = true;
  document.body.append(elGoogleApi);

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve;
    elGoogleApi.onerror = () => reject("Google script failed to load");
  });
}
