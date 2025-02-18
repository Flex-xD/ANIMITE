export const HOST = "http://localhost:5000";

const AUTH_ROUTES="/api/auth"
export const REGISTER_ROUTES=`${HOST}${AUTH_ROUTES}/register`
export const LOGIN_ROUTES=`${HOST}${AUTH_ROUTES}/login`
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update-profile`
export const ADD_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/add-profile-image`
export const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/remove-profile-image`
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`
