export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export function setAuthedUser(uid) {
  return {
    type: SET_AUTHED_USER,
    uid,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}
