import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const teamApi = createApi({
    reducerPath: 'teamApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000/api/team'}),
    tagTypes: ['Team'],
    endpoints: (builder) => ({
        getAllTeams: builder.query({
            query: () => '/get-teams',
            providesTags: ['Team']
        }),
        getTeamByName: builder.query({
            query: (teamname) => `/get-team-by-name/${teamname}`,
            providesTags: ['Team']
        }),
        getTeamById: builder.query({
            query: (id) => `get-team/${id}`,
            providesTags: ['Team']

        }),
        createTeam: builder.mutation({
            query: (team) => ({
                url: '/add-team',
                method: 'POST',
                body: team,
            }),
            invalidatesTags: ['Team'],
        }),
        updateTeam: builder.mutation({
            query: ({ id, team }) => ({
                url: `/update-team/${id}`,
                method: 'PUT',
                body: team,
            }),
            invalidatesTags: ['Team'],
        }),
        deleteTeam: builder.mutation({
            query: (id) => ({
                url: `/delete-team/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Team'],
        }),
        addPlayerToTeam: builder.mutation({
            query: ({ teamId, playerId }) => ({
                url: '/add-player',
                method: 'PUT',
                body: { teamId, playerId },
            }),
            invalidatesTags: ['Team'],
        }),
        removePlayerFromTeam: builder.mutation({
            query: ({ teamId, playerId }) => ({
                url: '/remove-player',
                method: 'PUT',
                body: { teamId, playerId },
            }),
            invalidatesTags: ['Team'],
        }),
    }),
});

export const {
    useGetAllTeamsQuery,
    useGetTeamByNameQuery,
    useGetTeamByIdQuery,
    useCreateTeamMutation,
    useUpdateTeamMutation,
    useDeleteTeamMutation,
    useAddPlayerToTeamMutation,
    useRemovePlayerFromTeamMutation,
} = teamApi;