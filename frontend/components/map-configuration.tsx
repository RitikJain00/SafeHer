// const GOOGLE_MAPS_API_KEY: string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;
const GOOGLE_MAPS_API_KEY : string = process.env.GOOGLE_MAPS_API_KEY as string;

console.log(GOOGLE_MAPS_API_KEY);

export const mapOption: { googleMapsApiKey: string } = {
  googleMapsApiKey: GOOGLE_MAPS_API_KEY,
};
