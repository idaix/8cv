import axios from "axios";
import { BASE_URL } from "./utils";
// export const revalidate = 60;

export const getFeed = async () => {
  const res = await axios.get(`${BASE_URL}/api/feed`);
  return res.data;
  // === === === === ===
  // try {
  //     const res = await axios.get('api/feed')
  //     return res.data
  // } catch (error) {
  //     console.error('ERROR_GET_FEED', error)
  //     toast({
  //         variant: "destructive",
  //         title:"Something went wrong"
  //     })
  // }
};
