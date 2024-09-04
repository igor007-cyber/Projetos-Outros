package com.example.exlogin.util

import android.content.Context
import android.content.SharedPreferences

class admDadosUsuario(context: Context) {

    val sharedPreferences : SharedPreferences = context.getSharedPreferences("usuario", Context.MODE_PRIVATE)

    fun salvar(key : String, valor : String){
        sharedPreferences.edit().putString(key, valor).apply()
    }

    fun buscar(key: String) : String{
        return sharedPreferences.getString("nome", "") ?: ""
    }


}