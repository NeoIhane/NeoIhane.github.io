// Upgrade NOTE: replaced 'mul(UNITY_MATRIX_MVP,*)' with 'UnityObjectToClipPos(*)'

Shader "Custom/TA" {
	Properties {
		_Color ("Color", Color) = (1,1,1,1)
		_MainTex ("Albedo (RGB)", 2D) = "white" {}
		_Glossiness ("Smoothness", Range(0,1)) = 0.5
		_Metallic ("Metallic", Range(0,1)) = 0.0
	}
	SubShader {
		Tags { "RenderType"="Opaque" }
		LOD 200
		
		CGPROGRAM
		#pragma surface surf Standard fullforwardshadows
		#pragma target 3.0


		struct Input {
			float2 uv_MainTex;
            float4 vertex : POSITION;
		};
        struct v2f
            {
                float2 uv : TEXCOORD0;
                float4 vertex : SV_POSITION;
            };

        void vert (inout appdata_full v, out Input o)
         {
             //UNITY_INITIALIZE_OUTPUT(Input,o);
             /*float3 worldPos = (v.normal*20)*sin(time);
             v2f o;
             o.pos = worldPos;*/
             float4 oPos = UnityObjectToClipPos(v.vertex);
             //float3 worldPos = (v.normal*20)*sin(time);
             //float3 worldPos = oPos*sin(time);
              o.vertex = sin(_Time);
         }
 
        sampler2D _MainTex;
		half _Glossiness;
		half _Metallic;
		fixed4 _Color;

     
		UNITY_INSTANCING_CBUFFER_START(Props)
		UNITY_INSTANCING_CBUFFER_END

		void surf (Input IN, inout SurfaceOutputStandard o) {
			fixed4 c = tex2D (_MainTex, IN.uv_MainTex) * _Color;
			o.Albedo = c.rgb;
			o.Metallic = _Metallic;
			o.Smoothness = _Glossiness;
			o.Alpha = c.a;
		}
		ENDCG
	}
	FallBack "Diffuse"
}
