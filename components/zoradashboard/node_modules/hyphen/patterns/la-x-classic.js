(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.hyphenationPatternsLaXClassic = factory();
  }
})(this, function () {
  var patterns = [],
    hyphenation = [];

  // title: Hyphenation patterns for classical Latin
  // copyright: Copyright (C) 2014 Claudio Beccari
  // notice: This file is part of the hyph-utf8 package.
  //     See http://www.hyphenation.org/tex for more information.
  // language:
  //     name: Classical Latin
  //     tag: la-x-classic
  // version: 1.2 <2014/10/06>
  // authors:
  //   -
  //     name: Claudio Beccari
  //     contact: claudio.beccari (at) gmail.com
  // licence:
  //     - This file is available under any of the following licences:
  //     -
  //         name: MIT
  //         url: https://opensource.org/licenses/MIT
  //         text: >
  //             Permission is hereby granted, free of charge, to any person
  //             obtaining a copy of this software and associated documentation
  //             files (the “Software”), to deal in the Software without
  //             restriction, including without limitation the rights to use,
  //             copy, modify, merge, publish, distribute, sublicense, and/or sell
  //             copies of the Software, and to permit persons to whom the
  //             Software is furnished to do so, subject to the following
  //             conditions:
  //
  //             The above copyright notice and this permission notice shall be
  //             included in all copies or substantial portions of the Software.
  //
  //             THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
  //             EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  //             OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  //             NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  //             HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  //             WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  //             FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  //             OTHER DEALINGS IN THE SOFTWARE.
  //     -
  //         name: LPPL
  //         version: 1
  //         or_later: true
  //         url: https://latex-project.org/lppl/
  // ==========================================
  // Aknowledgements: This file has been substantially upgraded with
  // the contributions of Francisco Gracia.
  //
  // Patterns for the classical Latin language; classical spelling
  // with the (uncial) lowercase ‘v’ written as a ‘u’ is supported.
  // Classical Latin hyphenation patterns are different from those of
  // “plain” Latin, the latter being more adapted to modern Latin.
  //
  var patterns = [
    //
    ".a2b3l",
    ".anti1",
    ".anti3m2n",
    ".ari3s2to",
    ".circu2m1",
    ".co2n1iun",
    ".e2x3",
    ".exs2t",
    ".para1i",
    ".para1u",
    ".peri1",
    ".quin2c3un",
    ".su2b3lu",
    ".su2b3r",
    ".s2",
    "2s3que.",
    "2s3dem.",
    ".sta3g2n",
    "3p2sic",
    "3p2neu",
    "3ne.",
    "2sne.",
    // For classic Latin with v -> u
    "a1ua",
    "a1ue",
    "a1ui",
    "a1uo",
    "a1uu",
    "e1ua",
    "e1ue",
    "e1ui",
    "e1u2o",
    "e1uu",
    "i1ua",
    "i1ue",
    "i1ui",
    "i1uo",
    "i1uu",
    "o1ua",
    "o1ue",
    "o1ui",
    "o1uo",
    "o1uu",
    "u1ua",
    "u1ue",
    "u1ui",
    "u1iu",
    "u2iua",
    "u2iue",
    "u2iui",
    "u2iuo", // uivo & conjugation
    "u1uo",
    "u3u2u", // uuula
    //
    "a2l3ua",
    "a2l3ue",
    "a2l3ui",
    "a2l3uo",
    "a2l3uu", // aluarium, alueare, aluinus, saluo, aluus
    "e2l3ue", // Heluetia
    "i2l3ua",
    "i2l3ue",
    "i2l3ui",
    "i2l3uo",
    "i2l3uu", // silua, siluestris, Siluia, siluosus, siluula
    "o2l3ua",
    "o2l3ue",
    "o2l3ui",
    "o2l3uo",
    "o2l3uu", // uoluam, uoluens, uoluis, uoluo, uoluus
    "u2l3ua",
    "u2l3uo",
    "u2l3uu", // ulua, uluosus, uuluula
    //
    // Is it typographically correct to split hiathi?
    "a1a", // a1i a1o
    "e1e",
    "e1a",
    "e1o", // e1u
    "i3i", // i1a i1e i1o i1u
    "o1o", // o1a o1i o1u
    "ui1a",
    "a1is",
    "cu3", // uacuu,, uacuuits
    // u1u u1a u1e u1i u1o // consonantal 'u' requires special attention
    //
    "a1ia",
    "a1ie",
    "a1io",
    "a1iu",
    "ae1a",
    "ae1o",
    "ae1u", // supraiatus
    "e1ia",
    "e1ie",
    "e1i2u",
    "io1i",
    "o1ia",
    "o1ie",
    "o1io",
    "o1iu",
    //
    "2am.",
    "2at.",
    "2as.",
    "2ans.",
    "2ax.",
    "4ant.",
    "2es.",
    "2et.",
    "2em.",
    "2ex.",
    "e5us.",
    "2is.",
    "2im.",
    "2it.",
    "2ix.",
    "2yx.",
    "2ys.",
    "2ox.",
    "2ui.",
    "2ux.",
    "i3um.",
    "i3ur.",
    "i3unt.",
    "i3ui.",
    "tru5us.",
    "tru1um.",
    ".i2a",
    ".i2e",
    ".i2i",
    ".i2o",
    ".i2u",
    ".iuu2a",
    ".iuu2e",
    ".iuu2o", // iuuamentum, iuuentus, iuuo
    ".iei2u",
    ".iai2u", // iacere, ieiunium, iaiunitas, Ioannes, iudaismus, iuncte, iunix,
    ".iuu2i", // iuuistis
    "i2oi2u", // Ueiouis
    "i3u2ia", // rediuia
    "i3ui3ua",
    "i3ui3ue",
    "i3ui3ui",
    "i3ui3uo",
    "i3ui3uu", // rediuiua, rediuiuus & cetera
    "e1ui1ue",
    "e1ui1ui",
    "e1ui1uo",
    "i2y", // iynx, iyncis
    //
    "uo3u", // quousque, quouis (quovis)
    ".ua3ua", // uauatonem
    ".uo3ue", // uoueo
    ".ue1io", // Ueiouis (Veiovis)
    //
    ".u2a",
    ".u2e",
    ".u2i",
    ".u2o",
    ".u2u",
    "1b",
    "2bb",
    "2bd",
    "2bh",
    "b2l",
    "2bm",
    "2bn",
    "2bp",
    "b2r",
    "2bt",
    "2bs",
    "b3s2t",
    "2b.",
    ".b2",
    "1c",
    "2cc",
    "c2h2",
    "c2l",
    "2cm",
    "2cn",
    "2cq",
    "c2r",
    "2cs",
    "2ct",
    "2cz",
    "2c.",
    ".c2",
    "1d",
    "2dd",
    "2dg",
    "2df",
    "2dm",
    "d2r",
    "2ds",
    "2d.",
    ".g2",
    "1f",
    "2ff",
    "f2l",
    "2fn",
    "f2r",
    "2ft",
    "2f.",
    ".f2",
    "1g",
    "2gg",
    "2gd",
    "2gf",
    "g2l",
    "2gm",
    "2gn",
    "g2r",
    "2gs",
    "2g.",
    "1h",
    "2hp",
    "2ht",
    "2h.",
    ".hu1i2u",
    ".h2",
    "1k",
    "1l",
    "2lb",
    "2lc",
    "2ld",
    "2lf",
    "l3f2t",
    "2lg",
    "2lk",
    "2ll",
    "2lm",
    "2ln",
    "2lp",
    "2lq",
    "2lr",
    "2ls",
    "2lt",
    "2l.",
    ".l2",
    "1m",
    "2mm",
    "2mb",
    "2md",
    "2ml",
    "2mn",
    "2mp",
    "2mq",
    "2mr",
    "2ms",
    "2mt",
    "2m.",
    ".m2",
    "1n",
    "2nb",
    "2nc",
    "2nd",
    "2nf",
    "2ng",
    "2nl",
    "2nm",
    "2nn",
    "2np",
    "2nq",
    "2nr",
    "2ns",
    "2nh",
    "n2s3m",
    "n2s3f",
    "2nt",
    "2nx2",
    "2n.",
    ".n2",
    "1p",
    "p2h2",
    "p2l",
    "2pn",
    "2pp",
    "p2r",
    "2ps",
    "2pt",
    "3p2tr",
    "2pz",
    "2php",
    "2pht",
    "2p.",
    ".p2",
    "1qu2",
    "1r",
    "2rb",
    "2rc",
    "2rd",
    "2rf",
    "2rg",
    "r2h",
    "2rl",
    "2rm",
    "2rn",
    "2rp",
    "2rq",
    "2r3r",
    "2rs",
    "2rt",
    "2rz",
    "2r.",
    "2r1x",
    ".r2",
    "1s",
    "2s3s",
    "2sb",
    "2sc",
    "2sd",
    "2sf",
    "2sg",
    "s2l",
    "2sm",
    "2sn",
    "s2r",
    "2sp",
    "2sq",
    "2st",
    "3s2th",
    "3s2ph",
    "3s2ch",
    "2s2t3l",
    "2s3tn",
    "2st3p",
    "2s2t3q",
    "2s2t3s",
    "2s2t3t",
    "2s.",
    "2st.",
    ".s2m",
    "1t",
    "2tb",
    "2tc",
    "2td",
    "2tf",
    "2tg",
    "t2h2",
    "t2l",
    "t2r",
    "2tm",
    "2tn",
    "2tp",
    "2tq",
    "2tt",
    "2t.",
    ".t2",
    "x1",
    "2x.",
    ".x2",
    "1x2a",
    "1x2e",
    "1x2i",
    "1x2it.",
    "1x2o",
    "1x2y",
    "xy3s2t", // xystarcha, xysticus
    "1xu2a",
    "1xu2e",
    "1xu2i",
    "1xu2o",
    "1xu2u",
    "1x2u.",
    "1x2um.",
    "1x2us.",
    //
    "y3c2n",
    "1z",
    "2z.",
    ".z2",
    //
    //
    // apparently there are no instances of "m+consonantal u" except quamuis (quamvis)
    "a2m3ui",
    //a2m1u2a a2m1u2e a2m1u2i a2m1u2o a2m1u2u
    //e2m1u2a e2m1u2e e2m1u2i e2m1u2o e2m1u2u
    //i2m1u2a i2m1u2e i2m1u2i i2m1u2o i2m1u2u
    //o2m1u2a o2m1u2e o2m1u2i o2m1u2o o2m1u2u
    //u2m1u2a u2m1u2e u2m1u2i u2m1u2o u2m1u2u
    //
    "a2n1u2a",
    "a2n1u2e",
    "a2n1u2i",
    "a2n1u2o",
    "a2n1u2u",
    "e2n1u2a",
    "e2n1u2e",
    "e2n1u2i",
    "e2n1u2o",
    "e2n1u2u",
    "ge3n2ua",
    "i2n1u2a",
    "i2n1u2e",
    "i2n1u2i",
    "i2n1u2o",
    "i2n1u2u",
    "ti3n2ui",
    "o2n1u2a",
    "o2n1u2e",
    "o2n1u2i",
    "o2n1u2o",
    "o2n1u2u",
    "u2n1u2a",
    "u2n1u2e",
    "u2n1u2i",
    "u2n1u2o",
    "u2n1u2u",
    //
    "a2r1u2a",
    "a2r1u2e",
    "a2r1u2i",
    "a2r1u2o",
    "a2r1u2u",
    "e2r1u2a",
    "e2r1u2e",
    "e2r1u2i",
    "e2r1u2o",
    "e2r1u2u",
    "i2r1u2a",
    "i2r1u2e",
    "i2r1u2i",
    "i2r1u2o",
    "i2r1u2u",
    "o2r1u2a",
    "o2r1u2e",
    "o2r1u2i",
    "o2r1u2o",
    "o2r1u2u",
    "u2r1u2a",
    "u2r1u2e",
    "u2r1u2i",
    "u2r1u2o",
    "u2r1u2u",
    //
    ".a2b1auu", // abauunculus
    ".a2b1ali", // abalienatio
    ".a2b1ic",
    ".a2b1iec",
    ".a2b1in1", // abicio, abieci, abinde, abintus, abinuicem
    ".a2b1iu", // abiudico, abiungo
    ".a2b1ol", // abolesco
    ".ab2s",
    ".ab3si2", // absis, absidis, absimilis absit
    ".ab3so", // absolvo
    ".ab3s2te", // abstemius
    ".ab3su2",
    ".a2b1es2",
    ".a2b1er2", // absurdum abesse abesto   aberro aberunt
    ".a2bfu", // abfuit
    ".a2b3ru", // abrumpo
    ".ab5s2cin", // abscindere
    ".a2d1",
    ".adsu2",
    ".a2d1es2",
    ".ad3si2",
    ".a2d1er2", // adsum ades adsit aderro aderunt
    ".a2dfu", // adfuit
    ".ad3s2t", // adsternere
    //.a3d2o                           // adolescens <-- ad+olescens
    ".a3g2nas", // a-gnas-cor, but ag-na
    ".a3s2c", // ascendere
    ".a3s2p", // aspergere
    ".a3s2t", // asternere
    ".ape3r2u", // aperui
    //.a2th3                           // athleta of greek origin
    ".ci2s3", // cisalpinus, cisrhenanus
    ".co1e",
    ".co1i",
    ".co1i2e",
    ".coi3u", // coeo, coeuntes, coimus, coieritis, coiuissem, coiuerim
    ".co2e1n", // coenobium
    ".co3e2lec",
    ".co3e2lig", // coelectus, coeligere
    ".co3emen", // coemendare
    ".co3e2r", // coerro. coerceo
    ".co3e2x3", // coexercito
    ".coex3s2", // coexsulto
    ".co3g2no", // cognosco
    ".co2n1",
    ".con3ic", // conicio
    ".co3n2if",
    ".co3n2ig",
    ".co3n2it",
    ".co3n2i3ue", // conifer, coniger, conitor, coniuentia
    ".coni2a",
    ".coni2e",
    ".coni2i",
    ".coni2u", // coniacio, coniecto, coniungo
    ".con3s2cr", // conscribo
    ".con3s2p2", // conspargo, conspectus, conspicio, consponsor, conspuo
    ".con3s2t", // constitutio
    ".de3s2c", // descendere
    ".de3s2p", // despicere
    ".de3s2q", // desquamo
    ".de3s2t", // destinare
    ".di3g2nosc", // dignoscere
    ".di2s1i2", // disiungere
    ".di3s2ce", // discedere, discernere, discentia
    ".di4s3cep3t", // disceptatio
    ".di3s2p", // dispergere <-- dis+spergo
    ".di3s2qua", // disquamo
    ".di3s2cr", // discribere
    ".di3s2t", // distare <-- dis+stare
    ".di4s3ten1d", // distendere
    ".di4s3ti4nc", // distinctio
    //.i2d1                            // ideo
    ".i2dci", // idcirco
    ".i3di2og", // idiographus
    ".i2n1",
    ".in3s2p",
    ".in3s2t", // inspiro, instrumentum
    ".i3n2an",
    ".ina2b3r",
    ".inab3s2",
    ".i3n2it", // inanis, initium, inabruptus, inabsolutus
    ".ina2cr",
    ".ina2df", // inacresco, inadfectatus, inaequalis
    ".i3n2ers",
    ".i3n2ert", // iners, inertis
    ".ine2x3", // inexercitatus, inexplanatus, inexhaustus
    ".inexs2t", // inexstirpabils
    ".ino2b", // inobaudio, inobrutus, inobseruantia
    ".inob3s2c", // inobscurabilis
    ".ino3b2oe", // inoboedientia
    ".inpe2r3iur", // inperiuratus
    ".i3n2ul", // inula
    ".i4n3ulc", // inulcero
    ".inu2a",
    ".inu2e",
    ".inu2i",
    ".inu2o",
    ".inu2u", // inuado, inueho, inuictus, inuolatus, inuulneratus
    ".iu2s3i2ur", // iusiurare
    //.lon2g1 // longaeuus <-- longa+aeuus with syncope: prefix looses its final vowel
    ".o2b1",
    ".o3b2ed", // obediens
    ".o3b2el", // obeliscus
    ".o3b2es", // obesus
    ".o3b2ic", // obicis
    ".obi2a",
    ".obi2e",
    ".ob3i2u", // obiaceo, obiectus, obiuro
    ".ob3s2cu", // obscuro
    ".ob3l", // oblator, obliquo
    ".ob3r", // obrepo, obrogatio
    ".o3b4ruz", // obruza
    ".ob3s2c", // obscaenus
    ".ob3s2t", // obstaculus, obstetrix, obstricte, obstrudo
    ".ob3tr", // obtrunco
    ".obu2a",
    ".obu2e",
    ".obu2i",
    ".obu2o", // obuallo, obuelo, obuigilo, obuoluo
    ".pe2r1absu", // perabsurdus
    ".pe2r1ac", // peracutus
    ".pe2r1a2d1u", // peradulescens
    ".pe2r1a2dp", // peradpositus
    ".pe2r1ae", // peraequo
    ".pe2r3ag",
    ".pe2r3err",
    ".pe2r3or",
    ".pe2r3u", // perago, peragrans, pererro, peroro,
    ".pe2r1ar", // peraresco
    ".pe2r1a2u", // peraudio
    ".pe2r1ed", // peredo
    ".pe2r1eff", // pereffluo
    ".pe2r1egr", // peregregius
    ".pe2r1el", // perelegans, perelixo
    ".pe2r1em", // peremnia, peremptails
    ".pe3r2enn", // perennis
    ".pe2r1eru", // pereruditus
    ".pe2r1e2x3", // perexeo
    ".pe2r3h", // perhaurio, perhiemo, perhonestus
    ".pe2r1i2ac", // periacio
    ".pe2r1i2ec", // perieci
    ".peri3p2s", // peripsema
    ".peri3p2t", // peripteros
    ".peri3s2c", // periscelis
    ".peri3s2t", // peristasis, peristroma
    ".pe2r1o2b3s2c", // perobscurus
    ".pe2r1od", // perodiosus
    ".pe2r1of", // perofficiose
    ".pe2r1ol", // peroleo
    ".pe2r1op", // peropportunus
    ".perse2u",
    ".perse2i",
    ".perse2o", // Perseus,...
    ".pe2r3s2c", // persciens, perscribere
    ".pe2r3s2p",
    ".pe2r3s2t", // perspicio, perstrepo
    ".pe2r3tran2s1", // pertransire
    ".pe2r1u2a",
    ".pe2r1u2e",
    ".pe2r1u2i",
    ".pe2r1u2o", // peruasi, peruerto, peruicax, peruoluo
    ".prae1",
    ".praea2u", // praeaudio
    ".prae3s2c", // praescientia, praescribo
    ".prae3s2p", // praespargo, praespero
    ".prae3s2t", // praestatio, praestringo
    ".praeu2a",
    ".praeu2e",
    ".praeu2i",
    ".praeu2o", // praeualeo, praeuelo, praeuitio, praeuius, praeuolo,
    ".praete2r1",
    ".praeteru2e",
    ".praeteru2o", // praeterueho, praeteruolo
    ".primi1",
    ".primi3s2c", // primiscrinius
    ".pro2d1es3s",
    ".pro2d1ig", // prodesse, prodigere
    ".pro1de1amb", // prodeambulo
    ".pro2d1eo",
    ".pro2d3is",
    ".pro2d1it",
    ".pro2d1im",
    ".pro2d1eun",
    ".pro2d1ir",
    ".pro2d1ib",
    ".pro2d1ier",
    ".pro2d1ea", // prodeo, prodes, prodeunt, prodire
    ".pro3d2ito",
    ".pro3d2iti",
    ".pro3d2itr", // proditor, proditio, proditrix
    //.pro2d1fu2                       // prodfuit does not exist --> profuit, profore
    ".pro3g2n", // prognatus
    ".pro3in", // proin, proinde
    ".pro3s2c", // proscenium, proscribo, proscholus
    ".pro3s2p", // prospecto
    ".pro3s2t", // prostare, prostrator, prostylos
    ".quo2t1an", // quotannis **** which one is correct?
    ".quo2t1en", // quotennis **** which one is correct?
    ".quo2t1i2e", // quotiens, quotiensquounque, quotiensque, quoties, quotiescumque
    ".quo2t3li", // quotlibet
    ".re2d1ac", // redactio, redaccendo
    ".re2d1ad", // redadopto
    ".re2d1am", // redambulo
    ".re2d1an", // redanimo, redantruo
    ".re2d1ar", // redarduo
    ".re2d1a2u", // redauspico
    ".re2d1em", // redemptio
    ".re2d1eo",
    ".re2d5is",
    ".re2d5it",
    ".re4d3imi",
    ".re2d1eu",
    ".re2d1ier",
    ".re2d1ib",
    ".re2d1ien", // redeo & its conjugation
    ".re3d2ic", // redico & its conjugation
    ".re3d2ig", // redigo
    ".re3d2im", // redimere
    ".re2d1in", // redintegro, redinuenio
    ".re2d1ol", // redoleo
    ".re2d1op", // redopto, redoperio
    ".re3d2orm", // redormio
    ".re2d1orn", // redorno
    ".re2d1ul", // redulcero
    ".re2d1ord", // redorditor
    ".re2d1arg", // redarguo
    ".re2d1amb", // redambulo
    ".ree2x", // reexinanio
    ".re1ie", // reiecto
    ".re1in", // reintegro
    ".repa2u", // repauso
    ".re3s2cr", // rescribo
    ".re3s2p", // respersisse respargo, respecto
    ".re3s2tag", // restagnatio
    ".re3s2ta2u", // restauratio
    ".re3s2tib", // restibile
    ".re3s2tic", // resticula
    ".re3s2til", // restilio
    ".re3s2tip", // restipulatio
    ".re3s2tr", // restringo, restruo
    ".sati2s1", // satisfacere, satisacceptio
    ".sa2t1ag", // satagito, satago
    ".ses2c1u4n", // sescuncialis
    ".si2c1u4t2", // sicut, sicuti
    ".si3s2ten", // sistenda
    ".su2b1ic", // subicio
    ".su2b1ingr", // subingredere
    ".su2b1odo", // subodorare
    ".su2b3s2t", // substantia
    ".supe2r1ab", // superabundo
    ".supe2r1ad", // speradornatus
    ".supe2r1ad3s2t", // superadstare
    ".supe2r1ae", // superaedifico
    ".supe2r1ag", // superaggero
    ".supe2r1am", // superambulo
    ".supe2r1arg", // superargumentor
    ".supe2r1a3s2p", // superaspergo
    ".supe2r1a3s2t", // superasto
    ".supe2r1att", // superattraho
    ".supe2r1bib", // superbibo
    ".supe2r1bif", // superbificus
    ".supe2r1bil", // superbiloquentis
    ".supe2r1c", // supercaelestis, supercado
    ".supe2r1d", // superdico
    ".supe2r1ed", // superedo
    ".supe2r1eff", // supereffero
    ".supe2r1eg", // superegredior
    ".supe2r1em", // supereminens
    ".supe2r1en", // superenato
    ".supe2r1er", // supererogo
    ".supe2r1eu", // supereuolo
    ".supe2r1e2x3", // superexeo
    ".supe2r3h", // superhabeo
    ".supe2r3i2", // superiaceo, superiecto
    ".supe2r1il", // superilligo
    ".supe2r1im", // superimmitto
    ".supe2r1in", // superincido
    ".supe2r1ir", // superirruo
    ".supe4r5i4ume", // superiumentarius
    ".supe3r4i3o",
    ".supe3r4i3u", // superior superius
    ".supe2r1o2b1d", // superobductus
    ".supe2r1o2b3r", // superobruo
    ".supe2r1oc", // superoccido
    ".supe2r1or", // superordino
    ".supe2r3s2c", // superscando, superscribo
    ".supe2r3s2p", // superspargo, superspero
    ".supe2r3s2t", // supersterno
    ".supe2r1sub3s2t", // supersubstantialis
    ".supe2r3u2", // superuacuitas, superuenio, superuiuo
    "3r4us.", // superus
    ".supra3s2c", // suprascando, suparscriptum
    ".su3s2c",
    ".su3s2p", // suscipere, suspicere
    ".suss2cr", // susscribo
    ".tetra3e2t", // tetraeteris
    ".tetra3g2n", // tetragnathius
    ".tetra3s2t", // tetrastichos
    ".te2r1i2u", // teriugus
    ".te2r1un", // teruncius
    ".terp2s", // Terpsichore
    ".the2o",
    ".theo3g2n", // Theognis
    ".the3s2p", // Thespias
    ".the3s2t", // Thestias
    ".thi3s2b", // Thisbe
    ".tra1i2a",
    ".tra1i2e",
    ".tra1ii", // Traianus, traiecit, traiicio
    ".tran2s",
    ".transa2",
    ".trans1a2b1i", // transabire, transabis, transabit
    ".trans1a2b1e2", // tranasbeo, transabeuntes
    ".trans1act", // transactor
    ".trans1a2d1", // transadigo, transadegisse
    ".trans3i", // transigo, transit
    ".trans1a2u", // transaustrinus
    ".tran3s2c", // transcribo
    ".tran3s2en", // transenna
    ".trans1e",
    ".transe2u", // transeo, transeuntes
    ".trans1o2", // transoceanicus
    ".trans1u2", // transusque, transuado, transuecto, transuolo
    ".tran3s2um", // transumo, transumptio
    ".tra2n1ue", // tranuerbero
    ".tri3en", // triennalis
    ".u2n1i2us", // uniusmodi
    ".ute2r3ui", // uteruis
    ".za2i3eu", // Zaieucus
    ".zeu3g2m", // zeugma
    //
    ""
  ];

  return {
    patterns: patterns,
    exceptions: hyphenation
  };
});
