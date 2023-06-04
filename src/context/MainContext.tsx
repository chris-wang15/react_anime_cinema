import {createContext, ReactElement, useCallback, useReducer} from "react";
import {initState, StateType} from "./StateType.tsx";
import {User} from "./User.tsx";
import {AnimeSeries} from "../utils/dataType.tsx";
import {getAllAnimeSeries} from "../utils/firebaseFunctions.tsx";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {app} from "../firebase.config.tsx";


const enum REDUCER_ACTION_TYPE {
    LOGIN,
    LOGOUT,
    CREATE_USER,
    UPDATE_ANIME,
}

type ReducerAction = {
    type: REDUCER_ACTION_TYPE,
    user: User | null,
    animeSeriesList: AnimeSeries[] | null,
}

const reducer = (state: StateType, action: ReducerAction): StateType => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.LOGIN:
            if (action.user === null) {
                return state
            }
            return {...state, login: true, user: action.user}
        case REDUCER_ACTION_TYPE.CREATE_USER:
            // TODO update local storage
            if (action.user === null) {
                return state
            }
            return {...state, login: true, user: action.user}
        case REDUCER_ACTION_TYPE.LOGOUT:
            return {...state, login: false, user: null}
        case REDUCER_ACTION_TYPE.UPDATE_ANIME:
            return {...state, animeSeriesList: action.animeSeriesList ?? []}
        default:
            throw new Error("unknown action type")
    }
}

const useMainContext = (initState: StateType) => {
    const [state, dispatch] = useReducer(reducer, initState)

    const login = useCallback(async (user: User) => {
        const firebaseAuth = getAuth(app)
        await signInWithEmailAndPassword(
            firebaseAuth,
            user.mail,
            user.password
        ).then(userCredential => {
            console.log('login')
            console.log(userCredential.user.refreshToken)
            user.id = userCredential.user.uid
            user.mail = userCredential.user.email ?? ""
            user.name = userCredential.user.photoURL ?? ""
            dispatch(
                {
                    type: REDUCER_ACTION_TYPE.LOGIN,
                    user: user,
                    animeSeriesList: null,
                }
            )
        })

    }, [])

    const createUser = useCallback(async (user: User) => {
        const firebaseAuth = getAuth(app)
        await createUserWithEmailAndPassword(
            firebaseAuth,
            user.mail,
            user.password
            ).then(userCredential => {
            console.log('createUser')
            console.log(userCredential.user.refreshToken)
            user.id = userCredential.user.uid
            dispatch(
                {
                    type: REDUCER_ACTION_TYPE.LOGIN,
                    user: user,
                    animeSeriesList: null,
                }
            )
        })

    }, [])

    const logout = useCallback(() => dispatch(
        {
            type: REDUCER_ACTION_TYPE.LOGOUT,
            user: null,
            animeSeriesList: null,
        }
    ), [])

    const updateAnime = useCallback(async () => {
        getAllAnimeSeries().then(data => {
            dispatch(
                {
                    type: REDUCER_ACTION_TYPE.UPDATE_ANIME,
                    user: null,
                    animeSeriesList: data as AnimeSeries[],
                }
            )
        })
    }, [])

    return {state, login, logout, createUser, updateAnime}
}

type UseMainContextType = ReturnType<typeof useMainContext>

const initContextState: UseMainContextType = {
    state: initState,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    login: async (_: User) => {
        // login by firebase, see useMainContext for interface impl
    },

    logout: () => {
        // logout, see useMainContext for interface impl
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createUser: async (_: User) => {
        // login by firebase, see useMainContext for interface impl
    },

    updateAnime: async (): Promise<void> => {
        // fetch anime series list from firebase, see useMainContext for interface impl
    },
}

export const MainContext
    = createContext<UseMainContextType>(initContextState)

type ChildrenType = {
    children?: ReactElement | undefined
}

export const MainContextProvider = (
    {
        children, ...initState
    }: ChildrenType & StateType): ReactElement => {
    return (
        <MainContext.Provider value={useMainContext(initState)}>
            {children}
        </MainContext.Provider>
    );
}

