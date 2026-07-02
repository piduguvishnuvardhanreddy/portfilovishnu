import React, { useState, useEffect } from 'react';
import { Shield, Key, Eye, EyeOff, LogOut, Plus, Trash2, Edit3, MessageSquare, Briefcase, GraduationCap, Award, Code, UploadCloud, CheckCircle, AlertCircle } from 'lucide-react';
import * as api from '../../services/api';
import './index.css';

const Admin = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('messages');
  const [loading, setLoading] = useState(false);
  
  // Data lists
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [certificates, setCertificates] = useState([]);
  
  // Forms & Modals state
  const [formType, setFormType] = useState(''); // 'projects', 'skills', 'experience', 'education', 'certificates'
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState({ success: null, message: '' });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const stored = api.getStoredPassword();
      if (stored) {
        setPassword(stored);
        api.setAdminPasswordHeader(stored);
        try {
          // Simple handshake: fetch messages to verify password works
          const msgs = await api.getMessages();
          setMessages(msgs);
          setIsAuthenticated(true);
          fetchDashboardData();
        } catch (err) {
          api.setAdminPasswordHeader('');
          setIsAuthenticated(false);
        }
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    setStatus({ success: null, message: '' });

    try {
      api.setAdminPasswordHeader(password);
      const msgs = await api.getMessages();
      setMessages(msgs);
      setIsAuthenticated(true);
      fetchDashboardData();
    } catch (err) {
      api.setAdminPasswordHeader('');
      setStatus({ success: false, message: 'Invalid Admin Password. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    api.setAdminPasswordHeader('');
    setPassword('');
    setIsAuthenticated(false);
  };

  const fetchDashboardData = async () => {
    try {
      const [projList, skillList, expList, eduList, certList] = await Promise.all([
        api.getProjects(),
        api.getSkills(),
        api.getExperiences(),
        api.getEducations(),
        api.getCertificates()
      ]);
      setProjects(projList);
      setSkills(skillList);
      setExperiences(expList);
      setEducations(eduList);
      setCertificates(certList);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    }
  };

  // Messages operations
  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Delete this message permanently?')) return;
    try {
      await api.deleteMessage(id);
      setMessages(messages.filter(m => m._id !== id));
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  // Image Upload helper
  const handleImageUpload = async (e, targetField) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await api.uploadFile(file);
      if (res.success) {
        setFormData({ ...formData, [targetField]: res.fileUrl });
      }
    } catch (err) {
      alert('Upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  // CRUD operation handler
  const handleOpenForm = (type, mode, item = null) => {
    setFormType(type);
    setFormMode(mode);
    setStatus({ success: null, message: '' });
    
    if (mode === 'edit' && item) {
      setEditId(item._id);
      if (type === 'projects') {
        setFormData({
          title: item.title,
          description: item.description,
          image: item.image,
          technologies: item.technologies.join(', '),
          githubLink: item.githubLink,
          liveLink: item.liveLink,
          featured: item.featured || false
        });
      } else {
        setFormData(item);
      }
    } else {
      setEditId(null);
      if (type === 'projects') {
        setFormData({ title: '', description: '', image: '', technologies: '', githubLink: '', liveLink: '', featured: false });
      } else if (type === 'skills') {
        setFormData({ name: '', category: 'Frontend', level: 80, icon: 'Code' });
      } else if (type === 'experience') {
        setFormData({ company: '', role: '', duration: '', description: '' });
      } else if (type === 'education') {
        setFormData({ college: '', degree: '', CGPA: '', year: '' });
      } else if (type === 'certificates') {
        setFormData({ title: '', issuer: '', date: '', image: '' });
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ success: null, message: '' });

    try {
      let result;
      // Pre-process data
      let processedData = { ...formData };
      if (formType === 'projects') {
        processedData.technologies = formData.technologies.split(',').map(t => t.trim()).filter(Boolean);
      }

      if (formMode === 'add') {
        if (formType === 'projects') result = await api.createProject(processedData);
        else if (formType === 'skills') result = await api.createSkill(processedData);
        else if (formType === 'experience') result = await api.createExperience(processedData);
        else if (formType === 'education') result = await api.createEducation(processedData);
        else if (formType === 'certificates') result = await api.createCertificate(processedData);
      } else {
        if (formType === 'projects') result = await api.updateProject(editId, processedData);
        else if (formType === 'skills') result = await api.updateSkill(editId, processedData);
        else if (formType === 'experience') result = await api.updateExperience(editId, processedData);
        else if (formType === 'education') result = await api.updateEducation(editId, processedData);
        else if (formType === 'certificates') result = await api.updateCertificate(editId, processedData);
      }

      setStatus({ success: true, message: `Successfully ${formMode === 'add' ? 'created' : 'updated'} item!` });
      fetchDashboardData();
      
      // Delay closing form slightly for visual satisfaction
      setTimeout(() => setFormType(''), 1000);
    } catch (err) {
      console.error(err);
      setStatus({ success: false, message: err.response?.data?.message || 'Transaction failed.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (type, id) => {
    if (!window.confirm('Delete this item permanently?')) return;
    try {
      if (type === 'projects') await api.deleteProject(id);
      else if (type === 'skills') await api.deleteSkill(id);
      else if (type === 'experience') await api.deleteExperience(id);
      else if (type === 'education') await api.deleteEducation(id);
      else if (type === 'certificates') await api.deleteCertificate(id);
      
      fetchDashboardData();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <section className="section admin-login-section">
        <div className="glass-card login-card">
          <div className="login-header">
            <Shield size={36} className="login-icon" />
            <h2>Admin Portal</h2>
            <p>Access requires password authentication</p>
          </div>
          
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label className="form-label" htmlFor="admin-pass">Password</label>
              <div className="password-input-wrap">
                <Key size={18} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="admin-pass"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control pass-input"
                  placeholder="Enter admin password"
                  disabled={loading}
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {status.message && (
              <div className="form-status error">
                <AlertCircle size={18} />
                <span>{status.message}</span>
              </div>
            )}

            <button type="submit" className="btn-primary login-btn" disabled={loading}>
              {loading ? 'Authenticating...' : 'Login'}
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="section admin-section">
      <div className="container admin-container">
        <div className="admin-header-row">
          <div>
            <h2 className="admin-title">Admin Dashboard</h2>
            <p className="admin-subtitle-desc">Manage all dynamic content and client inquiries</p>
          </div>
          <button onClick={handleLogout} className="btn-secondary logout-btn">
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Dashboard Navigation */}
        <div className="admin-nav-tabs">
          <button className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => { setActiveTab('messages'); setFormType(''); }}>
            <MessageSquare size={16} /> Messages ({messages.length})
          </button>
          <button className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => { setActiveTab('projects'); setFormType(''); }}>
            <Code size={16} /> Projects ({projects.length})
          </button>
          <button className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => { setActiveTab('skills'); setFormType(''); }}>
            <Shield size={16} /> Skills ({skills.length})
          </button>
          <button className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => { setActiveTab('experience'); setFormType(''); }}>
            <Briefcase size={16} /> Experience ({experiences.length})
          </button>
          <button className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`} onClick={() => { setActiveTab('education'); setFormType(''); }}>
            <GraduationCap size={16} /> Education ({educations.length})
          </button>
          <button className={`tab-btn ${activeTab === 'certificates' ? 'active' : ''}`} onClick={() => { setActiveTab('certificates'); setFormType(''); }}>
            <Award size={16} /> Certificates ({certificates.length})
          </button>
        </div>

        {/* Active Tab Screen Area */}
        <div className="admin-content-area">
          {formType && (
            <div className="glass-card admin-form-card">
              <h3 className="form-title-h3">{formMode === 'add' ? 'Create New' : 'Edit'} {formType.toUpperCase()}</h3>
              <form onSubmit={handleFormSubmit} className="admin-form">
                {formType === 'projects' && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Project Title</label>
                      <input type="text" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="form-control" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Description</label>
                      <textarea value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="form-control" rows="3" required></textarea>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Image URL</label>
                        <input type="text" value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} className="form-control" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Or Upload File</label>
                        <div className="upload-btn-wrapper">
                          <button type="button" className="btn-secondary upload-btn-card">
                            <UploadCloud size={16} /> {uploading ? 'Uploading...' : 'Choose File'}
                          </button>
                          <input type="file" onChange={e => handleImageUpload(e, 'image')} accept="image/*" />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Technologies (Comma separated)</label>
                      <input type="text" value={formData.technologies || ''} onChange={e => setFormData({...formData, technologies: e.target.value})} className="form-control" placeholder="React, Node, Express" required />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">GitHub Code Link</label>
                        <input type="text" value={formData.githubLink || ''} onChange={e => setFormData({...formData, githubLink: e.target.value})} className="form-control" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Live Demo Link</label>
                        <input type="text" value={formData.liveLink || ''} onChange={e => setFormData({...formData, liveLink: e.target.value})} className="form-control" />
                      </div>
                    </div>
                    <div className="checkbox-wrap">
                      <input type="checkbox" id="featured" checked={formData.featured || false} onChange={e => setFormData({...formData, featured: e.target.checked})} />
                      <label htmlFor="featured">Featured Project</label>
                    </div>
                  </>
                )}

                {formType === 'skills' && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Skill Name</label>
                      <input type="text" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="form-control" required />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Category</label>
                        <select value={formData.category || 'Frontend'} onChange={e => setFormData({...formData, category: e.target.value})} className="form-control">
                          <option value="Frontend">Frontend</option>
                          <option value="Backend">Backend</option>
                          <option value="Database">Database</option>
                          <option value="Programming Languages">Programming Languages</option>
                          <option value="Tools">Tools</option>
                          <option value="Deployment">Deployment</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Level Percentage (0-100)</label>
                        <input type="number" min="0" max="100" value={formData.level || 80} onChange={e => setFormData({...formData, level: parseInt(e.target.value)})} className="form-control" required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Lucide Icon String Name</label>
                      <input type="text" value={formData.icon || 'Code'} onChange={e => setFormData({...formData, icon: e.target.value})} className="form-control" placeholder="Code, Server, Database" />
                    </div>
                  </>
                )}

                {formType === 'experience' && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Company</label>
                      <input type="text" value={formData.company || ''} onChange={e => setFormData({...formData, company: e.target.value})} className="form-control" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Job Role</label>
                      <input type="text" value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} className="form-control" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Duration (e.g. 2022 - 2024)</label>
                      <input type="text" value={formData.duration || ''} onChange={e => setFormData({...formData, duration: e.target.value})} className="form-control" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Job Description</label>
                      <textarea value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="form-control" rows="4" required></textarea>
                    </div>
                  </>
                )}

                {formType === 'education' && (
                  <>
                    <div className="form-group">
                      <label className="form-label">College Name</label>
                      <input type="text" value={formData.college || ''} onChange={e => setFormData({...formData, college: e.target.value})} className="form-control" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Degree</label>
                      <input type="text" value={formData.degree || ''} onChange={e => setFormData({...formData, degree: e.target.value})} className="form-control" required />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">CGPA / Score</label>
                        <input type="text" value={formData.CGPA || ''} onChange={e => setFormData({...formData, CGPA: e.target.value})} className="form-control" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Year / Duration</label>
                        <input type="text" value={formData.year || ''} onChange={e => setFormData({...formData, year: e.target.value})} className="form-control" required />
                      </div>
                    </div>
                  </>
                )}

                {formType === 'certificates' && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Certificate Title</label>
                      <input type="text" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="form-control" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Issuing Authority</label>
                      <input type="text" value={formData.issuer || ''} onChange={e => setFormData({...formData, issuer: e.target.value})} className="form-control" required />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Image URL</label>
                        <input type="text" value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} className="form-control" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Or Upload File</label>
                        <div className="upload-btn-wrapper">
                          <button type="button" className="btn-secondary upload-btn-card">
                            <UploadCloud size={16} /> {uploading ? 'Uploading...' : 'Choose File'}
                          </button>
                          <input type="file" onChange={e => handleImageUpload(e, 'image')} accept="image/*" />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Date (e.g. Dec 2023)</label>
                      <input type="text" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} className="form-control" required />
                    </div>
                  </>
                )}

                {status.message && (
                  <div className={`form-status ${status.success ? 'success' : 'error'}`}>
                    {status.success ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                    <span>{status.message}</span>
                  </div>
                )}

                <div className="form-actions">
                  <button type="submit" className="btn-primary" disabled={loading || uploading}>
                    {loading ? 'Processing...' : 'Save Details'}
                  </button>
                  <button type="button" className="btn-secondary" onClick={() => setFormType('')} disabled={loading}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && !formType && (
            <div className="admin-list">
              {messages.length === 0 ? (
                <div className="no-items-card"><p>No messages received yet.</p></div>
              ) : (
                messages.map(msg => (
                  <div key={msg._id} className="glass-card admin-item-card message-item">
                    <div className="msg-header">
                      <span className="msg-date">{new Date(msg.createdAt).toLocaleDateString()}</span>
                      <button onClick={() => handleDeleteMessage(msg._id)} className="delete-btn" title="Delete message">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <h3 className="msg-sender">{msg.name}</h3>
                    <div className="msg-meta">
                      <span><strong>Email:</strong> {msg.email}</span>
                      {msg.phone && <span><strong>Phone:</strong> {msg.phone}</span>}
                      <span><strong>Subject:</strong> {msg.subject}</span>
                    </div>
                    <p className="msg-body">{msg.message}</p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* List items tabs (projects, skills, exp, edu, certs) */}
          {activeTab !== 'messages' && !formType && (
            <div className="admin-list">
              <button className="btn-primary add-item-btn" onClick={() => handleOpenForm(activeTab, 'add')}>
                <Plus size={16} /> Add {activeTab.slice(0, -1)}
              </button>

              {activeTab === 'projects' && (
                <div className="items-table-container">
                  {projects.length === 0 ? <p className="no-items-text">No projects found. 🌱 Add one!</p> : (
                    projects.map(p => (
                      <div key={p._id} className="glass-card admin-list-card">
                        <div className="admin-card-header">
                          <h4>{p.title}</h4>
                          <div className="card-actions">
                            <button onClick={() => handleOpenForm('projects', 'edit', p)} className="edit-btn"><Edit3 size={16} /></button>
                            <button onClick={() => handleDeleteItem('projects', p._id)} className="delete-btn"><Trash2 size={16} /></button>
                          </div>
                        </div>
                        <p className="admin-card-desc">{p.description}</p>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="items-table-container">
                  {skills.length === 0 ? <p className="no-items-text">No skills found.</p> : (
                    skills.map(s => (
                      <div key={s._id} className="glass-card admin-list-card flex-between">
                        <div className="card-left">
                          <strong>{s.name}</strong>
                          <span className="sub-detail">{s.category} ({s.level}%)</span>
                        </div>
                        <div className="card-actions">
                          <button onClick={() => handleOpenForm('skills', 'edit', s)} className="edit-btn"><Edit3 size={16} /></button>
                          <button onClick={() => handleDeleteItem('skills', s._id)} className="delete-btn"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="items-table-container">
                  {experiences.length === 0 ? <p className="no-items-text">No experience entries found.</p> : (
                    experiences.map(e => (
                      <div key={e._id} className="glass-card admin-list-card">
                        <div className="admin-card-header">
                          <div>
                            <h4>{e.role}</h4>
                            <span className="sub-detail">{e.company} | {e.duration}</span>
                          </div>
                          <div className="card-actions">
                            <button onClick={() => handleOpenForm('experience', 'edit', e)} className="edit-btn"><Edit3 size={16} /></button>
                            <button onClick={() => handleDeleteItem('experience', e._id)} className="delete-btn"><Trash2 size={16} /></button>
                          </div>
                        </div>
                        <p className="admin-card-desc">{e.description}</p>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'education' && (
                <div className="items-table-container">
                  {educations.length === 0 ? <p className="no-items-text">No education entries found.</p> : (
                    educations.map(ed => (
                      <div key={ed._id} className="glass-card admin-list-card flex-between">
                        <div className="card-left">
                          <h4>{ed.degree}</h4>
                          <span className="sub-detail">{ed.college} | {ed.year}</span>
                        </div>
                        <div className="card-actions">
                          <button onClick={() => handleOpenForm('education', 'edit', ed)} className="edit-btn"><Edit3 size={16} /></button>
                          <button onClick={() => handleDeleteItem('education', ed._id)} className="delete-btn"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'certificates' && (
                <div className="items-table-container">
                  {certificates.length === 0 ? <p className="no-items-text">No certificates found.</p> : (
                    certificates.map(c => (
                      <div key={c._id} className="glass-card admin-list-card flex-between">
                        <div className="card-left">
                          <h4>{c.title}</h4>
                          <span className="sub-detail">{c.issuer} | {c.date}</span>
                        </div>
                        <div className="card-actions">
                          <button onClick={() => handleOpenForm('certificates', 'edit', c)} className="edit-btn"><Edit3 size={16} /></button>
                          <button onClick={() => handleDeleteItem('certificates', c._id)} className="delete-btn"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Admin;
