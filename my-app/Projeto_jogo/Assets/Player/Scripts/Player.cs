using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour
{
    public Animator anim;
    public float speed;
    public float vida = 5, tempoMax = 1f, tempoMin, Cronometro; /*Na variavel tempo Max coloque o tempo por segundo
 que seu player vai tomar dano, Na variavel vida coloque a vida do player */
    public bool dano; //variaveis publicas bool.    

    // Update is called once per frame
    void Update()
    {
        Vector3 movement = new Vector3(Input.GetAxis("Horizontal"), Input.GetAxis("Vertical"), 0f);

        anim.SetFloat("Horizontal", movement.x);
        anim.SetFloat("Vertical", movement.y);
        anim.SetFloat("Speed", movement.magnitude);

        transform.position = transform.position + movement * speed * Time.deltaTime;

        if (dano == true)
        {
            LevarDano();
        }
        /*essa condição vai fazer o player morrer quando a vida dele for menor que 10*/
        if (vida < 0f)
        {
            Destroy(gameObject);
        }
    }
    /*Essa void vai dizer se o inimigo entrou na colisão do player*/
    void OnCollisionEnter2D(Collision2D C)
    {
        if (C.gameObject.tag == "Inimigo")
        {
            dano = true;
        }
    }
    /*Essa void vai dizer se o inimigo saio da colisão do player*/
    void OnCollisionExit2D(Collision2D CE)
    {
        if (CE.gameObject.tag == "Inimigo")
            dano = false;
    }

    void LevarDano()
    { /*Essa void vai fazer o player tomar o dano. talvez se alguem tiver duvida eu trago um tutorial explicando como
 ela funciona*/
        Cronometro += Time.deltaTime;
        if (tempoMin < Cronometro)
        {
            tempoMin += tempoMax;
            vida -= 1;
        }
    }
}
