import { useRef, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { AddResume } from "../../API/ResumeThunk";
import { useReactToPrint } from "react-to-print";

const ResumeBuilder = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        location: "",
        summary: "",
        skills: [],
        experience: "",
        education: "",
    });

    const [errors, setErrors] = useState({});
    const [skillInput, setSkillInput] = useState("");
    const [showResume, setShowResume] = useState(false);

    const resumeRef = useRef();
    const dispatch = useDispatch();

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    // Add Skill
    const addSkill = () => {
        if (!skillInput.trim()) return;
        if (formData.skills.includes(skillInput.trim())) return;

        setFormData({
            ...formData,
            skills: [...formData.skills, skillInput.trim()],
        });
        setSkillInput("");
    };

    // Remove Skill
    const removeSkill = (skill) => {
        setFormData({
            ...formData,
            skills: formData.skills.filter((s) => s !== skill),
        });
    };

    // Validation
    const validate = () => {
        const newErrors = {};

        if (!formData.fullName.trim())
            newErrors.fullName = "Full name is required";

        if (!formData.email.trim())
            newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            newErrors.email = "Enter a valid email";

        if (!formData.phone.trim())
            newErrors.phone = "Phone number is required";
        else if (!/^\+?\d{10,13}$/.test(formData.phone))
            newErrors.phone = "Enter valid phone number";

        if (!formData.summary.trim())
            newErrors.summary = "Professional summary is required";

        if (formData.skills.length === 0)
            newErrors.skills = "Add at least one skill";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Generate Resume
    const handleGenerate = (e) => {
        e.preventDefault();
        if (validate()) {
            setShowResume(true);
            dispatch(AddResume({ id: Date.now(), ...formData })).unwrap().then(() => {
                alert("Resume Generated");
            }).catch((error) => {
                alert(error);
            })
        }
    };

    const handleDownloadPDF = useReactToPrint({
        content: () => resumeRef.current,
        documentTitle: `${formData.fullName}-Resume`,
        onBeforeGetContent: () => {
            if (!resumeRef.current) {
                throw new Error("Resume not ready");
            }
        },
    });

    const downloadPDF = useCallback(() => {
        if (!resumeRef.current) {
            alert("Resume not ready");
            return;
        }

        handleDownloadPDF();
    }, [handleDownloadPDF]);


    return (
        <section className="min-h-screen bg-gray-100 px-4 py-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Build Your Resume
                    </h2>

                    <form className="space-y-4" onSubmit={handleGenerate}>

                        {/* Full Name */}
                        <div>
                            <label className="text-sm font-medium">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full mt-1 border rounded-lg px-4 py-2"
                                placeholder="John Doe"
                            />
                            {errors.fullName && (
                                <p className="text-red-500 text-sm">{errors.fullName}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full mt-1 border rounded-lg px-4 py-2"
                                placeholder="john@email.com"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email}</p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="text-sm font-medium">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full mt-1 border rounded-lg px-4 py-2"
                                placeholder="+91 9876543210"
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm">{errors.phone}</p>
                            )}
                        </div>

                        {/* Location */}
                        <div>
                            <label className="text-sm font-medium">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full mt-1 border rounded-lg px-4 py-2"
                                placeholder="Mohali, India"
                            />
                        </div>

                        {/* Summary */}
                        <div>
                            <label className="text-sm font-medium">Summary</label>
                            <textarea
                                name="summary"
                                value={formData.summary}
                                onChange={handleChange}
                                rows="4"
                                className="w-full mt-1 border rounded-lg px-4 py-2 resize-none"
                            />
                            {errors.summary && (
                                <p className="text-red-500 text-sm">{errors.summary}</p>
                            )}
                        </div>

                        {/* Skills */}
                        <div>
                            <label className="text-sm font-medium">Skills</label>
                            <div className="flex gap-2 mt-1">
                                <input
                                    type="text"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    className="flex-1 border rounded-lg px-4 py-2"
                                    placeholder="React"
                                />
                                <button
                                    type="button"
                                    onClick={addSkill}
                                    className="bg-blue-600 text-white px-4 rounded-lg"
                                >
                                    Add
                                </button>
                            </div>
                            {errors.skills && (
                                <p className="text-red-500 text-sm">{errors.skills}</p>
                            )}

                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.skills.map((skill, i) => (
                                    <span
                                        key={i}
                                        className="bg-gray-200 px-3 py-1 rounded-full text-sm cursor-pointer"
                                        onClick={() => removeSkill(skill)}
                                    >
                                        {skill} ✕
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Experience */}
                        <div>
                            <label className="text-sm font-medium">Experience</label>
                            <textarea
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                                rows="3"
                                className="w-full mt-1 border rounded-lg px-4 py-2 resize-none"
                            />
                        </div>

                        {/* Education */}
                        <div>
                            <label className="text-sm font-medium">Education</label>
                            <textarea
                                name="education"
                                value={formData.education}
                                onChange={handleChange}
                                rows="2"
                                className="w-full mt-1 border rounded-lg px-4 py-2 resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                        >
                            Generate Resume
                        </button>
                    </form>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-6">Resume Preview</h2>

                    <div ref={resumeRef}>
                        {!showResume ? (
                            <p className="text-gray-500 text-center mt-20">
                                Fill the form to preview resume
                            </p>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-3xl font-bold">{formData.fullName}</h3>
                                    <p className="text-sm text-gray-600">
                                        {formData.email} • {formData.phone} • {formData.location}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-semibold">Summary</h4>
                                    <p className="text-sm">{formData.summary}</p>
                                </div>

                                <div>
                                    <h4 className="font-semibold">Skills</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.skills.map((skill, i) => (
                                            <span key={i} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold">Experience</h4>
                                    <p className="text-sm">{formData.experience}</p>
                                </div>

                                <div>
                                    <h4 className="font-semibold">Education</h4>
                                    <p className="text-sm">{formData.education}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    {showResume && (
                        <button
                            type="button"
                            onClick={downloadPDF}
                            className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg font-semibold 
                            hover:bg-green-700"
                        >
                            Download PDF
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ResumeBuilder;
