import axios from 'axios';

const KEY = 'KEY GOOGLE MAPS PLATFORM API';

export default function useLocalization() {
  return {
    async getLocalizationGeocode(adress) {
      return await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${adress}Ceará&key=${KEY}`,
      );
    },
  };
}
