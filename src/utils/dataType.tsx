export type AnimeSeries = {
    id: number,
    title: string,
    imageURL: string,
    description: string,
    category: string,
    time: number,
}

export type AnimeItem = {
    id: number,
    title: string,
    postURL?: string,
    videoURL: string,
}