import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      keepUnusedDataFor: 5, //default cache is 60 seconds
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;
