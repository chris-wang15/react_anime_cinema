import {AnimatePresence} from "framer-motion";
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header.tsx";
import UploadPage from "./components/UploadPage.tsx";
import {useAnimeUpdateContext} from "./context/MainContextHook.tsx";
import {useEffect} from "react";

function App() {
    const {updateAnime} = useAnimeUpdateContext();
    useEffect(() => {
        updateAnime()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <AnimatePresence>
            <div className="w-screen h-auto flex flex-col bg-primary">
                <Header/>

                <main className="mt-20 px-16 py-4 w-full">
                    <Routes>
                        {/* http://localhost:XXXX */}
                        <Route path="/*" element={
                            <div>MainContainer</div>
                        }/>
                        {/* http://localhost:XXXX/menu */}
                        <Route path="/menu" element={
                            <div>Menu Page Sort Videos</div>
                        }/>
                        <Route path="/about_us" element={
                            <div>About Us</div>
                        }/>
                        <Route path="/upload" element={
                            <UploadPage/>
                        }/>
                    </Routes>
                </main>
            </div>
        </AnimatePresence>
    )
}

export default App
