import axios, { AxiosError } from "axios";
import { GraphQLResponse, GraphQLVariables } from "../routes/types/graphQlTypes.js";
import { ApiError } from "../middlewares/handleError.js";

const ANILIST_API = "https://graphql.anilist.co";

export const fetchFromAnilist = async <T>(query: string, variables: GraphQLVariables = {}): Promise<GraphQLResponse<T>> => {
    try {
        if (!query || typeof query !== "string" || query.trim() === "") {
            throw new ApiError(400, "Invalid or empty GraphQL query");
        }

        const res = await axios.post<GraphQLResponse<T>>(ANILIST_API, { query, variables }, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            timeout: 50000,
        });

        if (res.data.errors && res.data.errors.length > 0) {
            const errorMessage = res.data.errors[0].message || "GraphQL API returned errors";
            const statusCode = res.data.errors[0].status || 400;
            throw new ApiError(statusCode, errorMessage);
        }

        if (!res.data.data) {
            throw new ApiError(404, "No data returned from AniList API");
        }

        return res.data;
    } catch (err) {
        if (err instanceof AxiosError) {
            const statusCode = err.response?.status || 500;
            const message = err.response?.data?.errors?.[0]?.message || err.message || "Failed to fetch from AniList API";
            throw new ApiError(statusCode, message);
        } else if (err instanceof ApiError) {
            throw err;
        } else {
            throw new ApiError(500, "Internal server error while fetching from AniList");
        }
    }
};