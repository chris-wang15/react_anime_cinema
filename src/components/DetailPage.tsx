import {useParams} from "react-router-dom";
import {getAnimeSeriesById} from "../utils/firebaseFunctions.tsx";
import {useEffect, useState} from "react";
import {AnimeItem, AnimeSeries} from "../utils/dataType.tsx";
import Loader from "./Loader.tsx";
import VideoPlayer from "./VideoPlayer.tsx";
import {motion} from "framer-motion";

const DetailPage = () => {
    // const {updateAnime} = useAnimeUpdateContext();
    const [pageLoadingState, setPageLoadingState]
        = useState<'loading' | 'success' | 'notFound'>('loading')
    const [animeSeries, setAnimeSeries]
        = useState<AnimeSeries | null>(null)
    const [selectedEpisode, setSelectedEpisode]
        = useState<AnimeItem | null>(null)

    const params = useParams()
    const animeSeriesId = params.id ?? ""
    const initSelectedId = parseInt(params.selectId ?? "0")
    if (!animeSeriesId) {
        setPageLoadingState('notFound')
    }

    const fetchData = async () => {
        await getAnimeSeriesById(animeSeriesId).then(data => {
                const fetchedAnimeSeries: AnimeSeries | null = data as AnimeSeries
                if (!fetchedAnimeSeries) {
                    setPageLoadingState('notFound')
                } else {
                    setAnimeSeries(fetchedAnimeSeries)
                    if (initSelectedId < fetchedAnimeSeries.anime.length) {
                        setSelectedEpisode(fetchedAnimeSeries.anime[initSelectedId])
                    } else {
                        setSelectedEpisode(fetchedAnimeSeries.anime[0])
                    }
                    setPageLoadingState('success')
                }
            }
        )
    }

    useEffect(() => {
        fetchData().then(() => console.log('detail page fetchData finished'))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if (pageLoadingState === 'loading') {
        return <PageLoading/>
    } else if (!animeSeries || pageLoadingState === 'notFound') {
        return <NotFoundInfo/>
    }

    return (
        <section className="w-full h-full bg-white flex flex-col items-center rounded-sm">
            <div className="w-[95%] h-auto flex flex-row">
                {/* poster */}
                <img src={animeSeries.imageURL} className="w-[200px] h-[250px] flex object-fill p-2 " alt="poster"/>
                {/*  infos  */}
                <div className="w-full min-w-[200px] h-[250px] flex flex-col p-2 justify-start items-start">
                    <div
                        className="text-xl font-semibold text-textColor my-4">
                        {animeSeries.title}
                    </div>
                    <div
                        className="text-base text-textColor my-2 md:my-1">
                        {`(${animeSeries.time})`}
                    </div>
                    <div
                        className="text-base text-textColor my-2 md:my-1">
                        {animeSeries.category}
                    </div>
                    <div
                        className="text-sm md:text-base text-textColor my-1">
                        {`${animeSeries.anime.length} episodes in total`}
                    </div>
                    <div
                        className="invisible md:visible text-sm text-textColor text-ellipsis overflow-hidden">
                        {animeSeries.description}
                    </div>
                </div>
            </div>
            {/*  description  */}
            <div className="md:hidden w-[95%] bg-white h-auto flex flex-col justify-start items-start">
                <div
                    className="mx-2 text-base md:text-base text-textColor my-1">
                    Description:
                </div>
                <div
                    className="mx-2 text-sm md:text-base text-textColor">
                    {animeSeries.description}
                </div>
            </div>
            {/* separator | divider */}
            <div className="w-[90%] border-b border-gray-300 my-2"/>
            {/* video player */}
            <div className="w-[95%] max-w-3xl aspect-video">
                <VideoPlayer url={selectedEpisode?.videoURL ?? ""}/>
            </div>
            {/* separator */}
            <div className="w-[90%] border-b border-gray-300 my-2"/>
            {/* episode selector */}
            <div className="w-[90%] flex items-start justify-start gap-8 py-6
                overflow-x-scroll">
                {animeSeries.anime.map((animeItem, index) => (
                    <motion.div className={` group ${selectedEpisode?.id == animeItem.id ? 'bg-cartNumBg' : 'bg-card'}
                        w-24 min-w-[94px] h-8 cursor-pointer rounded-lg border border-gray-300
                        drop-shadow-xl flex flex-col gap-3 items-center 
                        justify-center hover:bg-cartNumBg `}
                                key={`episode-select-${index}`}
                                whileTap={{scale: 0.75}}
                                onClick={() => setSelectedEpisode(animeItem)}
                    >
                        <p className={"text-sm group-hover:text-card "
                            + ` ${selectedEpisode?.id == animeItem.id ? 'text-white' : 'text-textColor'} `}>
                            {animeItem.title}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

const NotFoundInfo = () => {
    return (
        <section className="w-full h-screen">
            Article Not Found
        </section>
    );
}

const PageLoading = () => {
    return (
        <section className="w-full h-screen">
            <Loader/>
        </section>
    );
}

export default DetailPage