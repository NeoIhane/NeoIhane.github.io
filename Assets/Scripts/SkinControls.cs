using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SkinControls : MonoBehaviour 
{
    public Material[] mat;
    public GameObject[] go;
    public Color color_start;
    public Color color_end;
	
    public void ChangeSkin(float skin_value)
    {
        Color max = color_end - color_start;
        for (int i = 0; i < mat.Length; i++)
        {
            mat[i].color = new Color(skin_value / max.r, skin_value / max.g, skin_value / max.b) + color_start;
        }
    }
	
}
