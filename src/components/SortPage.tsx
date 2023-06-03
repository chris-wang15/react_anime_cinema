import AnimeWall from "./AnimeWall.tsx";
import {useAnimeUpdateContext} from "../context/MainContextHook.tsx";
import {useEffect, useState} from "react";
import {AnimeSeries, AnimeTheme} from "../utils/dataType.tsx";
import {motion} from "framer-motion";

const SortPage = () => {
    const {animeSeriesList} = useAnimeUpdateContext()
    const [selectedTime, setSelectedTime]
        = useState<string>('All')
    const [selectedTheme, setSelectedTheme]
        = useState<AnimeTheme | 'All'>('All')
    const [sortedList, setSortedList]
        = useState<AnimeSeries[]>(
        []
    )

    useEffect(() => {
        const list = animeSeriesList.filter(function (item) {
            if (selectedTheme !== 'All' && selectedTheme !== item.category) {
                return false;
            }
            switch (selectedTime) {
                case "All":
                    return true;
                case "2011~2014":
                    return item.time >= 2011 && item.time <= 2014
                case "2015~2023":
                    return item.time >= 2015
                case "~2010":
                    return item.time <= 2010
                default:
                    return false
            }
        })
        setSortedList(list)
    }, [animeSeriesList, selectedTheme, selectedTime]);
    // eslint-disable-line react-hooks/exhaustive-deps

    const selectableThemeList: Array<AnimeTheme | 'All'>
        = ['All', AnimeTheme.JUVENILE, AnimeTheme.FANTASY, AnimeTheme.ANCIENT, AnimeTheme.FIGHTING]
    const selectableTimeList = ["All", "~2010", "2011~2014", "2015~2023"]

    return (
        <div className="min-h-screen">
            <div className="w-full  bg-white rounded-lg p-2 flex flex-col justify-center">
                <div className="text-3xl font-bold text-textColor justify-self-center">Anime</div>
                {/* separator */}
                <div className="w-full border-b border-gray-300 my-2 justify-self-center"/>
                {/*Theme selector*/}
                <div className="w-full flex flex-row items-center">
                    <div className="w-[80px] flex text-base text-textColor">Theme</div>
                    <div className="w-[90%] flex items-start justify-start gap-2 py-3 overflow-x-scroll">
                        {selectableThemeList.map((animeItem, index) => (
                            <motion.div className={` group ${selectedTheme == animeItem ? 'bg-cartNumBg' : 'bg-card'} 
                            w-24 min-w-[94px] h-8 cursor-pointer rounded-lg drop-shadow-xl flex flex-col items-center 
                            justify-center hover:bg-cartNumBg `}
                                        key={`theme-select-${index}`}
                                        whileTap={{scale: 0.75}}
                                        onClick={() => setSelectedTheme(animeItem)}
                            >
                                <p className={"text-sm group-hover:text-card "
                                    + ` ${selectedTheme == animeItem ? 'text-white' : 'text-textColor'} `}>
                                    {animeItem}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
                {/* Time Selector */}
                <div className="w-full flex flex-row items-center">
                    <div className="w-[80px] flex text-base text-textColor">Time</div>
                    <div className="w-[90%] flex items-start justify-start gap-2 py-3 overflow-x-scroll">
                        {selectableTimeList.map((animeTime, index) => (
                            <motion.div className={` group ${selectedTime == animeTime ? 'bg-cartNumBg' : 'bg-card'} 
                            w-24 min-w-[94px] h-8 cursor-pointer rounded-lg drop-shadow-xl flex flex-col items-center 
                            justify-center hover:bg-cartNumBg `}
                                        key={`theme-select-${index}`}
                                        whileTap={{scale: 0.75}}
                                        onClick={() => setSelectedTime(animeTime)}
                            >
                                <p className={"text-sm group-hover:text-card "
                                    + ` ${selectedTime == animeTime ? 'text-white' : 'text-textColor'} `}>
                                    {animeTime}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="w-full border-b border-gray-300 my-2 justify-self-center"/>
                <AnimeWall
                    animeSeriesList={sortedList}
                    largeColumn={5}
                    keyWord="main_page_series"/>
            </div>
        </div>
    );
}

export default SortPage