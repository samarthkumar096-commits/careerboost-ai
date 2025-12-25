// Google Gemini AI Integration for CareerBoost AI
// Using Gemini 2.0 Flash - Fast, Free, and Powerful!

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'your-gemini-api-key-here'
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent'

// Generate content using Gemini
export const generateWithGemini = async (prompt, systemPrompt = 'You are a professional resume writer and career advisor.') => {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemPrompt}\n\n${prompt}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4000,
        }
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Gemini API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`)
    }

    const data = await response.json()
    const text = data.candidates[0].content.parts[0].text
    return { success: true, text }
  } catch (error) {
    console.error('Gemini API error:', error)
    return { success: false, error: error.message }
  }
}

// Generate professional resume
export const generateResume = async (userData) => {
  const systemPrompt = 'You are an expert resume writer with 10+ years of experience. Create professional, ATS-optimized resumes that get interviews.'
  
  const prompt = `
Create a professional, ATS-optimized resume based on the following information:

PERSONAL INFORMATION:
Name: ${userData.fullName}
Email: ${userData.email}
Phone: ${userData.phone || 'Not provided'}
Location: ${userData.location || 'Not provided'}

TARGET ROLE: ${userData.jobTitle}

PROFESSIONAL SUMMARY:
${userData.summary || 'Create a compelling 3-4 line professional summary highlighting key strengths and career goals'}

WORK EXPERIENCE:
${userData.experience || 'No experience provided - create 2-3 sample relevant experiences based on the target role'}

EDUCATION:
${userData.education || 'No education provided - create sample relevant education'}

SKILLS:
${userData.skills || 'Create 10-15 relevant technical and soft skills based on the target role'}

ADDITIONAL INFORMATION:
${userData.additional || 'None'}

INSTRUCTIONS:
1. Create a professional, ATS-optimized resume
2. Use clear sections: PROFESSIONAL SUMMARY, WORK EXPERIENCE, EDUCATION, SKILLS
3. Use bullet points (•) for achievements in work experience
4. Start each bullet with strong action verbs (Led, Developed, Managed, etc.)
5. Include metrics and quantifiable achievements where possible
6. Use relevant keywords for the target role
7. Keep it concise, impactful, and professional
8. Format should be clean and easy to read
9. Make it ATS-friendly (no tables, columns, or complex formatting)

Return ONLY the resume content in clean, well-formatted text. No additional commentary.
`

  return await generateWithGemini(prompt, systemPrompt)
}

// Check ATS Score
export const checkATSScore = async (resumeText, jobDescription) => {
  const systemPrompt = 'You are an ATS (Applicant Tracking System) expert and recruiter with deep knowledge of resume optimization.'
  
  const prompt = `
Analyze the following resume against the job description and provide a detailed ATS score.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

ANALYSIS REQUIRED:
1. Overall ATS Score (0-100)
2. Keyword Match Analysis
3. Format Compatibility
4. Content Quality
5. Missing Keywords
6. Improvement Suggestions

Provide a detailed analysis in the following JSON format:
{
  "score": 85,
  "keywordMatch": {
    "matched": ["keyword1", "keyword2"],
    "missing": ["keyword3", "keyword4"],
    "matchPercentage": 75
  },
  "formatScore": 90,
  "contentScore": 80,
  "suggestions": [
    "Add more quantifiable achievements",
    "Include missing keywords: keyword3, keyword4",
    "Improve professional summary"
  ],
  "strengths": [
    "Clear formatting",
    "Good use of action verbs"
  ],
  "weaknesses": [
    "Missing key technical skills",
    "Lacks metrics in experience section"
  ]
}

Return ONLY the JSON object, no additional text.
`

  return await generateWithGemini(prompt, systemPrompt)
}

// Improve resume section
export const improveResumeSection = async (section, sectionName, targetRole) => {
  const systemPrompt = 'You are a professional resume writer specializing in creating impactful, ATS-optimized content.'
  
  const prompt = `
Improve the following ${sectionName} section for a ${targetRole} role:

CURRENT CONTENT:
${section}

REQUIREMENTS:
1. Make it more impactful and professional
2. Use strong action verbs
3. Add quantifiable achievements where possible
4. Optimize for ATS with relevant keywords
5. Keep it concise and focused
6. Ensure it's tailored for ${targetRole} role

