import {useAnimeUpdateContext} from "../context/MainContextHook.tsx";
import {AnimeSeries} from "../utils/dataType.tsx";
import {Link} from "react-router-dom";
import AnimeWall from "./AnimeWall.tsx";

const MainContainer = () => {
    const {animeSeriesList} = useAnimeUpdateContext()

    return (
        <article
            className="w-full flex flex-col md:flex-row bg-primary p-2 md:justify-between gap-2"
            id="main_container"
        >
            {/* animation wall */}
            <div className="w-full bg-white rounded-lg p-2 flex flex-col justify-center">
                <div className="text-lg font-bold text-textColor justify-self-center">Now Showing</div>
                {/* separator */}
                <div className="w-full border-b border-gray-300 my-2 justify-self-center"/>
                <AnimeWall
                    animeSeriesList={animeSeriesList}
                    largeColumn={4}
                    keyWord="main_page_series"/>
            </div>
            {/* recent update items */}
            <RecentUpdateContainer/>
        </article>
    );
}

const RecentUpdateContainer = () => {
    const {animeSeriesList} = useAnimeUpdateContext()
    const recentList = animeSeriesList.concat()
    const list = recentList.sort(function (a, b) {
        if (a.time == b.time) {
            return parseInt(b.id) - parseInt(a.id)
        }
        return b.time - a.time
    }).slice(0, 2)
    return (
        <div className="w-full md:w-[460px] bg-white flex flex-col p-2 rounded-lg">
            <div className="text-lg font-bold text-textColor justify-self-center">Recent Update</div>
            <div className="w-full border-b border-gray-300 my-2 justify-self-center"/>
            <div className="w-full flex flex-col justify-between">
                {list.map((animeSeries, index) => (
                    <div key={`recent_update_${index}_${animeSeries.id}`}>
                        <RecentUpdateItem animeSeries={animeSeries}/>
                    </div>
                ))}

            </div>
        </div>
    );
}

interface RecentUpdateItemProps {
    animeSeries: AnimeSeries,
}

const RecentUpdateItem = ({animeSeries}: RecentUpdateItemProps) => {
    return (
        <Link
            to={`./detail/${animeSeries.id}/${animeSeries.anime.length - 1}`}
            className="w-full justify-start flex flex-row p-2"
        >
            <img src={animeSeries.imageURL}
                 className="flex w-[80px] aspect-[0.7] object-fill  "
                 alt="rencent_update_poster">
            </img>
            <div className="w-full ml-2 py-4 flex flex-col justify-between items-start">
                <div className="text-sm text-textColor font-semibold">
                    {animeSeries.title}
                </div>
                <div className="text-sm text-textColor">
                    {animeSeries.time}
                </div>
                <div className="text-sm text-textColor">
                    {`update to episode ${animeSeries.anime.length}`}
                </div>
            </div>
        </Link>
    );
}

export default MainContainer