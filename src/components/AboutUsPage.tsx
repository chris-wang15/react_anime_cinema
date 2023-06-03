const AboutUsPage = () => {
    return (
        <div className="w-full h-screen bg-primary flex flex-col text-textColor">
            <div className="text-3xl my-6 font-bold">About Us</div>
            <div className="text-lg indent-4 my-2">
                {'This is an open source video website application that supports video upload and sort.' +
                    ' This app is using react, tailwind css, firebase and type script.' +
                    ' This website is only used for react exercises, and the uploaded videos will not be used' +
                    ' for any commercial purposes.'}
            </div>
            <div className="text-lg indent-4 my-2">
                {'Please see my github link for the source code: '}
                <span>
                    <a
                        className="line-clamp-1 text-blue-500 underline"
                        href="https://github.com/chris-wang15"
                        target="_blank" rel="noopener noreferrer"
                    >
                    https://github.com/chris-wang15
                    </a>
                </span>
            </div>
        </div>
    );
}

export default AboutUsPage