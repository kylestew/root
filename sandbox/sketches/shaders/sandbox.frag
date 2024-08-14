#version 300 es
precision highp float;

in vec2 vTexCoord;

uniform sampler2D tex0;

out vec4 fragColor;

// vec4 noise(float t) { return texture(tex0, vec2(floor(t), floor(t)) / 256.); }

void main() {
    //   vec2 uv = (fragCoord - 0.5*iResolution.xy)/iResolution.y;
    // vec2 uv = vTexCoord;

    vec3 color = texture(tex0, vTexCoord).rgb;

    // fragColor = vec4(noise(1.0), 0.0, 0.0, 1.0);
    fragColor = vec4(color, 1.0);
}

/*

vec4 noise(float t){return texture(iChannel0,vec2(floor(t), floor(t))/256.);}
vec4 valueNoise(vec2 t, float w){
    vec2 fr = fract(t);
        return
        mix(
            mix(
                texture(iChannel0,vec2(floor(t.x), floor(t.y))/256.),
                texture(iChannel0,vec2(floor(t.x), floor(t.y) + 1.)/256.),
                smoothstep(0.,1.,fr.y)
            ),
            mix(
                texture(iChannel0,vec2(floor(t.x) + 1.,floor(t.y))/256.),
                texture(iChannel0,vec2(floor(t.x) + 1.,floor(t.y) + 1.)/256.),
                smoothstep(0.,1.,fr.y)
            ),
            smoothstep(0.,1.,pow(fr.x, w)));
}
vec4 fbm(vec2 uv){
        vec4 n = vec4(0);
    uv *= iResolution.xy/vec2(800.,450.);
        n += valueNoise(uv*60.,0.1);
    n += valueNoise(uv*1700.,0.1)*0.5;
    n += valueNoise(uv*10.,1.1)*0.1;
    n -= valueNoise(uv*10. + 4.,0.1)*1.;
    n -= valueNoise(uv*20.,0.5)*0.2;


    //n = valueNoise(uv*3.,19.9)*1.;
    n = max(n, 0.);
    return n;
}

float df = 0.;

// ----------


vec2 guv;

vec3 colour( float db, vec3 ca, vec3 cb, int mode){
    //float dea = smoothstep(df,0.,da );
    float deb = smoothstep(df,0.,db );

    //vec3 oa = mix(vec3(0),ca,dea);
    vec3 ob = mix(vec3(0),cb,deb);
    vec3 co = vec3(0);

    vec4 t = texture(iChannel2,guv);

    cb*=1. - smoothstep(1.,0.,abs(db)*7. + t.z*1.53)*0.2;


    if(mode == 0){

        // 0 replace

        co = mix( ca, cb, max(deb - pow(smoothstep(0.,1.,t.y*0.77), 4.25), 0.));
        //co = mix( oa, cb, deb);

    } else if(mode == 1){

        // 1 multiply

        co = mix(ca, ca*cb, deb);
    } else if(mode == 2){

        // 2 overlay

        if (length(ca) < 0.5){
                co = mix(ca, 2.*ca*cb, deb);
        } else {
                co = mix(ca, 1. - 2.*(1. - ca)*(1. - cb), deb);

        }
    } else if(mode == 3){

        // 3 darken

        co = mix(ca, min(ca,cb)*length(ca ), deb);
    } else if(mode == 4){

        // 4 burn

        co = mix(ca, clamp(1.0 - (1.0 - ca) / cb,0.,1.), deb);
    } else if(mode == 5){

        // 5 linear burn

        co = mix(ca, ca + cb - 1., deb);
    } else if(mode == 6){

        // 6 color dodge

        co = mix(ca, length(ca) > .5 ? 1.0 - 2.0 * (1.0 - ca) * (1.0 - cb) : 2.0 * ca * cb, deb);
    }

    return co;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord - 0.5*iResolution.xy)/iResolution.y;

    df = dFdx(uv.x);

    guv = uv;
    uv *= 0.5;
    //uv *= rot(-0.25*pi);
    //uv = kink( uv, vec2(0.1), 0.5);

    uv += texture(iChannel1,uv).xy*0.003 + texture(iChannel2,uv*0.05).xy*0.01;

    vec3 col = vec3(1.);


    float d = 10e5;


    // -- //
    d = 10e5;
    //d = length(uv) - 0.15;


    float wd = 0.005;
    float h = 0.22;
    float horiz = 0.319;
    float twd = 0.03;

    float T = iTime*0.4 + 1.;

    float modthing = sin((floor(T) + pow(fract(T), 5.) )*pi/2.)*0.5 + 0.5;

    // COOLINE

    d = sdLine( uv - 0.14, vec2(-0.01,0.) , vec2(0.4,0.),0.) - 0.001;


    d = xor(d,length(uv) - 0.2,0.02);

    // COOLINE
    d = min(d,sdLine( uv + vec2(0.13,0.1), vec2(-0.05,0.) , vec2(-0.3,0.),0.) - 0.001);


    d = xor(d,-abs(sdLine( uv + 0., vec2(-0.1,0.) , vec2(0.2,0.),1.) - 0.03) - 0.002,0.02);


    // SQUARE
    d = xor(d,-abs(sdBox( uv + 0.0, vec2(0.1))) - 0.001,0.02 + modthing*0.03);


    d = xor(d,-abs(sdBox( uv*rot(0.25*pi) + 0.0, vec2(0.25))) - 0.002,0.02);


    col = colour( d, col, vec3(1.)*0.01, 0);

    d = xor(d,sdBox(uv,vec2(0.5,0.25)),0.031 );


    d = xor(d,-length(uv)-0.1,0.11 + modthing*0.1);


    col = colour( d, col, vec3(0.01,0.01,0.0), 0);

    d = xor(d,-length(uv)-0.,0.01);
    col = colour( d, col, vec3(0.01,0.01,0.0), 0);


    d = xor(d,-length(uv)-0.,0.015);
    //col = colour( d, col, vec3(0.11,0.21,0.4)*0.02, 0);
        col = colour( d, col, vec3(0.01,0.01,0.0)*1., 0);


    uv = abs(uv);


    float db = sdBox(uv - vec2(horiz,0.),vec2(wd,0.13));
    db = max(db,uv.y - h);

    db = min(db,sdBox(uv - vec2(horiz - twd + wd,h),vec2(twd,wd)));

    d = xor(d,-db,0.1);

    col = colour( d, col, vec3(1.), 0);




    //col = 1. - col;
    col = max(col,0.002);


        vec4 f = smoothstep(0.,1.,fbm(uv*50.));
        vec4 g = smoothstep(0.,1.,fbm(uv*60. - 0.4));

    f.x = pow(f.x, 5.);

    float n = 0.;
    n += f.x*.5;
    n += pow(f.y,7.)*2.5;
    n += pow(f.z,6.)*2.5;
    n += pow(f.w,3.)*0.1;

    n += pow(g.x,6.)*3.;
    n += pow(g.y,4.)*1.;
    n += pow(g.z,4.)*1.;


    n = min(n,0.5);



    if(length(col) > 0.2){
        vec3 nn = vec3(n*0.6,n,n)*1.4;
        col *= 1. - nn;
        //col -= pow(g,5.)*2.5;
        //col -= pow(g,2.)*.9;
    }
    else{
        col += pow(n,2.)*0.1;
        //col += f*4.;

    }

    col *= vec3(1.06,0.98,0.9);


    col = pow(col,vec3(0.5545));


    fragColor = vec4(col,1.0);
}
*/