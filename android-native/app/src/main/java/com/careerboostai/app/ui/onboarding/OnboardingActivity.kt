package com.careerboostai.app.ui.onboarding

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.viewpager2.widget.ViewPager2
import com.careerboostai.app.R
import com.careerboostai.app.databinding.ActivityOnboardingBinding
import com.careerboostai.app.ui.main.MainActivity
import com.google.android.material.tabs.TabLayoutMediator

class OnboardingActivity : AppCompatActivity() {
    
    private lateinit var binding: ActivityOnboardingBinding
    private lateinit var adapter: OnboardingAdapter
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityOnboardingBinding.inflate(layoutInflater)
        setContentView(binding.root)
        
        setupViewPager()
        setupButtons()
    }
    
    private fun setupViewPager() {
        val items = listOf(
            OnboardingItem(
                "🎯",
                getString(R.string.onboarding_title_1),
                getString(R.string.onboarding_desc_1)
            ),
            OnboardingItem(
                "📝",
                getString(R.string.onboarding_title_2),
                getString(R.string.onboarding_desc_2)
            ),
            OnboardingItem(
                "🚀",
                getString(R.string.onboarding_title_3),
                getString(R.string.onboarding_desc_3)
            )
        )
        
        adapter = OnboardingAdapter(items)
        binding.viewPager.adapter = adapter
        
        TabLayoutMediator(binding.tabLayout, binding.viewPager) { _, _ -> }.attach()
        
        binding.viewPager.registerOnPageChangeCallback(object : ViewPager2.OnPageChangeCallback() {
            override fun onPageSelected(position: Int) {
                updateButtons(position)
            }
        })
    }
    
    private fun setupButtons() {
        binding.btnSkip.setOnClickListener {
            finishOnboarding()
        }
        
        binding.btnNext.setOnClickListener {
            if (binding.viewPager.currentItem < 2) {
                binding.viewPager.currentItem += 1
            } else {
                finishOnboarding()
            }
        }
    }
    
    private fun updateButtons(position: Int) {
        if (position == 2) {
            binding.btnNext.text = getString(R.string.get_started)
            binding.btnSkip.visibility = android.view.View.GONE
        } else {
            binding.btnNext.text = getString(R.string.next)
            binding.btnSkip.visibility = android.view.View.VISIBLE
        }
    }
    
    private fun finishOnboarding() {
        getSharedPreferences("CareerBoostPrefs", MODE_PRIVATE)
            .edit()
            .putBoolean("onboarding_completed", true)
            .apply()
        
        startActivity(Intent(this, MainActivity::class.java))
        finish()
    }
}

data class OnboardingItem(
    val icon: String,
    val title: String,
    val description: String
)
