import {ChangeEvent, useState} from "react";
import {AnimeItem, AnimeSeries, AnimeTheme} from "../utils/dataType.tsx";
import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../firebase.config.tsx";
import {saveAnimeSeries} from "../utils/firebaseFunctions.tsx";
import {motion} from "framer-motion";
import {MdClose, MdCloudUpload, MdDelete, MdTitle} from "react-icons/md";
import {LuSubtitles} from "react-icons/lu";
import Loader from "./Loader.tsx";
import {GrAdd} from "react-icons/gr";
import {mockAnimeSeriesList} from "../utils/mockData.tsx";
import {FiMinus, FiPlus} from "react-icons/fi";

const UploadPage = () => {
    const hasLogin = true;
    if (!hasLogin) {
        return <UnLoginDescription/>
    }

    const onUploadSuccess = () => {
        // update Ui here
    }

    return (
        <div className="w-full h-full">
            {/* grid with 2 column */}
            <article
                className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full"
                id="uploading_section">
                {/* upload panel */}
                <div
                    className="py-2 flex-1 flex flex-col items-center justify-center"
                >
                    <UploadPanel/>
                </div>

                {/* uploaded items */}
                <div
                    className="py-2 flex-1 flex flex-col items-center justify-center"
                >
                    <UploadedFiles/>
                </div>
            </article>

        </div>
    );
}


