import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./Pages/Form/Form";
import ShowData from "./Pages/ShowData/ShowData";
import UpdateForm from "./Pages/UpdateForm";
import Header from "./Pages/Header/Header";

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/ShowData" element={<ShowData />} />
          <Route path="/UpdateForm/:position" element={<UpdateForm />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
