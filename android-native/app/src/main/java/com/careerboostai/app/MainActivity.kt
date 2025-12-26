package com.careerboostai.app

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.cardview.widget.CardView
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

class MainActivity : AppCompatActivity() {
    
    private lateinit var searchInput: EditText
    private lateinit var searchButton: Button
    private lateinit var recyclerView: RecyclerView
    
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
            performSearch(query)
        }
    }
    
    private fun setupRecyclerView() {
        val actions = listOf(
            ActionItem("📝", "Resume Builder", "Create professional resume"),
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
        // TODO: Implement search functionality
        // For now, just show a toast
        android.widget.Toast.makeText(
            this,
            "Searching for: $query",
            android.widget.Toast.LENGTH_SHORT
        ).show()
    }
    
    private fun onActionClick(action: ActionItem) {
        // TODO: Navigate to respective screens
        android.widget.Toast.makeText(
            this,
            "Opening ${action.title}",
            android.widget.Toast.LENGTH_SHORT
        ).show()
    }
}

data class ActionItem(
    val icon: String,
    val title: String,
    val description: String
)
