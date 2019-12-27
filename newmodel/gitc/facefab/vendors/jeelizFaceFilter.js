/**
 * Jeeliz Face Filter - https://github.com/jeeliz/jeelizFaceFilter
 *
 * Copyright 2018 Jeeliz ( https://jeeliz.com )
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

window["JEEFACEFILTERAPI"] = (function() {
  "use strict";
  function ha(a, b, f) {
    return a * (1 - f) + b * f;
  }
  function ja(a, b) {
    var f = new XMLHttpRequest();
    f.open("GET", a, !0);
    f.withCredentials = !1;
    f.onreadystatechange = function() {
      4 === f.readyState && 200 === f.status && b(f.responseText);
    };
    f.send();
  }
  function ka(a, b, f) {
    return Math.min(Math.max((f - a) / (b - a), 0), 1);
  }
  function ma(a, b) {
    var f = b % 8;
    return (a[(b - f) / 8] >> (7 - f)) & 1;
  }
  function na(a) {
    var b = JSON.parse(a);
    a = b.ne;
    var f = b.nf,
      g = b.n,
      h =
        "undefined" === typeof btoa
          ? Buffer.from(b.data, "base64").toString("latin1")
          : atob(b.data),
      d = h.length,
      q;
    b = new Uint8Array(d);
    for (q = 0; q < d; ++q) b[q] = h.charCodeAt(q);
    h = new Float32Array(g);
    d = new Float32Array(f);
    q = a + f + 1;
    var e, n;
    for (e = 0; e < g; ++e) {
      var l = q * e;
      var t = 0 === ma(b, l) ? 1 : -1;
      var w = l + 1;
      var x = 1,
        y = 0;
      for (n = w + a - 1; n >= w; --n) (y += x * ma(b, n)), (x *= 2);
      n = y;
      w = b;
      x = l + 1 + a;
      y = d;
      var C = 0,
        z = y.length;
      for (l = x; l < x + z; ++l) (y[C] = ma(w, l)), ++C;
      for (l = w = 0; l < f; ++l) w += d[l] * Math.pow(2, -l - 1);
      t =
        0 === w && 0 === n
          ? 0
          : t * (1 + w) * Math.pow(2, 1 + n - Math.pow(2, a - 1));
      h[e] = t;
    }
    return h;
  }
  var m = (function() {
      function a(a, b) {
        a = c.createShader(a);
        c.shaderSource(a, b);
        c.compileShader(a);
        return c.getShaderParameter(a, c.COMPILE_STATUS) ? a : !1;
      }
      function b(b, e, d) {
        b = a(c.VERTEX_SHADER, b, d + " VERTEX");
        e = a(c.FRAGMENT_SHADER, e, d + " FRAGMENT");
        d = c.createProgram();
        c.attachShader(d, b);
        c.attachShader(d, e);
        c.linkProgram(d);
        return d;
      }
      function f(a) {
        void 0 === a.T &&
          (a.T =
            "precision lowp float;attribute vec2 a0;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=a0*.5+vec2(.5,.5);}");
        void 0 === a.ka && (a.ka = ["a0"]);
        void 0 === a.ca && (a.ca = [2]);
        void 0 === a.precision && (a.precision = "highp");
        void 0 === a.v && (a.v = []);
        a.id = q++;
        void 0 !== a.wc &&
          a.wc.forEach(function(b, e) {
            a.c = a.c.replace(b, a.tb[e]);
          });
        a.Qa = 0;
        a.ca.forEach(function(b) {
          a.Qa += 4 * b;
        });
        a.va = b(a.T, "precision " + a.precision + " float;\n" + a.c, a.name);
        console.log(a.name);
        a.m = {};
        a.f.forEach(function(b) {
          a.m[b] = c.getUniformLocation(a.va, b);
        });
        a.attributes = {};
        a.da = [];
        a.ka.forEach(function(b) {
          var e = c.getAttribLocation(a.va, b);
          a.attributes[b] = e;
          a.da.push(e);
        });
        if (a.h) {
          c.useProgram(a.va);
          d = a;
          h = a.id;
          for (var e in a.h) c.uniform1i(a.m[e], a.h[e]);
        }
        a.od = !0;
      }
      function g(a) {
        pa.Cc(T);
        h !== a.id &&
          (T.R(),
          (h = a.id),
          (d = a),
          c.useProgram(a.va),
          a.da.forEach(function(a) {
            0 !== a && c.enableVertexAttribArray(a);
          }));
      }
      var h = -1,
        d = !1,
        q = 0,
        e = !1,
        n = ["u0"],
        l = ["u1"],
        t = { u0: 0 },
        w = { u1: 0 },
        x = { u0: 0, u2: 1 },
        y = { u3: 0 },
        C = { u4: 0, u5: 1 },
        z = {
          s0: {
            name: "_",
            c:
              "uniform sampler2D u0;varying vec2 vv0;void main(){gl_FragColor=texture2D(u0,vv0);}",
            f: n,
            h: t
          },
          s1: {
            name: "_",
            c:
              "uniform sampler2D u0;varying vec2 vv0;void main(){gl_FragColor=texture2D(u0,vv0);}",
            f: n,
            h: t,
            precision: "lowp"
          },
          s2: {
            name: "_",
            c:
              "uniform sampler2D u0,u2;varying vec2 vv0;void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u0,vv0);gl_FragColor=a*b;}",
            f: ["u0", "u2"],
            h: x
          },
          s3: {
            name: "_",
            c:
              "uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=a.r*f;}",
            f: n,
            h: t
          },
          s4: {
            name: "_",
            c:
              "uniform sampler2D u0,u2;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u0,vv0);gl_FragColor=a.a*b.r*f;}",
            f: ["u0", "mask"],
            h: x
          },
          s5: {
            name: "_",
            c:
              "uniform sampler2D u0;varying vec2 vv0;void main(){gl_FragColor=texture2D(u0,vec2(1.-vv0.x,vv0.y));}",
            f: n,
            h: t
          },
          s6: {
            name: "_",
            c:
              "uniform sampler2D u0;varying vec2 vv0;void main(){gl_FragColor=texture2D(u0,vec2(vv0.x,1.-vv0.y));}",
            f: n,
            h: t
          },
          s7: {
            name: "_",
            c:
              "uniform sampler2D u1;uniform float u6;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a*u6;}",
            f: ["u1", "u6"],
            h: w
          },
          s8: {
            name: "_",
            c:
              "uniform sampler2D u1;uniform float u6;varying vec2 vv0;const vec4 g=vec4(.25,.25,.25,.25),e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0);float b=dot(a*u6,g);gl_FragColor=b*e;}",
            f: ["u1", "u6"],
            h: w
          },
          s9: {
            name: "_",
            c:
              "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){float a=.25*dot(e,texture2D(u0,vv0));gl_FragColor=a*e;}",
            f: n,
            h: t
          },
          s10: {
            name: "_",
            c:
              "uniform sampler2D u0,u7;uniform float u8;const vec4 f=vec4(1.,1.,1.,1.);varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0),b=texture2D(u7,vv0);gl_FragColor=mix(b,a,u8*f);}",
            f: ["u0", "u7", "u8"],
            h: { u0: 0, u7: 1 }
          },
          s11: {
            name: "_",
            c:
              "uniform sampler2D u0;uniform vec2 u9;varying vec2 vv0;void main(){gl_FragColor=.25*(texture2D(u0,vv0+u9)+texture2D(u0,vv0+u9*vec2(1.,-1.))+texture2D(u0,vv0+u9*vec2(-1.,-1.))+texture2D(u0,vv0+u9*vec2(-1.,1.)));}",
            f: ["u0", "u9"],
            h: t
          },
          s12: {
            name: "_",
            c:
              "uniform sampler2D u0;uniform vec4 u10;varying vec2 vv0;float g(float a,float b){a=floor(a)+.5;return floor(a/exp2(b));}float h(float a,float b){return floor(a*exp2(b)+.5);}float i(float a,float b){return mod(a,h(1.,b));}float e(float c,float a,float b){a=floor(a+.5),b=floor(b+.5);return i(g(c,a),b-a);}vec4 k(float a){if(a==0.)return vec4(0.,0.,0.,0.);float l=a>0.?0.:1.;a=abs(a);float c=floor(log2(a)),m=c+127.,b=(a/exp2(c)-1.)*8388608.,d=m/2.,n=fract(d)*2.,o=floor(d),p=e(b,0.,8.)/255.,q=e(b,8.,16.)/255.,r=(n*128.+e(b,16.,23.))/255.,j=(l*128.+o)/255.;return vec4(p,q,r,j);}void main(){float a=dot(texture2D(u0,vv0),u10);gl_FragColor=k(a);}",
            f: ["u0", "u10"],
            h: t
          },
          s13: {
            name: "_",
            c:
              "uniform sampler2D u1;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0),b=e/(e+exp(-a));gl_FragColor=b;}",
            f: l,
            h: w,
            v: l,
            A: !0
          },
          s14: {
            name: "_",
            c:
              "uniform sampler2D u1;varying vec2 vv0;const vec4 e=vec4(0.,0.,0.,0.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=max(e,a);}",
            f: l,
            h: w,
            v: l,
            A: !0
          },
          s15: {
            name: "_",
            c:
              "uniform sampler2D u1;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=mix(exp(-abs(a))-e,a,step(0.,a));}",
            f: l,
            h: w,
            v: l,
            A: !0
          },
          s16: {
            name: "_",
            c:
              "uniform sampler2D u1;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0),b=exp(-abs(a))-e;gl_FragColor=mix(.1*b,a,step(0.,a));}",
            f: l,
            h: w,
            v: l,
            A: !0
          },
          s17: {
            name: "_",
            c:
              "uniform sampler2D u1,u8,u11;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0),c=texture2D(u8,vv0),d=texture2D(u11,vv0),b=a/d;gl_FragColor=c*mix(exp(-abs(b))-f,b,step(0.,a));}",
            f: ["u1", "u8", "u11"],
            h: { u1: 0, u8: 1, u11: 2 },
            v: l,
            A: !0
          },
          s18: {
            name: "_",
            c:
              "uniform sampler2D u1;const float e=3.141593;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=atan(e*a)/e;gl_FragColor=b;}",
            f: l,
            h: w,
            v: l,
            A: !0
          },
          s19: {
            name: "_",
            c:
              "uniform sampler2D u1;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(.5,.5,.5,.5);void main(){vec4 a=texture2D(u1,vv0),b=log(e+a);gl_FragColor=b;}",
            f: l,
            h: w,
            v: l,
            A: !0
          },
          s20: {
            name: "_",
            c:
              "uniform sampler2D u1;uniform float gain;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=exp(a);}",
            f: ["u1", "u12"],
            h: w,
            v: l,
            A: !0
          },
          s21: {
            name: "_",
            c:
              "uniform sampler2D u1,u13;uniform float u14;const vec2 f=vec2(.5,.5);const float g=1e-5;const vec4 h=vec4(1.,1.,1.,1.),i=vec4(0.,0.,0.,0.);varying vec2 vv0;void main(){vec4 a=texture2D(u13,f);float b=u14*u14;vec4 c=max(b*a,g*h);gl_FragColor=texture2D(u1,vv0)/c;}",
            f: ["u1", "u15", "u14"],
            h: { u1: 0, u15: 1 }
          },
          s22: {
            name: "_",
            c:
              "uniform sampler2D u0;uniform vec2 u16;varying vec2 vv0;void main(){float a=u16.x*u16.y;vec2 b=floor(vv0*a)/a,c=fract(vv0*a),d=floor(b*u16.y),g=floor(u16.x*fract(b*u16.y)),f=(g*u16.y+d)/a;gl_FragColor=texture2D(u0,f+c/a);}",
            f: ["u0", "u16"],
            h: t
          },
          s23: {
            name: "_",
            c:
              "uniform sampler2D u17,u5,u18;varying vec2 vv0;void main(){vec4 a=texture2D(u18,vv0);vec2 b=a.rg,c=a.ba;vec4 d=texture2D(u17,b),e=texture2D(u5,c);gl_FragColor=d*e;}",
            f: ["u17", "u5", "u18"],
            v: ["u17", "u5", "u18"],
            h: { u5: 0, u17: 1, u18: 2 },
            A: !0
          },
          s24: {
            name: "_",
            c:
              "uniform float u19;uniform sampler2D u17,u5;varying vec2 vv0;void main(){vec2 a=vv0*u19,b=floor(a),c=a-b;vec4 d=texture2D(u17,vv0),f=texture2D(u5,c);gl_FragColor=d*f;}",
            f: ["u5", "u17", "u19"],
            v: ["u5", "u17"],
            h: { u5: 0, u17: 1 },
            A: !0
          },
          s25: {
            name: "_",
            c:
              "uniform float u19;uniform sampler2D u17,u5,u20,u21,u22,u23;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(1e-3,1e-3,1e-3,1e-3);void main(){vec2 i=vv0*u19,m=floor(i),c=i-m;vec4 n=texture2D(u17,vv0),d=texture2D(u5,c),a=texture2D(u23,vv0);a=a*255.;vec4 o=texture2D(u20,c),p=texture2D(u21,c),q=texture2D(u22,c),j=step(-g,-a),b=e-j,k=b*step(-e-g,-a);b*=e-k;vec4 h=b*step(-2.*e-g,-a);b*=e-h;vec4 l=b;d=j*d+k*o+h*p+l*q,gl_FragColor=n*d;}",
            f: "u17 u5 u19 u23 u20 u21 u22".split(" "),
            h: { u5: 0, u17: 1, u23: 3, u20: 4, u21: 5, u22: 6 },
            A: !0
          },
          s26: {
            name: "_",
            c:
              "uniform sampler2D u17,u5,u24;uniform float u19,u25,u26,u27;varying vec2 vv0;const vec2 j=vec2(1.,1.);void main(){vec2 a=floor(u25*vv0),g=u25*vv0-a;float b=u19/u25;vec2 c=floor(g*b),d=g*b-c,h=(a+d)/u25;float l=u25*u27/u19;vec2 m=l*c,i=(m+d*u26)/u27,e=step(i,j);vec4 n=texture2D(u17,h),o=texture2D(u5,i),p=n*o*e.x*e.y,k=texture2D(u24,h);gl_FragColor=p*u26*u26+k;}",
            f: "u17 u5 u19 u25 u26 u27 u24".split(" "),
            v: ["u17", "u5", "u24"],
            h: {
              u5: 0,
              u17: 1,
              u24: 2
            },
            A: !0
          },
          s27: {
            name: "_",
            c:
              "uniform sampler2D u17,u5;varying vec2 vv0;void main(){vec4 a=texture2D(u17,vv0),b=texture2D(u5,vv0);gl_FragColor=a*b;}",
            f: ["u17", "u5"],
            v: ["u17", "u5"],
            h: { u5: 0, u17: 1 },
            A: !0
          },
          s28: {
            name: "_",
            c:
              "uniform sampler2D u0,u24;uniform float u28;varying vec2 vv0;void main(){gl_FragColor=texture2D(u24,vv0)+u28*texture2D(u0,vv0);}",
            f: ["u0", "u24", "u28"],
            v: ["u0", "u24"],
            A: !0,
            h: { u0: 0, u24: 1 }
          },
          s29: {
            name: "_",
            c:
              "varying vec2 vv0;uniform sampler2D u0;const vec4 g=vec4(1.,1.,1.,1.),e=vec4(.299,.587,.114,0.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=dot(a,e)*g;}",
            f: n,
            h: t,
            precision: "lowp"
          },
          s30: {
            name: "_",
            c:
              "varying vec2 vv0;uniform sampler2D u0,u2;uniform float u29;const vec4 g=vec4(1.,1.,1.,1.);void main(){vec4 a=vec4(0.);a-=texture2D(u0,vec2(vv0.x-u29,vv0.y-u29))*1.,a-=texture2D(u0,vec2(vv0.x-u29,vv0.y))*2.,a-=texture2D(u0,vec2(vv0.x-u29,vv0.y+u29))*1.,a+=texture2D(u0,vec2(vv0.x+u29,vv0.y-u29))*1.,a+=texture2D(u0,vec2(vv0.x+u29,vv0.y))*2.,a+=texture2D(u0,vec2(vv0.x+u29,vv0.y+u29))*1.;vec4 b=vec4(0.);b-=texture2D(u0,vec2(vv0.x-u29,vv0.y-u29))*1.,b-=texture2D(u0,vec2(vv0.x,vv0.y-u29))*2.,b-=texture2D(u0,vec2(vv0.x+u29,vv0.y-u29))*1.,b+=texture2D(u0,vec2(vv0.x-u29,vv0.y+u29))*1.,b+=texture2D(u0,vec2(vv0.x,vv0.y+u29))*2.,b+=texture2D(u0,vec2(vv0.x+u29,vv0.y+u29))*1.;vec3 c=sqrt(a.rgb*a.rgb+b.rgb*b.rgb);vec4 e=vec4(c,texture2D(u0,vv0).a),f=texture2D(u2,vv0);gl_FragColor=f.a*e.r*g;}",
            f: ["u0", "u2", "u29"],
            h: x
          },
          s31: {
            name: "_",
            c:
              "varying vec2 vv0;uniform sampler2D u0,u2;uniform float u29;const vec4 j=vec4(1.,1.,1.,1.);const vec2 k=vec2(1.,1.);void main(){float i=0.;vec2 l=k*u29,b,c;float d,a,g=0.;for(float f=-4.;f<=4.;f+=1.)for(float e=-4.;e<=4.;e+=1.)b=vec2(f,e),d=length(b)/2.,a=exp(-d*d),c=vv0+l*b,a=1.,i+=a*texture2D(u0,c).r,g+=a;vec4 m=texture2D(u2,vv0);gl_FragColor=m.a*(texture2D(u0,c).r-i/g)*j;}",
            f: ["u0", "u2", "u29"],
            h: x
          },
          s32: {
            name: "_",
            c:
              "uniform sampler2D u3;uniform vec2 u9;varying vec2 vv0;vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}const vec2 h=vec2(.5,.5),i=vec2(1.,0.),j=vec2(0.,1.);void main(){vec2 a=vv0-u9*h;vec4 b=texture2D(u3,a),c=texture2D(u3,a+u9*i),d=texture2D(u3,a+u9*j),k=texture2D(u3,a+u9),l=e(b,c),g=e(d,k);gl_FragColor=e(l,g);}",
            f: ["u3", "u9"],
            h: y
          },
          s33: {
            name: "_",
            c:
              "uniform sampler2D u3;uniform vec2 u9;varying vec2 vv0;const vec2 j=vec2(1.,0.),k=vec2(0.,1.),l=vec2(2.,0.),m=vec2(0.,2.);vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}vec4 f(vec2 a){vec4 b=texture2D(u3,a),c=texture2D(u3,a+u9*j),d=texture2D(u3,a+u9*k),g=texture2D(u3,a+u9),i=e(b,c),h=e(d,g);return e(i,h);}void main(){vec2 a=vv0+u9*vec2(-.55,-1.05);vec4 b=f(a),c=f(a+u9*l),d=f(a+u9*2.),g=f(a+u9*m),i=e(b,c),h=e(d,g);gl_FragColor=e(i,h);}",
            f: ["u3", "u9"],
            h: y
          },
          s34: {
            name: "_",
            c:
              "uniform sampler2D u0;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=a*a;}",
            f: ["u0"],
            h: t,
            precision: "lowp"
          },
          s35: {
            name: "_",
            c:
              "uniform sampler2D u0;uniform vec2 u9;varying vec2 vv0;const vec4 g=vec4(1.,1.,1.,1.);const float d=15444.;void main(){vec4 a=1001./d*texture2D(u0,vv0-3.*u9)+2002./d*texture2D(u0,vv0-2.*u9)+3003./d*texture2D(u0,vv0-u9)+3432./d*texture2D(u0,vv0)+3003./d*texture2D(u0,vv0+u9)+2002./d*texture2D(u0,vv0+2.*u9)+1001./d*texture2D(u0,vv0+3.*u9);gl_FragColor=a;}",
            f: ["u9", "u0"],
            h: t,
            precision: "lowp"
          },
          s36: {
            name: "_",
            c:
              "uniform sampler2D u0,u30,u31;varying vec2 vv0;const vec4 g=vec4(1.,1.,1.,1.);const float h=.1;void main(){vec4 a=texture2D(u30,vv0),b=texture2D(u31,vv0),c=texture2D(u0,vv0),d=max(g*h,b-a*a),f=sqrt(d);gl_FragColor=(c-a)/f;}",
            f: ["u0", "u30", "u31"],
            h: { u0: 0, u30: 1, u31: 2 },
            A: !0
          },
          s37: {
            name: "_",
            c:
              "uniform sampler2D u17,u32,u33;varying vec2 vv0;void main(){vec4 a=texture2D(u33,vv0);vec2 b=a.rg;vec4 c=texture2D(u17,b);vec2 d=a.ba;vec4 e=texture2D(u32,d);gl_FragColor=c*e;}",
            f: ["u17", "u32", "u33"],
            h: { u32: 0, u33: 1, u17: 2 }
          },
          s38: {
            name: "_",
            c:
              "uniform sampler2D u17,u32;uniform float u19,u27;varying vec2 vv0;void main(){float d=u19*u27;vec2 b=vv0*u27,c=floor(b),a=b-c;a.y=1.-a.y;vec2 g=floor(a*u19),h=(g*u27+c)/d;vec4 i=texture2D(u17,h),e=texture2D(u32,a);gl_FragColor=i*e;}",
            f: ["u17", "u32", "u19", "u27"],
            h: { u32: 0, u17: 1 }
          },
          s39: {
            name: "_",
            c:
              "uniform sampler2D u17,u32;uniform float u19,u27,u26,u25;varying vec2 vv0;const vec2 e=vec2(1.,1.);void main(){float k=u19*u26/u27,d=u25*u27/u19,l=k/u25,m=u19/u25,n=k/u25;vec2 g=e-vv0,c=floor(u27*g),h=u27*g-c,i=floor(u25*h),j=u25*h-i,q=j*l,r=floor(c/d),s=c-r*d,t=floor(c/d),u=t+n*j,a=(u+i*m)/u19;a=mod(a,e),a=e-a;vec2 v=s-d*q,b=mod(v/u26,e);b=e-b,b+=vec2(1./u19,1./u19),b=mod(b,e);vec2 w=floor(a*u25),f=(w+b)/u25;f=mod(f,e);vec4 x=texture2D(u17,f),o=texture2D(u32,a);gl_FragColor=x*o;}",
            f: "u17 u32 u19 u27 u26 u25".split(" "),
            h: { u32: 0, u17: 1 }
          },
          s40: {
            name: "_",
            c:
              "uniform sampler2D u1,u34,u35;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u34,vv0),c=texture2D(u35,vv0);gl_FragColor=a-b;}",
            f: ["u1", "u34", "u35"],
            h: { u1: 0, u34: 1, u35: 2 }
          },
          s41: {
            name: "_",
            c:
              "uniform sampler2D u1,u34,u35;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u34,vv0),c=texture2D(u35,vv0);gl_FragColor=c*(a-b);}",
            f: ["u1", "u34", "u35"],
            h: { u1: 0, u34: 1, u35: 2 }
          },
          s42: {
            name: "_",
            c:
              "uniform sampler2D u4,u5;uniform float u28;varying vec2 vv0;void main(){vec4 a=u28*texture2D(u4,vv0),b=texture2D(u5,vv0);gl_FragColor=a;}",
            f: ["u4", "u5", "u28"],
            h: C
          },
          s43: {
            name: "_",
            c:
              "uniform sampler2D u4,u5;uniform float u28;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);vec4 g(vec4 b){vec4 a=exp(-b);return a/((f+a)*(f+a));}void main(){vec4 a=u28*texture2D(u4,vv0),b=texture2D(u5,vv0);gl_FragColor=a*g(b);}",
            f: ["u4", "u5", "u28"],
            h: C
          },
          s44: {
            name: "_",
            c:
              "uniform sampler2D u4,u5;uniform float u28;varying vec2 vv0;const vec4 g=vec4(0.,0.,0.,0.),i=vec4(1.,1.,1.,1.);const float h=1e-4;vec4 f(vec4 a){return h+step(g,a);}void main(){vec4 a=u28*texture2D(u4,vv0),b=texture2D(u5,vv0);gl_FragColor=a*f(b);}",
            f: ["u4", "u5", "u28"],
            h: C
          },
          s45: {
            name: "_",
            c:
              "uniform sampler2D u4,u5;uniform float u28;varying vec2 vv0;const vec4 g=vec4(1.,1.,1.,1.);vec4 f(vec4 a){vec4 b=exp(-abs(a));return mix(b,g,step(0.,a));}void main(){vec4 a=u28*texture2D(u4,vv0),b=texture2D(u5,vv0);gl_FragColor=a*f(b);}",
            f: ["u4", "u5", "u28"],
            h: C
          },
          s46: {
            name: "_",
            c:
              "uniform sampler2D u4,u5;uniform float u28;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);const float h=3.141593;vec4 g(vec4 b){vec4 a=b*h;return e/(e+a*a);}void main(){vec2 a=vv0;vec4 b=u28*texture2D(u4,a),c=texture2D(u5,a);gl_FragColor=b*g(c);}",
            f: ["u4", "u5", "u28"],
            h: C
          }
        },
        E = {},
        T = {
          Ga: function() {
            return e;
          },
          l: function() {
            if (!e) {
              for (var a in z) f(z[a], a);
              m.set("s0");
              c.enableVertexAttribArray(0);
              a = qa.l();
              e = !0;
              return a;
            }
          },
          Db: function(a) {
            a.forEach(function(a) {
              T.Cb(a);
            });
          },
          Cb: function(a) {
            z[a.id] = a;
            f(a, a.id);
          },
          mc: function(a, b, e) {
            b || (b = a);
            z[b] = Object.create(E[a]);
            E[a].tb &&
              E[a].tb.forEach(function(a, d) {
                z[b].c = z[b].c.replace(new RegExp(a, "g"), e[d]);
              });
            f(z[b], b);
          },
          set: function(a) {
            g(z[a]);
          },
          $c: function() {
            return d.Xc;
          },
          R: function() {
            -1 !== h &&
              ((h = -1),
              d.da.forEach(function(a) {
                0 !== a && c.disableVertexAttribArray(a);
              }));
          },
          Oa: function() {
            var a = 0;
            d.da.forEach(function(b, e) {
              e = d.ca[e];
              c.vertexAttribPointer(b, e, c.FLOAT, !1, d.Qa, a);
              a += 4 * e;
            });
          },
          Xb: function() {
            c.enableVertexAttribArray(0);
          },
          wa: function() {
            c.vertexAttribPointer(d.da[0], 2, c.FLOAT, !1, 8, 0);
          },
          Fd: function(a, b) {
            c.uniform1i(d.m[a], b);
          },
          B: function(a, b) {
            c.uniform1f(d.m[a], b);
          },
          H: function(a, b, e) {
            c.uniform2f(d.m[a], b, e);
          },
          Gd: function(a, b) {
            c.uniform2fv(d.m[a], b);
          },
          Hd: function(a, b) {
            c.uniform3fv(d.m[a], b);
          },
          Dc: function(a, b, e, h) {
            c.uniform3f(d.m[a], b, e, h);
          },
          vb: function(a, b) {
            c.uniform4fv(d.m[a], b);
          },
          Id: function(a, b) {
            c.uniformMatrix2fv(d.m[a], !1, b);
          },
          Jd: function(a, b) {
            c.uniformMatrix3fv(d.m[a], !1, b);
          },
          Kd: function(a, b) {
            c.uniformMatrix4fv(d.m[a], !1, b);
          },
          L: function(a, b) {
            T.set(a);
            b.forEach(function(a) {
              switch (a.type) {
                case "4f":
                  c.uniform4fv(d.m[a.name], a.value);
                  break;
                case "3f":
                  c.uniform3fv(d.m[a.name], a.value);
                  break;
                case "2f":
                  c.uniform2fv(d.m[a.name], a.value);
                  break;
                case "1f":
                  c.uniform1f(d.m[a.name], a.value);
                  break;
                case "1i":
                  c.uniform1i(d.m[a.name], a.value);
                  break;
                case "mat2":
                  c.uniformMatrix2fv(d.m[a.name], !1, a.value);
                  break;
                case "mat3":
                  c.uniformMatrix3fv(d.m[a.name], !1, a.value);
                  break;
                case "mat4":
                  c.uniformMatrix4fv(d.m[a.name], !1, a.value);
              }
            });
          }
        };
      return T;
    })(),
    c,
    ra = (function() {
      var a = !1,
        b = !1,
        f = !1,
        g = !1,
        h = !0,
        d = !1,
        q = {
          w: function() {
            return a.width;
          },
          I: function() {
            return a.height;
          },
          ad: function() {
            return a;
          },
          Zc: function() {
            return c;
          },
          o: function() {
            return h;
          },
          flush: function() {
            c.flush();
          },
          dc: function() {
            d || (d = new Uint8Array(a.width * a.height * 4));
            c.readPixels(0, 0, a.width, a.height, c.RGBA, c.UNSIGNED_BYTE, d);
            return d;
          },
          cd: function() {
            return a.toDataURL("image/jpeg");
          },
          dd: function() {
            p.F();
            b ||
              ((b = document.createElement("canvas")),
              (f = b.getContext("2d")));
            b.width = a.width;
            b.height = a.height;
            var e = q.dc(),
              d = f.createImageData(b.width, b.height),
              h,
              g,
              w = b.width,
              x = b.height,
              y = d.data;
            for (g = 0; g < x; ++g) {
              var C = x - g - 1;
              for (h = 0; h < w; ++h) {
                var z = 4 * (g * w + h);
                var E = 4 * (C * w + h);
                y[z] = e[E];
                y[z + 1] = e[E + 1];
                y[z + 2] = e[E + 2];
                y[z + 3] = e[E + 3];
              }
            }
            f.putImageData(d, 0, 0);
            return b.toDataURL("image/png");
          },
          bd: function(e) {
            !b &&
              e &&
              ((b = document.createElement("canvas")),
              (f = b.getContext("2d")));
            var d = e ? b : document.createElement("canvas");
            d.width = a.width;
            d.height = a.height;
            (e ? f : d.getContext("2d")).drawImage(a, 0, 0);
            return d;
          },
          l: function(b) {
            b.Sb && !b.fa
              ? (a = document.getElementById(b.Sb))
              : b.fa && (a = b.fa);
            a ||
              ((a = document.createElement("canvas")),
              document.body.appendChild(a));
            a.width = b && void 0 !== b.width ? b.width : 512;
            a.height = b && void 0 !== b.height ? b.height : 512;
            "undefined" === typeof b && (b = {});
            void 0 === b.premultipliedAlpha && (b.premultipliedAlpha = !1);
            void 0 === b.jb && (b.jb = !0);
            void 0 === b.antialias && (b.antialias = !1);
            var d = {
              antialias: b.antialias,
              alpha: !0,
              preserveDrawingBuffer: !0,
              premultipliedAlpha: b.premultipliedAlpha,
              stencil: !1,
              depth: b.jb
            };
            (c = a.getContext("webgl", d))
              ? (h = undefined)
              : ((c = a.getContext("webgl", d)) ||
                  (c = a.getContext("experimental-webgl", d)),
                (h = !1));
            if (!c) return !1;
            (g = c.getExtension("WEBGL_lose_context")) &&
              a.addEventListener("webglcontextlost", b.sc, !1);
            if (!r.l() || (!r.Ob() && h)) return !1;
            c.clearColor(0, 0, 0, 0);
            c.disable(c.DEPTH_TEST);
            c.disable(c.BLEND);
            c.disable(c.DITHER);
            c.disable(c.STENCIL_TEST);
            c.GENERATE_MIPMAP_HINT && c.hint(c.GENERATE_MIPMAP_HINT, c.NICEST);
            c.disable(c.SAMPLE_ALPHA_TO_COVERAGE);
            c.disable(c.SAMPLE_COVERAGE);
            return !0;
          },
          lc: function() {
            if (!m.l()) return !1;
            c.depthFunc(c.LEQUAL);
            c.clearDepth(1);
            return !0;
          }
        };
      return q;
    })(),
    pa = (function() {
      var a = "undefined" === typeof m ? JEShaders : m;
      return {
        Cc: function(b) {
          a !== b && (a.R(), (a = b));
        },
        Ga: function() {
          return a.Ga();
        },
        wa: function() {
          a.wa();
        },
        Oa: function() {
          a.Oa();
        },
        R: function() {
          a.R();
        },
        set: function(b) {
          a.set(b);
        }
      };
    })(),
    P = (function() {
      var a,
        b,
        f = 0,
        g = -2,
        h = -2,
        d = !1,
        q = {
          reset: function() {
            h = g = -2;
          },
          l: function() {
            d ||
              ((a = c.createBuffer()),
              c.bindBuffer(c.ARRAY_BUFFER, a),
              c.bufferData(
                c.ARRAY_BUFFER,
                new Float32Array([-1, -1, 3, -1, -1, 3]),
                c.STATIC_DRAW
              ),
              (b = c.createBuffer()),
              c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, b),
              c.bufferData(
                c.ELEMENT_ARRAY_BUFFER,
                new Uint16Array([0, 1, 2]),
                c.STATIC_DRAW
              ),
              q.la(),
              (d = !0));
          },
          a: function(a) {
            var b = f++,
              d = a.Z.length,
              e = c.createBuffer();
            c.bindBuffer(c.ARRAY_BUFFER, e);
            c.bufferData(
              c.ARRAY_BUFFER,
              a.yb instanceof Float32Array ? a.yb : new Float32Array(a.yb),
              c.STATIC_DRAW
            );
            g = b;
            if (a.Z) {
              var q = c.createBuffer();
              c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, q);
              if (65536 > a.Z.length) {
                var x = Uint16Array;
                var y = c.UNSIGNED_SHORT;
                var C = 2;
              } else (x = Uint32Array), (y = c.UNSIGNED_INT), (C = 4);
              c.bufferData(
                c.ELEMENT_ARRAY_BUFFER,
                a.Z instanceof x ? a.Z : new x(a.Z),
                c.STATIC_DRAW
              );
              h = b;
            }
            var z = {
              Nb: function(a) {
                g !== b && (c.bindBuffer(c.ARRAY_BUFFER, e), (g = b));
                a && pa.Oa();
              },
              Lb: function() {
                h !== b && (c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, q), (h = b));
              },
              bind: function(a) {
                z.Nb(a);
                z.Lb();
              },
              Uc: function() {
                c.drawElements(c.TRIANGLES, d, y, 0);
              },
              Vc: function(a, b) {
                c.drawElements(c.TRIANGLES, a, y, b * C);
              },
              remove: function() {
                c.deleteBuffer(e);
                a.Z && c.deleteBuffer(q);
                z = null;
              }
            };
            return z;
          },
          la: function() {
            -1 !== g && (c.bindBuffer(c.ARRAY_BUFFER, a), (g = -1));
            -1 !== h && (c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, b), (h = -1));
          },
          g: function(a, b) {
            a && P.la();
            b && pa.wa();
            c.drawElements(c.TRIANGLES, 3, c.UNSIGNED_SHORT, 0);
          },
          cc: function() {
            c.deleteBuffer(a);
            c.deleteBuffer(b);
          }
        };
      return q;
    })(),
    p = (function() {
      var a,
        b,
        f,
        g = !1,
        h = { u: -2, ac: 1 };
      return {
        l: function() {
          if (!g) {
            a = c.createFramebuffer();
            var d = r.o();
            b = d && c.DRAW_FRAMEBUFFER ? c.DRAW_FRAMEBUFFER : c.FRAMEBUFFER;
            f = d && c.READ_FRAMEBUFFER ? c.READ_FRAMEBUFFER : c.FRAMEBUFFER;
            g = !0;
          }
        },
        gd: function() {
          return b;
        },
        bb: function() {
          return f;
        },
        oa: function() {
          return c.FRAMEBUFFER;
        },
        jd: function() {
          return h;
        },
        Yc: function() {
          return a;
        },
        a: function(d) {
          void 0 === d.ib && (d.ib = !1);
          var g = d.ia ? d.ia : !1,
            e = d.width,
            f = void 0 !== d.height ? d.height : d.width,
            l = a,
            t = !1,
            w = !1,
            x = 0;
          g && ((e = e ? e : g.w()), (f = f ? f : g.I()));
          var y = {
            Ma: function() {
              w || ((l = c.createFramebuffer()), (w = !0), (x = h.ac++));
            },
            Bb: function() {
              y.Ma();
              y.i();
              t = c.createRenderbuffer();
              c.bindRenderbuffer(c.RENDERBUFFER, t);
              c.renderbufferStorage(c.RENDERBUFFER, c.DEPTH_COMPONENT16, e, f);
              c.framebufferRenderbuffer(
                b,
                c.DEPTH_ATTACHMENT,
                c.RENDERBUFFER,
                t
              );
              c.clearDepth(1);
            },
            bind: function(a, d) {
              x !== h.u && (c.bindFramebuffer(b, l), (h.u = x));
              g && g.i();
              d && c.viewport(0, 0, e, f);
              a && c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT);
            },
            Mc: function() {
              x !== h.u && (c.bindFramebuffer(b, l), (h.u = x));
            },
            clear: function() {
              c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT);
            },
            Qc: function() {
              c.clear(c.COLOR_BUFFER_BIT);
            },
            Rc: function() {
              c.clear(c.DEPTH_BUFFER_BIT);
            },
            Ec: function() {
              c.viewport(0, 0, e, f);
            },
            i: function() {
              x !== h.u && (c.bindFramebuffer(b, l), (h.u = x));
            },
            rtt: function(a) {
              g = a;
              h.u !== x && (c.bindFramebuffer(c.FRAMEBUFFER, l), (h.u = x));
              a.i();
            },
            F: function() {
              c.bindFramebuffer(b, null);
              h.u = -1;
            },
            resize: function(a, b) {
              e = a;
              f = b;
              t &&
                (c.bindRenderbuffer(c.RENDERBUFFER, t),
                c.renderbufferStorage(
                  c.RENDERBUFFER,
                  c.DEPTH_COMPONENT16,
                  e,
                  f
                ));
            },
            remove: function() {
              c.bindFramebuffer(b, l);
              c.framebufferTexture2D(
                b,
                c.COLOR_ATTACHMENT0,
                c.TEXTURE_2D,
                null,
                0
              );
              t &&
                c.framebufferRenderbuffer(
                  b,
                  c.DEPTH_ATTACHMENT,
                  c.RENDERBUFFER,
                  null
                );
              c.bindFramebuffer(b, null);
              c.deleteFramebuffer(l);
              t && c.deleteRenderbuffer(t);
              y = null;
            }
          };
          d.ib && y.Bb();
          return y;
        },
        F: function() {
          c.bindFramebuffer(b, null);
          h.u = -1;
        },
        Hc: function() {
          c.bindFramebuffer(b, null);
          c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT);
          c.viewport(0, 0, r.w(), r.I());
          h.u = -1;
        },
        reset: function() {
          h.u = -2;
        },
        V: function() {
          0 !== h.u && (c.bindFramebuffer(b, a), (h.u = 0));
        },
        clear: function() {
          c.viewport(0, 0, r.w(), r.I());
          c.clear(c.COLOR_BUFFER_BIT);
        }
      };
    })(),
    V = (function() {
      function a(a) {
        c.bindTexture(c.TEXTURE_2D, a);
      }
      function b(a) {
        O[0] = a;
        a = ia[0];
        var b = (a >> 16) & 32768,
          G = (a >> 12) & 2047,
          d = (a >> 23) & 255;
        return 103 > d
          ? b
          : 142 < d
            ? b | 31744 | ((255 == d ? 0 : 1) && a & 8388607)
            : 113 > d
              ? ((G |= 2048), b | ((G >> (114 - d)) + ((G >> (113 - d)) & 1)))
              : (b = (b | ((d - 112) << 10) | (G >> 1)) + (G & 1));
      }
      function f(a) {
        var G = new Uint16Array(a.length);
        a.forEach(function(a, d) {
          G[d] = b(a);
        });
        return G;
      }
      function g() {
        if (void 0 !== ca) return ca;
        if (!pa.Ga() || !x) return !0;
        var a = W.a({ isFloat: !1, D: !0, array: f([1, 1, 1, 1]), width: 1 });
        p.F();
        c.viewport(0, 0, 1, 1);
        c.clearColor(0, 0, 0, 0);
        c.clear(c.COLOR_BUFFER_BIT);
        pa.set("s0");
        a.Ta(0);
        P.g(!1, !0);
        var b = new Uint8Array(4);
        c.readPixels(0, 0, 1, 1, c.RGBA, c.UNSIGNED_BYTE, b);
        ca = 0.9 < b[0];
        a.remove();
        p.V();
        return ca;
      }
      var h = 0,
        d,
        q = 0,
        e,
        n = !1,
        l,
        t,
        w,
        x = !1,
        y = !1,
        C,
        z,
        E,
        T = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]],
        N = !1,
        da = !1,
        O = new Float32Array(1),
        ia = new Int32Array(O.buffer),
        ca = void 0,
        W = {
          l: function() {
            if (!x) {
              t = [c.RGB, !1, c.RGB, c.RGBA];
              w = [c.RGB, !1, c.RGB, c.RGBA];
              d = [
                c.TEXTURE0,
                c.TEXTURE1,
                c.TEXTURE2,
                c.TEXTURE3,
                c.TEXTURE4,
                c.TEXTURE5,
                c.TEXTURE6,
                c.TEXTURE7
              ];
              N = "undefined" !== typeof JEContext;
              da = "undefined" !== typeof r;
              N && JEContext.vd() && d.push(c.TEXTURE8, c.TEXTURE9);
              e = [-1, -1, -1, -1, -1, -1, -1, -1];
              l = [c.UNSIGNED_BYTE, c.FLOAT, c.FLOAT];
              if (!n) {
                for (var a = new Float32Array(16384), b = 0; 16384 > b; ++b)
                  a[b] = 2 * Math.random() - 1;
                n = {
                  random: W.a({ isFloat: !0, isPot: !0, array: a, width: 64 }),
                  xb: W.a({
                    isFloat: !1,
                    isPot: !0,
                    width: 1,
                    array: new Uint8Array([0, 0, 0, 0])
                  })
                };
              }
              x = !0;
            }
          },
          kc: function() {
            W.Ic();
          },
          md: function() {
            return n.xb;
          },
          Ic: function() {
            l[1] = r.pa();
          },
          yc: function() {
            w = t = [c.RGBA, c.RGBA, c.RGBA, c.RGBA];
          },
          xd: function(a, b) {
            m.set("s1");
            p.F();
            var G = a.w(),
              d = a.I();
            c.viewport(0, 0, G, d);
            a.b(0);
            P.g(!1, !1);
            c.readPixels(0, 0, G, d, c.RGBA, c.UNSIGNED_BYTE, b);
          },
          bc: function(b, d, e) {
            c.activeTexture(c.TEXTURE0);
            h = 0;
            var G = c.createTexture();
            a(G);
            var g = r.o() && c.RGBA32F ? c.RGBA32F : c.FLOAT;
            d = d instanceof Float32Array ? d : new Float32Array(d);
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER, c.NEAREST);
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MIN_FILTER, c.NEAREST);
            c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, e);
            c.texImage2D(
              c.TEXTURE_2D,
              0,
              c.RGBA,
              b.w(),
              b.I(),
              0,
              c.RGBA,
              g,
              d
            );
            a(null);
            c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, !1);
            p.V();
            m.set("s0");
            b.j();
            c.clearColor(0, 0, 0, 0);
            c.clear(c.COLOR_BUFFER_BIT);
            a(G);
            P.g(!0, !1);
            c.deleteTexture(G);
          },
          a: function(b) {
            function n() {
              a(H);
              X && c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, X);
              b.isPot
                ? (c.texParameteri(
                    c.TEXTURE_2D,
                    c.TEXTURE_WRAP_S,
                    b.kb ? c.MIRRORED_REPEAT : c.REPEAT
                  ),
                  c.texParameteri(
                    c.TEXTURE_2D,
                    c.TEXTURE_WRAP_T,
                    b.M ? c.MIRRORED_REPEAT : c.REPEAT
                  ))
                : (c.texParameteri(
                    c.TEXTURE_2D,
                    c.TEXTURE_WRAP_S,
                    c.CLAMP_TO_EDGE
                  ),
                  c.texParameteri(
                    c.TEXTURE_2D,
                    c.TEXTURE_WRAP_T,
                    c.CLAMP_TO_EDGE
                  ));
              b.ra &&
                "undefined" !== typeof JESETTINGS &&
                c.texParameterf(
                  c.TEXTURE_2D,
                  JEContext.ed().TEXTURE_MAX_ANISOTROPY_EXT,
                  JESETTINGS.Kc
                );
              c.texParameteri(
                c.TEXTURE_2D,
                c.TEXTURE_MAG_FILTER,
                b.isLinear ? c.LINEAR : c.NEAREST
              );
              b.isLinear
                ? c.texParameteri(
                    c.TEXTURE_2D,
                    c.TEXTURE_MIN_FILTER,
                    b.isMipmap && !U ? c.NEAREST_MIPMAP_LINEAR : c.LINEAR
                  )
                : c.texParameteri(
                    c.TEXTURE_2D,
                    c.TEXTURE_MIN_FILTER,
                    b.isMipmap && !U ? c.NEAREST_MIPMAP_NEAREST : c.NEAREST
                  );
              K = t[b.N - 1];
              Q = w[b.N - 1];
              R = l[G];
              if (r.o()) {
                var d = c.RGBA32F;
                K === c.RGBA && R === c.FLOAT && d && (Q = d);
                K === c.RGB && R === c.FLOAT && d && ((Q = d), (K = c.RGBA));
              }
              if ((b.D && !b.isFloat) || (b.isFloat && b.isMipmap && qa.oc()))
                (d = c.RGBA16F) && (Q = d), (R = r.pa());
              b.lb && 4 === b.N && (K = JEContext.kd());
              b.C
                ? c.texImage2D(c.TEXTURE_2D, 0, Q, K, R, b.C)
                : b.url
                  ? c.texImage2D(c.TEXTURE_2D, 0, Q, K, R, O)
                  : L
                    ? (c.texImage2D(c.TEXTURE_2D, 0, Q, k, u, 0, K, R, L),
                      b.isKeepArray || (L = null))
                    : c.texImage2D(c.TEXTURE_2D, 0, Q, k, u, 0, K, R, null);
              if (b.isMipmap)
                if (!U && v) v.W(), (Z = !0);
                else if (U) {
                  d = Math.log(Math.min(k, u)) / Math.log(2);
                  var g;
                  ba = Array(1 + d);
                  ba[0] = H;
                  for (g = 1; g <= d; ++g) {
                    var f = Math.pow(2, g);
                    var n = k / f;
                    f = u / f;
                    var ta = c.createTexture();
                    a(ta);
                    c.texParameteri(
                      c.TEXTURE_2D,
                      c.TEXTURE_MIN_FILTER,
                      c.NEAREST
                    );
                    c.texParameteri(
                      c.TEXTURE_2D,
                      c.TEXTURE_MAG_FILTER,
                      c.NEAREST
                    );
                    c.texImage2D(c.TEXTURE_2D, 0, Q, n, f, 0, K, R, null);
                    a(null);
                    ba[g] = ta;
                  }
                  Z = !0;
                }
              a(null);
              e[h] = -1;
              X && c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, !1);
              A = !0;
              J && v && (J(v), (J = !1));
            }
            "undefined" === typeof b.isFloat && (b.isFloat = !1);
            "undefined" === typeof b.D && (b.D = !1);
            "undefined" === typeof b.isPot && (b.isPot = !0);
            "undefined" === typeof b.isLinear && (b.isLinear = !1);
            "undefined" === typeof b.isMipmap && (b.isMipmap = !1);
            "undefined" === typeof b.Aa && (b.Aa = !1);
            void 0 === b.ra && (b.ra = !1);
            void 0 === b.M && (b.M = !1);
            void 0 === b.kb && (b.kb = !1);
            void 0 === b.lb && (b.lb = !1);
            void 0 === b.N && (b.N = 4);
            void 0 === b.Fa && (b.Fa = !1);
            "undefined" === typeof b.isFlipY &&
              (b.isFlipY = b.url || b.array ? !0 : !1);
            "undefined" === typeof b.isKeepArray && (b.isKeepArray = !1);
            b.data &&
              ((b.array =
                "string" === typeof b.data
                  ? na(b.data)
                  : b.isFloat
                    ? new Float32Array(b.data)
                    : new Uint8Array(b.data)),
              (b.isFlipY = !1));
            var G = 0,
              x = b.C ? !0 : !1;
            b.isFloat && (b.D = !0);
            b.D && (G = 1);
            b.Fa || r.o() || !b.isFloat || !da || r.Va() || (b.isFloat = !1);
            b.isFloat && (G = 2);
            b.ra && N && !JEContext.qd() && (b.ra = !1);
            var H = c.createTexture(),
              J = b.Aa,
              O = null,
              L = !1,
              k = 0,
              u = 0,
              A = !1,
              F = q++,
              B = !1,
              D,
              S,
              Q,
              K,
              R,
              X = b.isFlipY,
              U = b.D && b.isMipmap && qa && !qa.Pb(),
              ba,
              Z = !1;
            "undefined" !== typeof b.width &&
              b.width &&
              ((k = b.width),
              (u = "undefined" !== typeof b.height && b.height ? b.height : k));
            var v = {
              get: function() {
                return H;
              },
              w: function() {
                return k;
              },
              I: function() {
                return u;
              },
              nd: function() {
                return b.url;
              },
              rd: function() {
                return b.isFloat;
              },
              td: function() {
                return b.D;
              },
              ud: function() {
                return b.isLinear;
              },
              W: function() {
                c.generateMipmap(c.TEXTURE_2D);
              },
              Ua: function(b, d) {
                U
                  ? (b || (b = v.eb()), v.ya(d), a(ba[b]), (e[d] = -1))
                  : v.b(d);
              },
              eb: function() {
                return Math.log(k) / Math.log(2);
              },
              ab: function(b) {
                if (U) {
                  b || (b = v.eb());
                  m.set("s11");
                  v.ya(0);
                  var d,
                    g = k,
                    h = u;
                  for (d = 1; d <= b; ++d)
                    (g /= 2),
                      (h /= 2),
                      m.H("u9", 0.25 / g, 0.25 / h),
                      c.viewport(0, 0, g, h),
                      a(ba[d - 1]),
                      c.framebufferTexture2D(
                        p.oa(),
                        c.COLOR_ATTACHMENT0,
                        c.TEXTURE_2D,
                        ba[d],
                        0
                      ),
                      P.g(!1, 1 === d);
                  e[0] = -1;
                } else v.W();
              },
              ya: function(a) {
                a !== h && (c.activeTexture(d[a]), (h = a));
              },
              b: function(b) {
                if (!A) return !1;
                v.ya(b);
                if (e[b] === F) return !1;
                a(H);
                e[b] = F;
                return !0;
              },
              Ta: function(b) {
                c.activeTexture(d[b]);
                h = b;
                a(H);
                e[b] = F;
              },
              i: function() {
                c.framebufferTexture2D(
                  p.oa(),
                  c.COLOR_ATTACHMENT0,
                  c.TEXTURE_2D,
                  H,
                  0
                );
              },
              j: function() {
                c.viewport(0, 0, k, u);
                c.framebufferTexture2D(
                  p.oa(),
                  c.COLOR_ATTACHMENT0,
                  c.TEXTURE_2D,
                  H,
                  0
                );
              },
              Od: function() {
                c.framebufferTexture2D(
                  p.oa(),
                  c.COLOR_ATTACHMENT0,
                  c.TEXTURE_2D,
                  null,
                  0
                );
              },
              resize: function(a, b) {
                k = a;
                u = b;
                n();
              },
              clone: function(a) {
                a = W.a({
                  width: k,
                  height: u,
                  D: b.D,
                  isFloat: b.isFloat,
                  isLinear: b.isLinear,
                  M: b.M,
                  isFlipY: a ? !X : X,
                  isPot: b.isPot
                });
                pa.set("s0");
                p.V();
                a.i();
                c.viewport(0, 0, k, u);
                v.b(0);
                P.g(!0, !0);
                return a;
              },
              Ec: function() {
                c.viewport(0, 0, k, u);
              },
              remove: function() {
                c.deleteTexture(H);
                v = null;
              },
              refresh: function() {
                v.Ta(0);
                X && c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, !0);
                x
                  ? c.texImage2D(c.TEXTURE_2D, 0, Q, K, c.UNSIGNED_BYTE, b.C)
                  : c.texImage2D(c.TEXTURE_2D, 0, Q, k, u, 0, K, R, L);
                X && c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, !1);
              },
              Wa: function() {
                var a = k * u * 4;
                S = [
                  new Uint8Array(a),
                  new Uint8Array(a),
                  new Uint8Array(a),
                  new Uint8Array(a)
                ];
                D = [
                  new Float32Array(S[0].buffer),
                  new Float32Array(S[1].buffer),
                  new Float32Array(S[2].buffer),
                  new Float32Array(S[3].buffer)
                ];
                B = !0;
              },
              vc: function() {
                B || v.Wa();
                S.forEach(function(a, b) {
                  c.readPixels(0, u * b, k, u, c.RGBA, c.UNSIGNED_BYTE, a);
                });
                return D;
              },
              Ya: function() {
                p.F();
                m.set("s12");
                v.b(0);
                c.viewport(0, 0, k, 4 * u);
                c.clear(c.COLOR_BUFFER_BIT);
                for (var a = 0; 4 > a; ++a)
                  c.viewport(0, u * a, k, u),
                    m.vb("u10", T[a]),
                    P.g(!1, 0 === a);
              },
              Pd: function(b) {
                a(H);
                X && c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, X);
                c.texImage2D(c.TEXTURE_2D, 0, Q, k, u, 0, K, R, b);
                e[h] = F;
                X && c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, !1);
              },
              Qd: function(b, d) {
                a(H);
                c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, d);
                c.texImage2D(c.TEXTURE_2D, 0, Q, K, R, b);
                e[h] = F;
                d && c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, !1);
              },
              Ad: function(a, d) {
                var g = k * u,
                  e = 4 * g;
                a = b.D ? (a ? "RGBE" : "JSON") : "RGBA";
                d && (a = d);
                d = r.o() && !1;
                switch (a) {
                  case "RGBE":
                    var h = "s47";
                    break;
                  case "JSON":
                    h = d ? "s0" : "s12";
                    break;
                  case "RGBA":
                  case "RGBAARRAY":
                    h = "s6";
                }
                B ||
                  ("RGBA" === a || "RGBE" === a || "RGBAARRAY" === a
                    ? ((S = new Uint8Array(e)), (B = !0))
                    : "JSON" !== a || d || v.Wa());
                p.F();
                m.set(h);
                v.b(0);
                if ("RGBA" === a || "RGBE" === a || "RGBAARRAY" === a) {
                  c.viewport(0, 0, k, u);
                  P.g(!0, !0);
                  c.readPixels(0, 0, k, u, c.RGBA, c.UNSIGNED_BYTE, S);
                  if ("RGBAARRAY" === a) return { data: S };
                  y ||
                    ((C = document.createElement("canvas")),
                    (z = C.getContext("2d")),
                    (y = !0));
                  C.width = k;
                  C.height = u;
                  E = z.createImageData(k, u);
                  E.data.set(S);
                  z.putImageData(E, 0, 0);
                  var f = C.toDataURL("image/png");
                } else if ("JSON" === a)
                  if (d)
                    (f = new Float32Array(g)),
                      c.viewport(0, 0, k, u),
                      P.g(!0, !0),
                      c.readPixels(0, 0, k, u, c.RGBA, c.FLOAT, f);
                  else {
                    for (f = 0; 4 > f; ++f)
                      c.viewport(0, u * f, k, u),
                        m.vb("u10", T[f]),
                        P.g(!f, !f);
                    S.forEach(function(a, b) {
                      c.readPixels(0, u * b, k, u, c.RGBA, c.UNSIGNED_BYTE, a);
                    });
                    f = Array(g);
                    for (h = 0; h < g; ++h)
                      (f[4 * h] = D[0][h]),
                        (f[4 * h + 1] = D[1][h]),
                        (f[4 * h + 2] = D[2][h]),
                        (f[4 * h + 3] = D[3][h]);
                  }
                return {
                  format: a,
                  data: f,
                  width: k,
                  height: u,
                  isMirrorY: b.M,
                  isFlipY: "RGBA" === a ? b.isFlipY : !b.isFlipY
                };
              }
            };
            b.isMipmap && !U && A && !Z && (v.W(), (Z = !0));
            if (b.url)
              a(H),
                c.texImage2D(
                  c.TEXTURE_2D,
                  0,
                  c.RGBA,
                  1,
                  1,
                  0,
                  c.RGBA,
                  c.UNSIGNED_BYTE,
                  null
                ),
                (O = new Image()),
                (O.Tc = "Anonymous"),
                (O.crossOrigin = "Anonymous"),
                (O.src = b.url),
                (O.onload = function() {
                  k = O.width;
                  u = O.height;
                  n();
                });
            else if (b.C) {
              var M = function() {
                k = void 0 !== b.C.videoWidth ? b.C.videoWidth : b.C.width;
                u = void 0 !== b.C.videoHeight ? b.C.videoHeight : b.C.height;
                k ? n() : setTimeout(M, 1);
              };
              M();
            } else
              b.array
                ? (b.D && !b.isFloat
                    ? b.array instanceof Uint16Array
                      ? ((L = b.array), n())
                      : g()
                        ? ((L = f(b.array)), n())
                        : (n(), W.bc(v, b.array, X))
                    : ((L = b.isFloat
                        ? b.array instanceof Float32Array
                          ? b.array
                          : new Float32Array(b.array)
                        : b.array instanceof Uint8Array
                          ? b.array
                          : new Uint8Array(b.array)),
                      n()),
                  b.isKeepArray ||
                    (L && L !== b.array && (L = null), delete b.array))
                : n();
            v.gc = v.w;
            J && A && (J(v), (J = !1));
            return v;
          },
          F: function(b) {
            b !== h && (c.activeTexture(d[b]), (h = b));
            e[b] = -1;
            a(null);
          },
          Nc: function(a) {
            n.random.b(a);
          },
          reset: function() {
            for (var a = 0; a < d.length; ++a) e[a] = -1;
            h = -1;
          },
          zd: function() {
            h = -1;
          },
          Md: function() {
            for (var a = 0; a < d.length; ++a) W.F(a);
          },
          cc: function() {
            n && (n.random.remove(), n.xb.remove());
          },
          Nd: function(a, b) {
            if ("RGBA" === a.format || "RGBE" === a.format) {
              var d = new Image();
              d.src = a.data;
              d.onload = function() {
                W.a({
                  M: a.isMirrorY,
                  isFlipY: a.isFlipY,
                  isFloat: !1,
                  C: d,
                  Aa: function(d) {
                    if ("RGBA" === a.format) b(d);
                    else {
                      var h = a.width,
                        g = a.height,
                        f = W.a({
                          M: a.isMirrorY,
                          isFloat: !0,
                          width: h,
                          height: g,
                          isFlipY: a.isFlipY
                        });
                      p.V();
                      c.viewport(0, 0, h, g);
                      m.set("s48");
                      f.i();
                      d.b(0);
                      P.g(!0, !0);
                      W.F(0);
                      b(f);
                      c.flush();
                      setTimeout(d.remove, 50);
                    }
                  }
                });
              };
            } else
              "JSON" === a.format
                ? b(
                    W.a({
                      isFloat: !0,
                      isFlipY: a.isFlipY,
                      width: a.width,
                      height: a.height,
                      array: new Float32Array(a.data)
                    })
                  )
                : b(!1);
          }
        };
      return W;
    })(),
    ua = {
      a: function(a) {
        var b = [V.a(a), V.a(a)],
          f = [b[1], b[0]],
          g = f,
          h = {
            Bc: function(a) {
              g[1].i();
              g[0].b(a);
              h.wb();
            },
            Ed: function(a) {
              g[1].j();
              g[0].b(a);
              h.wb();
            },
            wb: function() {
              g = g === b ? f : b;
            },
            refresh: function() {
              g[0].refresh();
              g[1].refresh();
            },
            b: function(a) {
              g[0].b(a);
            }
          };
        return h;
      }
    },
    r = (function() {
      function a() {
        b = "undefined" === typeof ra ? JEContext : ra;
        f = !0;
      }
      var b,
        f = !1,
        g = !1,
        h = !1,
        d = !1,
        q = !1,
        e = !1,
        n = !1,
        l = !1,
        t = !1,
        w = !1,
        x = !1,
        y = !0,
        C = !0,
        z = !0,
        E,
        T,
        N = {
          l: function() {
            if (f) return !0;
            a();
            N.o() || (N.Za(), N.na());
            N.Yb();
            N.Zb();
            p.l();
            V.l();
            if (!N.Tb()) return !1;
            P.l();
            V.kc();
            return !0;
          },
          w: function() {
            f || a();
            return b.w();
          },
          I: function() {
            f || a();
            return b.I();
          },
          o: function() {
            f || a();
            return b.o();
          },
          Yb: function() {
            x = (w =
              c.getExtension("EXT_color_buffer_float") ||
              c.getExtension("WEBGL_color_buffer_float") ||
              c.getExtension("OES_color_buffer_float"))
              ? !0
              : !1;
            window.GL_EXT_COLORBUFFERFLOAT = w;
          },
          Zb: function() {
            c.getExtension("EXT_color_buffer_half_float") ||
              c.getExtension("WEBGL_color_buffer_half_float") ||
              c.getExtension("OES_color_buffer_half_float");
          },
          Za: function() {
            if (!g) {
              this.o() ||
                ((h =
                  c.getExtension("OES_texture_float") ||
                  c.getExtension("MOZ_OES_texture_float") ||
                  c.getExtension("WEBKIT_OES_texture_float")),
                (q = (window.GL_EXT_FLOAT = h) ? !0 : !1));
              if (q || this.o())
                (d =
                  c.getExtension("OES_texture_float_linear") ||
                  c.getExtension("MOZ_OES_texture_float_linear") ||
                  c.getExtension("WEBKIT_OES_texture_float_linear")),
                  (window.GL_EXT_FLOATLINEAR = d);
              g = !0;
            }
          },
          na: function() {
            if (!t) {
              if (!this.o()) {
                if (
                  (e =
                    c.getExtension("OES_texture_half_float") ||
                    c.getExtension("MOZ_OES_texture_half_float") ||
                    c.getExtension("WEBKIT_OES_texture_half_float"))
                )
                  (T = e.HALF_FLOAT_OES), (n = !0);
                window.GL_EXT_HALFFLOAT = e;
              }
              if (n || this.o())
                (l =
                  c.getExtension("OES_texture_half_float_linear") ||
                  c.getExtension("MOZ_OES_texture_half_float_linear") ||
                  c.getExtension("WEBKIT_OES_texture_half_float_linear")),
                  (window.GL_EXT_HALFFLOATLINEAR = l);
              t = !0;
            }
          },
          pa: function() {
            if (N.o()) return c.HALF_FLOAT;
            N.na();
            return n ? T : c.FLOAT;
          },
          Va: function() {
            return y;
          },
          Pc: function() {
            return C;
          },
          Oc: function() {
            return z;
          },
          Ob: function() {
            return x;
          },
          Vb: function() {
            E = !N.o();
            if (!E) return (C = y = !0);
            var a = p.a({ width: 1 });
            a.Ma();
            var b = V.a({ width: 1, isFloat: !0, Fa: !0, N: 4 });
            a.i();
            b.i();
            c.flush();
            N.na();
            if (!n) return !1;
            b.remove();
            b = V.a({ width: 1, isFloat: !1, D: !0, N: 4 });
            b.i();
            if (c.checkFramebufferStatus(p.bb()) !== c.FRAMEBUFFER_COMPLETE)
              return !1;
            y = !1;
            C = !0;
            a.remove();
            b.remove();
            return !0;
          },
          Ub: function() {
            var a = p.a({ width: 1 });
            a.Ma();
            var b = V.a({ width: 1, isFloat: !0, N: 3 });
            a.i();
            b.i();
            c.flush();
            c.checkFramebufferStatus(p.bb()) !== c.FRAMEBUFFER_COMPLETE
              ? (V.yc(), (z = !1))
              : (z = !0);
            a.remove();
            b.remove();
            return !0;
          },
          Tb: function() {
            return N.Vb() && N.Ub() ? !0 : !1;
          }
        };
      return N;
    })(),
    qa = (function() {
      var a = !1,
        b = [0.8, 1, 0.8, 1],
        f = 0,
        g,
        h = new Uint8Array(4),
        d = b
          .concat(b)
          .concat(b)
          .concat(b),
        q = !0,
        e = {
          l: function() {
            function b() {
              c.generateMipmap(c.TEXTURE_2D);
              P.la();
              P.g(!1, !0);
              c.readPixels(0, 0, 1, 1, c.RGBA, c.UNSIGNED_BYTE, h);
            }
            r.Za();
            r.na();
            var e = c.RGBA,
              t = c.RGBA;
            if (ra.o()) {
              var w = c.RGBA32F;
              w && (e = w);
              (w = c.RGBA16F) && (t = w);
            }
            P.l();
            p.reset();
            p.F();
            c.viewport(0, 0, 1, 1);
            m.set("s0");
            a = !0;
            g = c.createTexture();
            c.activeTexture(c.TEXTURE0);
            c.bindTexture(c.TEXTURE_2D, g);
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_S, c.REPEAT);
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_T, c.REPEAT);
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER, c.NEAREST);
            c.texParameteri(
              c.TEXTURE_2D,
              c.TEXTURE_MIN_FILTER,
              c.NEAREST_MIPMAP_NEAREST
            );
            c.texImage2D(
              c.TEXTURE_2D,
              0,
              e,
              2,
              2,
              0,
              c.RGBA,
              c.FLOAT,
              new Float32Array(d)
            );
            b();
            if (0 !== h[0]) {
              if (!r.Va()) return (f = 2), !0;
              f = 3;
              return !0;
            }
            c.texImage2D(
              c.TEXTURE_2D,
              0,
              t,
              2,
              2,
              0,
              c.RGBA,
              r.pa(),
              new Uint16Array(d)
            );
            b();
            if (0 !== h[0]) return (f = 2), !0;
            c.texImage2D(
              c.TEXTURE_2D,
              0,
              t,
              2,
              2,
              0,
              c.RGBA,
              c.FLOAT,
              new Float32Array(d)
            );
            b();
            if (0 !== h[0]) return (f = 2), !0;
            q = !1;
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER, c.NEAREST);
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MIN_FILTER, c.LINEAR);
            c.texImage2D(
              c.TEXTURE_2D,
              0,
              t,
              2,
              2,
              0,
              c.RGBA,
              r.pa(),
              new Float32Array(d)
            );
            b();
            return 0 !== h[0] ? ((f = 2), !0) : !1;
          },
          Pb: function() {
            return q;
          },
          hd: function() {
            return f;
          },
          sd: function() {
            a || e.l();
            return 3 === f;
          },
          oc: function() {
            a || e.l();
            return 2 === f;
          }
        };
      return e;
    })(),
    va = {
      a: function(a) {
        var b = V.a(a.alpha),
          f = V.a(a.beta);
        return {
          Wb: function() {
            b.b(1);
            f.b(2);
          }
        };
      }
    },
    ya = {
      a: function(a) {
        var b = a.Fc;
        b.index = a.index;
        b.P = a.P;
        b.parent = a.parent;
        switch (b.type) {
          case "input":
            a = wa.a(b);
            break;
          default:
            a = xa.a(b);
        }
        return a;
      }
    },
    wa = {
      a: function(a) {
        "undefined" === typeof a.sift && (a.sift = !1);
        "undefined" === typeof a.DWT && (a.DWT = !1);
        "undefined" === typeof a.blur && (a.blur = !1);
        "undefined" === typeof a.siftOutWidth && (a.siftOutWidth = !1);
        "undefined" === typeof a.filterBank && (a.filterBank = !1);
        "undefined" === typeof a.poolType && (a.poolType = "max");
        "undefined" === typeof a.postpreprocessing &&
          (a.postpreprocessing = "copy");
        "undefined" === typeof a.density && (a.density = 1);
        a.filterBank &&
          (FilterBank.Dd(a.poolType, a.postpreprocessing),
          FilterBank.Bd(a.density));
        var b = !1;
        if (a.mask) {
          b = !0;
          SETTINGS && void 0 !== SETTINGS.Jb && (a.mask = SETTINGS.Jb + a.mask);
          var f = V.a({ isFloat: !1, url: a.mask });
        }
        var g = !1,
          h = "undefined" !== typeof a.preprocessing ? a.preprocessing : !1,
          d = !1;
        a.sift
          ? Sift.l({ jc: c, fa: !1, width: a.size, wd: a.siftOutWidth })
          : a.DWT && DWT.l({ jc: c, fa: !1, width: a.size });
        switch (h) {
          case "sobel":
            var q = "s30";
            d = !0;
            break;
          case "meanNormalization":
            q = "s31";
            d = !0;
            break;
          case "grayScale":
            q = "s29";
            d = !1;
            break;
          case "copy":
            q = "s0";
            break;
          case "inputLightRegulation":
            q = "s29";
            za.l({ width: a.size, mb: a.nBlurPass, nc: !1 });
            g = !0;
            break;
          default:
            q = "s3";
        }
        b && (q += "Mask");
        if (a.blur) var e = V.a({ isFloat: !1, isPot: !1, width: a.size });
        var n = V.a({
            isFloat: !1,
            isPot: !1,
            width: a.size
          }),
          l,
          t,
          w,
          x = {
            w: function() {
              return a.sift ? Sift.Y() : a.filterBank ? FilterBank.Y() : a.size;
            },
            Y: function() {
              return x.w();
            },
            gb: function() {
              return a.sift
                ? Sift.ha()
                : a.DWT
                  ? DWT.ha()
                  : a.filterBank ? FilterBank.ha() : g ? za.ha() : n;
            },
            G: function() {
              p.V();
              a.blur &&
                (e.j(),
                m.set("s49"),
                m.H("u9", 1 / a.size, 1 / a.size),
                P.g(!1, !0),
                e.b(0));
              m.set(q);
              d && m.B("u29", 1 / a.size);
              n.j();
              b && f.b(1);
              P.g(!1, !1);
              n.b(0);
              g
                ? za.ua(n)
                : a.sift
                  ? (m.R(), Sift.ua())
                  : a.DWT
                    ? (m.R(), DWT.ua(4))
                    : a.filterBank && (m.R(), FilterBank.ua(n));
            },
            Cd: function(a) {
              l = a;
            },
            Na: function(b) {
              l = b;
              t = "s42";
              w = V.a({ isFloat: !0, isPot: !0, width: a.size });
            },
            Da: function() {
              return w;
            },
            K: function() {
              var a = x.gb(),
                b = l.Da();
              l.Ea().K(b);
              b = l.Ea().X();
              m.set(t);
              m.B("u28", b * b);
              a.b(1);
              w.j();
              P.g(!1, !1);
              w.b(0);
            }
          };
        return x;
      }
    },
    xa = {
      a: function(a) {
        "undefined" === typeof a.disableNormalize && (a.disableNormalize = !1);
        var b = [],
          f = [],
          g,
          h,
          d = !1,
          q,
          e = !0,
          n,
          l,
          t = a.isReorganize ? a.isReorganize : !1,
          w = a.kernelSize ? !0 : !1,
          x,
          y,
          C,
          z,
          E,
          T,
          N,
          da,
          O = a.dynPelu ? va.a(a.dynPelu) : !1,
          ia = O ? !0 : !1,
          ca = { isEnabled: !1 },
          W;
        if ("softmax" === a.type) {
          a.activation = "softmax";
          a.size = Math.pow(
            2,
            Math.ceil(Math.log(Math.sqrt(a.num_classes)) / Math.log(2))
          );
          a.sparsity = "undefined" !== typeof a.sparsity ? a.sparsity : a.P.Y();
          a.gain = "undefined" !== typeof a.gain ? a.gain : 1;
          m.L("s20", [{ type: "1f", name: "u12", value: a.gain }]);
          var G = V.a({ isFloat: !0, isPot: !1, width: a.size }),
            ea = V.a({ isFloat: !0, isPot: !1, width: a.size, isMipmap: !0 });
          e = !1;
          var aa = new Uint8Array(Math.pow(4 * a.size, 2)),
            Y;
          for (Y = 0; Y < a.size * a.size; ++Y) {
            var H = Y < a.num_classes ? 255 : 0;
            aa[4 * Y] = H;
            aa[4 * Y + 1] = H;
            aa[4 * Y + 2] = H;
            aa[4 * Y + 3] = H;
          }
          var J = V.a({ isFloat: !1, isPot: !1, width: a.size, array: aa });
        } else
          a.cost
            ? ((a.sparsity =
                "undefined" !== typeof a.sparsity ? a.sparsity : a.P.Y()),
              (e = !1))
            : "full" === a.connectivityUp && (a.sparsity = a.P.Y());
        var fa = {
            elu: "s15",
            elu01: "s16",
            relu: "s14",
            arctan: "s18",
            sigmoid: "s13",
            copy: "s0",
            softplus: "s19",
            softmax: "s20",
            dynPelu: "s17"
          }[a.activation],
          L = a.sparsity * a.sparsity,
          k = !1,
          u = a.size;
        if (a.maxPooling) {
          switch (a.maxPooling.size) {
            case 2:
              var A = "s32";
              break;
            case 4:
              A = "s33";
          }
          k = !0;
          u /= a.maxPooling.size;
          var F = V.a({ isFloat: !0, isPot: !1, width: u });
        }
        var B =
          "undefined" !== typeof a.normalization && a.normalization ? !0 : !1;
        if (B) {
          var D = "s50" + a.index;
          m.mc("s50", D, [((a.normalization.n - 1) / 2).toFixed(1)]);
          m.L(D, [
            { type: "1i", name: "u0", value: 0 },
            { type: "2f", name: "u9", value: [1 / a.size, 1 / a.size] },
            { type: "1f", name: "u8", value: a.normalization.alpha },
            { type: "1f", name: "u11", value: a.normalization.beta },
            { type: "1f", name: "u36", value: a.normalization.k }
          ]);
          var S = V.a({ isFloat: !0, isPot: !0, width: a.size });
          var Q = V.a({ isFloat: !0, isPot: !0, width: a.size });
        }
        aa = a.size * a.sparsity;
        var K = V.a({
            isMipmap: !0,
            isFloat: !0,
            isPot: !0,
            width: aa
          }),
          R = V.a({ isFloat: !0, isPot: !0, width: a.size }),
          X = Math.log(aa / a.size) / Math.log(2),
          U;
        e && (U = V.a({ isFloat: !0, isPot: !1, width: a.size }));
        var ba = V.a(a.bias),
          Z,
          v = {
            w: function() {
              return a.size;
            },
            Y: function() {
              return u;
            },
            fb: function() {
              return a.num_classes;
            },
            Mb: function(a) {
              W.b(a);
            },
            uc: function() {
              a.remap &&
                a.remap.isEnabled &&
                (ca = {
                  isEnabled: !0,
                  qc: V.a({
                    isFloat: !1,
                    isFlipY: !1,
                    array: new Uint8Array(a.remap.maskTexture.data),
                    width: a.remap.maskTexture.width,
                    isPot: !1
                  }),
                  layers: a.remap.layers.map(function(b) {
                    return a.parent.fc(b);
                  }),
                  depth: a.remap.depth
                });
            },
            Ac: function() {
              switch (a.connectivityUp) {
                case "gaussian":
                  Z = Aa.a(a.connectivity);
                  break;
                case "direct":
                  Z = Ba.a(a.connectivity);
                  break;
                case "square":
                  Z = Ca.a(a.connectivity);
                  break;
                case "full":
                  Z = Da.a(a.connectivity);
                  break;
                case "conv":
                  (l = a.kernelSize),
                    (Z = Ea.a(a.connectivity)),
                    t &&
                      (n = V.a({
                        width: u,
                        isFloat: !0,
                        isFlipY: !1,
                        isPot: !1
                      }));
              }
            },
            G: function(b, f) {
              W = b;
              K.j();
              w && ba.b(2);
              Z.G(ca);
              K.b(0);
              K.ab(X);
              R.j();
              w ? m.set("s0") : (m.set("s28"), m.B("u28", L), ba.b(1));
              K.Ua(X, 0);
              P.g(!1, !1);
              m.set(fa);
              B ? S.i() : U.i();
              R.b(0);
              ia && O.Wb();
              P.g(!1, !1);
              B &&
                (m.set(D),
                Q.i(),
                S.b(0),
                P.g(!1, !1),
                m.set("s51"),
                m.B("u8", 1),
                U.i(),
                Q.b(1),
                P.g(!1, !1));
              if (e)
                return (
                  k
                    ? (F.j(),
                      U.b(0),
                      m.set(A),
                      m.H("u9", 1 / a.size, 1 / a.size),
                      P.g(!1, !1),
                      (f = F))
                    : (f = U),
                  f.b(0),
                  t &&
                    (n.i(),
                    m.set("s22"),
                    m.H("u16", l, u / l),
                    P.g(!1, !1),
                    (f = n),
                    n.b(0)),
                  (T = f)
                );
              if ("softmax" === a.type)
                return (
                  m.set("s20"),
                  U.b(0),
                  G.i(),
                  P.g(!1, !1),
                  a.disableNormalize
                    ? (b = G)
                    : (m.set("s2"),
                      G.b(0),
                      J.b(1),
                      ea.i(),
                      P.g(!1, !1),
                      m.set("s0"),
                      h.j(),
                      ea.b(0),
                      ea.ab(!1),
                      P.g(!1, !1),
                      m.set("s21"),
                      g.j(),
                      ea.Ua(!1, 0),
                      m.B("u14", U.gc()),
                      h.b(1),
                      P.g(!1, !1),
                      (b = g)),
                  f ? (f = v.qb(b)) : !1
                );
              if (a.cost) {
                m.set("gpuRawAvg" === d ? "s8" : "s7");
                f = U;
                a.disableNormalize ||
                  (m.B("u6", 1 / a.size), g.j(), U.b(0), P.g(!1, !1), (f = g));
                T = f;
                switch (d) {
                  case "cpuRGBA2Float":
                    f.Ya();
                    f = v.qb(f);
                    q(f);
                    break;
                  case "gpuRawAvg":
                  case "gpuRaw":
                    f.b(0), q(f);
                }
                return !1;
              }
            },
            Rb: function(e) {
              e && "undefined" !== typeof e.pb && ((d = e.pb), (q = e.tc));
              U = V.a({
                isFloat: !0,
                isPot: !0,
                isMipmap: "softmax" === a.type,
                width: a.size
              });
              "softmax" === a.type &&
                (h = V.a({ isFloat: !0, isPot: !0, width: 1 }));
              var k = 0,
                l = 0,
                n =
                  "undefined" !== typeof a.num_classes
                    ? a.num_classes
                    : a.size * a.size;
              for (e = 0; e < n; ++e)
                b.push(k + (a.size - 1 - l) * a.size),
                  f.push([-1, -1, -1, -1]),
                  ++k,
                  k === a.size && ((k = 0), ++l);
              a.disableNormalize ||
                (g = V.a({ isFloat: !0, isPot: !0, width: a.size }));
            },
            qb: function(a) {
              a.Ya();
              var d = a.vc();
              b.forEach(function(a, b) {
                f[b][0] = d[0][a];
                f[b][1] = d[1][a];
                f[b][2] = d[2][a];
                f[b][3] = d[3][a];
              });
              return f;
            },
            Na: function(b) {
              E = b;
              da = { Ld: "s43", yd: "s44", Sc: "s42", Wc: "s45", Lc: "s46" }[
                a.activation
              ];
              b = { isFloat: !0, isPot: !0, width: a.size };
              N = V.a(b);
              y = V.a(b);
              k && V.a(b);
              t && (C = V.a(b));
              e ||
                (z = V.a({
                  isFloat: !0,
                  isPot: !1,
                  width: a.size
                }));
            },
            Da: function() {
              return x;
            },
            K: function(b) {
              if (!e) {
                z.j();
                m.set("quadratic" === a.cost ? "s41" : "s40");
                b.b(1);
                T.b(0);
                P.g(!1, !1);
                z.b(0);
                var d = 1;
              }
              b = R;
              e &&
                ((d = E.Da()),
                t &&
                  (N.j(),
                  m.set("s22"),
                  R.b(0),
                  m.H("u16", l, u / l),
                  P.g(!1, !1),
                  (b = N),
                  d.b(0)),
                E.Ea().K(d),
                (d = E.Ea().X()));
              m.set(da);
              m.B("u28", d * d);
              b.b(1);
              y.j();
              P.g(!1, !1);
              x = y;
              t &&
                (m.set("s22"),
                C.j(),
                y.b(0),
                m.H("u16", u / l, l),
                P.g(!1, !1),
                (x = C));
              x.b(0);
            }
          };
        a.P && v.Ac(a.P);
        return v;
      }
    };
  function Fa() {
    var a = { pd: !1 },
      b,
      f,
      g;
    a || (a = {});
    this.fc = function(a) {
      return b[a];
    };
    this.xc = function(a) {
      var d = !1;
      b = a.map(function(a, b) {
        return (d = a = ya.a({ index: b, parent: this, Fc: a, P: d }));
      });
      f = b[0];
      g = b[b.length - 1];
      b.forEach(function(a, b) {
        0 !== b && a.uc();
      });
    };
    this.G = function(a, d) {
      var f = d;
      b.forEach(function(b) {
        f = b.G(f, a);
      });
      return f;
    };
    this.Na = function() {
      var a;
      for (a = b.length - 1; 0 <= a; --a) {
        var d = a !== b.length - 1 ? b[a + 1] : !1;
        b[a].Na(d);
      }
    };
    this.K = function(a) {
      var d;
      for (d = b.length - 1; 0 <= d; --d) b[d].K(a);
    };
    this.cb = function() {
      return f.w();
    };
    this.ha = function() {
      return g.gb();
    };
    this.zc = function(a) {
      g.Rb(a);
    };
    this.fb = function() {
      return g.fb();
    };
  }
  var Ba = {
      a: function(a) {
        var b = V.a(a.weights);
        delete a.weights.data;
        return {
          X: function() {
            return 1;
          },
          qa: function() {
            return b;
          },
          G: function() {
            m.set("s27");
            b.b(1);
            P.g(!1, !1);
          }
        };
      }
    },
    Da = {
      a: function(a) {
        var b = a.fromLayerSize * a.toLayerSize,
          f = a.fromLayerSize,
          g = V.a(a.weights),
          h = V.a({ isFloat: !0, isPot: !0, width: b, isMipmap: !0 }),
          d = V.a({ isFloat: !0, isPot: !0, width: a.fromLayerSize });
        return {
          X: function() {
            return f;
          },
          qa: function() {
            return g;
          },
          fd: function() {
            return _fboWeights;
          },
          G: function(b) {
            if (b.isEnabled) {
              m.set("s25");
              b.qc.b(3);
              var d,
                f = Math.min(b.layers.length, b.depth);
              for (d = 0; d < f; ++d) b.layers[d].Mb(4 + d);
            } else m.set("s24");
            m.B("u19", a.toLayerSize);
            g.b(1);
            P.g(!1, !1);
          },
          K: function() {
            m.set("s38");
            m.B("u19", a.toLayerSize);
            m.B("u27", a.fromLayerSize);
            h.j();
            g.b(1);
            P.g(!1, !1);
            d.j();
            m.set("s0");
            h.b(0);
            h.W();
            P.g(!1, !1);
            d.b(0);
          }
        };
      }
    },
    Aa = {
      a: function(a) {
        var b = a.toSparsity * a.toLayerSize,
          f = b / a.fromLayerSize,
          g = V.a(a.weights),
          h = V.a({
            isFloat: !0,
            isPot: !0,
            width: b,
            array: new Float32Array(a.weightsFromTo)
          }),
          d = V.a({
            width: b,
            isFloat: !0,
            array: new Float32Array(a.fromBindings),
            isPot: !0
          }),
          q = V.a({
            width: b,
            isFloat: !0,
            array: new Float32Array(a.toBindings),
            isPot: !0
          });
        return {
          X: function() {
            return f;
          },
          qa: function() {
            return g;
          },
          ec: function() {
            return d;
          },
          hc: function() {
            return q;
          },
          ic: function() {
            return h;
          },
          G: function() {
            m.set("s23");
            g.b(1);
            q.b(2);
            P.g(!1, !0);
          }
        };
      }
    },
    Ca = {
      a: function(a) {
        var b = a.fromLayerSize,
          f = a.toLayerSize,
          g = a.toSparsity * f,
          h = g / b,
          d = a.toSparsity,
          q = b / f,
          e,
          n,
          l,
          t,
          w = 0,
          x = 0,
          y = 0,
          C = Array(d * f * d * f * 4),
          z = Array(d * f * d * f * 4),
          E = Array(d * f * d * f * 4),
          T = Array(b * b);
        for (e = 0; e < T.length; ++e) T[e] = 0;
        var N = Math.floor(d / 2),
          da = 0.5 / f,
          O = 0.5 / b,
          ia = 0.5 / g;
        for (e = 0; e < f; ++e)
          for (n = 0; n < f; ++n) {
            var ca = Math.round(e * q);
            var W = Math.round(n * q);
            var G = e / f;
            var ea = n / f;
            G += da;
            ea += da;
            for (l = 0; l < d; ++l)
              for (t = 0; t < d; ++t) {
                var aa = w / g;
                var Y = x / g;
                var H = ca + l - N;
                var J = W + t - N;
                0 > H && (H += b);
                0 > J && (J += b);
                H >= b && (H -= b);
                J >= b && (J -= b);
                var fa = H / b;
                var L = J / b;
                Y = 1 - Y - 1 / g;
                fa += O;
                L += O;
                aa += ia;
                Y += ia;
                C[4 * y] = fa;
                C[4 * y + 1] = L;
                C[4 * y + 2] = G;
                C[4 * y + 3] = ea;
                var k = e * d + l,
                  u = n * d + t;
                u = f * d - u - 1;
                k = u * f * d + k;
                z[4 * k] = aa;
                z[4 * k + 1] = Y;
                z[4 * k + 2] = fa;
                z[4 * k + 3] = L;
                fa = T[J * b + H]++;
                L = fa % h;
                H = H * h + L;
                J = J * h + (fa - L) / h;
                J = b * h - 1 - J;
                J = J * b * h + H;
                E[4 * J] = aa;
                E[4 * J + 1] = Y;
                E[4 * J + 2] = G;
                E[4 * J + 3] = ea;
                ++w >= g && ((w = 0), ++x);
                ++y;
              }
          }
        var A = V.a(a.weights),
          F = V.a({
            isFloat: !0,
            isPot: !0,
            width: g,
            array: new Float32Array(C)
          }),
          B = V.a({
            width: g,
            isFloat: !0,
            array: new Float32Array(E),
            isPot: !0
          });
        E = null;
        var D = V.a({
          width: g,
          isFloat: !0,
          array: new Float32Array(z),
          isPot: !0
        });
        z = null;
        var S = V.a({ isFloat: !0, isPot: !0, width: g, isMipmap: !0 }),
          Q = V.a({ isFloat: !0, isPot: !0, width: g / h });
        return {
          X: function() {
            return h;
          },
          qa: function() {
            return A;
          },
          ec: function() {
            return B;
          },
          hc: function() {
            return D;
          },
          ic: function() {
            return F;
          },
          G: function() {
            m.set("s23");
            A.b(1);
            D.b(2);
            P.g(!1, !1);
          },
          K: function() {
            m.set("s37");
            S.j();
            B.b(1);
            A.b(2);
            P.g(!1, !1);
            m.set("s0");
            Q.j();
            S.b(0);
            S.W();
            P.g(!1, !1);
            Q.b(0);
          }
        };
      }
    },
    Ea = {
      a: function(a) {
        function b() {
          m.B("u25", f);
          m.B("u26", g);
          m.B("u19", a.toLayerSize);
          m.B("u27", a.fromLayerSize);
        }
        var f = a.kernelSize,
          g = a.toSparsity,
          h = g * a.toLayerSize,
          d = h / a.fromLayerSize,
          q = V.a(a.weights),
          e = V.a({ isFloat: !0, isPot: !0, width: h, isMipmap: !0 }),
          n = V.a({ isFloat: !0, isPot: !0, width: a.fromLayerSize });
        return {
          X: function() {
            return d;
          },
          ld: function() {
            return g;
          },
          qa: function() {
            return q;
          },
          G: function() {
            m.set("s26");
            b();
            q.b(1);
            P.g(!1, !1);
          },
          K: function() {
            m.set("s39");
            b();
            e.j();
            q.b(1);
            P.g(!1, !1);
            m.set("s0");
            n.j();
            e.b(0);
            e.W();
            P.g(!1, !1);
            n.b(0);
          }
        };
      }
    },
    za = (function() {
      var a, b, f, g, h, d, q, e, n;
      return {
        l: function(l) {
          a = l.mb ? l.mb : 3;
          b = l.width ? l.width : 64;
          g = l.nc ? !0 : !1;
          l = { isFloat: !1, width: b, isPot: !1, isFlipY: !1 };
          h = V.a(l);
          d = V.a(l);
          q = V.a(l);
          e = V.a(l);
          n = V.a({ isFloat: !0, width: b, isPot: !1, isFlipY: !1 });
          f = 1 / b;
        },
        ua: function(b) {
          m.set("s35");
          for (var l = 0; l < a; ++l)
            h.i(),
              m.H("u9", f, 0),
              P.g(g, !1),
              d.i(),
              h.b(0),
              m.H("u9", 0, f),
              P.g(g, !1),
              d.b(0);
          m.set("s34");
          e.i();
          b.b(0);
          P.g(g);
          m.set("s35");
          for (l = 0; l < a; ++l)
            q.i(),
              e.b(0),
              m.H("u9", f, 0),
              P.g(g, !1),
              e.i(),
              q.b(0),
              m.H("u9", 0, f),
              P.g(g, !1);
          m.set("s36");
          n.i();
          b.b(0);
          d.b(1);
          e.b(2);
          P.g(g, !1);
          n.b(0);
        },
        ha: function() {
          return n;
        }
      };
    })();
  function Ga() {
    if (!Ha()) return !1;
    var a = document.createElement("video");
    a.autoplay = !0;
    return a;
  }
  function Ia() {
    var a = !1,
      b = navigator.userAgent || navigator.vendor || window.opera;
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        b
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        b.substr(0, 4)
      )
    )
      a = !0;
    return a;
  }
  function Ja() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }
  function Ka() {
    var a = navigator.userAgent.toLowerCase();
    return -1 == a.indexOf("safari") || -1 < a.indexOf("chrome") ? !1 : !0;
  }
  function Ha() {
    return navigator.mediaDevices && navigator.mediaDevices.getUserMedia
      ? !0
      : !1;
  }
  function La(a, b, f, g) {
    if (a)
      if (Ha()) {
        var h = g && g.audio;
        g &&
          g.video &&
          g.video.width &&
          g.video.width.ideal &&
          (a.style.width = g.video.width.ideal + "px");
        g &&
          g.video &&
          g.video.height &&
          g.video.height.ideal &&
          (a.style.height = g.video.height.ideal + "px");
        a.setAttribute("autoplay", "");
        h ? (a.volume = 0) : a.setAttribute("muted", "");
        a.setAttribute("playsinline", "");
        Ja() &&
          (g.video.width && delete g.video.width,
          g.video.height && delete g.video.height);
        if (g && g.video && Ia() && !Ja()) {
          g.video.width && g.video.width.ideal && delete g.video.width.ideal;
          g.video.height && g.video.height.ideal && delete g.video.height.ideal;
          try {
            var d = window.matchMedia("(orientation: portrait)").matches
              ? !0
              : !1;
          } catch (q) {
            d = window.innerHeight > window.innerWidth;
          }
          d &&
            ((h = g.video.height),
            (g.video.height = g.video.width),
            (g.video.width = h));
        }
        (function(d) {
          return navigator.mediaDevices
            .getUserMedia(d)
            .then(function(d) {
              function f() {
                a.play();
                b(a, d);
              }
              Ja() || a.addEventListener("loadeddata", f, !1);
              "undefined" !== typeof a.srcObject
                ? (a.srcObject = d)
                : ((a.src = window.URL.createObjectURL(d)),
                  (a.videoStream = d));
              if (Ka() && ((a.volume = 0), 1 === a.volume)) {
                var g = function() {
                  a.volume = 0;
                  window.removeEventListener("mousemove", g, !1);
                  window.removeEventListener("touchstart", g, !1);
                };
                window.addEventListener("mousemove", g, !1);
                window.addEventListener("touchstart", g, !1);
              }
              Ja() && f();
            })
            .catch(function(a) {
              f(a);
            });
        })(g);
      } else f && f();
    else f && f();
  }
  window.JEEFACEFILTERAPI = (function() {
    var a, b, f, g, h, d, q, e, n, l, t, w, x, y, C, z, E, T;
    function N(a) {
      if (F !== A.pause) {
        var b = F === A.play ? k.Hb : k.Ib;
        oa = setTimeout(ia.bind(null, a), b);
      }
    }
    function da() {
      if (-1 !== [A.play, A.O].indexOf(F)) return !1;
      F = A.play;
      I.timestamp = Date.now();
      la && window.cancelAnimationFrame(la);
      ia(0);
    }
    function O(a, b, d, f) {
      a = 4 * a + b;
      return d + (Z[a] / 255 + Z[a + 8] / 65025) * (f - d);
    }
    function ia() {
      if (F !== A.pause) {
        m.Xb();
        P.reset();
        P.la();
        c.disable(c.DEPTH_TEST);
        p.V();
        m.wa();
        var e = B.element.currentTime - B.ta;
        0 > e && (B.ta = B.element.currentTime);
        1e3 * e < k.Jc ||
          (B.ia.refresh(),
          (B.ta += e),
          m.set("s53"),
          B.xa.j(),
          B.ia.b(0),
          P.g(!1, !1));
        for (e = 0; e < I.$; ++e)
          (sa = e === I.$ - 1),
            m.set("s54"),
            U.j(),
            B.xa.b(0),
            ba.b(1),
            P.g(!1, !1),
            U.b(0),
            S.G(!1, U);
        e = Date.now();
        I.ga_ = e - I.timestamp;
        var l = k.za;
        I.timestamp = e;
        I.nb = I.rc / I.ga_;
        I.Ha = I.nb * l + I.Ha * (1 - l);
        I.ob = 1e3 / I.ga_;
        I.aa = I.ob * k.za + I.aa * (1 - k.za);
        I.aa > k.U[1]
          ? ((I.$ = Math.min(I.$ + 1, k.ja[1])), (I.aa = (k.U[0] + k.U[1]) / 2))
          : I.aa < k.U[0] &&
            ((I.$ = Math.max(I.$ - 1, k.ja[0])),
            (I.aa = (k.U[0] + k.U[1]) / 2));
        I.Qb = k.Kb / Math.max(I.Ha, 0.001);
        p.F();
        c.viewport(0, 0, 3, 2);
        m.set("s52");
        ba.b(0);
        P.g(!1, !1);
        c.readPixels(0, 0, 3, 2, c.RGBA, c.UNSIGNED_BYTE, Z);
        v.x = O(0, 1, -1, 1);
        v.y = O(0, 2, -1, 1);
        v.La = O(0, 3, 0, 1);
        v.Ia = O(1, 0, -k.ba[0], k.ba[0]);
        v.Ja = O(1, 1, -k.ba[1], k.ba[1]);
        v.Ka = O(1, 2, -k.ba[2], k.ba[2]);
        v.Ca = O(1, 3, 0, 1);
        for (e = 0; e < k.sa; ++e) v.$a[e] = k.$b[e](O(2, e, 0, 1));
        a = v.x - M.x;
        b = v.y - M.y;
        f = v.La - M.s;
        g = v.Ia - M.rx;
        h = v.Ja - M.ry;
        d = v.Ka - M.rz;
        e = Math.sqrt(a * a + b * b + f * f) / I.ga_;
        l = Math.sqrt(g * g + h * h + d * d) / I.ga_;
        e = 1 - ka(k.Xa[0], k.Xa[1], e);
        l = 1 - ka(k.sb[0], k.sb[1], l);
        e = ha(
          k.Sa[0],
          k.Sa[1],
          1 - Math.pow(e * l * ka(k.rb[0], k.rb[1], v.Ca), k.Gb)
        );
        M.x = ha(M.x, v.x, e);
        M.y = ha(M.y, v.y, e);
        M.s = ha(M.s, v.La, e);
        M.rx = ha(M.rx, v.Ia, e);
        M.ry = ha(M.ry, v.Ja, e);
        M.rz = ha(M.rz, v.Ka, e);
        M.detected = ha(M.detected, v.Ca, k.Eb);
        l = Math.max(e, k.Fb);
        for (e = 0; e < k.sa; ++e)
          M.expressions[e] = ha(M.expressions[e], v.$a[e], l);
        p.Hc();
        p.reset();
        V.reset();
        c.enable(c.DEPTH_TEST);
        D.Ba && D.Ba(M);
        c.disable(c.BLEND);
        if (F === A.play || F === A.O) la = window.requestAnimationFrame(N);
      }
    }
    function ca() {
      m.L("s54", [
        { type: "1i", name: "u0", value: 0 },
        { type: "1i", name: "u39", value: 1 },
        {
          type: "2f",
          name: "u40",
          value: X
        }
      ]);
      m.L("s55", [
        { type: "1i", name: "u41", value: 0 },
        { type: "1i", name: "u39", value: 1 },
        { type: "1f", name: "u44", value: k.minScaleTracked },
        { type: "1f", name: "u45", value: k.maxScaleTracked },
        { type: "1f", name: "u46", value: k.Gc },
        { type: "1f", name: "u47", value: k.Ab },
        { type: "1f", name: "u48", value: k.zb },
        {
          type: "3f",
          name: "u43",
          value: [k.Pa[0] * X[0], k.Pa[1] * X[1], k.Pa[2]]
        }
      ]);
      var a = [{ type: "1i", name: "u41", value: 0 }];
      m.L("s56", a);
      m.L("s57", a);
      m.L("s52", [
        { type: "1i", name: "u39", value: 0 },
        { type: "1f", name: "u49", value: X[0] }
      ]);
    }
    function W() {
      var a = S.cb(),
        b = K / a;
      l = k.minScale * b;
      t = k.maxScale * b;
      w = (1 - 2 * k.borderWidth) / k.nStepsX;
      x = (1 - 2 * k.borderHeight) / k.nStepsY;
      y = (t - l) / k.nStepsScale;
      C = k.borderWidth;
      z = k.borderHeight;
      E = 1 - k.borderWidth;
      T = 1 - k.borderHeight;
      X = [a / K, a / R];
      q = 0;
      e = k.borderWidth;
      n = k.borderHeight;
      Q = l;
    }
    function G(a) {
      ja(D.Ra + k.save, function(b) {
        b = JSON.parse(b);
        a(b);
      });
    }
    function ea() {
      if (
        ra.l({
          fa: D.J,
          width: K,
          height: R,
          debug: !1,
          sc: function() {
            L("GLCONTEXT_LOST");
          },
          antialias: !0,
          premultipliedAlpha: !0
        })
      ) {
        if (ra.lc()) return !0;
        L("GL_INCOMPATIBLE");
        return !1;
      }
      L("GL_INCOMPATIBLE");
      return !1;
    }
    function aa() {
      ba.Bc(1);
      c.viewport(0, 0, 1, 1);
      m.set("s55");
      m.Dc("u42", e, n, Q);
      P.g(!1, !1);
      sa &&
        (c.viewport(1, 0, 1, 1),
        m.set("s56"),
        P.g(!1, !1),
        c.viewport(2, 0, 1, 1),
        m.set("s57"),
        P.g(!1, !1));
      1 !== ++q % 2 &&
        ((Q += y),
        Q > t &&
          ((e += w), (Q = l), e > E && ((e = C), (n += x), n > T && (n = z))));
    }
    function Y() {
      m.L("s53", [
        { type: "1i", name: "u0", value: 0 },
        { type: "2f", name: "u37", value: B.S }
      ]);
    }
    function H() {
      B.S[0] = 0.5;
      B.S[1] = 0.5;
      var a = B.ma[1] / B.ma[0],
        b = ra.I() / ra.w();
      a > b ? (B.S[1] *= b / a) : (B.S[0] *= a / b);
    }
    function J(a, b) {
      if (F === A.error) return !1;
      if (0 === a.currentTime) {
        var d = a.play();
        void 0 !== d && d.then(function() {}).catch(function() {});
        setTimeout(J.bind(null, a, b), u.ub);
        return !1;
      }
      d = a.videoWidth;
      var f = a.videoHeight;
      if (0 === d || 0 === f) return setTimeout(J.bind(null, a, b), u.ub), !1;
      B.ma[0] = d;
      B.ma[1] = f;
      B.element = a;
      b && b();
      return !0;
    }
    function fa(a, b, d) {
      a && a();
      a = {
        facingMode: { ideal: "user" },
        width: { min: u.minWidth, max: u.maxWidth, ideal: u.idealWidth },
        height: { min: u.minHeight, max: u.maxHeight, ideal: u.idealHeight }
      };
      La(
        Ga(),
        function(a) {
          b && b(a);
          d(a);
        },
        function() {
          L("WEBCAM_UNAVAILABLE");
        },
        {
          video: a,
          audio: !1
        }
      );
    }
    function L(a) {
      F !== A.error && ((F = A.error), D.ea && D.ea(a));
    }
    var k = {
        save: "NNC.json",
        Hb: 0,
        Ib: 25,
        za: 0.2,
        U: [45, 60],
        Kb: 1 / 3.5,
        ja: [2, 5],
        minScale: 0.2,
        maxScale: 0.75,
        borderWidth: 0.4,
        borderHeight: 0.35,
        nStepsX: 5,
        nStepsY: 4,
        nStepsScale: 3,
        Pa: [0.088, 0.088, 0.25],
        Gc: 55,
        minScaleTracked: 0.6,
        maxScaleTracked: 5.8,
        Ab: 0.7,
        zb: 1,
        Xa: [0.003, 0.01],
        sb: [0.01, 0.1],
        rb: [0.6, 0.7],
        ba: [0.65, 1.1, 0.262],
        Sa: [0.04, 1],
        Eb: 0.2,
        Gb: 3,
        Fb: 0.1,
        sa: 1,
        $b: [ka.bind(null, 0.3, 0.75)],
        Jc: 20
      },
      u = {
        idealWidth: 800,
        idealHeight: 600,
        minWidth: 800,
        maxWidth: 1280,
        minHeight: 600,
        maxHeight: 1280,
        ub: 100
      },
      A = { pc: -1, error: -2, hb: 0, play: 1, pause: 2, O: 3 },
      F = A.hb,
      B = { element: !1, ia: !1, xa: !1, ma: [0, 0], S: [0.5, 0.5], ta: 0 },
      D = { ea: !1, Ba: !1, Ra: "./", J: !1 },
      S;
    var Q = (n = e = q = t = l = T = E = z = C = y = x = w = 0);
    var K,
      R,
      X,
      U,
      ba,
      Z,
      v,
      M,
      oa = !1,
      la = !1,
      sa = !1,
      I = {
        ga_: 0,
        timestamp: 0,
        nb: 0,
        Ha: 0,
        $: k.ja[0],
        rc: k.ja[0],
        ob: 0,
        aa: 0,
        Qb: 1
      };
    return {
      init: function(e) {
        function l() {
          F !== A.error &&
            2 === ++n &&
            (H(),
            (B.ia = V.a({ C: B.element, isPot: !1, isFloat: !1, isFlipY: !0 })),
            Y(),
            D.ea &&
              (D.ea(!1, {
                GL: c,
                canvasElement: D.J,
                videoTexture: B.xa.get()
              }),
              c.disable(c.BLEND)),
            da());
        }
        if (F !== A.hb)
          return e.callbackReady && e.callbackReady("ALREADY_INITIALIZED"), !1;
        F = A.pc;
        e.callbackReady && (D.ea = e.callbackReady);
        e.callbackTrack && (D.Ba = e.callbackTrack);
        "undefined" !== typeof e.NNCpath && (D.Ra = e.NNCpath);
        if (!e.canvasId) return L("NO_CANVASID"), !1;
        D.J = document.getElementById(e.canvasId);
        if (!D.J) return L("INVALID_CANVASID"), !1;
        K = D.J.width;
        R = D.J.height;
        if (!K || !R) return L("INVALID_CANVASDIMENSIONS"), !1;
        var n = 0;
        fa(e.onWebcamAsk, e.onWebcamGet, function(a) {
          J(a, l);
        });
        G(function(e) {
          if (!ea()) return !1;
          S = new Fa();
          S.xc(e.layers);
          S.zc({ pb: "gpuRawAvg", tc: aa });
          m.Db([
            {
              id: "s53",
              name: "_",
              T:
                "attribute vec2 a0;uniform vec2 u37;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=vec2(.5,.5)+u37*a0;}",
              ka: ["a0"],
              ca: [2],
              c:
                "uniform sampler2D u0;varying vec2 vv0;void main(){gl_FragColor=texture2D(u0,vv0);}",
              f: ["u0", "u37"],
              precision: "lowp"
            },
            {
              id: "s54",
              name: "_",
              c:
                "uniform sampler2D u0;varying vec2 vv0;void main(){gl_FragColor=texture2D(u0,vv0);}",
              T:
                "attribute vec2 a0;uniform sampler2D u39;uniform vec2 u40;varying vec2 vv0;void main(){vec4 a=texture2D(u39,vec2(.17,.5));vec2 b=a.gb,c=a.a*u40;vv0=b+a0*.5*c,gl_Position=vec4(a0,0.,1.);}",
              ka: ["a0"],
              ca: [2],
              f: ["u0", "u39", "u40"],
              precision: "lowp"
            },
            {
              id: "s55",
              name: "_",
              c:
                "uniform sampler2D u41,u39;uniform vec3 u42,u43;uniform float u44,u45,u46,u47,u48;const vec4 k=vec4(1.,1.,1.,1.),l=vec4(0.,0.,0.,0.),e=vec4(.25,.25,.25,.25);void main(){vec4 c=texture2D(u41,vec2(.5,.5)),d=texture2D(u41,vec2(.75,.5));float g=dot(e,texture2D(u41,vec2(.75,.75))),h=dot(e,texture2D(u41,vec2(0.,.5))),i=dot(e,texture2D(u41,vec2(.25,.5)));vec4 a=texture2D(u39,vec2(.17,.5));float b=dot(c,e),j=dot(d,e);bool f=b>u47&&b>j+u48;f?a.r=2.:a.r>u46?a.r=0.:a.r>1.9&&(a.a>u45||a.a<u44)?a.r=0.:a.r>1.9?a.r+=1.:0.;if(a.r<.9)a=vec4(1.,u42);else a.r*=step(1.9,a.r),a.gba+=vec3(g,h,i)*u43*a.a;gl_FragColor=a;}",
              T: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
              f: "u41 u39 u42 u44 u45 u46 u43 u47 u48".split(" ")
            },
            {
              id: "s56",
              name: "_",
              T: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
              c:
                "uniform sampler2D u41;const vec4 e=vec4(.25,.25,.25,.25);const vec3 g=vec3(.5,.5,.5);void main(){float a=dot(e,texture2D(u41,vec2(0.,.75))),b=dot(e,texture2D(u41,vec2(.25,.75))),c=dot(e,texture2D(u41,vec2(.5,.75))),d=dot(e,texture2D(u41,vec2(.5,.5)));vec3 f=vec3(a,b,c)*.5+g;gl_FragColor=vec4(f,d);}",
              f: ["u41"]
            },
            {
              id: "s57",
              name: "_",
              T: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
              c:
                "uniform sampler2D u41;const vec4 e=vec4(.25,.25,.25,.25);void main(){float a=dot(e,texture2D(u41,vec2(.25,.25)));gl_FragColor=vec4(a,0.,0.,0.);}",
              f: ["u41"]
            },
            {
              id: "s52",
              name: "_",
              c:
                "uniform sampler2D u39;uniform float u49;varying vec2 vv0;void main(){float g=step(.5,vv0.y),c=step(.33,vv0.x);vec4 a=texture2D(u39,vec2(vv0.x,.5));a.a=mix(a.a*u49,a.a,c);vec4 d=floor(255.*a),f=255.*(255.*a-d),b=mix(d,f,g)/255.;b.x=mix(step(a.x,1.5),b.x,c),gl_FragColor=b;}",
              f: ["u39", "u49"]
            }
          ]);
          B.xa = V.a({
            isPot: !1,
            isLinear: !0,
            isFloat: !1,
            width: K,
            height: R
          });
          U = V.a({ isPot: !0, isFloat: !1, width: S.cb() });
          e = {
            width: 3,
            height: 1,
            isFloat: !0,
            isPot: !1,
            array: new Float32Array([
              0,
              k.borderWidth,
              k.borderHeight,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ])
          };
          ba = ua.a(e);
          Z = new Uint8Array(8 * e.width);
          v = {
            Ca: 0,
            x: 0,
            y: 0,
            La: 1,
            Ia: 0,
            Ja: 0,
            Ka: 0,
            $a: new Float32Array(k.sa)
          };
          M = {
            detected: 0,
            x: 0,
            y: 0,
            s: 1,
            rx: 0,
            ry: 0,
            rz: 0,
            expressions: new Float32Array(k.sa)
          };
          d = h = g = f = b = a = 0;
          W();
          ca();
          l();
        });
        return !0;
      },
      toggle_pause: function(a) {
        if (-1 !== [A.play, A.pause, A.O].indexOf(F))
          return (
            a
              ? -1 === [A.play, A.O].indexOf(F)
                ? (a = !1)
                : (oa && (clearTimeout(oa), (oa = !1)),
                  la && (window.cancelAnimationFrame(la), (la = !1)),
                  (F = A.pause),
                  (a = !0))
              : (a = da()),
            a
          );
      },
      toggle_slow: function(a) {
        -1 !== [A.play, A.pause, A.O].indexOf(F) &&
          -1 !== [A.play, A.O].indexOf(F) &&
          (F = a ? A.O : A.play);
      },
      resize: function() {
        var a = D.J.width,
          b = D.J.height;
        if (a === K && b === R) return !1;
        K = a;
        R = b;
        W();
        ca();
        H();
        Y();
        return !0;
      }
    };
  })();
  return JEEFACEFILTERAPI;
})();
