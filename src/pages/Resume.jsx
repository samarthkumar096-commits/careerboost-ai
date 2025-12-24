import { ArrowLeft, Plus, Trash2, Download } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Navigation from '../components/Navigation'

export default function Resume() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: []
  })

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, {
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }]
    })
  }

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, {
        degree: '',
        school: '',
        location: '',
        graduationDate: '',
        gpa: ''
      }]
    })
  }

  const addSkill = () => {
    const skill = prompt('Enter skill name:')
    if (skill) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill]
      })
    }
  }

  const removeExperience = (index) => {
    const newExp = formData.experience.filter((_, i) => i !== index)
    setFormData({ ...formData, experience: newExp })
  }

  const removeEducation = (index) => {
    const newEdu = formData.education.filter((_, i) => i !== index)
    setFormData({ ...formData, education: newEdu })
  }

  const removeSkill = (index) => {
    const newSkills = formData.skills.filter((_, i) => i !== index)
    setFormData({ ...formData, skills: newSkills })
  }

  const handleGenerate = () => {
    alert('Resume generation coming soon! Your data has been saved.')
    console.log('Resume Data:', formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-24">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <h1 className="text-3xl font-bold mb-2">Create Resume</h1>
        <p className="text-gray-600 mb-8">Build your ATS-friendly resume with AI</p>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= s ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {s}
              </div>
              {s < 4 && (
                <div className={`flex-1 h-1 mx-2 ${
                  step > s ? 'bg-purple-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name *"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  value={formData.personalInfo.fullName}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, fullName: e.target.value }
                  })}
                />
                <input
                  type="email"
                  placeholder="Email *"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  value={formData.personalInfo.email}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, email: e.target.value }
                  })}
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  value={formData.personalInfo.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, phone: e.target.value }
                  })}
                />
                <input
                  type="text"
                  placeholder="Location (City, State)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  value={formData.personalInfo.location}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, location: e.target.value }
                  })}
                />
                <input
                  type="url"
                  placeholder="LinkedIn URL"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  value={formData.personalInfo.linkedin}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, linkedin: e.target.value }
                  })}
                />
                <input
                  type="url"
                  placeholder="Portfolio/Website URL"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  value={formData.personalInfo.portfolio}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, portfolio: e.target.value }
                  })}
                />
              </div>
            </div>
          )}

          {/* Step 2: Summary & Experience */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Professional Summary</h2>
              <textarea
                placeholder="Write a brief summary about yourself and your career goals..."
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent mb-6"
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              />

              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Work Experience</h2>
                <button
                  onClick={addExperience}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>

              {formData.experience.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No experience added yet. Click "Add" to start.</p>
              ) : (
                <div className="space-y-4">
                  {formData.experience.map((exp, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold">Experience {index + 1}</h3>
                        <button
                          onClick={() => removeExperience(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Job Title"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          value={exp.title}
                          onChange={(e) => {
                            const newExp = [...formData.experience]
                            newExp[index].title = e.target.value
                            setFormData({ ...formData, experience: newExp })
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Company Name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          value={exp.company}
                          onChange={(e) => {
                            const newExp = [...formData.experience]
                            newExp[index].company = e.target.value
                            setFormData({ ...formData, experience: newExp })
                          }}
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="month"
                            placeholder="Start Date"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            value={exp.startDate}
                            onChange={(e) => {
                              const newExp = [...formData.experience]
                              newExp[index].startDate = e.target.value
                              setFormData({ ...formData, experience: newExp })
                            }}
                          />
                          <input
                            type="month"
                            placeholder="End Date"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            value={exp.endDate}
                            disabled={exp.current}
                            onChange={(e) => {
                              const newExp = [...formData.experience]
                              newExp[index].endDate = e.target.value
                              setFormData({ ...formData, experience: newExp })
                            }}
                          />
                        </div>
                        <textarea
                          placeholder="Job description and achievements..."
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          value={exp.description}
                          onChange={(e) => {
                            const newExp = [...formData.experience]
                            newExp[index].description = e.target.value
                            setFormData({ ...formData, experience: newExp })
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Education */}
          {step === 3 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Education</h2>
                <button
                  onClick={addEducation}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>

              {formData.education.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No education added yet. Click "Add" to start.</p>
              ) : (
                <div className="space-y-4">
                  {formData.education.map((edu, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold">Education {index + 1}</h3>
                        <button
                          onClick={() => removeEducation(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Degree (e.g., Bachelor of Science)"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          value={edu.degree}
                          onChange={(e) => {
                            const newEdu = [...formData.education]
                            newEdu[index].degree = e.target.value
                            setFormData({ ...formData, education: newEdu })
                          }}
                        />
                        <input
                          type="text"
                          placeholder="School/University Name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          value={edu.school}
                          onChange={(e) => {
                            const newEdu = [...formData.education]
                            newEdu[index].school = e.target.value
                            setFormData({ ...formData, education: newEdu })
                          }}
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="month"
                            placeholder="Graduation Date"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            value={edu.graduationDate}
                            onChange={(e) => {
                              const newEdu = [...formData.education]
                              newEdu[index].graduationDate = e.target.value
                              setFormData({ ...formData, education: newEdu })
                            }}
                          />
                          <input
                            type="text"
                            placeholder="GPA (optional)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            value={edu.gpa}
                            onChange={(e) => {
                              const newEdu = [...formData.education]
                              newEdu[index].gpa = e.target.value
                              setFormData({ ...formData, education: newEdu })
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 4: Skills */}
          {step === 4 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Skills</h2>
                <button
                  onClick={addSkill}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Skill
                </button>
              </div>

              {formData.skills.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No skills added yet. Click "Add Skill" to start.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full"
                    >
                      <span>{skill}</span>
                      <button
                        onClick={() => removeSkill(index)}
                        className="hover:text-purple-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">🎉 Ready to Generate!</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Your resume is ready to be generated. Click the button below to create your ATS-friendly resume.
                </p>
                <button
                  onClick={handleGenerate}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold"
                >
                  <Download className="w-5 h-5" />
                  Generate Resume
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => setStep(Math.min(4, step + 1))}
            disabled={step === 4}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      <Navigation />
    </div>
  )
}