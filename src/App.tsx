import {AnimatePresence} from "framer-motion";
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header.tsx";
import UploadPage from "./components/UploadPage.tsx";
import {useAnimeUpdateContext} from "./context/MainContextHook.tsx";
import {useEffect} from "react";
import DetailPage from "./components/DetailPage.tsx";
import MainContainer from "./components/MainContainer.tsx";
import SortPage from "./components/SortPage.tsx";
import AboutUsPage from "./components/AboutUsPage.tsx";

function App() {
    const {updateAnime} = useAnimeUpdateContext();
    useEffect(() => {
        updateAnime()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <AnimatePresence>
            <div className="w-screen h-auto flex flex-col bg-primary">
                <Header/>

                <main className="h-full mt-20 px-16 py-4 w-full">
                    <Routes>
                        {/* http://localhost:XXXX */}
                        <Route path="/*" element={
                            <MainContainer/>
                        }/>
                        {/* http://localhost:XXXX/menu */}
                        <Route path="/videos" element={
                            <SortPage/>
                        }/>
                        <Route path="/about_us" element={
                            <AboutUsPage/>
                        }/>
                        <Route path="/upload" element={
                            <UploadPage/>
                        }/>
                        {/* http://localhost:XXXX/1685625705106/0 */}
                        <Route path="/detail/:id/:selectId" element={
                            <DetailPage/>
                        }/>
                    </Routes>
                </main>
            </div>
        </AnimatePresence>
    )
}

export default App
