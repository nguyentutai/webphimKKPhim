import { ReactNode, createContext, useReducer } from "react";
import IMovie from "../interfaces/IMovie";

interface IListMovie {
    children: ReactNode;
}

export const ListMovieContext = createContext({} as {
    movies: IMovie[],
    dispatchMovie: any
})

const reducerMovie = (state: any, action: any) => {
    switch (action.type) {
        case "list-movie":
            return action.payload
        case "list-movie-year":
            return state.filter((item: any) => item.year == action.payload)
        default:
            return state;
    }
}

export const ListMovieProvider = (props: IListMovie) => {
    const [movies, dispatchMovie] = useReducer(reducerMovie, [] as IMovie[])
    return (
        <ListMovieContext.Provider value={{
            movies,
            dispatchMovie
        }}>
            {props.children}
        </ListMovieContext.Provider>
    )
}