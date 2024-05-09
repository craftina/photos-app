import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreatePhoto from "./CreatePhoto.jsx"
import ListPhotos from "./ListPhotos.jsx"
import UpdatePhoto from "./UpdatePhoto.jsx"

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<ListPhotos/>} />
        <Route path="/create" element={<CreatePhoto/>} />
        <Route path="/update/:id" element={<UpdatePhoto/>} />
      </Routes>
    </BrowserRouter>
      {/* <ListPhotos/> */}
      {/* <CreatePhoto/> */}
    </>
  )
}

export default App
