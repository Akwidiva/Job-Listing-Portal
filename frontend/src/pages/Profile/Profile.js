import React, { useState, useEffect, useRef } from 'react';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'User',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    title: 'Senior Frontend Developer',
    bio: 'Passionate developer with 5+ years of experience in React and Node.js. Love building scalable applications.',
    skills: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'HTML/CSS', 'Git'],
    experience: [
      { id: 1, company: 'Google', position: 'Senior Developer', duration: '2020 - Present' },
      { id: 2, company: 'Facebook', position: 'Frontend Developer', duration: '2018 - 2020' },
    ],
    education: [
      { id: 1, school: 'Stanford University', degree: 'M.S. Computer Science', year: '2018' },
    ],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({ ...user });
  const [newSkill, setNewSkill] = useState('');
  const [editingExpId, setEditingExpId] = useState(null);
  const [editingEduId, setEditingEduId] = useState(null);
  const [newExperience, setNewExperience] = useState({ company: '', position: '', duration: '' });
  const [newEducation, setNewEducation] = useState({ school: '', degree: '', year: '' });
  const [uploadedResume, setUploadedResume] = useState(null);
  const [resumeName, setResumeName] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedResume = localStorage.getItem('userResume');
    
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(prev => ({ ...prev, ...parsedUser }));
      setProfileData(prev => ({ ...prev, ...parsedUser }));
    }
    
    if (savedResume) {
      const parsedResume = JSON.parse(savedResume);
      setUploadedResume(parsedResume.data);
      setResumeName(parsedResume.name);
    }
  }, []);

  const handleSave = () => {
    setUser(profileData);
    localStorage.setItem('user', JSON.stringify(profileData));
    setIsEditing(false);
    setEditingExpId(null);
    setEditingEduId(null);
  };

  const handleCancel = () => {
    setProfileData({ ...user });
    setIsEditing(false);
    setEditingExpId(null);
    setEditingEduId(null);
    setNewSkill('');
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'application/pdf' || file.type === 'application/msword' || 
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        
        const reader = new FileReader();
        reader.onload = (e) => {
          const resumeData = {
            name: file.name,
            data: e.target.result,
            type: file.type,
            size: file.size,
            lastModified: file.lastModified
          };
          setUploadedResume(resumeData.data);
          setResumeName(file.name);
          localStorage.setItem('userResume', JSON.stringify(resumeData));
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please upload a valid PDF or Word document');
      }
    }
  };

  const handleRemoveResume = () => {
    if (window.confirm('Are you sure you want to remove your resume?')) {
      setUploadedResume(null);
      setResumeName('');
      localStorage.removeItem('userResume');
    }
  };

  const handleDownloadResume = () => {
    if (uploadedResume) {
      const link = document.createElement('a');
      link.href = uploadedResume;
      link.download = resumeName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('No resume uploaded yet.');
    }
  };

  // Handle basic info changes
  const handleBasicInfoChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle skills
  const handleAddSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  // Handle experience
  const handleAddExperience = () => {
    if (newExperience.company && newExperience.position) {
      const newExp = {
        id: Date.now(),
        company: newExperience.company,
        position: newExperience.position,
        duration: newExperience.duration || 'Present'
      };
      setProfileData(prev => ({
        ...prev,
        experience: [...prev.experience, newExp]
      }));
      setNewExperience({ company: '', position: '', duration: '' });
    }
  };

  const handleUpdateExperience = (id, field, value) => {
    setProfileData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const handleRemoveExperience = (id) => {
    setProfileData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
    setEditingExpId(null);
  };

  // Handle education
  const handleAddEducation = () => {
    if (newEducation.school && newEducation.degree) {
      const newEdu = {
        id: Date.now(),
        school: newEducation.school,
        degree: newEducation.degree,
        year: newEducation.year || 'Present'
      };
      setProfileData(prev => ({
        ...prev,
        education: [...prev.education, newEdu]
      }));
      setNewEducation({ school: '', degree: '', year: '' });
    }
  };

  const handleUpdateEducation = (id, field, value) => {
    setProfileData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const handleRemoveEducation = (id) => {
    setProfileData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
    setEditingEduId(null);
  };

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar-section">
          <div className="profile-avatar">
            {profileData.name.charAt(0)}
          </div>
          <div className="profile-info">
            {isEditing ? (
              <>
                <input
                  type="text"
                  className="edit-input large"
                  value={profileData.name}
                  onChange={(e) => handleBasicInfoChange('name', e.target.value)}
                  placeholder="Full Name"
                />
                <input
                  type="text"
                  className="edit-input medium"
                  value={profileData.title}
                  onChange={(e) => handleBasicInfoChange('title', e.target.value)}
                  placeholder="Job Title"
                />
                <div className="profile-location edit-contact">
                  <input
                    type="text"
                    className="edit-input small"
                    value={profileData.location}
                    onChange={(e) => handleBasicInfoChange('location', e.target.value)}
                    placeholder="Location"
                  />
                  <input
                    type="email"
                    className="edit-input small"
                    value={profileData.email}
                    onChange={(e) => handleBasicInfoChange('email', e.target.value)}
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    className="edit-input small"
                    value={profileData.phone}
                    onChange={(e) => handleBasicInfoChange('phone', e.target.value)}
                    placeholder="Phone"
                  />
                </div>
              </>
            ) : (
              <>
                <h1>{user.name}</h1>
                <p className="profile-title">{user.title}</p>
                <div className="profile-location">
                  <span>📍 {user.location}</span>
                  <span>📧 {user.email}</span>
                  <span>📱 {user.phone}</span>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="profile-actions">
          {!isEditing ? (
            <div className="non-edit-actions">
              <div className="action-buttons">
                <button className="btn-primary" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
                <button className="btn-secondary" onClick={handleDownloadResume}>
                  Download Resume
                </button>
              </div>
              <div className="resume-section">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleResumeUpload}
                  accept=".pdf,.doc,.docx"
                  style={{ display: 'none' }}
                />
                <button 
                  className="btn-resume" 
                  onClick={() => fileInputRef.current.click()}
                >
                  📄 Upload Resume
                </button>
                {resumeName && (
                  <div className="resume-info">
                    <span className="resume-name">{resumeName}</span>
                    <button className="remove-resume-btn" onClick={handleRemoveResume}>
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="edit-actions">
              <div className="resume-section edit-mode-resume">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleResumeUpload}
                  accept=".pdf,.doc,.docx"
                  style={{ display: 'none' }}
                />
                <button 
                  className="btn-resume" 
                  onClick={() => fileInputRef.current.click()}
                >
                  📄 {resumeName ? 'Change Resume' : 'Upload Resume'}
                </button>
                {resumeName && (
                  <div className="resume-info">
                    <span className="resume-name">{resumeName}</span>
                    <button className="remove-resume-btn" onClick={handleRemoveResume}>
                      ×
                    </button>
                  </div>
                )}
              </div>
              <div className="action-buttons">
                <button className="btn-success" onClick={handleSave}>
                  Save Changes
                </button>
                <button className="btn-cancel" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="profile-content">
        {/* Left Column */}
        <div className="profile-left">
          {/* About Section */}
          <div className="profile-section">
            <div className="section-header">
              <h2>About Me</h2>
            </div>
            {isEditing ? (
              <textarea
                className="edit-bio"
                value={profileData.bio}
                onChange={(e) => handleBasicInfoChange('bio', e.target.value)}
                rows={4}
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="profile-bio">{user.bio}</p>
            )}
          </div>

          {/* Skills Section */}
          <div className="profile-section">
            <div className="section-header">
              <h2>Skills</h2>
            </div>
            <div className="skills-list">
              {profileData.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                  {isEditing && (
                    <button 
                      className="remove-skill"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
              {isEditing && (
                <div className="add-skill-container">
                  <input
                    type="text"
                    className="add-skill-input"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add new skill..."
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                  />
                  <button 
                    className="add-skill-btn"
                    onClick={handleAddSkill}
                    disabled={!newSkill.trim()}
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="profile-right">
          {/* Experience Section */}
          <div className="profile-section">
            <div className="section-header">
              <h2>Experience</h2>
              {isEditing && (
                <button className="add-btn" onClick={handleAddExperience}>
                  + Add
                </button>
              )}
            </div>
            
            {/* Add New Experience Form */}
            {isEditing && (
              <div className="add-experience-form">
                <input
                  type="text"
                  placeholder="Position"
                  value={newExperience.position}
                  onChange={(e) => setNewExperience(prev => ({...prev, position: e.target.value}))}
                  className="edit-input"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={newExperience.company}
                  onChange={(e) => setNewExperience(prev => ({...prev, company: e.target.value}))}
                  className="edit-input"
                />
                <input
                  type="text"
                  placeholder="Duration (e.g., 2020 - Present)"
                  value={newExperience.duration}
                  onChange={(e) => setNewExperience(prev => ({...prev, duration: e.target.value}))}
                  className="edit-input"
                />
                <button 
                  className="btn-small"
                  onClick={handleAddExperience}
                  disabled={!newExperience.position || !newExperience.company}
                >
                  Add Experience
                </button>
              </div>
            )}

            {/* Experience List */}
            {profileData.experience.map(exp => (
              <div key={exp.id} className="experience-item">
                {isEditing && editingExpId === exp.id ? (
                  <div className="edit-experience-form">
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => handleUpdateExperience(exp.id, 'position', e.target.value)}
                      className="edit-input"
                    />
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleUpdateExperience(exp.id, 'company', e.target.value)}
                      className="edit-input"
                    />
                    <input
                      type="text"
                      value={exp.duration}
                      onChange={(e) => handleUpdateExperience(exp.id, 'duration', e.target.value)}
                      className="edit-input"
                    />
                    <div className="experience-actions">
                      <button 
                        className="action-btn save"
                        onClick={() => setEditingExpId(null)}
                      >
                        Save
                      </button>
                      <button 
                        className="action-btn delete"
                        onClick={() => handleRemoveExperience(exp.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h4>{exp.position}</h4>
                    <p className="company-name">{exp.company}</p>
                    <p className="duration">{exp.duration}</p>
                    {isEditing && (
                      <div className="experience-actions">
                        <button 
                          className="action-btn"
                          onClick={() => setEditingExpId(exp.id)}
                        >
                          Edit
                        </button>
                        <button 
                          className="action-btn delete"
                          onClick={() => handleRemoveExperience(exp.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Education Section */}
          <div className="profile-section">
            <div className="section-header">
              <h2>Education</h2>
              {isEditing && (
                <button className="add-btn" onClick={handleAddEducation}>
                  + Add
                </button>
              )}
            </div>
            
            {/* Add New Education Form */}
            {isEditing && (
              <div className="add-education-form">
                <input
                  type="text"
                  placeholder="Degree"
                  value={newEducation.degree}
                  onChange={(e) => setNewEducation(prev => ({...prev, degree: e.target.value}))}
                  className="edit-input"
                />
                <input
                  type="text"
                  placeholder="School/University"
                  value={newEducation.school}
                  onChange={(e) => setNewEducation(prev => ({...prev, school: e.target.value}))}
                  className="edit-input"
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={newEducation.year}
                  onChange={(e) => setNewEducation(prev => ({...prev, year: e.target.value}))}
                  className="edit-input"
                />
                <button 
                  className="btn-small"
                  onClick={handleAddEducation}
                  disabled={!newEducation.degree || !newEducation.school}
                >
                  Add Education
                </button>
              </div>
            )}

            {/* Education List */}
            {profileData.education.map(edu => (
              <div key={edu.id} className="education-item">
                {isEditing && editingEduId === edu.id ? (
                  <div className="edit-education-form">
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => handleUpdateEducation(edu.id, 'degree', e.target.value)}
                      className="edit-input"
                    />
                    <input
                      type="text"
                      value={edu.school}
                      onChange={(e) => handleUpdateEducation(edu.id, 'school', e.target.value)}
                      className="edit-input"
                    />
                    <input
                      type="text"
                      value={edu.year}
                      onChange={(e) => handleUpdateEducation(edu.id, 'year', e.target.value)}
                      className="edit-input"
                    />
                    <div className="education-actions">
                      <button 
                        className="action-btn save"
                        onClick={() => setEditingEduId(null)}
                      >
                        Save
                      </button>
                      <button 
                        className="action-btn delete"
                        onClick={() => handleRemoveEducation(edu.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h4>{edu.degree}</h4>
                    <p className="school-name">{edu.school}</p>
                    <p className="year">{edu.year}</p>
                    {isEditing && (
                      <div className="education-actions">
                        <button 
                          className="action-btn"
                          onClick={() => setEditingEduId(edu.id)}
                        >
                          Edit
                        </button>
                        <button 
                          className="action-btn delete"
                          onClick={() => handleRemoveEducation(edu.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="profile-stats">
        <div className="stat-item">
          <span className="stat-number">245</span>
          <span className="stat-label">Profile Views</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">12</span>
          <span className="stat-label">Applications</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">3</span>
          <span className="stat-label">Interviews</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">8</span>
          <span className="stat-label">Saved Jobs</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;