Return ONLY the improved content, no additional commentary.
`

  return await generateWithGemini(prompt, systemPrompt)
}

// Generate professional summary
export const generateProfessionalSummary = async (userData) => {
  const systemPrompt = 'You are an expert at writing compelling professional summaries that capture attention and highlight key strengths.'
  
  const prompt = `
Create a powerful 3-4 line professional summary for:

Role: ${userData.jobTitle}
Experience Level: ${userData.experienceLevel || 'Mid-level'}
Key Skills: ${userData.skills || 'Not provided'}
Career Goals: ${userData.careerGoals || 'Seeking challenging opportunities'}

REQUIREMENTS:
1. Start with a strong opening that defines the professional
2. Highlight 2-3 key strengths or achievements
3. Include relevant keywords for the role
4. End with career aspirations or value proposition
5. Keep it concise (3-4 lines maximum)
6. Make it ATS-friendly

Return ONLY the professional summary, no additional text.
`

  return await generateWithGemini(prompt, systemPrompt)
}

// Generate work experience bullet points
export const generateExperienceBullets = async (jobTitle, company, responsibilities) => {
  const systemPrompt = 'You are an expert at writing achievement-focused resume bullet points that showcase impact and results.'
  
  const prompt = `
Create 4-6 powerful bullet points for this work experience:

Job Title: ${jobTitle}
Company: ${company}
Responsibilities: ${responsibilities}

REQUIREMENTS:
1. Start each bullet with a strong action verb
2. Include quantifiable achievements (numbers, percentages, metrics)
3. Show impact and results, not just duties
4. Use the STAR method (Situation, Task, Action, Result)
5. Keep each bullet to 1-2 lines
6. Make them ATS-friendly with relevant keywords

Return ONLY the bullet points (one per line, starting with •), no additional text.
`

  return await generateWithGemini(prompt, systemPrompt)
}

// Optimize resume for specific job
export const optimizeForJob = async (resumeText, jobDescription) => {
  const systemPrompt = 'You are an expert at tailoring resumes to specific job descriptions for maximum ATS compatibility and recruiter appeal.'
  
  const prompt = `
Optimize this resume for the following job description:

CURRENT RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

REQUIREMENTS:
1. Incorporate relevant keywords from job description
2. Highlight matching skills and experiences
3. Adjust professional summary to align with role
4. Reorder or emphasize relevant achievements
5. Maintain ATS-friendly formatting
6. Keep the core content authentic
7. Ensure all changes are truthful and accurate

Return ONLY the optimized resume, no additional commentary.
`

  return await generateWithGemini(prompt, systemPrompt)
}

// Generate cover letter
export const generateCoverLetter = async (userData, jobDescription, companyName) => {
  const systemPrompt = 'You are an expert at writing compelling cover letters that get interviews.'
  
  const prompt = `
Create a professional cover letter for:

CANDIDATE INFO:
Name: ${userData.fullName}
Target Role: ${userData.jobTitle}
Key Skills: ${userData.skills || 'Not provided'}
Experience: ${userData.experience || 'Not provided'}

COMPANY: ${companyName}

JOB DESCRIPTION:
${jobDescription}

REQUIREMENTS:
1. Professional business letter format
2. Strong opening that captures attention
3. 2-3 paragraphs highlighting relevant skills and achievements
4. Show enthusiasm for the role and company
5. Include specific examples of relevant experience
6. Strong closing with call to action
7. Keep it to one page (300-400 words)

Return ONLY the cover letter content, no additional commentary.
`

  return await generateWithGemini(prompt, systemPrompt)
}

// Suggest skills based on job title
export const suggestSkills = async (jobTitle, experienceLevel = 'Mid-level') => {
  const systemPrompt = 'You are a career advisor with deep knowledge of job market trends and required skills across industries.'
  
  const prompt = `
Suggest 15-20 relevant skills for a ${experienceLevel} ${jobTitle} role.

REQUIREMENTS:
1. Include both technical and soft skills
2. Prioritize in-demand skills for this role
3. Mix of hard skills and soft skills
4. Industry-standard tools and technologies
5. Skills that are ATS-friendly

Return as a simple comma-separated list, no additional text.
Example: JavaScript, React, Node.js, Problem Solving, Team Leadership
`

  return await generateWithGemini(prompt, systemPrompt)
}

// Export all functions
export default {
  generateWithGemini,
  generateResume,
  checkATSScore,
  improveResumeSection,
  generateProfessionalSummary,
  generateExperienceBullets,
  optimizeForJob,
  generateCoverLetter,
  suggestSkills
}
