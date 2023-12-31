import { locService } from "./services/loc.service.js";
import { mapService } from "./services/map.service.js";

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onSearchLocation = onSearchLocation;

function onInit() {
  mapService
    .initMap()
    .then(() => {
      console.log("Map is ready");
    })
    .catch(() => console.log("Error: cannot init map"));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  console.log("Getting Pos");
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function onAddMarker(lat = 32.0749831, lng = 34.9120554) {
  console.log("Adding a marker");
  mapService.addMarker({ lat, lng });
}

function onGetLocs() {
  locService.getLocs().then((locs) => {
    console.log("Locations:", locs);
    document.querySelector(".locs").innerText = JSON.stringify(locs, null, 2);
  });
}

function onGetUserPos() {
  getPosition()
    .then((pos) => {
      document.querySelector(
        ".user-pos"
      ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`;
      onPanTo(pos.coords.latitude, pos.coords.longitude);
      onAddMarker(pos.coords.latitude, pos.coords.longitude);
    })
    .catch((err) => {
      console.log("err!!!", err);
    });
}
function onPanTo(lat, lng) {
  console.log("Panning the Map");
  mapService.panTo(lat, lng);
}

function onSearchLocation() {
  const locationName = document.getElementById("location-input").value;
  if (locationName === "") return;
  mapService
    .searchLocation(locationName)
    .then((pos) => {
      console.log(pos);
      onPanTo(pos.coords.latitude, pos.coords.longitude);
      onAddMarker(pos.coords.latitude, pos.coords.longitude);
    })
    .catch((err) => {
      console.log("err!!!", err);
    });
}
