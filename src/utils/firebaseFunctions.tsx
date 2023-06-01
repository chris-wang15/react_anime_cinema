import {doc, setDoc, getDocs, query, collection, orderBy} from "firebase/firestore"
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