package com.example.exlogin.intervaceUsuario

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.exlogin.databinding.ActivityLoginBinding
import android.view.View
import android.widget.Toast
import com.example.exlogin.R
import com.example.exlogin.data.Mock
import com.example.exlogin.util.admDadosUsuario

class LoginActivity : AppCompatActivity(), View.OnClickListener {

    private lateinit var binding: ActivityLoginBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.brnEntrar.setOnClickListener(this)
    }

    override fun onClick(view: View) {
        if (view.id == R.id.brn_entrar) {
            logar()
        }
    }

    private fun logar() {

        val nome = binding.editNome.text.toString()
        val login = binding.editLogin.text.toString()
        val senha = binding.editSenha.text.toString()

        if (islogar(nome ,login, senha)) {
            if(Mock().verificarLogin(nome, login, senha)){
                admDadosUsuario(this).salvar("nome", login)
                startActivity(Intent(this, MainActivity::class.java))
            }else{
                Toast.makeText(this, "Dados incorretos.", Toast.LENGTH_SHORT).show()//toast é mostrar uma mesnsagem
            }

        } else {
            Toast.makeText(this, "preencha os campos corretamente", Toast.LENGTH_SHORT).show()
        }
    }

    private fun islogar(login : String, senha : String): Boolean {
        return login != "" && senha != ""
    }
}