const UploadPanel = () => {
    const [title, setTitle] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [category, setCategory] = useState<AnimeTheme>(AnimeTheme.JUVENILE);
    const [time, setTime] = useState<number>(2020);
    const [imageAsset, setImageAsset] = useState<string | null>(null);
    const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
    const [fields, setFields] = useState(false);
    const [message, setMessage] = useState("");
    const [alertStatus, setAlertStatus] = useState<'danger' | 'success'>('danger');
    const [isLoading, setIsLoading] = useState(false)

    // const [{ foodItems }, dispatch] = useStateValue();
    // const fetchData = async () => {
    //     await getAllFoodItems().then(data => {
    //         dispatch(
    //             {
    //                 type: actionType.SET_FOOD_ITEMS,
    //                 foodItems: data
    //             }
    //         )
    //     })
    // }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onProgressChanged = (_: number) => {
        // onProgressChanged
    }

    const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true)
        const files = e.target.files;
        if (files) {
            const imageFile = files[0];
            const storageReference = ref(storage,
                `images/${Date.now()}-${imageFile.name}`)
            const uploadTask = uploadBytesResumable(storageReference, imageFile);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    onProgressChanged(progress)
                },
                (error) => {
                    console.log(error)
                    setFields(true)
                    setMessage('Error while uploading, please try again')
                    setAlertStatus('danger')
                    setTimeout(() => {
                        setFields(false)
                        setIsLoading(false)
                    }, 4000)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                        setImageAsset(downloadURL)
                        setIsLoading(false)
                        setFields(true)
                        setMessage('Image uploaded successfully')
                        setAlertStatus('success')
                        setTimeout(() => {
                            setFields(false)
                        }, 4000)
                    })
                }
            )
        }
    }

    const saveDetails = () => {
        setIsLoading(true)
        try {
            if (!title || !time || !imageAsset || !category) {
                setFields(true)
                setMessage('Required fields is empty')
                setAlertStatus('danger')
                setTimeout(() => {
                    setFields(false)
                    setIsLoading(false)
                }, 4000)
            } else {
                const data: AnimeSeries = {
                    id: Date.now(),
                    title: title,
                    imageURL: imageAsset,
                    description: description ?? "No description",
                    category: category,
                    time: time,
                    anime: animeList,
                }
                saveAnimeSeries(data).then(() => {
                    setFields(true)
                    setMessage('Data uploaded successfully')
                    setAlertStatus('success')
                    clearData()
                    setIsLoading(false)
                    setTimeout(() => {
                        setFields(false)
                    }, 8000)
                })
            }
        } catch (error) {
            console.log(error)
            setFields(true)
            setMessage('Error while saving details')
            setAlertStatus('danger')
            setTimeout(() => {
                setFields(false)
                setIsLoading(false)
            }, 4000)

            // fetchData().then(() => console.log('fetch data after error'))
        }
    }

    const clearData = () => {
        setTitle(null)
        setDescription(null)
        setCategory(AnimeTheme.JUVENILE)
        setTime(2020)
        setImageAsset(null)
        setAnimeList([])
    }

    const deleteImage = () => {
        if (!imageAsset) {
            return
        }
        setIsLoading(true)
        const deleteRef = ref(storage, imageAsset)
        deleteObject(deleteRef).then(() => {
            setImageAsset(null)
            setIsLoading(false)
            setFields(true)
            setMessage('Image delete successfully')
            setAlertStatus('success')
            setTimeout(() => {
                setFields(false)
                setIsLoading(false)
            }, 4000)
        })
    }

    return (
        <section className="w-full h-full flex items-center justify-center">
            <div
                className="w-[90%] border border-gray-300 rounded-lg p-4 flex flex-col items-center
                justify-center gap-4"
            >
                {/*  alert or success messages  */}
                {fields && <AlertOrSuccessMessage alertStatus={alertStatus} message={message}/>}
                {/*  title input  */}
                <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                    <MdTitle className="text-xl text-gray-700"/>
                    <input
                        type="text"
                        required
                        value={title ?? ""}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Input a title..."
                        className="w-full h-full text-lg bg-transparent font-semibold outline border-none
                         placeholder:text-gray-400 text-textColor"
                    />
                </div>
                {/*  description input  */}
                <div className="w-full h-100 py-2 border-b border-gray-300 flex items-center gap-2">
                    <LuSubtitles className="text-xl text-gray-700"/>
                    <textarea
                        required
                        value={description ?? ""}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Input descriptions"
                        className="w-full h-full text-lg bg-transparent font-light outline border-none
                         placeholder:text-gray-400 text-textColor"
                    />
                </div>
                {/*theme & year*/}
                <div className="w-full flex flex-row items-center gap-3">
                    {/* category select */}
                    <div className="w-full py-2 flex flex-auto items-center gap-2">
                        <select
                            className="outline-none w-full text-base border-gray-200 p-2 rounded-md cursor-pointer"
                            onChange={(e) => setCategory(e.target.value as AnimeTheme)}>
                            <option value="other" className="bg-white">Select Theme</option>
                            {(Object.keys(AnimeTheme) as Array<keyof typeof AnimeTheme>).map(item => (
                                <option
                                    key={item}
                                    className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                                    value={item.valueOf()}
                                >
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/*  year input  */}
                    <div className="w-full py-2 flex flex-auto items-center gap-2">
                        <div className="text-base text-gray-700">Year</div>
                        <input
                            type="number"
                            required
                            value={time ?? ""}
                            onChange={(e) => setTime(+e.target.value)}
                            placeholder="input year & month"
                            className="w-full h-full text-lg bg-transparent font-semibold outline border-none
                         placeholder:text-gray-400 text-textColor"
                        />
                    </div>
                </div>
                {/*  image upload  */}
                <div className="group flex justify-center items-center flex-col border-2
                border-dotted border-gray-300 w-full aspect-video cursor-pointer rounded-lg">
                    {isLoading ? <Loader/> : <>
                        {!imageAsset ? <>
                            <label className="w-full aspect-video flex flex-col items-center
                            justify-center cursor-pointer">
                                <div className="w-full h-full flex flex-col items-center
                                justify-center gap-2">
                                    <MdCloudUpload className="text-gray-500 text-3xl
                                    hover:text-gray-700"/>
                                    <p className="text-gray-500 hover:text-gray-700">Click here to Upload</p>
                                </div>
                                <input
                                    type="file"
                                    name="uploadimage"
                                    accept="image/*"
                                    onChange={uploadImage}
                                    className="w-0 h-0"
                                />
                            </label>
                        </> : <>
                            <div className="relative h-full">
                                <img
                                    className="w-full aspect-video object-cover"
                                    src={imageAsset} alt="uploaded image"/>
                                <button
                                    type="button"
                                    className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500
                                    text-xl cursor-pointer outline-none hover:shadow-md duration-100
                                    transition-all ease-in-out"
                                    onClick={deleteImage}
                                >
                                    <MdDelete className="text-white"></MdDelete>
                                </button>
                            </div>
                        </>}
                    </>}
                </div>
                {/*  episode video link  */}
                <div className="w-full h-auto border border-gray-300 rounded-lg flex flex-col gap-1 p-2">
                    {animeList.map((animeItem, id) =>
                        (
                            <div key={`animeItem-${id}`} className="w-full flex flex-row gap-2 py-2">
                                <div className="w-[30px] text-base text-gray-700">{`E${id + 1}`}</div>
                                <input
                                    type="text"
                                    required
                                    value={animeItem.videoURL ?? ""}
                                    onChange={(e) => {
                                        const list = animeList.concat()
                                        list[id].videoURL = e.target.value
                                        setAnimeList(list)
                                    }}
                                    placeholder="Input video link"
                                    className="w-full h-full text-sm bg-transparent outline border-none
                         placeholder:text-gray-400 text-textColor"
                                />
                                {/* delete current  */}
                                <button type="button" className=" rounded-lg text-lg cursor-pointer"
                                        onClick={() => {
                                            // console.log("delete " + id + " / " + animeList.length)
                                            // const list = animeList.splice(id, 1)
                                            // console.log("list length " + list.length)
                                            // careful splice & slice; chrome will use the wrong one
                                            const list: AnimeItem[] = []
                                            for (let i = 0; i < animeList.length; i++) {
                                                if (i !== id) {
                                                    const item = animeList[i]
                                                    list.push({...item, id: i})
                                                }
                                            }
                                            console.log(`list length ${list.length}`)
                                            setAnimeList(list)
                                        }}
                                >
                                    <MdClose/>
                                </button>
                            </div>
                        )
                    )}
                    {/* add new episode */}
                    <motion.div
                        whileTap={{scale: 0.75}}
                        onClick={() => {
                            const insertItem: AnimeItem = {
                                id: animeList.length,
                                title: `E${animeList.length + 1}`,
                                postURL: null,
                                videoURL: "",
                            }
                            // need a new list, otherwise ui will not update
                            const list = animeList.concat()
                            list.push(insertItem)
                            setAnimeList(list)
                            console.log("animeList.length: " + animeList.length)
                        }}
                        className="w-full flex justify-center items-center border border-dashed border-gray-300
                        cursor-pointer">
                        <GrAdd className="text-xl text-gray-700"/>
                    </motion.div>
                </div>
                {/* save button */}
                <div className="flex items-center w-full">
                    <button type="button" className="ml-0 md:ml-auto w-full md:w-auto text-white font-semibold
                    border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg cursor-pointer"
                            onClick={saveDetails}
                    >Save
                    </button>
                </div>
            </div>
        </section>
    );
}

interface AlertOrSuccessFieldProps {
    alertStatus: 'danger' | 'success',
    message: string,
}

const AlertOrSuccessMessage = ({message, alertStatus}: AlertOrSuccessFieldProps) => {
    return (
        <motion.p
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold
                            ${alertStatus === 'danger'
                ? 'bg-red-400 text-red-800'
                : 'bg-emerald-400 text-emerald-800'}`}>
            {message}</motion.p>
    );
}

const UnLoginDescription = () => {
    return (
        <div className="w-full h-screen">
            Please login before uploading
        </div>
    );
}

const UploadedFiles = () => {
    const files = mockAnimeSeriesList
    return (
        <section className="w-full h-full flex flex-col gap-2 p-2">
            {/* section title */}
            <div className="w-full flex justify-start text-lg">
                Uploaded Files:
            </div>
            {/* animeItem */}
            {files.map(file => (
                <div className="w-full flex flex-col justify-start ml-4 gap-2">
                    <UploadedFileContainer animeSeries={file}/>
                </div>
            ))}
        </section>
    );
}

interface UploadedFileContainerProps {
    animeSeries: AnimeSeries
}

const UploadedFileContainer = ({animeSeries}: UploadedFileContainerProps) => {
    const [expanded, setExpanded] = useState(false)
    return (
        <div className="w-full flex flex-col border border-gray-300 rounded-lg p-2">
            {/*title line*/}
            <div className="w-full flex flex-row justify-between items-center">
                <div className="flex flex-row gap-2">
                    <div className="flex text-lg">
                        {`[${animeSeries.title}]`}
                    </div>
                    <div className="flex text-lg">
                        {animeSeries.time}
                    </div>
                </div>

                <motion.div
                    whileTap={{scale: 0.75}}
                    onClick={() => {
                        setExpanded(!expanded)
                    }}
                    className="flex justify-center items-center border border-dashed border-gray-300
                        cursor-pointer">
                    {expanded ? <FiMinus className="text-xl text-gray-700"/> :
                        <FiPlus className="text-xl text-gray-700"/>}
                </motion.div>
            </div>
            {/* episode info */}
            {expanded && animeSeries.anime && animeSeries.anime.map(animeItem => (
                    <div className="w-full flex flex-col justify-start items-center ml-4">
                        <div className="w-full flex text-sm text-ellipsis overflow-hidden">
                            {`[${animeItem.title}]: ${animeItem.videoURL}`}
                        </div>
                    </div>
                )
            )}

        </div>
    );
}

export default UploadPage