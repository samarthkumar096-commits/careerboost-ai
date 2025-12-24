// Google Gemini AI Integration for CareerBoost AI

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyDGXwf_wKqLvE8vY9Z5xQHxKzJxVxJxJxJ'
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

// Generate content using Gemini
export const generateWithGemini = async (prompt) => {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
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
  const prompt = `
You are a professional resume writer. Create a professional, ATS-optimized resume based on the following information:

Name: ${userData.fullName}
Email: ${userData.email}
Phone: ${userData.phone || 'Not provided'}
Location: ${userData.location || 'Not provided'}

Job Title/Target Role: ${userData.jobTitle}

Professional Summary/About:
${userData.summary || 'Create a compelling professional summary'}

Work Experience:
${userData.experience || 'No experience provided - create sample experience based on job title'}

Education:
${userData.education || 'No education provided - create sample education'}

Skills:
${userData.skills || 'Create relevant skills based on job title'}

Additional Information:
${userData.additional || 'None'}

Instructions:
1. Create a professional, ATS-optimized resume
2. Use clear sections: Summary, Experience, Education, Skills
3. Use bullet points for achievements
4. Include relevant keywords for the job title
5. Make it concise and impactful
6. Format in clean, readable structure
7. Focus on achievements and results

Return the resume in a clean, well-formatted text structure.
`

  return await generateWithGemini(prompt)
}

// Check ATS Score
export const checkATSScore = async (resumeText, jobDescription) => {
  const prompt = `
You are an ATS (Applicant Tracking System) expert. Analyze the following resume against the job description and provide a detailed score.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Analyze and provide:
1. Overall ATS Score (0-100)
2. Keyword Match Score (0-100)
3. Format Score (0-100)
4. Content Quality Score (0-100)

5. Strengths (3-5 points)
6. Weaknesses (3-5 points)
7. Missing Keywords (list important ones)
8. Improvement Suggestions (5-7 actionable tips)

Format your response as JSON:
{
  "overallScore": 85,
  "keywordScore": 80,
  "formatScore": 90,
  "contentScore": 85,
  "strengths": ["point 1", "point 2", ...],
  "weaknesses": ["point 1", "point 2", ...],
  "missingKeywords": ["keyword1", "keyword2", ...],
  "suggestions": ["tip 1", "tip 2", ...]
}
`

  const result = await generateWithGemini(prompt)
  
  if (result.success) {
    try {
      // Extract JSON from response
      const jsonMatch = result.text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const data = JSON.parse(jsonMatch[0])
        return { success: true, data }
      }
    } catch (error) {
      console.error('Error parsing ATS score:', error)
    }
  }
  
  return result
}

// Generate Cover Letter
export const generateCoverLetter = async (userData, jobDetails) => {
  const prompt = `
You are a professional cover letter writer. Create a compelling, personalized cover letter.

CANDIDATE INFORMATION:
Name: ${userData.fullName}
Email: ${userData.email}
Phone: ${userData.phone || ''}
Current Role: ${userData.currentRole || ''}
Experience: ${userData.experience || ''}
Skills: ${userData.skills || ''}

JOB DETAILS:
Company: ${jobDetails.company}
Position: ${jobDetails.position}
Job Description: ${jobDetails.description}

Additional Context:
${userData.additionalInfo || ''}

Instructions:
1. Create a professional, engaging cover letter
2. Address the hiring manager (use "Dear Hiring Manager" if name not provided)
3. Show enthusiasm for the role and company
4. Highlight relevant experience and skills
5. Explain why you're a great fit
6. Include a strong call to action
7. Keep it concise (3-4 paragraphs)
8. Professional tone but personable

Format the cover letter properly with:
- Your contact information
- Date
- Company address (if provided)
- Greeting
- Body paragraphs
- Closing
- Signature
`

  return await generateWithGemini(prompt)
}

// Optimize existing resume
export const optimizeResume = async (resumeText, targetRole) => {
  const prompt = `
You are a resume optimization expert. Improve the following resume for the target role: ${targetRole}

CURRENT RESUME:
${resumeText}

Instructions:
1. Improve formatting and structure
2. Add relevant keywords for ${targetRole}
3. Strengthen bullet points with action verbs
4. Quantify achievements where possible
5. Remove irrelevant information
6. Improve professional summary
7. Optimize for ATS systems
8. Make it more impactful

Return the optimized resume in clean, well-formatted text.
`

  return await generateWithGemini(prompt)
}

// Generate interview questions
export const generateInterviewQuestions = async (jobTitle, company, jobDescription) => {
  const prompt = `
Generate 15 common interview questions for the following role:

Job Title: ${jobTitle}
Company: ${company || 'Not specified'}
Job Description: ${jobDescription || 'Not provided'}

Provide:
1. 5 General/Behavioral questions
2. 5 Technical/Role-specific questions
3. 5 Company/Culture fit questions

Format as JSON:
{
  "general": ["question 1", "question 2", ...],
  "technical": ["question 1", "question 2", ...],
  "cultural": ["question 1", "question 2", ...]
}
`

  const result = await generateWithGemini(prompt)
  
  if (result.success) {
    try {
      const jsonMatch = result.text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const data = JSON.parse(jsonMatch[0])
        return { success: true, data }
      }
    } catch (error) {
      console.error('Error parsing questions:', error)
    }
  }
  
  return result
}

// Analyze job description
export const analyzeJobDescription = async (jobDescription) => {
  const prompt = `
Analyze the following job description and extract key information:

JOB DESCRIPTION:
${jobDescription}

Provide:
1. Required Skills (list)
2. Preferred Skills (list)
3. Key Responsibilities (list)
4. Required Experience Level
5. Education Requirements
6. Important Keywords for ATS
7. Company Culture Indicators
8. Red Flags (if any)

Format as JSON:
{
  "requiredSkills": ["skill1", "skill2", ...],
  "preferredSkills": ["skill1", "skill2", ...],
  "responsibilities": ["resp1", "resp2", ...],
  "experienceLevel": "Junior/Mid/Senior",
  "education": "requirement",
  "keywords": ["keyword1", "keyword2", ...],
  "culture": ["indicator1", "indicator2", ...],
  "redFlags": ["flag1", "flag2", ...]
}
`

  const result = await generateWithGemini(prompt)
  
  if (result.success) {
    try {
      const jsonMatch = result.text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const data = JSON.parse(jsonMatch[0])
        return { success: true, data }
      }
    } catch (error) {
      console.error('Error parsing job analysis:', error)
    }
  }
  
  return result
}

// Get resume improvement tips
export const getResumeTips = async (resumeText) => {
  const prompt = `
Review this resume and provide 10 specific, actionable improvement tips:

RESUME:
${resumeText}

Provide tips on:
- Formatting and structure
- Content and wording
- Keywords and ATS optimization
- Achievements and impact
- Skills presentation
- Overall effectiveness

Return as a simple numbered list of tips.
`

  return await generateWithGemini(prompt)
}