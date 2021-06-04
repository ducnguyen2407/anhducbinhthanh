import {API_KEY, PLACES_API_URL} from '../constants/index';
import axios from 'axios';

export function getAutoCompletePlaces(startingPoint, center) {
  return axios.get(PLACES_API_URL, {
    params: {
      api_key: API_KEY,
      input: startingPoint,
      latlng: center.lat + ',' + center.lng
    }
  })
}

