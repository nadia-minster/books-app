import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Layout from "./layouts/Layout"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"
import AddBook from "./pages/AddBook"
import { useAppContext } from "./context/AppContext"
import MyBooks from "./pages/MyBooks"
import EditBook from "./pages/EditBook"
import Search from "./pages/Search"

function App() {
  const { isLoggedIn } = useAppContext()
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><p>Home Page</p></Layout>} />
        <Route path="/search" element={<Layout><Search /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/sign-in" element={<Layout><SignIn /></Layout>} />
        {isLoggedIn && (<>
          <Route path="/add-book" element={<Layout><AddBook /></Layout>} />
          <Route path="/edit-book/:bookId" element={<Layout><EditBook /></Layout>} />
          <Route path="/my-books" element={<Layout><MyBooks /></Layout>} />
        </>)}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
