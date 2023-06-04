import {User} from "./User.tsx";
import {AnimeSeries} from "../utils/dataType.tsx";

export type StateType = {
    login: boolean;
    user: User | null;
    animeSeriesList: AnimeSeries[];
}

export const initState: StateType = {
    login: false,
    user: null,
    animeSeriesList: [],
}