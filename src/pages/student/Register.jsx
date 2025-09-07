import { useState } from "react";
import api from "../../lib/api";
import { Link, useNavigate } from "react-router-dom";
import FaceCapture from "../../components/FaceCapture";

const fields = [
  { id: "firstName", label: "First Name", type: "text", required: true },
  { id: "lastName", label: "Last Name", type: "text", required: true },
  { id: "matric", label: "Matric Number", type: "text", required: true },
  { id: "phone", label: "Phone Number", type: "tel" },
  { id: "email", label: "Email", type: "email" },
  { id: "password", label: "Password", type: "password", required: true },
  { id: "confirmPassword", label: "Confirm Password", type: "password", required: true },
  { id: "faculty", label: "Faculty", type: "text" },
  { id: "department", label: "Department", type: "text" },
  { id: "level", label: "Level", type: "text" },
  { id: "courses", label: "Courses (comma separated)", type: "text" },
];

export default function StudentRegister() {
  const [form, setForm] = useState({});
  const [faceDescriptor, setFaceDescriptor] = useState(null);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const onChange = (id, value) => setForm(prev => ({ ...prev, [id]: value }));

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    if (form.password !== form.confirmPassword) {
      return setErr("Passwords do not match");
    }
    if (!faceDescriptor) {
      return setErr("Please capture your face before registering");
    }

    try {
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        matric: form.matric,
        phone: form.phone || "",
        email: form.email || "",
        password: form.password,
        faculty: form.faculty || "",
        department: form.department || "",
        level: form.level || "",
        courses: (form.courses || "").split(",").map(s=>s.trim()).filter(Boolean),
        faceDescriptor,
      };
      await api.post("/api/auth/student/register", payload);
      alert("Registered successfully. Please login.");
      navigate("/student/login");
    } catch (e) {
      setErr(e?.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen font-poppins bg-white flex">
      <img src="/student2.jpg" className="lg:w-[50%] sm:w-0 w-0 fixed h-[100vh] object-cover"/>
      <form onSubmit={submit} className="max-w-3xl mx-auto bg-slate-800 text-white p-6 lg:ml-[50%] shadow space-y-6">
        <div className="text-xl pb-7 font-bold w-fit ">
          <h2 className="text-xl  font-bold w-auto text-center text-orange-500">Student Registration</h2>
          {/* <div className=" border-b border-orange-500 w-full p-2"></div> */}

        </div>
        

        {err && <p className="text-red-600 text-sm">{err}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map(f => (
            <div key={f.id}>
              <label className="block text-sm mb-1">{f.label}:</label>
              <input
                required={!!f.required}
                type={f.type}
                className="w-full border-b p-2 outline-none"
                autoComplete="off"
                // placeholder={f.label}
                value={form[f.id] || ""}
                onChange={(e)=>onChange(f.id, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="border grid grid-items-center rounded p-4">
          <h3 className="font-semibold mb-2">Face Capture</h3>
          <FaceCapture onDescriptor={setFaceDescriptor} />
          <p className="text-xs text-gray-600 mt-2">
            Descriptor status: {faceDescriptor ? "✅ ready" : "❌ not captured"}
          </p>
        </div>

        <div className="flex gap-5">
          <button className="bg-white text-black px-10 hover:bg-orange-500 hover:text-white py-2 rounded">Register</button>
          <Link to="/student/login" className="px-2 py-2 text-xs ">Back to Login ››</Link>
        </div>
      </form>
    </div>
  );
}
