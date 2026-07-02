import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';
import { submitContact } from '../../services/api';
import './index.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ success: null, message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(formData.email)) return 'Please enter a valid email address';
    if (!formData.message.trim()) return 'Message is required';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ success: null, message: '' });

    const error = validateForm();
    if (error) {
      setStatus({ success: false, message: error });
      return;
    }

    setLoading(true);
    try {
      const res = await submitContact(formData);
      if (res.success) {
        setStatus({ success: true, message: 'Message sent successfully! Thank you.' });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus({ success: false, message: res.message || 'Something went wrong. Please try again.' });
      }
    } catch (err) {
      console.error(err);
      setStatus({
        success: false,
        message: err.response?.data?.message || 'Server connection failed. Your message was not sent.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>

        <div className="contact-grid">
          <div className="contact-info">
            <h3 className="contact-subtitle">Let's Discuss Your Project</h3>
            <p className="contact-desc">
              Have an idea or a project you need help with? Shoot me a message! I'm open to discussing full-time employment roles, freelance contracts, or just talking about development.
            </p>

            <div className="contact-details-list">
              <div className="contact-detail-card">
                <span className="contact-detail-icon"><Mail size={20} /></span>
                <div className="contact-detail-text">
                  <span className="detail-label">Email</span>
                  <a href="mailto:vishnu@example.com" className="detail-value">vishnuvardhanreddypidugu99@gmail.com</a>
                </div>
              </div>

              <div className="contact-detail-card">
                <span className="contact-detail-icon"><Phone size={20} /></span>
                <div className="contact-detail-text">
                  <span className="detail-label">Phone</span>
                  <a href="tel:+919494430426" className="detail-value">+91 9494430426</a>
                </div>
              </div>

              <div className="contact-detail-card">
                <span className="contact-detail-icon"><MapPin size={20} /></span>
                <div className="contact-detail-text">
                  <span className="detail-label">Address</span>
                  <span className="detail-value">Sri Karthikeya Residency,Hyderabad, India</span>
                </div>
              </div>
            </div>

            <div className="map-container">
              <iframe
                title="Hyderabad Location Map"
                src="https://maps.google.com/maps?q=Sri%20Karthikeya%20Residency,%20Nizampet,%20Hyderabad&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="220"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="glass-card contact-form-container">
            <h3 className="contact-subtitle">Send a Message</h3>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="John Doe"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="john@example.com"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="+91 XXXXX XXXXX"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Project Proposal"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-control"
                  rows="5"
                  placeholder="Hey, let's talk about building..."
                  disabled={loading}
                ></textarea>
              </div>

              {status.message && (
                <div className={`form-status ${status.success ? 'success' : 'error'}`}>
                  {status.success ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                  <span>{status.message}</span>
                </div>
              )}

              <button type="submit" className="btn-primary form-submit-btn" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'} <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
