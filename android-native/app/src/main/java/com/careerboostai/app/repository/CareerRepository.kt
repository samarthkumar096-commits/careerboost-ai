package com.careerboostai.app.repository

import com.careerboostai.app.api.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class CareerRepository {
    
    private val apiService = RetrofitClient.apiService
    
    // Job Search
    suspend fun searchJobs(query: String, location: String? = null): Result<JobSearchResponse> {
        return withContext(Dispatchers.IO) {
            try {
                val response = apiService.searchJobs(query, location)
                if (response.isSuccessful && response.body() != null) {
                    Result.success(response.body()!!)
                } else {
                    Result.failure(Exception("Failed to fetch jobs: ${response.message()}"))
                }
            } catch (e: Exception) {
                Result.failure(e)
            }
        }
    }
    
    // Resume Builder
    suspend fun createResume(request: ResumeRequest): Result<ResumeResponse> {
        return withContext(Dispatchers.IO) {
            try {
                val response = apiService.createResume(request)
                if (response.isSuccessful && response.body() != null) {
                    Result.success(response.body()!!)
                } else {
                    Result.failure(Exception("Failed to create resume: ${response.message()}"))
                }
            } catch (e: Exception) {
                Result.failure(e)
            }
        }
    }
    
    suspend fun getResumeTemplates(): Result<List<String>> {
        return withContext(Dispatchers.IO) {
            try {
                val response = apiService.getResumeTemplates()
                if (response.isSuccessful && response.body() != null) {
                    Result.success(response.body()!!)
                } else {
                    Result.failure(Exception("Failed to fetch templates: ${response.message()}"))
                }
            } catch (e: Exception) {
                Result.failure(e)
            }
        }
    }
    
    // Skill Assessment
    suspend fun assessSkill(request: SkillAssessmentRequest): Result<SkillAssessmentResponse> {
        return withContext(Dispatchers.IO) {
            try {
                val response = apiService.assessSkill(request)
                if (response.isSuccessful && response.body() != null) {
                    Result.success(response.body()!!)
                } else {
                    Result.failure(Exception("Failed to assess skill: ${response.message()}"))
                }
            } catch (e: Exception) {
                Result.failure(e)
            }
        }
    }
    
    // AI Career Coach
    suspend fun askCareerCoach(question: String, context: Map<String, String>? = null): Result<CareerCoachResponse> {
        return withContext(Dispatchers.IO) {
            try {
                val request = CareerCoachRequest(question, context)
                val response = apiService.askCareerCoach(request)
                if (response.isSuccessful && response.body() != null) {
                    Result.success(response.body()!!)
                } else {
                    Result.failure(Exception("Failed to get coach response: ${response.message()}"))
                }
            } catch (e: Exception) {
                Result.failure(e)
            }
        }
    }
    
    // Learning Paths
    suspend fun getLearningPaths(category: String? = null): Result<LearningPathsResponse> {
        return withContext(Dispatchers.IO) {
            try {
                val response = apiService.getLearningPaths(category)
                if (response.isSuccessful && response.body() != null) {
                    Result.success(response.body()!!)
                } else {
                    Result.failure(Exception("Failed to fetch learning paths: ${response.message()}"))
                }
            } catch (e: Exception) {
                Result.failure(e)
            }
        }
    }
    
    // Career Tips
    suspend fun getCareerTips(category: String? = null): Result<CareerTipsResponse> {
        return withContext(Dispatchers.IO) {
            try {
                val response = apiService.getCareerTips(category)
                if (response.isSuccessful && response.body() != null) {
                    Result.success(response.body()!!)
                } else {
                    Result.failure(Exception("Failed to fetch career tips: ${response.message()}"))
                }
            } catch (e: Exception) {
                Result.failure(e)
            }
        }
    }
}
