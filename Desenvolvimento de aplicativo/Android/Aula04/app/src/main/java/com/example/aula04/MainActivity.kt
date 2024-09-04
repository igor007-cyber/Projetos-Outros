package com.example.aula04

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.MenuItem
import android.widget.TextView

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        val myText: TextView = findViewById(R.id.textView)
        return when (item.itemId) {
            R.id.action_settings -> {
                myText.text = "Settings option"
                return true
            }
            R.id.action_other -> {
                myText.text = "Other option"
                return true
            }
            else -> super.onOptionsItemSelected(item)
        }
    }
}