import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext.jsx";
import AuthLayout from "../AuthLayout.jsx";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setUser, setToken } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/signup", { name, email, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      const me = await api.get("/auth/me");
      setUser(me.data.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed", error.response?.data || error.message);
    }
  };

  return (
    <AuthLayout>
      <form
        className="surface-bg px-10 py-12 rounded-[2.5rem] flex flex-col gap-5 shadow-2xl border border-white/50 animate-in"
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-2">
          <h1 className="text-3xl font-black text-main tracking-tight">DailyForge.</h1>
          <p className="text-muted text-sm mt-1 font-medium">Start your journey today</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-main/70 ml-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Rishab Jain"
            required
            className="w-full px-4 py-3 text-sm surface-bg border-soft rounded-xl shadow-xs input-focus transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-main/70 ml-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="rishab@gmail.com"
            required
            className="w-full px-4 py-3 text-sm surface-bg border-soft rounded-xl shadow-xs input-focus transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-main/70 ml-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full px-4 py-3 text-sm surface-bg border-soft rounded-xl shadow-xs input-focus transition-all"
          />
        </div>

        <button type="submit" className="btn btn-primary py-4 rounded-xl shadow-lg shadow-primary/20 hover-lift mt-2 font-bold text-lg">
          Get Started
        </button>

        <p className="text-center text-sm text-muted font-medium mt-2">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="text-main font-bold cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Signup;