// Interface for GraphQL response structure
export interface GraphQLResponse<T> {
    data?: T;
    errors?: Array<{ message: string; status?: number }>;
}

// Interface for GraphQL variables
export interface GraphQLVariables {
    [key: string]: unknown;
}