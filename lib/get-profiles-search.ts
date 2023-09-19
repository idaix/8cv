import axios from "axios";

export const getProfilesSearch = async (
  q: string,
  order: string,
  limit: string
) => {
  try {
    const res = await axios.get(
      `api/search?q=${q}&order=${order}&limit=${limit}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
