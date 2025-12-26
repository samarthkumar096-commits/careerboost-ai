package com.careerboostai.app.ui.home

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.GridLayoutManager
import com.careerboostai.app.R
import com.careerboostai.app.databinding.FragmentHomeBinding
import com.careerboostai.app.repository.CareerRepository
import kotlinx.coroutines.launch

class HomeFragment : Fragment() {
    
    private var _binding: FragmentHomeBinding?  = null
    private val binding get() = _binding!!
    private val repository = CareerRepository()
    
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        return binding.root
    }
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        
        setupQuickActions()
        loadDashboardData()
    }
    
    private fun setupQuickActions() {
        val actions = listOf(
            QuickAction("💼", "Job Search", "Find your dream job"),
            QuickAction("📝", "Resume", "Build your resume"),
            QuickAction("🎯", "Skills", "Test your skills"),
            QuickAction("🤖", "AI Coach", "Get career advice"),
            QuickAction("📚", "Learn", "Explore courses"),
            QuickAction("💡", "Tips", "Career guidance")
        )
        
        val adapter = QuickActionsAdapter(actions) { action ->
            handleQuickAction(action)
        }
        
        binding.recyclerQuickActions.layoutManager = GridLayoutManager(context, 2)
        binding.recyclerQuickActions.adapter = adapter
    }
    
    private fun loadDashboardData() {
        binding.tvWelcome.text = "Welcome Back! 👋"
        
        // Load stats
        lifecycleScope.launch {
            try {
                // You can load user stats here
                binding.tvJobsApplied.text = "15"
                binding.tvInterviews.text = "5"
                binding.tvOffers.text = "2"
            } catch (e: Exception) {
                // Handle error
            }
        }
    }
    
    private fun handleQuickAction(action: QuickAction) {
        // Handle navigation based on action
        when (action.title) {
            "Job Search" -> {
                // Navigate to jobs fragment
                (activity as? com.careerboostai.app.MainActivity)?.let {
                    it.findViewById<com.google.android.material.bottomnavigation.BottomNavigationView>(
                        R.id.bottomNavigation
                    )?.selectedItemId = R.id.nav_jobs
                }
            }
            "Resume" -> {
                (activity as? com.careerboostai.app.MainActivity)?.let {
                    it.findViewById<com.google.android.material.bottomnavigation.BottomNavigationView>(
                        R.id.bottomNavigation
                    )?.selectedItemId = R.id.nav_resume
                }
            }
            "Learn" -> {
                (activity as? com.careerboostai.app.MainActivity)?.let {
                    it.findViewById<com.google.android.material.bottomnavigation.BottomNavigationView>(
                        R.id.bottomNavigation
                    )?.selectedItemId = R.id.nav_learn
                }
            }
        }
    }
    
    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}

data class QuickAction(
    val icon: String,
    val title: String,
    val description: String
)
