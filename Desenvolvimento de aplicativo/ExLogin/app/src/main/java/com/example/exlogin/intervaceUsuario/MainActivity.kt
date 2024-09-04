package com.example.exlogin.intervaceUsuario

import android.content.Context
import android.content.SharedPreferences
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.provider.SyncStateContract.Constants
import com.example.exlogin.databinding.ActivityLoginBinding
import com.example.exlogin.databinding.ActivityMainBinding
import com.example.exlogin.util.admDadosUsuario

class MainActivity : AppCompatActivity() {

    private lateinit var binding : ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)

        setContentView(binding.root)

        setMensagem()

       // admDadosUsuario(this).buscar("nome")

    }

    fun setMensagem(){
        val login = AdmDadosUsuario(this).buscar(Constantes.key.USER_NAME);
        val nome = Mock()getNome(login)
        binding.textMansage.text = "Ola, $nome!"
    }
}