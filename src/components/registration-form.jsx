"use client";

import { useMemo, useState } from "react";

const WHATSAPP_NUMBER = "2349162057661";
const WHATSAPP_GROUP_URL =
  "https://chat.whatsapp.com/Bym2VLFK3P4EwvmInZT6Cf?mode=gi_t";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  category: "",
  country: "",
};

export function RegistrationForm() {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const whatsappMessage = useMemo(
    () =>
      [
        "Hello Anna, I want to register for the Dreamers to Doers masterclass.",
        "",
        `First Name: ${form.firstName}`,
        `Last Name: ${form.lastName || "Not provided"}`,
        `Email: ${form.email}`,
        `WhatsApp Number: ${form.phone || "Not provided"}`,
        `Category: ${form.category}`,
        `Country: ${form.country || "Not provided"}`,
      ].join("\n"),
    [form]
  );

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function closeOverlay() {
    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.firstName.trim() || !form.email.trim() || !form.category) {
      window.alert("Please fill in your name, email, and category.");
      return;
    }

    setSubmitted(true);

    window.setTimeout(() => {
      window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        whatsappMessage
      )}`;
    }, 1500);
  }

  return (
    <>
      <div className="form-card">
        <span className="form-card-tag">Registration</span>
        <h3>Claim your seat</h3>
        <div className="sub">Dreamers to Doers · June 2026 · ₦9,999 Early Bird</div>

        <form onSubmit={handleSubmit}>
          <div className="field-row">
            <div className="field">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                placeholder="e.g. Amaka"
                value={form.firstName}
                onChange={updateField}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                placeholder="e.g. Obi"
                value={form.lastName}
                onChange={updateField}
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@domain.com"
              value={form.email}
              onChange={updateField}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="phone">WhatsApp Number (with country code)</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+234 800 000 0000"
              value={form.phone}
              onChange={updateField}
            />
          </div>
          <div className="field">
            <label htmlFor="category">I am a...</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={updateField}
              required
            >
              <option value="" disabled>
                Select your category
              </option>
              <option>University Student</option>
              <option>Early-Career Professional</option>
              <option>NGO / Social Enterprise Founder</option>
              <option>Event Planner / Program Coordinator</option>
              <option>Aspiring Changemaker</option>
              <option>Other</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="country">Country</label>
            <input
              id="country"
              name="country"
              placeholder="e.g. Nigeria"
              value={form.country}
              onChange={updateField}
            />
          </div>

          <button className="form-submit" type="submit">
            Secure My Seat - ₦9,999
          </button>
        </form>

        <div className="waitlist-divider">or</div>

        <a
          href={WHATSAPP_GROUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="waitlist-btn"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
          </svg>
          Join waitlist
        </a>

        <div className="form-fine">We respect your privacy. Details sent to your email only.</div>
      </div>

      <div className={`success-overlay${submitted ? " active" : ""}`} id="success-overlay">
        <div className="success-card">
          <button className="success-close" type="button" onClick={closeOverlay} aria-label="Close">
            X
          </button>
          <div className="success-check">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2>
            You&apos;re <em>registered.</em>
          </h2>
          <p className="primary-note">
            Your seat is secured. We&apos;ll send all event details and your Google Meet access
            link to your inbox shortly.
          </p>
          <div className="redirect-bar">
            <div className="spinner" />
            <span>Redirecting you to the WhatsApp group</span>
          </div>
          <p className="manual-link">
            Not redirected?{" "}
            <a href={WHATSAPP_GROUP_URL} target="_blank" rel="noopener noreferrer">
              Click here to join the WhatsApp group
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
