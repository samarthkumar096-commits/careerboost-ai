package com.careerboostai.app

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.careerboostai.app.databinding.ActivityMainBinding
import com.careerboostai.app.ui.home.HomeFragment
import com.careerboostai.app.ui.jobs.JobsFragment
import com.careerboostai.app.ui.learn.LearnFragment
import com.careerboostai.app.ui.profile.ProfileFragment
import com.careerboostai.app.ui.resume.ResumeFragment
import com.google.android.material.navigation.NavigationBarView

class MainActivity : AppCompatActivity() {
    
    private lateinit var binding: ActivityMainBinding
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        
        // Set default fragment
        if (savedInstanceState == null) {
            loadFragment(HomeFragment())
        }
        
        // Setup bottom navigation
        binding.bottomNavigation.setOnItemSelectedListener(NavigationBarView.OnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.nav_home -> {
                    loadFragment(HomeFragment())
                    return@OnItemSelectedListener true
                }
                R.id.nav_jobs -> {
                    loadFragment(JobsFragment())
                    return@OnItemSelectedListener true
                }
                R.id.nav_resume -> {
                    loadFragment(ResumeFragment())
                    return@OnItemSelectedListener true
                }
                R.id.nav_learn -> {
                    loadFragment(LearnFragment())
                    return@OnItemSelectedListener true
                }
                R.id.nav_profile -> {
                    loadFragment(ProfileFragment())
                    return@OnItemSelectedListener true
                }
            }
            false
        })
    }
    
    private fun loadFragment(fragment: Fragment) {
        supportFragmentManager.beginTransaction()
            .replace(R.id.fragmentContainer, fragment)
            .commit()
    }
}
