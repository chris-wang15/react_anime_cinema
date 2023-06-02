import ReactPlayer from "react-player";

interface VideoPlayerProps {
    url:string
}
const VideoPlayer = ({url}: VideoPlayerProps) => {

    return (
        <>
            <ReactPlayer
                width="100%"
                height="100%"
                url={url}
                controls={true}
                muted={false}
                // support YouTube videos, disable download
                config={{
                    youtube: {
                        playerVars: { showinfo: 1 }
                    },
                    file: {
                        attributes: { controlsList: 'nodownload' }
                    }
                }}
            />
        </>
    );
}

export default VideoPlayer