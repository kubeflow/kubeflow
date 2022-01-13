/*
 2020 Jason Mulligan <jason.mulligan@avoidwork.com>
 @version 6.1.0
*/
"use strict";/**
 * filesize
 *
 * @copyright 2020 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 6.1.0
 */(function(a){/**
	 * filesize
	 *
	 * @method filesize
	 * @param  {Mixed}   arg        String, Int or Float to transform
	 * @param  {Object}  descriptor [Optional] Flags
	 * @return {String}             Readable file size String
	 */function c(a,c={}){var g=Math.pow,h=Math.floor,i=Math.log;let j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A=[],B=0;if(isNaN(a))throw new TypeError("Invalid number");return(l=!0===c.bits,v=!0===c.unix,k=c.base||2,u=void 0===c.round?v?1:2:c.round,p=void 0===c.locale?"":c.locale,q=c.localeOptions||{},w=void 0===c.separator?"":c.separator,x=void 0===c.spacer?v?"":" ":c.spacer,z=c.symbols||{},y=2===k?c.standard||"jedec":"jedec",t=c.output||"string",n=!0===c.fullform,o=c.fullforms instanceof Array?c.fullforms:[],j=void 0===c.exponent?-1:c.exponent,s=+a,r=0>s,m=2<k?1e3:1024,r&&(s=-s),(-1===j||isNaN(j))&&(j=h(i(s)/i(m)),0>j&&(j=0)),8<j&&(j=8),"exponent"===t)?j:(0===s?(A[0]=0,A[1]=v?"":b[y][l?"bits":"bytes"][j]):(B=s/(2===k?g(2,10*j):g(1e3,j)),l&&(B*=8,B>=m&&8>j&&(B/=m,j++)),A[0]=+B.toFixed(0<j?u:0),A[0]===m&&8>j&&void 0===c.exponent&&(A[0]=1,j++),A[1]=10===k&&1===j?l?"kb":"kB":b[y][l?"bits":"bytes"][j],v&&(A[1]="jedec"===y?A[1].charAt(0):0<j?A[1].replace(/B$/,""):A[1],d.test(A[1])&&(A[0]=h(A[0]),A[1]=""))),r&&(A[0]=-A[0]),A[1]=z[A[1]]||A[1],!0===p?A[0]=A[0].toLocaleString():0<p.length?A[0]=A[0].toLocaleString(p,q):0<w.length&&(A[0]=A[0].toString().replace(".",w)),"array"===t)?A:(n&&(A[1]=o[j]?o[j]:f[y][j]+(l?"bit":"byte")+(1===A[0]?"":"s")),"object"===t?{value:A[0],symbol:A[1],exponent:j}:A.join(x));// Zero is now a special case because bytes divide by 1
// Returning Array, Object, or String (default)
}// Partial application for functional programming
const d=/^(b|B)$/,b={iec:{bits:["b","Kib","Mib","Gib","Tib","Pib","Eib","Zib","Yib"],bytes:["B","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"]},jedec:{bits:["b","Kb","Mb","Gb","Tb","Pb","Eb","Zb","Yb"],bytes:["B","KB","MB","GB","TB","PB","EB","ZB","YB"]}},f={iec:["","kibi","mebi","gibi","tebi","pebi","exbi","zebi","yobi"],jedec:["","kilo","mega","giga","tera","peta","exa","zetta","yotta"]};c.partial=a=>b=>c(b,a),"undefined"==typeof exports?"function"==typeof define&&void 0!==define.amd?define(()=>c):a.filesize=c:module.exports=c})("undefined"==typeof window?global:window);
//# sourceMappingURL=filesize.es6.min.js.map