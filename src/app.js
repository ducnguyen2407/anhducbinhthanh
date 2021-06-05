import goongjs from "@goongmaps/goong-js";

import { getAutoCompletePlaces, getAutoCompletePlaces1 } from "./services/places";
import {forwardGeocoding} from "./services/geocoding";
const MAP_KEY = "t6aC8QiiqrqPPsPGnyAJLnmYxrxgZ72hlcmlh9nO";

export class Hello {
  constructor() {
    this.navbar = {
      introduction: "Giới thiệu",
      news: "Tin tức",
    };

    this.map = null; // html map

    this.startingPoint = null;
    this.endPoint = null;
    this.startingMarker = null;
    this.endMarker = null;
    this.goongMap = null; // js map
    this.searchStartingPointTimeout = null;
    this.searchEndPointTimeout = null;
    this.searchTimeout = 500;

    this.startingPointPredictions = []
    this.endPointPredictions = []

    goongjs.accessToken = MAP_KEY;
  }

  attached() {
    console.log(this.map);
    this.goongMap = new goongjs.Map({
      container: this.map,
      style: "https://tiles.goong.io/assets/goong_map_web.json", // stylesheet location
      center: [106.7097131, 10.8130516], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }

  search() {
    console.log(this.startingPoint, this.endPoint);
  }

  searchStartingPoint() {
    if(this.startingMarker) this.startingMarker.remove()
    if(!this.startingPoint) return this.startingPointPredictions = [] 
    clearTimeout(this.searchStartingPointTimeout);
    
    this.searchStartingPointTimeout = setTimeout(async () => {
      const center = this.goongMap.getCenter();
      
      console.log(center);
      
      const response = await getAutoCompletePlaces(this.startingPoint, center);
      
      this.startingPointPredictions = response.data.predictions.map(p => p.description);
      
      console.log(this.startingPointPredictions);
      
    }, this.searchTimeout);
    this.searchStartingPoint 
    // goi api Places Search by keyword with autocomplete
  }
  searchEndPoint(){
    if(this.endMarker) this.endMarker.remove()
    if(!this.endPoint) return this.endPointPredictions = []
    clearTimeout(this.searchEndPointTimeout);
    this.searchEndPointTimeout = setTimeout(async () => {
      const center = this.goongMap.getCenter();
      console.log(center);
      const response = await getAutoCompletePlaces1(this.endPoint, center);
      this.endPointPredictions = response.data.predictions.map(p => p.description);
      console.log(this.endPointPredictions);
    }, this.searchTimeout);

  }

  async chooseEndPoint(description) {
    console.log(description);
    this.endPoint = description 
    this.endPointPredictions = []
    const response_endmarker = await forwardGeocoding(this.endPoint);
    const latend = response_endmarker.data.results[0].geometry.location.lat;
    const lngend = response_endmarker.data.results[0].geometry.location.lng;
    console.log(latend, lngend);
    this.endMarker = new goongjs.Marker(
      {
        color: '#E9EB8B'
      }
    )
    .setLngLat([lngend, latend])
    .addTo(this.goongMap)
  }

  async chooseStartingPoint(description) {
    console.log(description);
    this.startingPoint = description 
    this.startingPointPredictions = []
    const response_startmarker = await forwardGeocoding(this.startingPoint);
    const latstart = response_startmarker.data.results[0].geometry.location.lat;
    const lngstart = response_startmarker.data.results[0].geometry.location.lng;
    console.log(latstart, lngstart);

    this.startingMarker = new goongjs.Marker(
      {
        color: '#6BF6F6'
      }
    )
    .setLngLat([lngstart, latstart])
    .addTo(this.goongMap)
  }
  
    
  
  

  

}

// Khi chon prediction, dat gia tri the input bang description
// xoa predictions
// start & end

