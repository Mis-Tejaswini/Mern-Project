import Navbar from "./Navbar";
import Create from "./Component/Create";
import Read from "./Component/Read";
import Update from "./Component/Update";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./Component/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
    <Route path='/' element={ <Home/> }/> 
    <Route path='/create' element={ <Create/> }/> 
    <Route path="all" element={ <Read />}  />
    <Route path="/:id" element={ <Update/>}  />
    </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
