import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ViewStudents } from "./pages/ViewStudents";
import { AddStudent } from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<ViewStudents />} />
          <Route path="/add-students" element={<AddStudent />} />
          <Route path="/view-students" element={<ViewStudents />} />
          <Route path="/edit-student/:id" element={<EditStudent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
