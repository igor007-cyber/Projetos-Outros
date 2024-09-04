package com.example.myapplication

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.example.myapplication.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity(), View.OnClickListener {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
                binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnCalcular.setOnClickListener(this)
        binding.caixinha.setOnClickListener(this)

    }

    override fun onClick(view: View) {
        if (view.id==R.id.btnCalcular){
            calcularKM()
        }
        if (view.id==R.id.caixinha){
            Caixinha()
        }
    }

    fun Caixinha(){
        if (binding.caixinha.isChecked){
            binding.VOLTA.text = binding.IDA.text
        }else{
            binding.VOLTA.text = null
        }
    }

    fun calcularKM(){

        val DistIDA = binding.IDA.text.toString().toFloat()
        val DistVOLTA = binding.VOLTA.text.toString().toFloat()
        val Preco = binding.PRECO.text.toString().toFloat()
        val Fator = binding.FATOR.text.toString().toFloat()
        val QtdDiarias = binding.QTDIARIAS.text.toString().toFloat()
        val valorDiaria = binding.VALORDIARIA.text.toString().toFloat()

        val resultado = ((DistIDA + DistVOLTA) * Preco * Fator + (QtdDiarias * valorDiaria))

        binding.lblResultado.text = "R$ ${resultado}"
    }
}