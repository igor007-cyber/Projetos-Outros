using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CamaraFollow : MonoBehaviour
{
    public Transform Player;
    public float ValorSuave = 0.f;
    public Vector3 Velocidade;

    void Update()
    {

        transform.position = Vector3.SmoothDamp(transform.position, Player.position, ref Velocidade, ValorSuave);

    }
}
