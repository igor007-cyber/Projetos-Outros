package com.example.aula04
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.TextView

class OtherActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activitie_other)

        val textViewName : TextView = findViewById(R.id.textViewNome)
        val textViewAge : TextView = findViewById(R.id.textViewIdade)

        val bundle = intent.extras
        if (bundle != null) {
            textViewName.text = bundle.getString("name")
            textViewAge.text = bundle.getString("age")
        }

        val buttonExecute : Button = findViewById(R.id.buttonVoltar)
        buttonExecute.setOnClickListener {
            val out = getString(R.string.message, textViewName.text, textViewAge.text)
            val data = Intent()
            data.putExtra("result", out)
            setResult(RESULT_OK, data)
            finish()
        }
    }
}