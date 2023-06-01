import {AnimeSeries} from "../utils/dataType.tsx";
import {useContext} from "react";
import {MainContext} from "./MainContext.tsx";
import {User} from "./User.tsx";

type UseMainContextUpdateAnimeHookType = {
    animeSeriesList: AnimeSeries[],
    updateAnime: () => void,
}

export const useAnimeUpdateContext = (): UseMainContextUpdateAnimeHookType => {
    const {state: {animeSeriesList}, updateAnime} = useContext(MainContext)
    return {animeSeriesList, updateAnime}
}

type UseMainContextHookType = {
    user: User | null,
    login: (user: User) => void,
    logout: () => void,
}

export const useLoginContext = (): UseMainContextHookType => {
    const {state: {user}, login, logout} = useContext(MainContext)
    return {user, login, logout}
}