import {URL_FireBase} from "./DataFireBase"

export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: fetchBaseQuery({ baseUrl: URL_FireBase }),
    endpoints: (builder) => ({
      getProductos: builder.query({
        query: () => "/productos.json",
      }),
    }),
  })

export const {  useGetProductosQuery,

} = shopApi
