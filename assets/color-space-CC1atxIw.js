const D={name:"rgb",min:[0,0,0],max:[255,255,255],channel:["red","green","blue"],alias:["RGB"]};var c={name:"xyz",min:[0,0,0],channel:["X","Y","Z"],alias:["XYZ","ciexyz","cie1931"]};c.whitepoint={2:{A:[109.85,100,35.585],C:[98.074,100,118.232],D50:[96.422,100,82.521],D55:[95.682,100,92.149],D65:[95.045592705167,100,108.9057750759878],D75:[94.972,100,122.638],F2:[99.187,100,67.395],F7:[95.044,100,108.755],F11:[100.966,100,64.37],E:[100,100,100]},10:{A:[111.144,100,35.2],C:[97.285,100,116.145],D50:[96.72,100,81.427],D55:[95.799,100,90.926],D65:[94.811,100,107.304],D75:[94.416,100,120.641],F2:[103.28,100,69.026],F7:[95.792,100,107.687],F11:[103.866,100,65.627],E:[100,100,100]}};c.max=c.whitepoint[2].D65;c.rgb=function(i,h){h=h||c.whitepoint[2].E;var t=i[0]/h[0],e=i[1]/h[1],r=i[2]/h[2],n,a,u;return n=t*3.240969941904521+e*-1.537383177570093+r*-.498610760293,a=t*-.96924363628087+e*1.87596750150772+r*.041555057407175,u=t*.055630079696993+e*-.20397695888897+r*1.056971514242878,n=n>.0031308?1.055*Math.pow(n,1/2.4)-.055:n=n*12.92,a=a>.0031308?1.055*Math.pow(a,1/2.4)-.055:a=a*12.92,u=u>.0031308?1.055*Math.pow(u,1/2.4)-.055:u=u*12.92,n=Math.min(Math.max(0,n),1),a=Math.min(Math.max(0,a),1),u=Math.min(Math.max(0,u),1),[n*255,a*255,u*255]};D.xyz=function(i,h){var t=i[0]/255,e=i[1]/255,r=i[2]/255;t=t>.04045?Math.pow((t+.055)/1.055,2.4):t/12.92,e=e>.04045?Math.pow((e+.055)/1.055,2.4):e/12.92,r=r>.04045?Math.pow((r+.055)/1.055,2.4):r/12.92;var n=t*.41239079926595+e*.35758433938387+r*.18048078840183,a=t*.21263900587151+e*.71516867876775+r*.072192315360733,u=t*.019330818715591+e*.11919477979462+r*.95053215224966;return h=h||c.whitepoint[2].E,[n*h[0],a*h[1],u*h[2]]};const z={name:"luv",min:[0,-134,-140],max:[100,224,122],channel:["lightness","u","v"],alias:["LUV","cieluv","cie1976"],xyz:function(i,h,t){var e,r,n,a,u,v,l,x,o,s,m,M,f;if(n=i[0],a=i[1],u=i[2],n===0)return[0,0,0];var p=.0011070564598794539;return h=h||"D65",t=t||2,o=c.whitepoint[t][h][0],s=c.whitepoint[t][h][1],m=c.whitepoint[t][h][2],M=4*o/(o+15*s+3*m),f=9*s/(o+15*s+3*m),e=a/(13*n)+M||0,r=u/(13*n)+f||0,l=n>8?s*Math.pow((n+16)/116,3):s*n*p,v=l*9*e/(4*r)||0,x=l*(12-3*e-20*r)/(4*r)||0,[v,l,x]}};c.luv=function(i,h,t){var e,r,n,a,u,v,l,x,o,s,m,M,f,p=.008856451679035631,w=903.2962962962961;h=h||"D65",t=t||2,o=c.whitepoint[t][h][0],s=c.whitepoint[t][h][1],m=c.whitepoint[t][h][2],M=4*o/(o+15*s+3*m),f=9*s/(o+15*s+3*m),v=i[0],l=i[1],x=i[2],e=4*v/(v+15*l+3*x)||0,r=9*l/(v+15*l+3*x)||0;var y=l/s;return n=y<=p?w*y:116*Math.pow(y,1/3)-16,a=13*n*(e-M),u=13*n*(r-f),[n,a,u]};var F={name:"lchuv",channel:["lightness","chroma","hue"],alias:["LCHuv","cielchuv"],min:[0,0,0],max:[100,100,360],luv:function(i){var h=i[0],t=i[1],e=i[2],r,n,a;return a=e/360*2*Math.PI,r=t*Math.cos(a),n=t*Math.sin(a),[h,r,n]},xyz:function(i){return z.xyz(F.luv(i))}};z.lchuv=function(i){var h=i[0],t=i[1],e=i[2],r=Math.sqrt(t*t+e*e),n=Math.atan2(e,t),a=n*360/2/Math.PI;return a<0&&(a+=360),[h,r,a]};c.lchuv=function(i){return z.lchuv(c.luv(i))};const b={name:"hsl",min:[0,0,0],max:[360,100,100],channel:["hue","saturation","lightness"],alias:["HSL"],rgb:function(i){var h=i[0]/360,t=i[1]/100,e=i[2]/100,r,n,a,u,v,l=0;if(t===0)return v=e*255,[v,v,v];for(n=e<.5?e*(1+t):e+t-e*t,r=2*e-n,u=[0,0,0];l<3;)a=h+1/3*-(l-1),a<0?a++:a>1&&a--,v=6*a<1?r+(n-r)*6*a:2*a<1?n:3*a<2?r+(n-r)*(2/3-a)*6:r,u[l++]=v*255;return u}};D.hsl=function(i){var h=i[0]/255,t=i[1]/255,e=i[2]/255,r=Math.min(h,t,e),n=Math.max(h,t,e),a=n-r,u,v,l;return n===r?u=0:h===n?u=(t-e)/a:t===n?u=2+(e-h)/a:e===n&&(u=4+(h-t)/a),u=Math.min(u*60,360),u<0&&(u+=360),l=(r+n)/2,n===r?v=0:l<=.5?v=a/(n+r):v=a/(2-n-r),[u,v*100,l*100]};export{b as h,F as l,D as r,c as x};