package com.careerboostai.app.api

import retrofit2.Response
import retrofit2.http.*

interface ApiService {
    
    // Job Search
    @GET("api/jobs/search")
    suspend fun searchJobs(
        @Query("query") query: String,
        @Query("location") location: String? = null,
        @Query("page") page: Int = 1
    ): Response<JobSearchResponse>
    
    // Resume Builder
    @POST("api/resume/create")
    suspend fun createResume(
        @Body request: ResumeRequest
    ): Response<ResumeResponse>
    
    @GET("api/resume/templates")
    suspend fun getResumeTemplates(): Response<List<String>>
    
    // Skill Assessment
    @POST("api/skills/assess")
    suspend fun assessSkill(
        @Body request: SkillAssessmentRequest
    ): Response<SkillAssessmentResponse>
    
    @GET("api/skills/list")
    suspend fun getSkillsList(): Response<List<String>>
    
    // AI Career Coach
    @POST("api/coach/ask")
    suspend fun askCareerCoach(
        @Body request: CareerCoachRequest
    ): Response<CareerCoachResponse>
    
    @GET("api/coach/suggestions")
    suspend fun getCareerSuggestions(): Response<List<String>>
    
    // Learning Paths
    @GET("api/learning/paths")
    suspend fun getLearningPaths(
        @Query("category") category: String? = null
    ): Response<LearningPathsResponse>
    
    @GET("api/learning/path/{id}")
    suspend fun getLearningPathDetails(
        @Path("id") pathId: String
    ): Response<LearningPath>
    
    // Career Tips
    @GET("api/tips")
    suspend fun getCareerTips(
        @Query("category") category: String? = null
    ): Response<CareerTipsResponse>
    
    @GET("api/tips/{id}")
    suspend fun getTipDetails(
        @Path("id") tipId: String
    ): Response<CareerTip>
    
    // User Profile
    @GET("api/user/profile")
    suspend fun getUserProfile(): Response<ApiResponse<Map<String, Any>>>
    
    @PUT("api/user/profile")
    suspend fun updateUserProfile(
        @Body profile: Map<String, Any>
    ): Response<ApiResponse<Boolean>>
}
