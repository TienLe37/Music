import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./Style/App.css";
import Login from "./pages/Login";
import MusicPage from "./pages/MusicPage";
import Register from "./pages/Register";
import Upload from "./pages/Upload";
import Layout from "./Layout";
import Library from "./pages/Library";
import SongPage from "./pages/SongPage";
import SearchPage from "./pages/SearchPage";
import Profile from "./pages/Profile";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate('/dashboard');
    }
  }, []);
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/dashboard" element={<MusicPage />} />
          <Route exact path="/upload" element={<Upload />} />
          <Route exact path="/library" element={<Library />} />
          <Route exact path="/Song/:song_id" element={<SongPage />} />
          <Route exact path="/Search/search" element={<SearchPage />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
