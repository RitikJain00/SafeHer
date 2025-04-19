const GOOGLE_MAPS_API_KEY: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

console.log("✅ In map Configuration:", GOOGLE_MAPS_API_KEY);

export const mapOption: { googleMapsApiKey: string } = {
  googleMapsApiKey: GOOGLE_MAPS_API_KEY,
};
