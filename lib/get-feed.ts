// import axios from "axios";
// import { API_URL } from "./utils";
// export const revalidate = 60;

export const getFeed = async () => {
  // const res = await axios.get(`${API_URL}/api/feed`);
  const data = await fetch("/api/feed/")
    .then((res) => res.json())
    .then((data) => data);
  return data;
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
