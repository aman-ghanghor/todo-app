import {Route, Routes, BrowserRouter} from "react-router-dom"

import Home from "./pages/Home";
import Todo from "./pages/Todo";
import Form from "./pages/Form";


function App() {
  return (
     <div className="layout">
       <BrowserRouter>
         <Routes>
           <Route path="/" element={<Home/>} />
           <Route path="/todo" element={<Todo/>} />
           <Route path="/form" element={<Form/>} />
         </Routes>
       </BrowserRouter>
     </div>
  );
}


export default App;

