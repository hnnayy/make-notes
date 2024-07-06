import { useState } from "react"; // Mengimpor hook useState dari React untuk mengelola state lokal dalam komponen
import api from "../api"; // Mengimpor API yang telah dikonfigurasi untuk melakukan permintaan HTTP
import { useNavigate } from "react-router-dom"; // Mengimpor hook useNavigate dari React Router untuk navigasi
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"; // Mengimpor konstanta untuk menyimpan token di localStorage
import "../styles/Form.css"; // Mengimpor file CSS untuk styling form

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";
    const oppositeMethod = method === "login" ? "register" : "login";
    const oppositeName = method === "login" ? "Register" : "Login";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/home");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    const handleNavigate = () => {
        navigate(`/${oppositeMethod}`);
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            {loading && <div>Loading...</div>}
            <button className="form-button" type="submit">
                {name}
            </button>
            {method === "register" && (
                <div className="register-link">
                    <p>Sudah punya akun?</p>
                    <button type="button" onClick={handleNavigate} className="form-button">
                        Login
                    </button>
                </div>
            )}
            {method === "login" && (
                <div className="register-link">
                    <p>Belum punya akun?</p>
                    <button type="button" onClick={handleNavigate} className="form-button">
                        Register
                    </button>
                </div>
            )}
        </form>
    );
}

export default Form;
