import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext.jsx";
// Import the layout we built
import AuthLayout from "../AuthLayout.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setUser, setToken } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });
      
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);

      const me = await api.get("/auth/me");
      setUser(me.data.user);

      navigate("/dashboard");
    } catch (error) {
      console.log("Login failed");
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <AuthLayout>
      <form
        className="
          surface-bg px-10 py-12 rounded-[2.5rem]
          w-full max-w-md
          flex flex-col gap-6 
          shadow-[0_20px_50px_rgba(78,183,179,0.15)]
          border border-white/50
          animate-in
        "
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-2">
          <h1 className="text-3xl font-black text-main tracking-tight">Welcome Back.</h1>
          <p className="text-muted text-sm mt-1 font-medium">Continue your productivity streak</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-main/70 ml-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@email.com"
            required
            className="
              w-full px-4 py-3
              text-sm
              surface-bg
              border-soft
              rounded-xl
              shadow-xs
              input-focus
              hover-lift
              transition-all
            "
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-main/70 ml-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="
              w-full px-4 py-3
              text-sm
              surface-bg
              border-soft
              rounded-xl
              shadow-xs
              input-focus
              hover-lift
              transition-all
            "
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary py-4 rounded-xl shadow-lg shadow-primary/20 cursor-pointer w-full mt-2 hover-lift font-bold text-lg"
        >
          Sign In
        </button>

        <p className="text-center text-sm text-muted font-medium mt-2">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-main font-bold cursor-pointer hover:underline transition-colors"
          >
            Sign up
          </span>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;