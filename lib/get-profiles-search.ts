import { Profile, ProfileViwes } from "@prisma/client";
import axios from "axios";

export const getProfilesSearch = async (
  q?: string,
  order?: string,
  limit?: string
) => {
  try {
    const res = await axios.get(
      `api/search?q=${q ?? ""}&order=${order ?? ""}&limit=${limit ?? ""}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
export const getRecentlyJoindProfilesWithoutCurrentUser = async (
  limit?: string
) => {
  try {
    const res = await axios.get(
      `api/search/recently-joined?limit=${limit ?? ""}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getRecentlyViewed = async (username: string) => {
  try {
    if (!username) return [];

    const res = await axios.get(`api/profile/${username}/recently-viewed`);
    // OMG, I hate this work , but iris what iris
    // the porpuse of this function to return profiles
    // but our fetcher in database returns data like this
    //
    // const profiles = [
    //   { Owner: { id: <id>, name: <name> } },
    //   { Owner: { id: <id>, name: <name> } },
    //   { Owner: { id: <id>, name: <name> } }
    // ];
    //
    // we need to format our list to remove the "Owner" field from each profile object
    //
    // note: must be in the backend, but iris what iris

    if (res.status === 200) {
      const formatedProfiles = res.data.map(
        (profile: ProfileViwes & { Owner: Profile }) => {
          const { Owner } = profile;
          return Owner;
        }
      );

      console.log(formatedProfiles);

      return formatedProfiles;
    }

    return null;
  } catch (error) {
    console.error(error);
  }
};
