package com.careerboostai.app

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.cardview.widget.CardView
import androidx.recyclerview.widget.RecyclerView

class ActionAdapter(
    private val actions: List<ActionItem>,
    private val onItemClick: (ActionItem) -> Unit
) : RecyclerView.Adapter<ActionAdapter.ActionViewHolder>() {

    class ActionViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val card: CardView = view.findViewById(R.id.actionCard)
        val icon: TextView = view.findViewById(R.id.actionIcon)
        val title: TextView = view.findViewById(R.id.actionTitle)
        val description: TextView = view.findViewById(R.id.actionDescription)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ActionViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_action, parent, false)
        return ActionViewHolder(view)
    }

    override fun onBindViewHolder(holder: ActionViewHolder, position: Int) {
        val action = actions[position]
        holder.icon.text = action.icon
        holder.title.text = action.title
        holder.description.text = action.description
        
        holder.card.setOnClickListener {
            onItemClick(action)
        }
    }

    override fun getItemCount() = actions.size
}
