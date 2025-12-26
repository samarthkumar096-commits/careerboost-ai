package com.careerboostai.app.api

import com.google.gson.annotations.SerializedName

// Job Search Response
data class JobSearchResponse(
    @SerializedName("jobs")
    val jobs: List<Job>,
    @SerializedName("total")
    val total: Int
)

data class Job(
    @SerializedName("id")
    val id: String,
    @SerializedName("title")
    val title: String,
    @SerializedName("company")
    val company: String,
    @SerializedName("location")
    val location: String,
    @SerializedName("salary")
    val salary: String?,
    @SerializedName("description")
    val description: String,
    @SerializedName("posted_date")
    val postedDate: String
)

// Resume Data
data class ResumeRequest(
    @SerializedName("name")
    val name: String,
    @SerializedName("email")
    val email: String,
    @SerializedName("phone")
    val phone: String,
    @SerializedName("skills")
    val skills: List<String>,
    @SerializedName("experience")
    val experience: List<Experience>
)

data class Experience(
    @SerializedName("company")
    val company: String,
    @SerializedName("position")
    val position: String,
    @SerializedName("duration")
    val duration: String,
    @SerializedName("description")
    val description: String
)

data class ResumeResponse(
    @SerializedName("success")
    val success: Boolean,
    @SerializedName("resume_url")
    val resumeUrl: String?,
    @SerializedName("message")
    val message: String
)

// Skill Assessment
data class SkillAssessmentRequest(
    @SerializedName("skill")
    val skill: String,
    @SerializedName("level")
    val level: String
)

data class SkillAssessmentResponse(
    @SerializedName("score")
    val score: Int,
    @SerializedName("feedback")
    val feedback: String,
    @SerializedName("recommendations")
    val recommendations: List<String>
)

// AI Career Coach
data class CareerCoachRequest(
    @SerializedName("question")
    val question: String,
    @SerializedName("context")
    val context: Map<String, String>?
)

data class CareerCoachResponse(
    @SerializedName("answer")
    val answer: String,
    @SerializedName("suggestions")
    val suggestions: List<String>
)

// Learning Paths
data class LearningPathsResponse(
    @SerializedName("paths")
    val paths: List<LearningPath>
)

data class LearningPath(
    @SerializedName("id")
    val id: String,
    @SerializedName("title")
    val title: String,
    @SerializedName("description")
    val description: String,
    @SerializedName("duration")
    val duration: String,
    @SerializedName("courses")
    val courses: List<Course>
)

data class Course(
    @SerializedName("id")
    val id: String,
    @SerializedName("title")
    val title: String,
    @SerializedName("provider")
    val provider: String,
    @SerializedName("url")
    val url: String
)

// Career Tips
data class CareerTipsResponse(
    @SerializedName("tips")
    val tips: List<CareerTip>
)

data class CareerTip(
    @SerializedName("id")
    val id: String,
    @SerializedName("title")
    val title: String,
    @SerializedName("content")
    val content: String,
    @SerializedName("category")
    val category: String
)

// Generic API Response
data class ApiResponse<T>(
    @SerializedName("success")
    val success: Boolean,
    @SerializedName("data")
    val data: T?,
    @SerializedName("message")
    val message: String?
)
