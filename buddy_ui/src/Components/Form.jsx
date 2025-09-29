import { useState } from "react";
import Cookies from "js-cookie";
import Conversationbox from "./Conversationbox";

function Form({ Messages, setMessages }) {
    const [loading, setloading] = useState(false);
    const [formsubmited, setformsubmited] = useState(false)

    const [form, setForm] = useState({
        fullname: "",
        email: "",
        country_code: "+91",
        phone: "",
        interest: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    let userid = Cookies.get("userid")

    const sendform = async (e) => {
        console.log(form)
        e.preventDefault();
        setloading(true);

        try {
            console.log("Form submitted:", form);

            const response = await fetch(`${import.meta.env.VITE_API_URI}/save_user_data`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const result = await response.json();

            if (response.ok && result.userId) {
                Cookies.set("userid", result.userId, { expires: 7, path: "/" });
                setMessages((prev) => [
                    ...prev,
                    { role: "user", content: "I’ve provided my info" }
                ]);
                setMessages((prev) => [
                    ...prev,
                    { role: "bot", content: result.message }
                ]);
                setformsubmited(true)
            }

            console.log(result);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setloading(false);
        }
    };

    return (
        <div className="flex justify-center h-[100%] pt-16 overflow-auto">
            {formsubmited ? (
                <Conversationbox Messages={Messages} />
            ) : (
                <form
                    onSubmit={sendform}
                    className="p-4 bg-white rounded-lg shadow space-y-2 w-[95%] sm:w-[70%] sm:min-h-[70vh] min-h-[55vh]"
                >
                    <h3 className="font-semibold text-sm text-center hover:shadow-lg rounded-3xl transition-all duration-300 mb-4">
                        Before we continue, please fill out this form
                    </h3>

                    {/* Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block font-semibold text-xs mb-1 text-gray-800"
                        >
                            Name <span className="text-primary">*</span>
                        </label>
                        <input
                            id="name"
                            name="fullname"
                            placeholder="Name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full h-8 p-1 text-xs border rounded"
                            required
                            aria-label="Name"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block font-semibold text-xs mb-1 text-gray-800"
                        >
                            Email <span className="text-primary">*</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full h-8 p-1 text-xs border rounded"
                            required
                            aria-label="Email"
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label
                            htmlFor="phone"
                            className="block font-semibold text-xs mb-1 text-gray-800"
                        >
                            Phone Number <span className="text-primary">*</span>
                        </label>
                        <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                            <select
                                name="country_code"
                                value={form.country_code}
                                onChange={handleChange}
                                className="p-1 border rounded w-full sm:w-24 h-8 text-xs"
                                required
                                aria-label="Country Code"
                            >
                                <option value="+91">+91 (India)</option>
                                <option value="+1">+1 (USA)</option>
                                <option value="+44">+44 (UK)</option>
                                <option value="+61">+61 (Australia)</option>
                                <option value="+81">+81 (Japan)</option>
                            </select>
                            <input
                                id="phone"
                                type="tel"
                                name="phone"
                                placeholder="(eg.90xxxxxxxx)"
                                value={form.phone}
                                onChange={handleChange}
                                className="p-1 border rounded w-full h-8 text-xs"
                                required
                                aria-label="Phone"
                            />
                        </div>
                    </div>

                    {/* Interest */}
                    <div>
                        <label
                            htmlFor="interest"
                            className="block font-semibold text-xs mb-1 text-gray-800"
                        >
                            Are you looking for <span className="text-primary">*</span>
                        </label>
                        <select
                            id="interest"
                            name="interest"
                            value={form.interest}
                            onChange={(e) =>
                                setForm({ ...form, interest: e.target.value })
                            }
                            required
                            className="w-full h-8 px-2 text-xs border border-gray-300 rounded-md 
                     bg-white text-gray-800 outline-none 
                     focus:border-primary focus:ring-1 focus:ring-primary 
                     transition-colors duration-200 cursor-pointer"
                        >
                            <option value="" disabled>
                                Select an option
                            </option>
                            <option value="corporate-training">Corporate training</option>
                            <option value="technical-courses">Technical Courses</option>
                            <option value="digital-solution">Digital Solution</option>
                            <option value="just-exploring">Just Exploring Us</option>
                        </select>
                    </div>

                    {/* Purpose */}
                    <div>
                        <label
                            htmlFor="description"
                            className="block font-semibold text-xs mb-1 text-gray-800"
                        >
                            Purpose <span className="text-primary">(optional)</span>
                        </label>
                        <textarea
                            id="description"
                            name="message"
                            placeholder="Purpose of exploration (e.g., project enquiry, collaboration, demo request, ...)"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full p-1 text-xs border rounded h-20 resize-none"
                            aria-label="Description"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button className="h-9 bg-[#3f3f3f] text-white p-2 rounded-lg font-bold delay-150 duration-300 ease-in-out hover:scale-110">
                            {loading ? (
                                <div className="flex items-center">
                                    <div className="mr-2 h-4 w-4 border-2 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
                                    submitting...
                                </div>
                            ) : (
                                "Submit"
                            )}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Form;
