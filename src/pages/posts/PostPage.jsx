import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import AppCard from "../../components/AppCard";
import { Link } from "react-router-dom";


const PostPage = () => {
  const initialDataForm = {
    title: "",
    content: "",
    image: "",
    tags: []
  };

  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
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

  const cancella = (idDaCancellare) => {
    axios.delete(`${apiUrl}/posts/${idDaCancellare}`).then((resp) => {
      const newArray = posts.filter(curPost => curPost.id !== idDaCancellare)
      setPosts(newArray)
    })
  };
  return (
    <>
      <div className="container">
        <section className="d-flex justify-content-between align-items-center">
          <div>
            <select name="tags" id="" value={filterTags} onChange={(event) => setFilterTags(event.target.value)}>
              <option value="all">Tutti i post</option>
              {tags.map((curTag, index) => <option key={index} value={curTag}> {curTag}</option>)}
            </select>
          </div>
          <Link className="btn btn-primary" to="/posts/create">
            Aggiungi un nuovo post
          </Link>
        </section>
        <section>

          <h1>I miei Post</h1>
          {/* Card post */}
          {(posts && posts.length > 0) ? (
            <div className="row row-cols-2 row-cols-lg-3">
              {posts.map((curPost) => (
                <div className="col" key={curPost.id}>
                  <AppCard
                    post={curPost}
                    onCancel={() => (cancella(curPost.id))}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>Nessun Post inserito</p>
          )}
        </section>
      </div>
    </>
  )
}

export default PostPage;