import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

import { logOut, setCredentials } from "../States/authSlice";
const URL = "https://question-maker-server.vercel.app/";

const baseQuery = fetchBaseQuery({
  baseUrl: URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefresh = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    // send refresh token to get new access token
    const refreshToken = api.getState().auth.refreshToken;
    const data = { refreshToken: refreshToken };
    const refreshResult = await axios.post(`${URL}/`, data);
    if (refreshResult?.data) {
      // need refresh url to valid req.
      api.dispatch(setCredentials());
      const accessToken = refreshResult.data.accessToken;
      console.log(accessToken);
      const refreshToken = refreshResult.data.refreshToken;
      console.log(refreshToken);
      // const auth = refreshResult.data.user;
      // api.dispatch(setCredentials({ accessToken, refreshToken, auth }));
      // localStorage.setItem("userCredential", data.accessToken);
      // localStorage.setItem("refreshUserCredential", data.refreshToken);
      // localStorage.setItem("userData", data.user);

      console.log("with refresh");
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithRefresh,
  tagTypes: [ ],
  endpoints: () => ({}),
});
