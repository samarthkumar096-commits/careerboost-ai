import fetch from 'node-fetch'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || ''
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'

export const generateResumeContent = async (formData) => {
  try {
    const prompt = `You are an expert resume writer. Generate a professional, ATS-friendly resume based on the following information:

Personal Info:
- Name: ${formData.personalInfo.fullName}
- Email: ${formData.personalInfo.email}
- Phone: ${formData.personalInfo.phone}
- Location: ${formData.personalInfo.location}
- LinkedIn: ${formData.personalInfo.linkedin || 'N/A'}
- Portfolio: ${formData.personalInfo.portfolio || 'N/A'}

Professional Summary:
${formData.summary || 'Not provided'}

Work Experience:
${formData.experience.map((exp, i) => `
${i + 1}. ${exp.title} at ${exp.company}
   ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}
   ${exp.description}
`).join('\n')}

Education:
${formData.education.map((edu, i) => `
${i + 1}. ${edu.degree} from ${edu.school}
   Graduated: ${edu.graduationDate}
   ${edu.gpa ? `GPA: ${edu.gpa}` : ''}
`).join('\n')}

Skills:
${formData.skills.join(', ')}

Please generate:
1. An optimized professional summary (2-3 sentences)
2. Improved work experience descriptions with action verbs and quantifiable achievements
3. A well-formatted resume structure

Format the output as JSON with this structure:
{
  "summary": "optimized summary",
  "experience": [
    {
      "title": "job title",
      "company": "company name",
      "duration": "dates",
      "bullets": ["achievement 1", "achievement 2", "achievement 3"]
    }
  ],
  "suggestions": ["tip 1", "tip 2", "tip 3"]
}`

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://careerboost-ai.vercel.app',
        'X-Title': 'CareerBoost AI'
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    })

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`)
    }

    const data = await response.json()
    const content = data.choices[0].message.content

    // Try to parse JSON response
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
    } catch (e) {
      console.error('Failed to parse AI response as JSON:', e)
    }

    // Fallback: return raw content
    return {
      summary: formData.summary,
      experience: formData.experience,
      suggestions: ['Use action verbs', 'Quantify achievements', 'Keep it concise'],
      rawContent: content
    }
  } catch (error) {
    console.error('AI Service Error:', error)
    throw error
  }
}

export const generateCoverLetter = async (jobTitle, companyName, resumeData) => {
  try {
    const prompt = `Generate a professional cover letter for:
Job Title: ${jobTitle}
Company: ${companyName}

Candidate Info:
Name: ${resumeData.personalInfo.fullName}
Summary: ${resumeData.summary}
Key Skills: ${resumeData.skills.slice(0, 5).join(', ')}

Write a compelling 3-paragraph cover letter that:
1. Shows enthusiasm for the role
2. Highlights relevant experience and skills
3. Includes a strong call to action

Keep it professional, concise, and ATS-friendly.`

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://careerboost-ai.vercel.app',
        'X-Title': 'CareerBoost AI'
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 1000
      })
    })

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error('Cover Letter Generation Error:', error)
    throw error
  }
}

export const calculateATSScore = async (resumeText) => {
  try {
    const prompt = `Analyze this resume for ATS (Applicant Tracking System) compatibility and provide a score out of 100.

Resume:
${resumeText}

Evaluate based on:
1. Keyword optimization
2. Formatting (simple, clean structure)
3. Section organization
4. Action verbs usage
5. Quantifiable achievements
6. Contact information clarity
7. File format compatibility

Provide response as JSON:
{
  "score": 85,
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["improvement 1", "improvement 2"],
  "keywords": ["keyword1", "keyword2"]
}`

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://careerboost-ai.vercel.app',
        'X-Title': 'CareerBoost AI'
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.5,
        max_tokens: 1000
      })
    })

    const data = await response.json()
    const content = data.choices[0].message.content

    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
    } catch (e) {
      console.error('Failed to parse ATS score response:', e)
    }

    return {
      score: 75,
      strengths: ['Clear structure', 'Good formatting'],
      improvements: ['Add more keywords', 'Quantify achievements'],
      keywords: []
    }
  } catch (error) {
    console.error('ATS Score Error:', error)
    throw error
  }
}