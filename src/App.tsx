import {AnimatePresence} from "framer-motion";
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header.tsx";

function App() {

  return (
      <AnimatePresence>
          <div className="w-screen h-auto flex flex-col bg-primary">
              <Header />

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
                          <div>Upload videos</div>
                      }/>
                  </Routes>
              </main>
          </div>
      </AnimatePresence>
  )
}

export default App
