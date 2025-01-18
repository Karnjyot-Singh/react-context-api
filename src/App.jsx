import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from "./components/AppLayout"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import PostsPage from "./pages/posts/PostPage"
import ShowPage from "./pages/posts/ShowPage"
import CreatePage from "./pages/post/CreatePage"
import NotFoundPage from "./pages/NotFoundPage"
import { useEffect, useState } from "react"
import axios from "axios"
import GlobalContext from "./context/GlobalContext"
import { AlertProvider } from "./context/AlertContext"

const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  const [posts, setPosts] = useState([]);
  const [filterTags, setFilterTags] = useState("all");
  useEffect(() => {
    getPosts();
  }, [filterTags]);
  const getPosts = () => {
    let url = `${apiUrl}/posts`;
    if (filterTags !== "all") {
      url += `?tags=${filterTags}`;
    }
    axios.get(url).then((resp) => {
      console.log(resp.data);
      setPosts(resp.data);
    })
  };
  const globalProvideValue = {
    posts,
    filterTags
  }

  

  return (
    <>
      <GlobalContext.Provider value={globalProvideValue}>
      <AlertProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/posts">
                <Route index element={<PostsPage />} />
                <Route path="create" element={<CreatePage />} />
                <Route path=":id" element={<ShowPage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AlertProvider>
    </GlobalContext.Provider>
    </>
  )
}

export default App
