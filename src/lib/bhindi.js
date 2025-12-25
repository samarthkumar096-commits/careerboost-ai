// Bhindi AI API Integration
// This allows your app to use Bhindi AI's powerful features

const BHINDI_API_URL = 'https://api.bhindi.io/v1'
const BHINDI_API_KEY = import.meta.env.VITE_BHINDI_API_KEY || ''

// Chat with Bhindi AI
export const chatWithBhindi = async (message, conversationId = null) => {
  try {
    const response = await fetch(`${BHINDI_API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BHINDI_API_KEY}`
      },
      body: JSON.stringify({
        message,
        conversationId,
        context: {
          app: 'CareerBoost AI',
          feature: 'resume-assistant'
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Bhindi API error: ${response.status}`)
    }

    const data = await response.json()
    return { 
      success: true, 
      message: data.response,
      conversationId: data.conversationId 
    }
  } catch (error) {
    console.error('Bhindi AI error:', error)
    return { success: false, error: error.message }
  }
}

// Generate resume using Bhindi AI with multiple model support
export const generateResumeWithBhindi = async (userData, model = 'deepseek') => {
  const prompt = `
Create a professional, ATS-optimized resume for:

Name: ${userData.fullName}
Email: ${userData.email}
Phone: ${userData.phone || ''}
Location: ${userData.location || ''}
Target Role: ${userData.jobTitle}
Summary: ${userData.summary || 'Create compelling summary'}
Experience: ${userData.experience || 'Create relevant experience'}
Education: ${userData.education || 'Create relevant education'}
Skills: ${userData.skills || 'Create relevant skills'}
Additional: ${userData.additional || ''}

Create a professional resume with clear sections, bullet points, and ATS optimization.
`

  try {
    const response = await fetch(`${BHINDI_API_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BHINDI_API_KEY}`
      },
      body: JSON.stringify({
        prompt,
        model, // deepseek, gpt-4, claude, gemini, etc.
        maxTokens: 4000,
        temperature: 0.7,
        context: {
          type: 'resume-generation',
          app: 'CareerBoost AI'
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Bhindi API error: ${response.status}`)
    }

    const data = await response.json()
    return { success: true, text: data.content }
  } catch (error) {
    console.error('Bhindi AI error:', error)
    return { success: false, error: error.message }
  }
}

// Check ATS score using Bhindi AI
export const checkATSWithBhindi = async (resumeText, jobDescription, model = 'deepseek') => {
  const prompt = `
Analyze this resume against the job description and provide detailed ATS score.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Return ONLY valid JSON with scores and analysis:
{
  "overallScore": 85,
  "keywordScore": 80,
  "formatScore": 90,
  "contentScore": 85,
  "strengths": ["strength1", "strength2", "strength3"],
  "weaknesses": ["weakness1", "weakness2", "weakness3"],
  "missingKeywords": ["keyword1", "keyword2", "keyword3"],
  "suggestions": ["tip1", "tip2", "tip3"]
}
`

  try {
    const response = await fetch(`${BHINDI_API_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BHINDI_API_KEY}`
      },
      body: JSON.stringify({
        prompt,
        model,
        maxTokens: 2000,
        temperature: 0.5,
        context: {
          type: 'ats-analysis',
          app: 'CareerBoost AI'
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Bhindi API error: ${response.status}`)
    }

    const data = await response.json()
    
    // Parse JSON from response
    let cleanText = data.content.trim()
    cleanText = cleanText.replace(/```json\n?/g, '')
    cleanText = cleanText.replace(/```\n?/g, '')
    cleanText = cleanText.trim()
    
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsedData = JSON.parse(jsonMatch[0])
      return { success: true, data: parsedData }
    }
    
    throw new Error('Failed to parse ATS score')
  } catch (error) {
    console.error('Bhindi AI error:', error)
    return { success: false, error: error.message }
  }
}

// Get career advice from Bhindi AI
export const getCareerAdvice = async (question, userContext = {}) => {
  const prompt = `
User Context:
${JSON.stringify(userContext, null, 2)}

Question: ${question}

Provide helpful, actionable career advice.
`

  try {
    const response = await fetch(`${BHINDI_API_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BHINDI_API_KEY}`
      },
      body: JSON.stringify({
        prompt,
        model: 'deepseek',
        maxTokens: 1000,
        temperature: 0.7,
        context: {
          type: 'career-advice',
          app: 'CareerBoost AI'
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Bhindi API error: ${response.status}`)
    }

    const data = await response.json()
    return { success: true, advice: data.content }
  } catch (error) {
    console.error('Bhindi AI error:', error)
    return { success: false, error: error.message }
  }
}

// List available AI models
export const listAvailableModels = async () => {
  try {
    const response = await fetch(`${BHINDI_API_URL}/models`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${BHINDI_API_KEY}`
      }
    })

    if (!response.ok) {
      throw new Error(`Bhindi API error: ${response.status}`)
    }

    const data = await response.json()
    return { success: true, models: data.models }
  } catch (error) {
    console.error('Bhindi AI error:', error)
    return { success: false, error: error.message }
  }
}

// Analyze job description using Bhindi AI
export const analyzeJobWithBhindi = async (jobDescription) => {
  const prompt = `
Analyze this job description and extract key information:

${jobDescription}

Return ONLY valid JSON:
{
  "requiredSkills": ["skill1", "skill2"],
  "preferredSkills": ["skill1", "skill2"],
  "responsibilities": ["resp1", "resp2"],
  "experienceLevel": "Mid-level",
  "education": "Bachelor's required",
  "keywords": ["keyword1", "keyword2"],
  "culture": ["indicator1", "indicator2"],
  "redFlags": ["flag1"]
}
`

  try {
    const response = await fetch(`${BHINDI_API_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BHINDI_API_KEY}`
      },
      body: JSON.stringify({
        prompt,
        model: 'deepseek',
        maxTokens: 1500,
        temperature: 0.5
      })
    })

    if (!response.ok) {
      throw new Error(`Bhindi API error: ${response.status}`)
    }

    const data = await response.json()
    
    let cleanText = data.content.trim()
    cleanText = cleanText.replace(/```json\n?/g, '')
    cleanText = cleanText.replace(/```\n?/g, '')
    cleanText = cleanText.trim()
    
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsedData = JSON.parse(jsonMatch[0])
      return { success: true, data: parsedData }
    }
    
    throw new Error('Failed to parse job analysis')
  } catch (error) {
    console.error('Bhindi AI error:', error)
    return { success: false, error: error.message }
  }
}

// Generate cover letter using Bhindi AI
export const generateCoverLetterWithBhindi = async (userData, jobDetails) => {
  const prompt = `
Create a professional cover letter:

Candidate: ${userData.fullName}
Email: ${userData.email}
Phone: ${userData.phone || ''}
Current Role: ${userData.currentRole || ''}
Experience: ${userData.experience || ''}
Skills: ${userData.skills || ''}

Job:
Company: ${jobDetails.company}
Position: ${jobDetails.position}
Description: ${jobDetails.description}

Create a compelling, personalized cover letter (3-4 paragraphs).
`

  try {
    const response = await fetch(`${BHINDI_API_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BHINDI_API_KEY}`
      },
      body: JSON.stringify({
        prompt,
        model: 'deepseek',
        maxTokens: 2000,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error(`Bhindi API error: ${response.status}`)
    }

    const data = await response.json()
    return { success: true, text: data.content }
  } catch (error) {
    console.error('Bhindi AI error:', error)
    return { success: false, error: error.message }
  }
}