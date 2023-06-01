export type AnimeSeries = {
    id: number,
    title: string,
    imageURL: string,
    description: string,
    category: AnimeTheme,
    time: number,
    anime: AnimeItem[],
}

export type AnimeItem = {
    id: number,
    title: string,
    postURL: string | null,
    videoURL: string,
}

export enum AnimeTheme {
    JUVENILE = "JUVENILE",
    FIGHTING = "FIGHTING",
    FANTASY = "FANTASY",
    ANCIENT = "ANCIENT",
}

export type CallbackType = {
    updateCallback: () => void
}