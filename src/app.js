import goongjs from "@goongmaps/goong-js";

import { getAutoCompletePlaces } from "./services/places";

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
    this.searchTimeout = 500;

    this.startingPointPredictions = []

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
    clearTimeout(this.searchStartingPointTimeout);

    this.searchStartingPointTimeout = setTimeout(async () => {
      if(!this.startingPoint) return this.startingPointPredictions = []
      const center = this.goongMap.getCenter();

      console.log(center);

      const response = await getAutoCompletePlaces(this.startingPoint, center);

      this.startingPointPredictions = response.data.predictions.map(p => p.description);

      console.log(this.startingPointPredictions);

    }, this.searchTimeout);

    // goi api Places Search by keyword with autocomplete
  }
}
