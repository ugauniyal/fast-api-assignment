"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function SendEmailPage() {
  const { email: encodedEmail } = useParams();
  const email = decodeURIComponent(encodedEmail as string);

  const [formData, setFormData] = useState({ subject: "", content: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`http://localhost:8000/email/send/${email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject: formData.subject, content: formData.content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to send email");
      }

      setSuccess("Email sent successfully!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-96">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-900">Send Email to {email}</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-gray-900">
          <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" required />
          <textarea name="content" placeholder="Email Content" value={formData.content} onChange={handleChange} rows={4} className="w-full p-3 border border-gray-300 rounded-lg" required />
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition" disabled={loading}>
            {loading ? "Sending..." : "Send Email"}
          </button>
        </form>
      </div>
    </div>
  );
}
