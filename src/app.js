import goongjs from "@goongmaps/goong-js";

import { getAutoCompletePlaces } from './services/places';

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

    goongjs.accessToken = MAP_KEY;
  }

  attached() {
    console.log(this.map)
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
    console.log(this.startingPoint);

    const center = this.goongMap.getCenter();

    console.log(center);
    
    getAutoCompletePlaces(this.startingPoint, center)
    // goi api Places Search by keyword with autocomplete
  }
}
