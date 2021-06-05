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

  chooseEndPoint(description) {
    console.log(description);
    this.endPoint = description 
    this.endPointPredictions = [] 
  }

  chooseStartingPoint(description) {
    console.log(description);
    this.startingPoint = description 
    this.startingPointPredictions = []
    const response_gc = forwardGeocoding(this.startingPoint);
    console.log(response_gc);
  }
  let 

  

}

// Khi chon prediction, dat gia tri the input bang description
// xoa predictions
// start & end

