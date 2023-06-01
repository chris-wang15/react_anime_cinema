import {User} from "./User.tsx";
import {AnimeSeries} from "../utils/dataType.tsx";

export type StateType = {
    login: boolean;
    user: User | null;
    animeSeriesList: AnimeSeries[];
}

// TODO Mock test
export const initState: StateType = {
    login: true,
    user: {
        id: "111",
        name: "root",
        password: "111",
        mail: "root@gmail.com",
    },
    animeSeriesList: [],
}