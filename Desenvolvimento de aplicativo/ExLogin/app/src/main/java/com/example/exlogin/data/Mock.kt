package com.example.exlogin.data

data class Usuario(var nome : String,var login : String, var senha : String)

class Mock {

    private val usuarios : List<Usuario> = listOf(
            Usuario("igor", "hack","igor123"),
            Usuario("ilton", "doidim","desenho"),
            Usuario("ian", "irmao","ian123"),
            Usuario("juan", "top","juan123")
    )

    fun verificarLogin(nome : String,login : String, senha : String) : Boolean{
        val usuario = Usuario(nome,login, senha)

        val usariosLogados = usuarios.filter { it.login.equals(login) && it.senha.equals(senha) }
        return !usariosLogados.isNullOrEmpty();
    }

    fun getNome(login : String):String{

        var nome : String = ""

        usuarios.forEach{
            if(it.login.equals(login)){
                nome = it.nome
            }
        }
        return nome
    }
}