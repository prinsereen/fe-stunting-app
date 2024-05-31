import { Login } from "./components/Login.jsx"
import { Register } from "./components/Register"
import { SearchPasien } from "./components/SearchPasien"
import { AddPasien } from "./components/AddPasien.jsx"
import { UpdatePasien } from "./components/UpdatePasien.jsx"
import { HealthResultTable} from "./components/Result.jsx"
import { KPSP } from "./components/KPSP.jsx"
import { Route } from "react-router-dom"
import { Routes } from "react-router-dom"

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/search" element={<SearchPasien/>}/>
      <Route path="/kpsp/:id" element={<KPSP/>}/>
      <Route path="/result/:id" element={<HealthResultTable/>}/>
      <Route path="/pasien/add" element={<AddPasien/>}/>
      <Route path="/update/:id" element={<UpdatePasien/>}/>
    </Routes>

    </>
  )
}

export default App
