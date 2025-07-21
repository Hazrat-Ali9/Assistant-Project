import { apiSlice } from "../App/apiSlice";


export const questionSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
  
    getQuestions: builder.query({
      query: () => ({
        url: `/api/v1/question/get-question`,
        method: "GET",
      })
    }),
    createQuestion: builder.mutation({
      query: (data) => ({
        url: "/api/v1/question/create-question",
        method: "POST",
        body: data,
      }),
    })
  }),
});
export const {
    useGetQuestionsQuery,
    useCreateQuestionMutation
} = questionSlice;
