import {doc, setDoc, getDocs,getDoc, query, collection, orderBy} from "firebase/firestore"
import {firestore} from "../firebase.config.tsx";
import {AnimeSeries} from "./dataType.tsx";

// Save new item
export const saveAnimeSeries = async (data: AnimeSeries) => {
    await setDoc(
        doc(firestore,
            'anime_series',
            `${Date.now()}`,
        ),
        data,
        {merge: true}
    );
}

export const getAllAnimeSeries = async () => {
    const items = await getDocs(
        query(
            collection(firestore, "anime_series"),
            orderBy("id", "desc")
        )
    )

    return items.docs.map((doc) => doc.data())
}

export const getAnimeSeriesById = async (id: string) => {
    const item = await getDoc(
        doc(firestore,
            'anime_series',
            id,
        )
    )
    if (item.exists()) {
        const data = item.data()
        console.log(`get item: ${data}`)
        return data ?? null
    } else {
        console.log(`no item found`)
        return null
    }
}