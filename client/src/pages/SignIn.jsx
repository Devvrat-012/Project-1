import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { useState } from "react";
import axios from "axios";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = async (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("/signIn", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.data;
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center">
        <div className="flex justify-center  p-10">
          <span className="text-2xl p-1 px-2 font-semibold">Sign IN</span>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex items-center flex-col gap-8 border rounded-lg mx-2 p-5 md:mx-32 lg:mx-96 bg-slate-200"
        >
          <img className="h-16 w-16" src="/images/logo.png" alt="logo" />
          <input
            id="email"
            type="email"
            required
            placeholder="Email"
            className="py-2 px-5 border rounded-lg"
            onChange={handleChange}
          />
          <input
            id="password"
            type="password"
            required
            placeholder="Password"
            className="py-2 px-5 border rounded-lg"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-slate-500 p-2 text-white rounded-lg hover:bg-slate-400"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <div className="flex justify-center p-5 gap-3">
          <p>Don't have an account?</p>
          <Link to="/signUp" className="text-blue-700">
            Sign Up
          </Link>
        </div>
      </div>
      {error && <p className="text-red-700 pt-5">{error}</p>}
    </div>
  );
}
