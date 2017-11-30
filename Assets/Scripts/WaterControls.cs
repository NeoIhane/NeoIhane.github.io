using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class WaterControls : MonoBehaviour {

    public Renderer rend;
    void Start()
    {
        //rend = GetComponent<Renderer>();
        //rend.material.shader = Shader.Find("Alpha");
    }
    public void SetAlpha(float alpha)
    {
        //renderer.material.SetFloat("_Alpha", alpha);
        rend.material.SetFloat("_Alpha", alpha);

    }
}
