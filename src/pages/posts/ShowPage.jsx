import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const ShowPage = () => {
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const imagePath = post?.image.replace("img/", "");

    useEffect(() => {
        axios.get(`${apiUrl}/posts/${id}`).then((resp) => {
            setPost(resp.data);
        }).catch((err) => {
            if (err.status === 404) {
              navigate("/not-found");
            }
          })
    }, [id])

    return (
        <>
            {post && (
                <div>
                     <button className="btn btn-primary" onClick={() => navigate("/posts")}>
                        Torna indietro
                    </button>
                    <h1>{post.title}</h1>
                    <img src={`${apiUrl}/${imagePath}`} alt="" className="w-50 mb-2"/>
                    <div>
                    <h4>Tags:</h4>
                        {post.tags && post.tags.length > 0 && (
                            <ul>
                                {post.tags.map((tag, index) => (
                                    <li key={index}>{tag}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="mb-3">
                        <Link className="btn btn-primary" to={`/posts/${post.id - 1}`}>
                            Precedente
                        </Link>
                        <Link className="btn btn-primary" to={`/posts/${post.id + 1}`}>
                            Successiva
                        </Link>
                    </div>
                </div>
            )}
        </>
    )
}