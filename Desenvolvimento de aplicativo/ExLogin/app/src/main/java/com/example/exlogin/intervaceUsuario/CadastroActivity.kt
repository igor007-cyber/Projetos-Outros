package com.example.exlogin.intervaceUsuario

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.exlogin.R
import com.example.exlogin.databinding.ActivityCadastroBinding
import com.example.exlogin.databinding.ActivityMainBinding

class CadastroActivity : AppCompatActivity() {
    lateinit var binding: ActivityCadastroBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)


        setContentView(R.layout.activity_cadastro)
    }
}