import {AnimatePresence} from "framer-motion";
import {Route, Routes} from "react-router-dom";

function App() {

  return (
      <AnimatePresence>
          <div className="w-screen h-auto flex flex-col bg-primary">
              <div>Header</div>

              <main className="mt-14 md:mt-20 px-8 md:px-16 py-4 w-full">
                  <Routes>
                      {/* http://localhost:XXXX */}
                      <Route path="/*" element={
                          <div>MainContainer</div>
                      }/>
                      {/* http://localhost:XXXX/createItem */}
                      <Route path="/createItem" element={
                          <div>CreateContainer</div>
                      }/>
                  </Routes>
              </main>
          </div>
      </AnimatePresence>
  )
}

export default App
