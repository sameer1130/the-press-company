'use client';

import { useState } from 'react';

// Enquiry block that closes every expertise page — the sitemap's note:
// "a form at the end of every service, to book a call or consultation."
export default function EnquiryPanel({ context }) {
  const [data, setData] = useState({ name: '', email: '', brief: '' });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="enquiry">
      <div className="enquiry-inner">
        <div className="enquiry-copy">
          <div className="enquiry-eyebrow">
            <span className="dot" />
            Book a consultation
          </div>
          <h2 className="enquiry-title">
            Your next chapter<br />starts <em>here.</em>
          </h2>
          <p className="enquiry-sub">
            Tell us where {context || 'your brand'} is stuck. We&apos;ll come to the
            call with a point of view, not a pitch.
          </p>
        </div>

        {sent ? (
          <div className="enquiry-sent">
            Thanks, {data.name || 'friend'}. We&apos;ll be back in your inbox within
            two working days.
          </div>
        ) : (
          <form className="enquiry-form" onSubmit={submit}>
            <input
              className="final-input"
              placeholder="Your name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <input
              className="final-input"
              placeholder="Your email"
              type="email"
              required
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <input
              className="final-input"
              placeholder="The problem, in a sentence"
              value={data.brief}
              onChange={(e) => setData({ ...data, brief: e.target.value })}
            />
            <button type="submit" className="final-cta-big">
              Book the call
              <span className="arrow-big">→</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
