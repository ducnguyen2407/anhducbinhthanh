import {API_KEY} from '../constants/index';
import {FORWARD_GEOCODING_API_URL} from '../constants/index';
import axios from 'axios';
// viet foward geocoding (co ten dia diem => geo latlng)

// => lat lng, dung map ve marker

export function forwardGeocoding(address) {
  return axios.get(FORWARD_GEOCODING_API_URL, {
    params: {
      api_key: API_KEY
    }
  })
}