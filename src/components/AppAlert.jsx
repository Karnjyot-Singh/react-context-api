import { useAlertContext } from "../contexts/AlertContext"
const AppAlert = () => {
    const {error, setError}= useAlertContext();
    return error && <div className="alert alert-danger">{error}</div>
}
export default AppAlert;