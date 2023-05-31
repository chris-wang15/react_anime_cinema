import {AnimeItem, AnimeSeries} from "./dataType.tsx";

export const mockAnimeSeriesList: AnimeSeries[] = [
    {
        id:1,
        title: "Fate Zero Season 1",
        imageURL: "https://upload.wikimedia.org/wikipedia/en/3/3e/FatezeroNovelCover.jpg",
        description: "Fate/Zero is a Japanese light novel written by Gen Urobuchi, illustrated by Takashi Takeuchi, and is a prequel to all routes in Type-Moon's visual novel, Fate/stay night",
        category: "Fantasy",
        time: 2011,
    },
    {
        id:2,
        title: "Fate Zero Season 2",
        imageURL: "https://m.media-amazon.com/images/M/MV5BZDUwYThlNTQtMmNmMi00ZmIyLTk0Y2YtNWMzNGI0NDM4YmVjXkEyXkFqcGdeQXVyNjM1ODI1MjE@._V1_.jpg",
        description: "Fate/Zero is a Japanese light novel written by Gen Urobuchi, illustrated by Takashi Takeuchi, and is a prequel to all routes in Type-Moon's visual novel, Fate/stay night",
        category: "Fantasy",
        time: 2012,
    },
]

export const mockFateOneAnimeItemList: AnimeItem[] = [
    {
        id: 1,
        title: "episode 1",
        postURL: "",
        videoURL: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
    },
    {
        id: 2,
        title: "episode 2",
        postURL: "https://www.crunchyroll.com/imgsrv/display/thumbnail/1200x675/catalog/crunchyroll/fdc0dff409f19dfd8ffff5037257ac98.jpe",
        videoURL: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
    },
]