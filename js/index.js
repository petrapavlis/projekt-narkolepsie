"use strict";
//script related to the page "Najdi specialistu"
const places = {
  specPlaces: [
    {
      coords: [14.4249525, 50.0740561],
      name: "Centrum pro poruchy spánku a bdění Neurologická klinika 1. LF UK a VFN",
      address: "Kateřinská 468/30, 128 21 Praha 2",
      phoneNumber: "+420 224 965 550",
      email: "spanek@vfn.cz",
      web: "https://neurologie.lf1.cuni.cz/1LFNK-182.html",
      logo: "loga/1LFNK.jpg",
    },
    {
      coords: [14.4200572, 50.1791797],
      name: "Institut spánkové medicíny, Národní ústav duševního zdraví Klecany",
      address: "Topolová 748, 250 67 Klecany",
      phoneNumber: "+420 283 088 400, +420 283 088 261",
      email: "spanek@nudz.cz",
      web: "https://www.nudz.cz/lecebna-pece/spankova-medicina/profil/",
      logo: "loga/nudz.png",
    },
    {
      coords: [16.5765797, 49.1743833],
      name: "Neurologická klinika FN Brno - Bohunice",
      address: "Jihlavská 20, 625 00 Brno",
      phoneNumber: "+420 532 232 503",
      email: "fnbrno@fnbrno.cz",
      web: "https://www.fnbrno.cz/neurologicka-klinika/k1471",
      logo: "loga/fn_brno.jpeg",
    },
    {
      coords: [18.1610731, 49.8268006],
      name: "Centrum pro poruchy spánku a bdění FN Ostrava",
      address: "17. listopadu 1790/5, 708 52 Ostrava-Poruba",
      phoneNumber: "+420 597 373 097",
      email: "fno@fno.cz",
      web: "https://www.fno.cz/neurologicka-klinika",
      logo: "loga/fn_ost.gif",
    },
    {
      coords: [14.4694153, 48.9607058],
      name: "Centrum pro poruchy spánku, Nemocnice České Budějovice",
      address: "B. Němcové 585/54 370 01 České Budějovice",
      phoneNumber: "+420 387 878 201",
      email: "nervove@nemcb.cz",
      web: "http://www.nemcb.cz/oddeleni/centrum-pro-poruchy-spanku/",
      logo: "loga/nem_cb.png",
    },
    {
      coords: [15.8269367, 50.2003986],
      name: "Centrum pro poruchy spánku a biorytmů FN Hradec Králové",
      address: "Sokolská 581, 500 05 Hradec Králové",
      phoneNumber: "+420 495 835 260",
      email: "vratislav.sedlak@fnhk.cz",
      web: "https://www.fnhk.cz/cpsb/statut",
      logo: "loga/fn_hk.png",
    },
  ]
}

//basic map
const main = document.querySelector("#mapa");
const map = new SMap(main);
map.addControl(new SMap.Control.Sync());
map.addDefaultLayer(SMap.DEF_BASE).enable();
map.addDefaultControls();   //user can move and zoom the map

//add a layer where we are supposed to draw
let layer = new SMap.Layer.Marker();
map.addLayer(layer);
layer.enable();

const coordsForZoom = [];

for (let i = 0; i < places.specPlaces.length; i += 1) {
  let coords = SMap.Coords.fromWGS84(places.specPlaces[i].coords[0], places.specPlaces[i].coords[1]);
  coordsForZoom.push(coords);
  let marker = new SMap.Marker(coords);
  layer.addMarker(marker);
  let card = new SMap.Card();
  card.getHeader().innerHTML += `<strong>${places.specPlaces[i].name}</strong>`;
  card.getBody().innerHTML += `${places.specPlaces[i].address}<br> Tel: ${places.specPlaces[i].phoneNumber}<br> E-mail: ${places.specPlaces[i].email}<br> <a href="${places.specPlaces[i].web}" target="_blank">Přejdi na web</a>`;
  marker.decorate(SMap.Marker.Feature.Card, card);
}

const cz = map.computeCenterZoom(coordsForZoom); //this method calculates the position of the map so that all the markers are visible at the same time
map.setCenterZoom(cz[0], cz[1]);


//cards
const placeList = document.querySelector('.places');

const renderPlace = (logo, name, address, phone, email, web) => {
  const placeElm = document.createElement("div")
  placeElm.className = "col-sm-12 col-md-6 col-lg-4"
  placeElm.innerHTML = `
    <div class="card">
      <div class="place__logo"><img src="${logo}" alt="logo nemocnice" height="64"/></div>
      <div class="place__name">${name}</div>
      <div class="place__address">${address}</div>
      <div class="place__phone">Tel: ${phone}</div>
      <div class="place__email">E-mail: ${email}</div>
      <div class="place__web"><a href="${web}" target="_blank">Přejdi na web</a></div>
    </div>`
  return placeElm
}

for (let i = 0; i < places.specPlaces.length; i += 1) {
  const placeElm = renderPlace(places.specPlaces[i].logo, places.specPlaces[i].name, places.specPlaces[i].address, places.specPlaces[i].phoneNumber, places.specPlaces[i].email, places.specPlaces[i].web);
  placeList.appendChild(placeElm);
}




