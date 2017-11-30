Shader "Custom/fur" {
	Properties {
		_MainTex ("Base (RGB)", 2D) = "white" {}
		_SubTex  ("Base (RGB)", 2D) = "white" {}
		_Gravity ("Gravity", Vector) = (0.0, -0.75, 0.0, 0.0)
	}
	
	Category {
		ZWrite Off
		Tags {"Queue" = "Transparent"}
		Blend SrcAlpha OneMinusSrcAlpha
		Alphatest Greater [_Cutoff]
	
		SubShader {

               Pass 
               {
                    ZWrite On
                    Blend Off
                    //Lighting Off
                    SetTexture [_MainTex] 
                    {
                        combine texture + primary
                    }
                }
                Pass {
                    CGPROGRAM
                    
                    #pragma vertex vert
                    #pragma fragment frag
                    
                    #define FUR_OFFSET 0.0
                    
                    #include "FurHelper.cginc"
                    
                    ENDCG
                }
                
                Pass {
                    CGPROGRAM
                    
                    #pragma vertex vert
                    #pragma fragment frag
                    
                    #define FUR_OFFSET 0.1
                    
                    #include "FurHelper.cginc"
                    
                    ENDCG
                }
                
                Pass {
                    CGPROGRAM
                    
                    #pragma vertex vert
                    #pragma fragment frag
                    
                    #define FUR_OFFSET 0.2
                    
                    #include "FurHelper.cginc"
                    
                    ENDCG
                }
                 Pass {
                    CGPROGRAM
                    
                    #pragma vertex vert
                    #pragma fragment frag
                    
                    #define FUR_OFFSET 0.3
                    
                    #include "FurHelper.cginc"
                    
                    ENDCG
                }
                Pass {
                    CGPROGRAM
                    
                    #pragma vertex vert
                    #pragma fragment frag
                    
                    #define FUR_OFFSET 0.4
                    
                    #include "FurHelper.cginc"
                    
                    ENDCG
                }
                Pass {
                    CGPROGRAM
                    
                    #pragma vertex vert
                    #pragma fragment frag
                    
                    #define FUR_OFFSET 0.5
                    
                    #include "FurHelper.cginc"
                    
                    ENDCG
                }
			   
                

		}
		
		Fallback " VertexLit", 1
	}
}

