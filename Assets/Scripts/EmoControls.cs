using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EmoControls : MonoBehaviour 
{
    int blendShapeCount;
    SkinnedMeshRenderer skinnedMeshRenderer;
    Mesh skinnedMesh;
    float[] valuex = new float[11];
    public float blendSpeed = 1f;
    bool blendOneFinished = false;
	// Use this for initialization
	void Start () 
    {
        skinnedMeshRenderer = GetComponent<SkinnedMeshRenderer>();
        skinnedMesh = GetComponent<SkinnedMeshRenderer>().sharedMesh;
        blendShapeCount = skinnedMesh.blendShapeCount; 
	}
	
	// Update is called once per frame
	void Update () 
    {
        if (blendShapeCount >= 11)
        {
            for (int i = 0; i < blendShapeCount; i++)
            {
                float weight = skinnedMeshRenderer.GetBlendShapeWeight(i);
                if (weight < valuex[i])
                {
                    skinnedMeshRenderer.SetBlendShapeWeight(i, weight + blendSpeed);
                }else if (weight > valuex[i])
                {
                    skinnedMeshRenderer.SetBlendShapeWeight(i, weight - blendSpeed);
                }
            }


        }
	}
    public void Idle()
    {
        valuex[0] = 0;
        valuex[1] = 0;
        valuex[2] = 0;
        valuex[3] = 0;
        valuex[4] = 0;
        valuex[5] = 0;
        valuex[6] = 0;
        valuex[7] = 0;
        valuex[8] = 0;
        valuex[9] = 0;
        valuex[10] = 0;
    }
    public void Happy()
    {
        valuex[0] = 0;
        valuex[1] = 100;
        valuex[2] = 0;
        valuex[3] = 0;
        valuex[4] = 0;
        valuex[5] = 0;
        valuex[6] = 100;
        valuex[7] = 0;
        valuex[8] = 0;
        valuex[9] = 0;
        valuex[10] = 0;
    }
    public void Angry()
    {
        valuex[0] = 0;
        valuex[1] = 0;
        valuex[2] = 100;
        valuex[3] = 0;
        valuex[4] = 0;
        valuex[5] = 0;
        valuex[6] = 0;
        valuex[7] = 100;
        valuex[8] = 0;
        valuex[9] = 0;
        valuex[10] = 0;
    }
    public void Sad()
    {
        valuex[0] = 0;
        valuex[1] = 0;
        valuex[2] = 0;
        valuex[3] = 100;
        valuex[4] = 0;
        valuex[5] = 0;
        valuex[6] = 0;
        valuex[7] = 0;
        valuex[8] = 100;
        valuex[9] = 0;
        valuex[10] = 0;
    }
}
