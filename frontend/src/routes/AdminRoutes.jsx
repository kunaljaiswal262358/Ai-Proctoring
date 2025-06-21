import React from 'react'
import { Route, Routes } from 'react-router-dom'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path='/exams' element={<div>Exams</div>}/>
      <Route path='/create-exam' element={<div>Create Exam</div>}/>
      <Route path='/questions' element={<div>Questions</div>}/>
    </Routes>
  )
}

export default AdminRoutes
