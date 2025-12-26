package com.careerboostai.app

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.careerboostai.app.repository.CareerRepository
import kotlinx.coroutines.launch

class MainActivity : AppCompatActivity() {
    
    private lateinit var searchInput: EditText
    private lateinit var searchButton: Button
    private lateinit var recyclerView: RecyclerView
    private val repository = CareerRepository()
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        // Initialize views
        searchInput = findViewById(R.id.searchInput)
        searchButton = findViewById(R.id.searchButton)
        recyclerView = findViewById(R.id.recyclerView)
        
        // Setup RecyclerView
        setupRecyclerView()
        
        // Setup search button
        searchButton.setOnClickListener {
            val query = searchInput.text.toString()
            if (query.isNotEmpty()) {
                performSearch(query)
            } else {
                Toast.makeText(this, "Please enter a search query", Toast.LENGTH_SHORT).show()
            }
        }
    }
    
    private fun setupRecyclerView() {
        val actions = listOf(
            ActionItem("📝", "Resume Builder", "Create professional resume with AI"),
            ActionItem("💼", "Job Search", "Find your dream job"),
            ActionItem("🎯", "Skill Assessment", "Test your skills"),
            ActionItem("🤖", "AI Career Coach", "Get personalized advice"),
            ActionItem("📚", "Learning Paths", "Explore courses"),
            ActionItem("💡", "Career Tips", "Expert guidance")
        )
        
        recyclerView.layoutManager = LinearLayoutManager(this)
        recyclerView.adapter = ActionAdapter(actions) { action ->
            onActionClick(action)
        }
    }
    
    private fun performSearch(query: String) {
        // Show loading
        Toast.makeText(this, "Searching for: $query", Toast.LENGTH_SHORT).show()
        
        // Make API call
        lifecycleScope.launch {
            try {
                val result = repository.searchJobs(query)
                result.onSuccess { response ->
                    // Handle success
                    Toast.makeText(
                        this@MainActivity,
                        "Found ${response.total} jobs!",
                        Toast.LENGTH_LONG
                    ).show()
                    // TODO: Navigate to results screen with jobs data
                }.onFailure { error ->
                    // Handle error
                    Toast.makeText(
                        this@MainActivity,
                        "Error: ${error.message}",
                        Toast.LENGTH_LONG
                    ).show()
                }
            } catch (e: Exception) {
                Toast.makeText(
                    this@MainActivity,
                    "Network error: ${e.message}",
                    Toast.LENGTH_LONG
                ).show()
            }
        }
    }
    
    private fun onActionClick(action: ActionItem) {
        when (action.title) {
            "Resume Builder" -> openResumeBuilder()
            "Job Search" -> openJobSearch()
            "Skill Assessment" -> openSkillAssessment()
            "AI Career Coach" -> openCareerCoach()
            "Learning Paths" -> openLearningPaths()
            "Career Tips" -> openCareerTips()
        }
    }
    
    private fun openResumeBuilder() {
        Toast.makeText(this, "Opening Resume Builder...", Toast.LENGTH_SHORT).show()
        // TODO: Navigate to Resume Builder screen
        
        // Example API call
        lifecycleScope.launch {
            try {
                val result = repository.getResumeTemplates()
                result.onSuccess { templates ->
                    Toast.makeText(
                        this@MainActivity,
                        "Found ${templates.size} templates",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            } catch (e: Exception) {
                // Handle error
            }
        }
    }
    
    private fun openJobSearch() {
        Toast.makeText(this, "Opening Job Search...", Toast.LENGTH_SHORT).show()
        // TODO: Navigate to Job Search screen
    }
    
    private fun openSkillAssessment() {
        Toast.makeText(this, "Opening Skill Assessment...", Toast.LENGTH_SHORT).show()
        // TODO: Navigate to Skill Assessment screen
    }
    
    private fun openCareerCoach() {
        Toast.makeText(this, "Opening AI Career Coach...", Toast.LENGTH_SHORT).show()
        // TODO: Navigate to Career Coach screen
        
        // Example API call
        lifecycleScope.launch {
            try {
                val result = repository.askCareerCoach("How can I improve my career?")
                result.onSuccess { response ->
                    Toast.makeText(
                        this@MainActivity,
                        "Coach: ${response.answer.take(50)}...",
                        Toast.LENGTH_LONG
                    ).show()
                }
            } catch (e: Exception) {
                // Handle error
            }
        }
    }
    
    private fun openLearningPaths() {
        Toast.makeText(this, "Opening Learning Paths...", Toast.LENGTH_SHORT).show()
        // TODO: Navigate to Learning Paths screen
        
        // Example API call
        lifecycleScope.launch {
            try {
                val result = repository.getLearningPaths()
                result.onSuccess { response ->
                    Toast.makeText(
                        this@MainActivity,
                        "Found ${response.paths.size} learning paths",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            } catch (e: Exception) {
                // Handle error
            }
        }
    }
    
    private fun openCareerTips() {
        Toast.makeText(this, "Opening Career Tips...", Toast.LENGTH_SHORT).show()
        // TODO: Navigate to Career Tips screen
        
        // Example API call
        lifecycleScope.launch {
            try {
                val result = repository.getCareerTips()
                result.onSuccess { response ->
                    Toast.makeText(
                        this@MainActivity,
                        "Found ${response.tips.size} career tips",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            } catch (e: Exception) {
                // Handle error
            }
        }
    }
}

data class ActionItem(
    val icon: String,
    val title: String,
    val description: String
)
