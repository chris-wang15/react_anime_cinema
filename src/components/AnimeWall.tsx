import {Link} from "react-router-dom";
import {AnimeSeries} from "../utils/dataType.tsx";

interface AnimeWallProps {
    animeSeriesList: AnimeSeries[],
    largeColumn: number,
    keyWord:string,
}

const AnimeWall = ({animeSeriesList, largeColumn, keyWord}: AnimeWallProps) => {
    return (
        <div
            className={`grid grid-cols-3 gap-2 w-full lg:grid-cols-${largeColumn}`}
        >
            {animeSeriesList.length > 0 && animeSeriesList.map((animeSeries, index) => (
                <Link
                    to={`/detail/${animeSeries.id}/0`}
                    key={`${keyWord}_${index}_${animeSeries.id}`}
                    className="w-auto h-auto flex flex-col justify-between items-center cursor-pointer">
                    {/* poster */}
                    <div className="relative justify-center items-end">
                        <img src={animeSeries.imageURL}
                             className="flex w-[200px] aspect-[0.7] object-fill  "
                             alt="main_page_poster">
                        </img>
                        <div className="w-10 flex text-white text-sm bg-cardOverlay
                                rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-1 font-semibold justify-center">
                            {`E${animeSeries.anime.length}`}
                        </div>
                    </div>
                    {/* wall item title */}
                    <div
                        className="max-h-10 text-sm font-semibold text-textColor text-ellipsis overflow-hidden">
                        {animeSeries.title}
                    </div>
                    <div className="text-sm text-textColor">
                        {animeSeries.time}
                    </div>
                </Link>
            ))}

        </div>
    );
}

export default AnimeWall