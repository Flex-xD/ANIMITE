import axios from "axios";

const ANILIST_API = "https://graphql.anilist.co";

export const fetchFromAnilist = async (query: string, variables = {}) => {
    try {
        const res = await axios.post(ANILIST_API, { query, variables });
        return res.data;
    } catch (err: any) {
        console.error("AniList API Error:", err.response?.data || err.message);
        throw err;
    }
};
