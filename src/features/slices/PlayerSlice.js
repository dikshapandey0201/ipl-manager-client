import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const playerApi = createApi({
    reducerPath: 'playerApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://ipl-manager-server.onrender.com/api/player'}),
    tagTypes: ['Player'],
    endpoints: (builder) => ({
        getAllPlayers: builder.query({
            query: () => '/get-all-players',
            providesTags: ['Player']
        }),
        getPlayerByName: builder.query({
            query: (playername) => `/get-player-by-name/${playername}`,
            providesTags: ['Player']
        }),
        getPlayerById: builder.query({
            query: (id) => `/get-player/${id}`,
            providesTags: ['Player']
        }),
        createPlayer: builder.mutation({
            query: (player) => ({
                url: '/add-player',
                method: 'POST',
                body: player,
            }),
            invalidatesTags: ['Player'],
        }),
        updatePlayer: builder.mutation({
            query: ({ id, player }) => ({
                url: `/update-player/${id}`,
                method: 'PUT',
                body: player,
            }),
            invalidatesTags: ['Player'],
        }),
        deletePlayer: builder.mutation({
            query: (id) => ({
                url: `/delete-player/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Player'],
        }),

    }),
});

export const {
    useGetAllPlayersQuery,
    useGetPlayerByNameQuery,
    useGetPlayerByIdQuery,
    useCreatePlayerMutation,
    useUpdatePlayerMutation,
    useDeletePlayerMutation,
} = playerApi;