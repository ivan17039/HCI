"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { sendContactEmail } from "../../../lib/contact";
import Select from "react-select";
import countryList from "react-select-country-list";
import type React from "react"; // Added import for React

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`nav-linkbtn size-lg w-full md:w-auto ${
        pending ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
      {pending ? "Sending..." : "Send Message"}
    </button>
  );
}

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    country: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (selectedOption: any) => {
    setForm({ ...form, country: selectedOption.value });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Basic validation
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const result = await sendContactEmail(form);
      console.log("Email send result:", result); // Debug log

      if (result.success) {
        toast.success("Message sent successfully!");
        setForm({
          name: "",
          country: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error(result.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Something went wrong. Please try again.");
    }
  }

  const countryOptions = countryList().getData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-black">
      <div>
        <h2 className="text-xl font-bold text-primary mb-4">Contact Us</h2>
        <p>
          <strong>Address:</strong> Ulica Hrvatskih žrtava 204, Seget Donji
        </p>
        <p>
          <strong>Phone:</strong> +(385) 021 880 143
        </p>
        <p>
          <strong>Email:</strong> apartmani3M.seget@gmail.com
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="p-2 border rounded-md w-full"
          />
          <Select
            name="country"
            options={countryOptions}
            value={countryOptions.find(
              (option) => option.value === form.country
            )}
            onChange={handleCountryChange}
            required
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="p-2 border rounded-md w-full"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="p-2 border rounded-md w-full"
          />
        </div>
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          required
          className="p-2 border rounded-md w-full h-28"
        ></textarea>
        <SubmitButton />
      </form>
    </div>
  );
}
