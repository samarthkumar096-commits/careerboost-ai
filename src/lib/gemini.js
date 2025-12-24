// DeepSeek AI Integration for CareerBoost AI
// DeepSeek is faster, cheaper, and more powerful than Gemini!

const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY || 'sk-your-api-key-here'
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'

// Generate content using DeepSeek
export const generateWithDeepSeek = async (prompt, systemPrompt = 'You are a professional resume writer and career advisor.') => {
  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
        stream: false
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`DeepSeek API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`)
    }

    const data = await response.json()
    const text = data.choices[0].message.content
    return { success: true, text }
  } catch (error) {
    console.error('DeepSeek API error:', error)
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

  return await generateWithDeepSeek(prompt, systemPrompt)
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

Analyze thoroughly and provide:
1. Overall ATS Score (0-100) - Be realistic and critical
2. Keyword Match Score (0-100) - How well keywords match
3. Format Score (0-100) - ATS-friendly formatting
4. Content Quality Score (0-100) - Professional quality

5. Strengths (3-5 specific points)
6. Weaknesses (3-5 specific points)
7. Missing Keywords (list 5-10 important keywords from job description)
8. Improvement Suggestions (5-7 actionable, specific tips)

IMPORTANT: Return ONLY a valid JSON object, no markdown, no code blocks, no additional text.

Format:
{
  "overallScore": 85,
  "keywordScore": 80,
  "formatScore": 90,
  "contentScore": 85,
  "strengths": ["Specific strength 1", "Specific strength 2", "Specific strength 3"],
  "weaknesses": ["Specific weakness 1", "Specific weakness 2", "Specific weakness 3"],
  "missingKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "suggestions": ["Specific tip 1", "Specific tip 2", "Specific tip 3", "Specific tip 4", "Specific tip 5"]
}
`

  const result = await generateWithDeepSeek(prompt, systemPrompt)
  
  if (result.success) {
    try {
      // Clean the response - remove markdown code blocks if present
      let cleanText = result.text.trim()
      cleanText = cleanText.replace(/```json\n?/g, '')
      cleanText = cleanText.replace(/```\n?/g, '')
      cleanText = cleanText.trim()
      
      // Extract JSON from response
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const data = JSON.parse(jsonMatch[0])
        return { success: true, data }
      } else {
        throw new Error('No valid JSON found in response')
      }
    } catch (error) {
      console.error('Error parsing ATS score:', error)
      console.log('Raw response:', result.text)
      return { success: false, error: 'Failed to parse ATS score. Please try again.' }
    }
  }
  
  return result
}

// Generate Cover Letter
export const generateCoverLetter = async (userData, jobDetails) => {
  const systemPrompt = 'You are a professional cover letter writer who creates compelling, personalized cover letters that get interviews.'
  
  const prompt = `
Create a compelling, personalized cover letter for the following:

CANDIDATE INFORMATION:
Name: ${userData.fullName}
Email: ${userData.email}
Phone: ${userData.phone || ''}
Current Role: ${userData.currentRole || ''}
Experience Summary: ${userData.experience || ''}
Key Skills: ${userData.skills || ''}

JOB DETAILS:
Company: ${jobDetails.company}
Position: ${jobDetails.position}
Job Description: ${jobDetails.description}

Additional Context:
${userData.additionalInfo || ''}

INSTRUCTIONS:
1. Create a professional, engaging cover letter (3-4 paragraphs)
2. Address the hiring manager (use "Dear Hiring Manager" if name not provided)
3. Opening: Show enthusiasm and mention the specific role
4. Body: Highlight 2-3 relevant achievements/experiences that match job requirements
5. Closing: Express interest in interview and thank them
6. Professional tone but personable and authentic
7. Include specific examples and metrics where possible
8. Show you researched the company

Format properly with:
[Your Name]
[Your Email]
[Your Phone]
[Date]

Dear Hiring Manager,

[Cover letter content]

Sincerely,
[Your Name]
`

  return await generateWithDeepSeek(prompt, systemPrompt)
}

// Optimize existing resume
export const optimizeResume = async (resumeText, targetRole) => {
  const systemPrompt = 'You are a resume optimization expert who improves resumes to get more interviews.'
  
  const prompt = `
Optimize and improve the following resume for the target role: ${targetRole}

CURRENT RESUME:
${resumeText}

INSTRUCTIONS:
1. Improve formatting and structure for ATS compatibility
2. Add relevant keywords for ${targetRole} naturally
3. Strengthen bullet points with powerful action verbs
4. Quantify achievements with metrics where possible
5. Remove irrelevant or weak information
6. Improve professional summary to be more impactful
7. Optimize skills section with in-demand skills
8. Ensure consistent formatting throughout
9. Make it more concise and impactful
10. Keep the best parts, enhance weak areas

Return the complete optimized resume in clean, well-formatted text.
`

  return await generateWithDeepSeek(prompt, systemPrompt)
}

// Generate interview questions
export const generateInterviewQuestions = async (jobTitle, company, jobDescription) => {
  const systemPrompt = 'You are an experienced interviewer and career coach who helps candidates prepare for interviews.'
  
  const prompt = `
Generate 15 realistic interview questions for:

Job Title: ${jobTitle}
Company: ${company || 'Not specified'}
Job Description: ${jobDescription || 'Not provided'}

Provide:
1. 5 General/Behavioral questions (STAR method applicable)
2. 5 Technical/Role-specific questions (relevant to the role)
3. 5 Company/Culture fit questions

IMPORTANT: Return ONLY a valid JSON object, no markdown, no code blocks.

Format:
{
  "general": ["Question 1?", "Question 2?", "Question 3?", "Question 4?", "Question 5?"],
  "technical": ["Question 1?", "Question 2?", "Question 3?", "Question 4?", "Question 5?"],
  "cultural": ["Question 1?", "Question 2?", "Question 3?", "Question 4?", "Question 5?"]
}
`

  const result = await generateWithDeepSeek(prompt, systemPrompt)
  
  if (result.success) {
    try {
      let cleanText = result.text.trim()
      cleanText = cleanText.replace(/```json\n?/g, '')
      cleanText = cleanText.replace(/```\n?/g, '')
      cleanText = cleanText.trim()
      
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/)
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
  const systemPrompt = 'You are a job market analyst and career advisor who helps candidates understand job requirements.'
  
  const prompt = `
Analyze this job description and extract key information:

JOB DESCRIPTION:
${jobDescription}

Provide detailed analysis:
1. Required Skills (must-have technical and soft skills)
2. Preferred Skills (nice-to-have skills)
3. Key Responsibilities (main duties)
4. Required Experience Level (Entry/Junior/Mid/Senior/Lead)
5. Education Requirements
6. Important Keywords for ATS (10-15 keywords)
7. Company Culture Indicators (what the job posting reveals)
8. Red Flags (if any concerning aspects)

IMPORTANT: Return ONLY a valid JSON object, no markdown, no code blocks.

Format:
{
  "requiredSkills": ["skill1", "skill2", "skill3"],
  "preferredSkills": ["skill1", "skill2", "skill3"],
  "responsibilities": ["responsibility1", "responsibility2", "responsibility3"],
  "experienceLevel": "Mid-level",
  "education": "Bachelor's degree required",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "culture": ["indicator1", "indicator2", "indicator3"],
  "redFlags": ["flag1", "flag2"]
}
`

  const result = await generateWithDeepSeek(prompt, systemPrompt)
  
  if (result.success) {
    try {
      let cleanText = result.text.trim()
      cleanText = cleanText.replace(/```json\n?/g, '')
      cleanText = cleanText.replace(/```\n?/g, '')
      cleanText = cleanText.trim()
      
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/)
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
  const systemPrompt = 'You are a resume expert who provides actionable improvement advice.'
  
  const prompt = `
Review this resume and provide 10 specific, actionable improvement tips:

RESUME:
${resumeText}

Provide tips on:
- Formatting and structure
- Content and wording
- Keywords and ATS optimization
- Achievements and impact statements
- Skills presentation
- Overall effectiveness
- Specific sections that need work

Return as a numbered list (1-10) with specific, actionable advice.
Each tip should be clear and implementable.
`

  return await generateWithDeepSeek(prompt, systemPrompt)
}

// Export for backward compatibility
export const generateWithGemini = generateWithDeepSeek