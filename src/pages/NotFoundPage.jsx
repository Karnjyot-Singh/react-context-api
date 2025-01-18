import { Link, useNavigate } from "react-router-dom";
function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Errore 404"</h1>
      <h4>Pagina non trovata!</h4>
      <button className="btn btn-primary me-3" onClick={() => { navigate(-1) }}>
        Ritorna indietro
      </button>
      <Link to="/">Home</Link>
    </>
  );
}
export default NotFoundPage;