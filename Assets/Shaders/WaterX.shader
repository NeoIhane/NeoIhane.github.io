// Upgrade NOTE: upgraded instancing buffer 'Props' to new syntax.

Shader "Custom/WaterX" {
	Properties {
		_Color ("Color", Color) = (1,1,1,1)
		_MainTex ("Albedo (RGB)", 2D) = "white" {}
		_Metallic("Metallic", Range(0,1)) = 0.0
		_Glossiness("Smoothness", Range(0,1)) = 0.5
		_Alpha("Alpha", Range(0,1)) = 0.5
	}
		SubShader{
			
			Tags{ "RenderType" = "Transparent" "Queue" = "Transparent" }
			Blend SrcAlpha OneMinusSrcAlpha
			Cull Off
			LOD 200

			CGPROGRAM
		#pragma surface surf Standard vertex:vert fullforwardshadows alpha
		struct Input {
			float2 uv_MainTex;
		};
		float _Alpha;
		void vert(inout appdata_full v) 
		{
			float3 worldPos = mul(unity_ObjectToWorld, v.vertex).xyz;
			v.vertex.x += sin(worldPos.z + _Time.w);
            v.vertex.z += sin(worldPos.x/10 + _Time.w);
		}
		sampler2D _MainTex;
		half _Glossiness;
		half _Metallic;
		fixed4 _Color;
		UNITY_INSTANCING_BUFFER_START(Props)
		UNITY_INSTANCING_BUFFER_END(Props)
		void surf(Input IN, inout SurfaceOutputStandard o) {
			o.Albedo = tex2D(_MainTex, IN.uv_MainTex).rgb;
			fixed4 c = tex2D(_MainTex, IN.uv_MainTex) * _Color;
			o.Albedo = c.rgb;
			o.Metallic = _Metallic;
			o.Smoothness = _Glossiness;
			o.Alpha = _Alpha;
		}
		ENDCG
		}
			Fallback "Diffuse"

}

/*
half _Glossiness;
half _Metallic;
fixed4 _Color;

UNITY_INSTANCING_CBUFFER_START(Props)
UNITY_INSTANCING_CBUFFER_END
float _Amount;
void vert(inout appdata_full v)
{
v.vertex.xyz += v.normal *  _Amount;
}

void surf (Input IN, inout SurfaceOutputStandard o) {

fixed4 c = tex2D (_MainTex, IN.uv_MainTex) * _Color;
o.Albedo = c.rgb;
o.Metallic = _Metallic;
o.Smoothness = _Glossiness;
o.Alpha = c.a;
}
*/
