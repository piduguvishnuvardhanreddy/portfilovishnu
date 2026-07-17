import React, { useState, useEffect } from 'react';
import { Award, Calendar, ExternalLink, ShieldCheck } from 'lucide-react';
import { getCertificates, getImageUrl } from '../../services/api';
import './index.css';

const DEFAULT_CERTIFICATES = [
  {
    title: 'MERN Full Stack Developer Certification',
    issuer: 'Udemy Academy',
    date: 'Dec 2023',
    image: 'https://res.cloudinary.com/dmaipoa99/image/upload/v1783013122/ChatGPT_Image_Jul_2_2026_10_12_39_PM_yx6ppu.png'
  },
  {
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'Aug 2024',
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80'
  }
];

const Certificates = () => {
  const [certificates, setCertificates] = useState(DEFAULT_CERTIFICATES);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null); // For fullscreen lightbox modal
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const fetched = await getCertificates();
        if (fetched && fetched.length > 0) {
          setCertificates(fetched);
        }
      } catch (err) {
        console.error('Failed to load certificates from DB, using fallback:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCerts();
  }, []);

  return (
    <section id="certificates" className="section certificates-section">
      <div className="container">
        <h2 className="section-title">Certificates</h2>

        <div className="certificates-grid">
          {certificates.map((cert, idx) => (
            <div key={cert._id || idx} className="glass-card certificate-card">
              <div 
                className="cert-image-area" 
                onClick={() => cert.image && !imageErrors[cert._id || idx] && setActiveImage(getImageUrl(cert.image))}
              >
                {cert.image && !imageErrors[cert._id || idx] ? (
                  <img 
                    src={getImageUrl(cert.image)} 
                    alt={cert.title} 
                    className="cert-img" 
                    onError={() => setImageErrors(prev => ({ ...prev, [cert._id || idx]: true }))}
                  />
                ) : (
                  <div className="cert-placeholder">
                    <Award size={40} className="cert-placeholder-icon" />
                  </div>
                )}
                <div className="cert-zoom-overlay">
                  <ExternalLink size={20} />
                </div>
              </div>

              <div className="cert-body">
                <span className="cert-issuer">
                  <ShieldCheck size={14} /> {cert.issuer}
                </span>
                <h3 className="cert-title">{cert.title}</h3>
                <span className="cert-date">
                  <Calendar size={12} /> {cert.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeImage && (
          <div className="lightbox" onClick={() => setActiveImage(null)}>
            <div className="lightbox-content">
              <img src={activeImage} alt="Certificate Fullscreen" className="lightbox-img" />
              <span className="lightbox-close">&times;</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certificates;
