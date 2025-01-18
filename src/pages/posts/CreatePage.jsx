import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;
const CreatePage = () => {
    const initialDataForm = {
        title: "",
        content: "",
        image: "",
        tags: []
    };
    const [posts, setPosts] = useState([]);
    const [formData, setFormData] = useState(initialDataForm);
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getTags();
    },[]);
    const getTags = () =>{
      axios.get(`${apiUrl}/tags`).then((resp) =>{
        setTags(resp.data.tags);
      })
    }
    const handlePostForm = (event) => {
        event.preventDefault();
        axios.post(`${apiUrl}/posts`, formData)
            .then((resp) => {
                const newPost = resp.data; 
                setPosts((posts) => [...posts ?? [], newPost]);
                setFormData(initialDataForm);
                navigate(`/posts/${newPost.id}`);
            })
    };
    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === "checkbox") {
            setFormData((prevData) => {
                const updatedTags = checked
                    ? [...prevData.tags, value] 
                    : prevData.tags.filter((tag) => tag !== value); 
                return {
                    ...prevData,
                    tags: updatedTags,
                };
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };
    return (
        <section>
            <h3>Inserisci un nuovo post</h3>
            <form onSubmit={handlePostForm}>
                <div className="mb-3">
                    <label htmlFor="postTitle">Titolo del Post</label>
                    <input
                        type="text"
                        className="form-control"
                        id="postTitle"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="postContent">Contenuto del Post</label>
                    <textarea
                        type="text"
                        className="form-control"
                        id="postContent"
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="postImage"> URL Immagine del Post</label>
                    <input
                        type="text"
                        className="form-control"
                        id="postImage"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label>Seleziona i tags per il post:</label>
                    <div>
                        {tags.map((curTag, index) => (
                            <div key={index}>
                                <input
                                    type="checkbox"
                                    id={`tag-${curTag}`}
                                    name="tags"
                                    value={curTag}
                                    checked={formData.tags.includes(curTag)}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor={`tag-${curTag}`}>{curTag}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Aggiungi</button>
            </form>
        </section>
    )
}
export default CreatePage;