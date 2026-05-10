import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── DATA ────────────────────────────────────────────────────────────────────

const CHARS = [
  { id: 1, name: "Zara", role: "Hero",     emoji: "👸", color: "#C084FC" },
  { id: 2, name: "Leo",  role: "Sidekick", emoji: "🦁", color: "#FBBF24" },
  { id: 3, name: "Nova", role: "Mentor",   emoji: "🧙", color: "#22D3EE" },
];

const SKIN_TONES = [
  { id:"s1",hex:"#FDDBB4",label:"Fair"   },
  { id:"s2",hex:"#E8B88A",label:"Light"  },
  { id:"s3",hex:"#C68642",label:"Medium" },
  { id:"s4",hex:"#8D5524",label:"Tan"    },
  { id:"s5",hex:"#5C3317",label:"Deep"   },
  { id:"s6",hex:"#3B2314",label:"Rich"   },
];
const EYE_COLORS = [
  { id:"ec1",hex:"#4FC3F7",label:"Blue"  },
  { id:"ec2",hex:"#81C784",label:"Green" },
  { id:"ec3",hex:"#795548",label:"Brown" },
  { id:"ec4",hex:"#9E9E9E",label:"Grey"  },
  { id:"ec5",hex:"#FFB300",label:"Amber" },
  { id:"ec6",hex:"#6A1B9A",label:"Violet"},
  { id:"ec7",hex:"#212121",label:"Dark"  },
];
const HAIR_COLORS = [
  { id:"hc1",hex:"#212121",label:"Black"     },
  { id:"hc2",hex:"#5D4037",label:"Dark Brown"},
  { id:"hc3",hex:"#8D6E63",label:"Brown"     },
  { id:"hc4",hex:"#D4A017",label:"Blonde"    },
  { id:"hc5",hex:"#BF360C",label:"Red"       },
  { id:"hc6",hex:"#E0E0E0",label:"Silver"    },
  { id:"hc7",hex:"#FFFFFF",label:"White"     },
  { id:"hc8",hex:"#7C3AED",label:"Purple"    },
  { id:"hc9",hex:"#0EA5E9",label:"Blue"      },
];
const FEATURES = {
  gender: [
    { id:"g1",label:"Girl / She·Her",    icon:"♀" },
    { id:"g2",label:"Boy / He·Him",      icon:"♂" },
    { id:"g3",label:"Non-binary",        icon:"⚧" },
    { id:"g4",label:"Prefer not to say", icon:"—" },
  ],
  face: [
    { id:"f1",label:"Round",        icon:"○" },
    { id:"f2",label:"Oval",         icon:"⬭" },
    { id:"f3",label:"Square",       icon:"□" },
    { id:"f4",label:"Heart-shaped", icon:"♡" },
    { id:"f5",label:"Long",         icon:"▯" },
  ],
  eyeShape: [
    { id:"e1",label:"Large & round", icon:"◉" },
    { id:"e2",label:"Almond",        icon:"◎" },
    { id:"e3",label:"Narrow",        icon:"—" },
    { id:"e4",label:"Wide-set",      icon:"↔" },
    { id:"e5",label:"Monolid",       icon:"▬" },
    { id:"e6",label:"Upturned",      icon:"↗" },
  ],
  hairStyle: [
    { id:"h1",label:"Short & neat",  icon:"✦" },
    { id:"h2",label:"Curly afro",    icon:"◎" },
    { id:"h3",label:"Long straight", icon:"↓" },
    { id:"h4",label:"Braids",        icon:"≋" },
    { id:"h5",label:"Locs",          icon:"≡" },
    { id:"h6",label:"Wavy",          icon:"∿" },
    { id:"h7",label:"Ponytail",      icon:"↑" },
    { id:"h8",label:"Bald",          icon:"○" },
    { id:"h9",label:"Hijab",         icon:"◑" },
  ],
  nose: [
    { id:"n1",label:"Button",   icon:"·" },
    { id:"n2",label:"Broad",    icon:"▭" },
    { id:"n3",label:"Narrow",   icon:"▬" },
    { id:"n4",label:"Upturned", icon:"↑" },
    { id:"n5",label:"Hooked",   icon:"↪" },
  ],
  mouth: [
    { id:"m1",label:"Wide smile",    icon:"◡" },
    { id:"m2",label:"Small & sweet", icon:"‿" },
    { id:"m3",label:"Full lips",     icon:"◠" },
    { id:"m4",label:"Thin lips",     icon:"—" },
    { id:"m5",label:"Dimples",       icon:"✦" },
  ],
  extras: [
    { id:"x1", label:"Freckles",    icon:"·"  },
    { id:"x2", label:"Glasses",     icon:"⬙"  },
    { id:"x3", label:"Birthmark",   icon:"♥"  },
    { id:"x4", label:"Scar",        icon:"/"  },
    { id:"x5", label:"Hearing aid", icon:")"  },
    { id:"x6", label:"Vitiligo",    icon:"◌"  },
    { id:"x7", label:"Prosthetic",  icon:"⌇"  },
    { id:"x8", label:"Wheelchair",  icon:"⊕"  },
    { id:"x9", label:"Headband",    icon:"∩"  },
    { id:"x10",label:"Crown",       icon:"⋀"  },
    { id:"x11",label:"Earrings",    icon:"◇"  },
  ],
};

const ART_STYLES = [
{ 
    id: "watercolor", 
    label: "Watercolour", 
    desc: "Soft & dreamy", 
    img: "https://images.stockcake.com/public/3/7/a/37a7e2fe-1861-4d87-b0f1-bb5ca367af77_large/magical-tree-wonder-stockcake.jpg" 
  },
 
{ 
  id: "comic", 
  label: "Comic Book", 
  desc: "Bold & punchy", 
  img: "https://openclipart.org/image/800px/319329" 
},
  { 
    id: "chibi", 
    label: "Chibi", 
    desc: "Cute & playful", 
    img: "https://cloud.firebrandtech.com/api/v2/image/111/9781633228627/CoverArtHigh/XL" 
  },
  { 
    id: "painterly", 
    label: "Painterly", 
    desc: "Rich & detailed", 
    img: "https://a.storyblok.com/f/165154/1280x720/6eeea5ad9c/01_top-13-childrens-book-illustration-styles-header.jpg" 
  },
];
const PALETTES = [
  { id:"royal",  label:"Royal Magic",      colors:["#7C3AED","#FBBF24","#EC4899"] },
  { id:"ocean",  label:"Ocean Realm",      colors:["#0EA5E9","#22D3EE","#34D399"] },
  { id:"sunset", label:"Sunset Kingdom",   colors:["#F97316","#EF4444","#FBBF24"] },
  { id:"forest", label:"Enchanted Forest", colors:["#059669","#84CC16","#FBBF24"] },
  { id:"candy",  label:"Candy Dreams",     colors:["#EC4899","#A855F7","#F97316"] },
];
const AGE_GROUPS = ["3–5 yrs","6–8 yrs","9–12 yrs"];
const MOODS = [
  { id:"brave",     label:"Brave & Bold",  emoji:"⚔" },
  { id:"gentle",    label:"Gentle & Warm", emoji:"✿" },
  { id:"funny",     label:"Funny & Silly", emoji:"☺" },
  { id:"mystery",   label:"Mysterious",    emoji:"◎" },
  { id:"adventure", label:"Adventure",     emoji:"▶" },
];
const PREVIEW_SCENES = {
  watercolor:{ scene:"✦" },
  comic:     { scene:"◈" },
  chibi:     { scene:"◉" },
  painterly: { scene:"◎" },
};

const CHARACTER_IMAGES = {
  girl: [
    "public/images/zara.png",
  ],
  boy: [
      "public/images/leo.png",
  ],
  neutral: [
    "public/images/owl.png",
  ],
};

const generateImageForChar = (charId, genderId) => {
  const pool = genderId === "g1" ? CHARACTER_IMAGES.girl
             : genderId === "g2" ? CHARACTER_IMAGES.boy
             : CHARACTER_IMAGES.neutral;
  return pool[(charId - 1) % pool.length];
};

const buildTraits = (d) => [
  d.skin      && SKIN_TONES.find(s=>s.id===d.skin)?.label + " skin",
  d.eyeColor  && EYE_COLORS.find(e=>e.id===d.eyeColor)?.label + " eyes",
  d.hairColor && HAIR_COLORS.find(h=>h.id===d.hairColor)?.label + " hair",
  d.gender    && FEATURES.gender.find(x=>x.id===d.gender)?.label,
  d.face      && FEATURES.face.find(x=>x.id===d.face)?.label + " face",
  d.hairStyle && FEATURES.hairStyle.find(x=>x.id===d.hairStyle)?.label,
  ...( d.extras?.map(xid=>FEATURES.extras.find(f=>f.id===xid)?.label) || []),
].filter(Boolean);

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────

const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Fredoka+One&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin:0; padding:0; }
    html, body, #root { height: 100%; width: 100%; }
    body { background:#0f0620; overflow: hidden; }

    @keyframes floatY  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    @keyframes fadeUp  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
    @keyframes popIn   { from{opacity:0;transform:scale(.92)} to{opacity:1;transform:scale(1)} }
    @keyframes spin    { to{transform:rotate(360deg)} }
    @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
    @keyframes stepIn  { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:translateX(0)} }
    @keyframes twinkle { from{opacity:.15} to{opacity:.5} }

    ::-webkit-scrollbar { width:3px; height:3px; }
    ::-webkit-scrollbar-track { background:transparent; }
    ::-webkit-scrollbar-thumb { background:rgba(168,85,247,.3); border-radius:2px; }

    .chip:hover  { opacity:.85; transform:translateY(-1px); }
    .chip        { transition:all .15s ease; cursor:pointer; }
    .swatch:hover{ transform:scale(1.1); }
    .swatch      { transition:all .15s ease; cursor:pointer; }
    .lift:hover  { transform:translateY(-2px); filter:brightness(1.06); }
    .lift        { transition:all .18s ease; cursor:pointer; }
    .card-sel:hover { transform:translateY(-2px); }
    .card-sel    { transition:transform .18s ease; cursor:pointer; }

    /* Responsive layout */
    .app-shell {
      display: flex;
      flex-direction: column;
      height: 100dvh;
      width: 100%;
      font-family: 'Nunito', sans-serif;
      color: #f3e8ff;
      background: linear-gradient(160deg,#0f0620 0%,#1a0533 40%,#0d1530 100%);
      overflow: hidden;
    }

    /* Step content area */
    .step-content {
      flex: 1;
      display: flex;
      min-height: 0;
      overflow: hidden;
    }

    /* Character editor: two-column on wide screens */
    .char-editor-layout {
      display: flex;
      flex: 1;
      min-height: 0;
      overflow: hidden;
    }
    .char-editor-left {
      flex: 1;
      min-width: 0;
      overflow-y: auto;
      padding: 20px 24px;
    }
    .char-editor-right {
      width: 320px;
      flex-shrink: 0;
      border-left: 1px solid rgba(168,85,247,.15);
      overflow-y: auto;
      padding: 20px 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    @media (max-width: 768px) {
      .char-editor-right { display: none !important; }
      .char-editor-left  { padding: 16px; }
    }

    /* Customize story: two-column on wide */
    .story-layout {
      display: flex;
      flex: 1;
      min-height: 0;
      overflow: hidden;
    }
    .story-controls {
      flex: 1;
      min-width: 0;
      overflow-y: auto;
      padding: 20px 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .story-sidebar {
      width: 300px;
      flex-shrink: 0;
      border-left: 1px solid rgba(168,85,247,.15);
      overflow-y: auto;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    @media (max-width: 768px) {
      .story-sidebar { display: none !important; }
      .story-controls { padding: 16px; }
    }

    /* Preview: three-column on very wide, two-col on mid */
    .preview-layout {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
      display: grid;
      grid-template-columns: 1fr 1fr 320px;
      gap: 20px;
      align-content: start;
    }
    @media (max-width: 1100px) {
      .preview-layout {
        grid-template-columns: 1fr 1fr;
      }
      .preview-checklist-col { grid-column: 1 / -1; }
    }
    @media (max-width: 768px) {
      .preview-layout {
        grid-template-columns: 1fr;
        padding: 16px;
        gap: 14px;
      }
      .preview-checklist-col { grid-column: 1; }
    }

    /* Character cards grid: 3-col always, responsive portrait height */
    .char-cards-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }
    .char-portrait {
      width: 100%;
      aspect-ratio: 3/4;
      position: relative;
      overflow: hidden;
    }
    @media (max-width: 480px) {
      .char-portrait { aspect-ratio: 1/1; }
    }

    /* Bottom CTA always visible */
    .bottom-cta {
      padding: 12px 24px 24px;
      flex-shrink: 0;
      background: linear-gradient(to top, rgba(15,6,32,1) 60%, transparent);
    }
    @media (max-width: 768px) {
      .bottom-cta { padding: 10px 16px 20px; }
    }
  `}</style>
);

// ─── BG ORBS ─────────────────────────────────────────────────────────────────

function BgOrbs() {
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>
      <div style={{position:"absolute",top:"6%",left:"2%",width:"28vw",height:"28vw",maxWidth:380,maxHeight:380,borderRadius:"50%",background:"radial-gradient(circle,rgba(168,85,247,.14) 0%,transparent 70%)"}}/>
      <div style={{position:"absolute",top:"55%",right:"2%",width:"22vw",height:"22vw",maxWidth:300,maxHeight:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(251,191,36,.09) 0%,transparent 70%)"}}/>
      <div style={{position:"absolute",bottom:"8%",left:"30%",width:"18vw",height:"18vw",maxWidth:240,maxHeight:240,borderRadius:"50%",background:"radial-gradient(circle,rgba(34,211,238,.07) 0%,transparent 70%)"}}/>
    </div>
  );
}

// ─── TOP NAV ─────────────────────────────────────────────────────────────────

function TopNav({ step, total, onBack }) {
  const labels = ["Style & Mood","Characters","Age Group & Generate"];
  return (
    <div style={{
      flexShrink:0,zIndex:50,
      padding:"10px 24px",
      display:"flex",alignItems:"center",gap:16,
      borderBottom:"1px solid rgba(168,85,247,.15)",
      backdropFilter:"blur(16px)",
      background:"rgba(15,6,32,.8)",
    }}>
      {onBack && (
        <button onClick={onBack} style={{
          width:34,height:34,borderRadius:"50%",
          background:"rgba(168,85,247,.1)",border:"1.5px solid rgba(168,85,247,.2)",
          color:"#c4b5fd",fontSize:15,cursor:"pointer",flexShrink:0,
          display:"flex",alignItems:"center",justifyContent:"center",
        }}>←</button>
      )}

      {/* Wordmark */}
      <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
        <div style={{
          width:28,height:28,borderRadius:8,
          background:"linear-gradient(135deg,#7c3aed,#fbbf24)",
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:14,fontWeight:900,color:"#1a0533",fontFamily:"'Fredoka One',cursive",
        }}>S</div>
        <div>
          <div style={{fontSize:10,color:"#6b7280",fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",lineHeight:1}}>Story</div>
          <div style={{fontSize:14,fontFamily:"'Fredoka One',cursive",color:"#FDE68A",lineHeight:1.1}}>Weaver</div>
        </div>
      </div>

      <div style={{width:"1px",height:28,background:"rgba(168,85,247,.2)",flexShrink:0}}/>

      {/* Step label */}
      <div style={{fontSize:13,fontWeight:800,color:"#c4b5fd",display:"flex",alignItems:"center",gap:6}}>
        <span style={{fontSize:10,color:"#6b7280",fontWeight:700}}>Step {step}/{total}</span>
        <span style={{color:"rgba(168,85,247,.3)"}}>·</span>
        {labels[step-1]}
      </div>

      {/* Progress bars */}
      <div style={{flex:1,display:"flex",gap:4}}>
        {Array.from({length:total}).map((_,i)=>(
          <div key={i} style={{
            flex:1,height:3,borderRadius:2,
            background: i < step
              ? "linear-gradient(90deg,#7c3aed,#fbbf24)"
              : "rgba(255,255,255,.08)",
            transition:"background .4s ease",
          }}/>
        ))}
      </div>
    </div>
  );
}

// ─── SHARED UI ────────────────────────────────────────────────────────────────

function SectionHead({ label, optional, required }) {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:9}}>
      <span style={{fontSize:11,fontWeight:800,color:"#a78bfa",textTransform:"uppercase",letterSpacing:1}}>{label}</span>
      {optional  && <span style={{fontSize:9,color:"#6b7280",padding:"2px 7px",borderRadius:6,background:"rgba(255,255,255,.05)"}}>Optional</span>}
      {required  && <span style={{fontSize:9,color:"#d97706",padding:"2px 7px",borderRadius:6,background:"rgba(251,191,36,.08)",border:"1px solid rgba(251,191,36,.18)"}}>Required</span>}
    </div>
  );
}

function Divider() {
  return <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(168,85,247,.2),transparent)",margin:"14px 0"}}/>;
}

function ChipGroup({ items, selected, selectedMulti, onToggle, color="#C084FC", multi }) {
  return (
    <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
      {items.map(item=>{
        const active = multi ? selectedMulti?.includes(item.id) : selected===item.id;
        return (
          <div key={item.id} onClick={()=>onToggle(item.id)} className="chip" style={{
            padding:"7px 12px",borderRadius:20,
            border:`${active?2:1.5}px solid ${active?color:"rgba(255,255,255,.1)"}`,
            background:active?`${color}1a`:"rgba(255,255,255,.04)",
            fontSize:11,fontWeight:700,
            color:active?color:"#9ca3af",
            display:"flex",alignItems:"center",gap:5,
          }}>
            <span style={{fontSize:10,opacity:.8}}>{item.icon}</span>{item.label}
          </div>
        );
      })}
    </div>
  );
}

function ColorRow({ colors, selected, onToggle }) {
  return (
    <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:14}}>
      {colors.map(col=>{
        const sel = selected===col.id;
        return (
          <div key={col.id} onClick={()=>onToggle(col.id)} title={col.label} className="swatch" style={{
            width:32,height:32,borderRadius:"50%",
            background:col.hex,
            boxShadow:sel?`0 0 0 3px rgba(255,255,255,.85),0 0 12px ${col.hex}88`:"0 0 0 2px rgba(255,255,255,.1)",
            display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,
          }}>
            {sel&&<span style={{fontSize:11,fontWeight:900,color:"#fff",textShadow:"0 1px 3px rgba(0,0,0,.8)"}}>✓</span>}
          </div>
        );
      })}
    </div>
  );
}

function SkinRow({ colors, selected, onToggle }) {
  return (
    <div style={{display:"flex",gap:5,marginBottom:14}}>
      {colors.map(s=>{
        const sel=selected===s.id;
        return (
          <div key={s.id} onClick={()=>onToggle(s.id)} title={s.label} className="swatch" style={{
            flex:1,height:32,borderRadius:8,background:s.hex,
            boxShadow:sel?"0 0 0 3px rgba(255,255,255,.85)":"none",
            display:"flex",alignItems:"center",justifyContent:"center",
          }}>
            {sel&&<span style={{fontSize:10,fontWeight:900,color:"#fff",textShadow:"0 1px 4px rgba(0,0,0,.8)"}}>✓</span>}
          </div>
        );
      })}
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div style={{
      padding:"16px",borderRadius:16,
      background:"rgba(255,255,255,.04)",border:"1.5px solid rgba(168,85,247,.13)",
    }}>
      <div style={{fontSize:12,fontWeight:800,color:"#f3e8ff",fontFamily:"'Fredoka One',cursive",marginBottom:12}}>{title}</div>
      {children}
    </div>
  );
}

// ─── CHARACTER PREVIEW CARD ───────────────────────────────────────────────────

function CharacterPreviewCard({ charId, charData, isActive, onClick, artStyle, palette, generatedImages, onGenerate }) {
  const ch     = CHARS.find(x=>x.id===charId);
  const d      = charData[charId];
  const traits = buildTraits(d);

  const skinHex = d.skin      ? SKIN_TONES.find(s=>s.id===d.skin)?.hex     : null;
  const eyeHex  = d.eyeColor  ? EYE_COLORS.find(e=>e.id===d.eyeColor)?.hex : null;
  const hairHex = d.hairColor ? HAIR_COLORS.find(h=>h.id===d.hairColor)?.hex : null;
  const activePalette = PALETTES.find(p=>p.id===palette) || PALETTES[0];

  const imgState  = generatedImages[charId];
  const isLoading = imgState === "loading";
  const hasImage  = imgState && imgState !== "loading";

  const portraitBg = skinHex
    ? `radial-gradient(ellipse at 50% 35%, ${skinHex}cc 0%, ${skinHex}44 55%, ${ch.color}22 100%)`
    : `radial-gradient(ellipse at 50% 35%, ${ch.color}2a 0%, ${ch.color}0d 70%)`;

  return (
    <div onClick={onClick} className="card-sel" style={{
      borderRadius:14,overflow:"hidden",
      border:`${isActive?2:1.5}px solid ${isActive?ch.color:"rgba(255,255,255,.1)"}`,
      background:"rgba(255,255,255,.04)",
      boxShadow:isActive?`0 0 20px ${ch.color}33`:"none",
    }}>
      {/* Portrait */}
      <div className="char-portrait" style={{background:hasImage?"#000":portraitBg}}>
        {/* Palette tint */}
        {!hasImage && !isLoading && (
          <div style={{position:"absolute",inset:0,background:`linear-gradient(135deg,${activePalette.colors[0]}18,${activePalette.colors[2]}0d)`,pointerEvents:"none"}}/>
        )}

        {/* Idle: hair blob */}
        {!hasImage && !isLoading && hairHex && (
          <div style={{position:"absolute",top:"5%",left:"50%",transform:"translateX(-50%)",width:"55%",height:"25%",borderRadius:"50%",background:`${hairHex}99`,filter:"blur(8px)"}}/>
        )}

        {/* Idle: eye dots */}
        {!hasImage && !isLoading && eyeHex && (
          <>
            <div style={{position:"absolute",top:"42%",left:"35%",width:"10%",paddingBottom:"10%",borderRadius:"50%",background:eyeHex,boxShadow:`0 0 6px ${eyeHex}`}}/>
            <div style={{position:"absolute",top:"42%",left:"55%",width:"10%",paddingBottom:"10%",borderRadius:"50%",background:eyeHex,boxShadow:`0 0 6px ${eyeHex}`}}/>
          </>
        )}

        {/* Idle: emoji centred */}
        {!hasImage && !isLoading && (
          <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{fontSize:"clamp(28px,6vw,44px)",filter:`drop-shadow(0 4px 10px ${ch.color}88)`,animation:"floatY 4s ease-in-out infinite"}}>{ch.emoji}</span>
          </div>
        )}

        {/* Loading shimmer */}
        {isLoading && (
          <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,rgba(255,255,255,.03) 25%,rgba(255,255,255,.10) 50%,rgba(255,255,255,.03) 75%)",backgroundSize:"200% 100%",animation:"shimmer 1.2s infinite linear"}}>
            <div style={{position:"absolute",top:"15%",left:"50%",transform:"translateX(-50%)",width:"50%",paddingBottom:"50%",borderRadius:"50%",background:"rgba(255,255,255,.07)"}}/>
            <div style={{position:"absolute",bottom:"12%",left:"15%",width:"45%",height:"7%",borderRadius:4,background:"rgba(255,255,255,.05)"}}/>
          </div>
        )}

        {/* Generated image — covers full portrait */}
        {hasImage && (
          <img src={imgState} alt={d.name||ch.name} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"top center",animation:"fadeUp .4s ease"}} onError={e=>{e.target.style.display="none";}}/>
        )}

        {/* Gradient overlay on generated */}
        {hasImage && <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.65) 0%,transparent 55%)",pointerEvents:"none"}}/>}

        {/* Top-left badge */}
        <div style={{position:"absolute",top:7,left:7,padding:"2px 7px",borderRadius:8,background:"rgba(0,0,0,.5)",backdropFilter:"blur(6px)",fontSize:8,fontWeight:800,color:"#FDE68A",letterSpacing:.3}}>
          {artStyle || "watercolor"}
        </div>

        {/* Active indicator */}
        {isActive && !hasImage && (
          <div style={{position:"absolute",top:7,right:7,width:16,height:16,borderRadius:"50%",background:ch.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#1a0533",fontWeight:900}}>✓</div>
        )}

        {/* Re-roll on generated */}
        {hasImage && (
          <button onClick={e=>{e.stopPropagation();onGenerate(charId,d.gender);}} style={{position:"absolute",bottom:7,right:7,padding:"2px 8px",borderRadius:8,border:"none",cursor:"pointer",background:"rgba(0,0,0,.6)",backdropFilter:"blur(6px)",fontSize:8,fontWeight:700,color:"#fff",letterSpacing:.3}}>
            Re-roll
          </button>
        )}

        {/* Loading spinner */}
        {isLoading && (
          <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:7,zIndex:3}}>
            <div style={{width:20,height:20,border:`2px solid ${ch.color}33`,borderTopColor:ch.color,borderRadius:"50%",animation:"spin 1s linear infinite"}}/>
            <span style={{fontSize:8,fontWeight:800,color:ch.color,letterSpacing:.8,textTransform:"uppercase"}}>Generating</span>
          </div>
        )}
      </div>

      {/* Meta */}
      <div style={{padding:"9px 10px 10px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:5}}>
          <div>
            <div style={{fontSize:12,fontWeight:900,color:isActive?ch.color:"#f3e8ff",fontFamily:"'Fredoka One',cursive",lineHeight:1}}>{d.name||ch.name}</div>
            <div style={{fontSize:9,color:"#6b7280",textTransform:"uppercase",letterSpacing:.6,marginTop:2}}>{ch.role}</div>
          </div>
          <div style={{display:"flex",gap:3}}>
            {skinHex && <div style={{width:8,height:8,borderRadius:"50%",background:skinHex,border:"1px solid rgba(255,255,255,.2)"}}/>}
            {eyeHex  && <div style={{width:8,height:8,borderRadius:"50%",background:eyeHex, border:"1px solid rgba(255,255,255,.2)"}}/>}
            {hairHex && <div style={{width:8,height:8,borderRadius:"50%",background:hairHex,border:"1px solid rgba(255,255,255,.2)"}}/>}
          </div>
        </div>

        {traits.length > 0 ? (
          <div style={{display:"flex",flexWrap:"wrap",gap:3,marginBottom:8}}>
            {traits.slice(0,2).map(t=>(
              <span key={t} style={{fontSize:8,fontWeight:700,padding:"2px 6px",borderRadius:6,background:`${ch.color}15`,border:`1px solid ${ch.color}28`,color:ch.color}}>{t}</span>
            ))}
            {traits.length>2&&<span style={{fontSize:8,fontWeight:700,padding:"2px 6px",borderRadius:6,background:"rgba(255,255,255,.05)",color:"#6b7280"}}>+{traits.length-2}</span>}
          </div>
        ) : (
          <div style={{fontSize:9,color:"#4b5563",fontStyle:"italic",marginBottom:8}}>No details yet</div>
        )}

        {!hasImage && !isLoading && (
          <button onClick={e=>{e.stopPropagation();onGenerate(charId,d.gender);}} style={{
            width:"100%",padding:"7px 0",borderRadius:10,border:"none",cursor:"pointer",
            fontSize:9,fontWeight:900,fontFamily:"'Fredoka One',cursive",letterSpacing:.4,
            background:`linear-gradient(135deg,${ch.color}cc,${ch.color}88)`,color:"#1a0533",
          }}>Generate Preview</button>
        )}
        {isLoading && (
          <div style={{width:"100%",padding:"7px 0",borderRadius:10,background:"rgba(255,255,255,.05)",color:"#6b7280",fontSize:9,fontWeight:700,textAlign:"center"}}>Generating…</div>
        )}
        {hasImage && (
          <div style={{fontSize:9,color:"#4b5563",textAlign:"center",fontStyle:"italic"}}>Click to re-roll</div>
        )}
      </div>
    </div>
  );
}

// ─── STEP 1 — CHARACTER EDITOR ────────────────────────────────────────────────

function CharacterEditor({ charData, setCharData, onNext, generatedImages, onGenerate }) {
  const [selectedChar, setSelectedChar] = useState(1);
  const [showExtras, setShowExtras]     = useState(false);

  const cd = charData[selectedChar];
  const c  = CHARS.find(x=>x.id===selectedChar);

  const update       = (field,val) => setCharData(prev=>({...prev,[selectedChar]:{...prev[selectedChar],[field]:val}}));
  const toggleSingle = (field,id)  => update(field, cd[field]===id ? null : id);
  const toggleMulti  = (id) => {
    const arr=[...cd.extras];
    const idx=arr.indexOf(id);
    if(idx>-1) arr.splice(idx,1); else arr.push(id);
    update("extras",arr);
  };

  return (
    <div style={{display:"flex",flexDirection:"column",flex:1,minHeight:0,animation:"stepIn .3s ease"}}>
      <div className="char-editor-layout">

        {/* LEFT: editor form */}
        <div className="char-editor-left">
          {/* Character tabs */}
          <div style={{display:"flex",gap:8,marginBottom:18,overflowX:"auto",paddingBottom:2}}>
            {CHARS.map(ch=>{
              const on=selectedChar===ch.id;
              return (
                <div key={ch.id} onClick={()=>setSelectedChar(ch.id)} className="chip" style={{
                  display:"flex",alignItems:"center",gap:7,
                  padding:"8px 14px",borderRadius:20,flexShrink:0,
                  border:`${on?2:1.5}px solid ${on?ch.color:"rgba(255,255,255,.1)"}`,
                  background:on?`${ch.color}18`:"rgba(255,255,255,.04)",
                  boxShadow:on?`0 0 14px ${ch.color}28`:"none",
                }}>
                  <span style={{fontSize:16}}>{ch.emoji}</span>
                  <div>
                    <div style={{fontSize:12,fontWeight:800,color:on?ch.color:"#9ca3af"}}>{charData[ch.id].name||ch.name}</div>
                    <div style={{fontSize:9,color:"#6b7280",textTransform:"uppercase",letterSpacing:.5}}>{ch.role}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active char header */}
          <div style={{display:"flex",alignItems:"center",gap:10,padding:"11px 13px",borderRadius:12,marginBottom:16,background:`${c.color}0f`,border:`1.5px solid ${c.color}2a`,animation:"popIn .2s ease"}}>
            <span style={{fontSize:22}}>{c.emoji}</span>
            <div>
              <div style={{fontSize:13,fontWeight:900,color:c.color,fontFamily:"'Fredoka One',cursive"}}>{cd.name||c.name}</div>
              <div style={{fontSize:9,color:"#6b7280",textTransform:"uppercase",letterSpacing:.7}}>Editing {c.role}</div>
            </div>
          </div>

          {/* Name */}
          <SectionHead label="Character Name" required/>
          <div style={{position:"relative",marginBottom:14}}>
            <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",fontSize:16,pointerEvents:"none"}}>{c.emoji}</span>
            <input value={cd.name} onChange={e=>update("name",e.target.value)} placeholder="Enter character name…"
              style={{width:"100%",padding:"12px 14px 12px 44px",borderRadius:12,
                border:`1.5px solid ${c.color}44`,background:`${c.color}08`,
                color:"#f3e8ff",fontSize:14,fontWeight:700,outline:"none",fontFamily:"'Nunito',sans-serif"}}/>
          </div>
          <Divider/>

          {/* Expand toggle */}
          <button onClick={()=>setShowExtras(v=>!v)} style={{
            width:"100%",marginBottom:14,padding:"12px 14px",borderRadius:12,cursor:"pointer",
            border:`1.5px solid ${showExtras?c.color:"rgba(168,85,247,.2)"}`,
            background:showExtras?`${c.color}0f`:"rgba(168,85,247,.05)",
            display:"flex",alignItems:"center",justifyContent:"space-between",
          }}>
            <div style={{display:"flex",alignItems:"center",gap:9,textAlign:"left"}}>
              <span style={{fontSize:14,opacity:.7}}>◈</span>
              <div>
                <div style={{fontSize:12,fontWeight:800,color:showExtras?c.color:"#c4b5fd",fontFamily:"'Fredoka One',cursive"}}>
                  {showExtras?"Hide additional features":"Add facial & body details"}
                </div>
                <div style={{fontSize:10,color:"#6b7280",marginTop:1}}>
                  {showExtras?"Collapse section":"Skin · face · hair · eyes · extras — all optional"}
                </div>
              </div>
            </div>
            <span style={{fontSize:14,color:showExtras?c.color:"#a78bfa",transform:showExtras?"rotate(180deg)":"rotate(0)",transition:"transform .25s",display:"block"}}>▾</span>
          </button>

          {showExtras && (
            <div style={{animation:"fadeUp .22s ease"}}>
              <SectionHead label="Gender expression" optional/>
              <ChipGroup items={FEATURES.gender} selected={cd.gender} onToggle={id=>toggleSingle("gender",id)} color={c.color}/>
              <Divider/>
              <SectionHead label="Skin tone" optional/>
              <SkinRow colors={SKIN_TONES} selected={cd.skin} onToggle={id=>toggleSingle("skin",id)}/>
              <Divider/>
              <SectionHead label="Face shape" optional/>
              <ChipGroup items={FEATURES.face} selected={cd.face} onToggle={id=>toggleSingle("face",id)} color={c.color}/>
              <Divider/>
              <SectionHead label="Eye shape" optional/>
              <ChipGroup items={FEATURES.eyeShape} selected={cd.eyeShape} onToggle={id=>toggleSingle("eyeShape",id)} color={c.color}/>
              <SectionHead label="Eye colour" optional/>
              <ColorRow colors={EYE_COLORS} selected={cd.eyeColor} onToggle={id=>toggleSingle("eyeColor",id)}/>
              <Divider/>
              <SectionHead label="Hair style" optional/>
              <ChipGroup items={FEATURES.hairStyle} selected={cd.hairStyle} onToggle={id=>toggleSingle("hairStyle",id)} color={c.color}/>
              <SectionHead label="Hair colour" optional/>
              <ColorRow colors={HAIR_COLORS} selected={cd.hairColor} onToggle={id=>toggleSingle("hairColor",id)}/>
              <Divider/>
              <SectionHead label="Nose" optional/>
              <ChipGroup items={FEATURES.nose} selected={cd.nose} onToggle={id=>toggleSingle("nose",id)} color={c.color}/>
              <SectionHead label="Mouth" optional/>
              <ChipGroup items={FEATURES.mouth} selected={cd.mouth} onToggle={id=>toggleSingle("mouth",id)} color={c.color}/>
              <Divider/>
              <SectionHead label="Extras" optional/>
              <ChipGroup items={FEATURES.extras} selectedMulti={cd.extras} onToggle={toggleMulti} color={c.color} multi/>
            </div>
          )}
          <div style={{height:16}}/>
        </div>

        {/* RIGHT: character preview cards — desktop only */}
        <div className="char-editor-right">
          <div style={{fontSize:9,color:"#6b7280",fontWeight:700,textTransform:"uppercase",letterSpacing:1.2,marginBottom:2}}>Character Previews</div>
          <div className="char-cards-grid">
            {CHARS.map(ch=>(
              <CharacterPreviewCard key={ch.id} charId={ch.id} charData={charData}
                isActive={selectedChar===ch.id} onClick={()=>setSelectedChar(ch.id)}
                artStyle="watercolor" palette="royal"
                generatedImages={generatedImages} onGenerate={onGenerate}/>
            ))}
          </div>
          <Divider/>
          <div style={{fontSize:9,color:"#6b7280",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>Tips</div>
          {["Name is the only required field","More detail = better AI consistency","Each character stores independently","Tap Generate Preview to see a placeholder"].map(tip=>(
            <div key={tip} style={{fontSize:10,color:"#6b7280",padding:"6px 0",borderBottom:"1px solid rgba(168,85,247,.06)",display:"flex",alignItems:"flex-start",gap:6}}>
              <span style={{color:"#7c3aed",flexShrink:0}}>›</span>{tip}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bottom-cta">
        <button onClick={onNext} className="lift" style={{
          width:"100%",padding:"14px 0",borderRadius:14,border:"none",cursor:"pointer",
          fontSize:15,fontWeight:900,fontFamily:"'Fredoka One',cursive",
          background:"linear-gradient(135deg,#7c3aed 0%,#fbbf24 50%,#ec4899 100%)",
          color:"#1a0533",letterSpacing:.4,
        }}>Next — Customise Story →</button>
        <div style={{textAlign:"center",fontSize:11,color:"#6b7280",marginTop:8,cursor:"pointer"}} onClick={onNext}>Skip character details</div>
      </div>
    </div>
  );
}

// ─── STEP 1 — STYLE & MOOD ───────────────────────────────────────────────────

function StyleMoodStep({ storyData, setStoryData, onNext }) {
  const { artStyle, palette, mood } = storyData;
  const set = (key,val) => setStoryData(prev=>({...prev,[key]:val}));

  const activePalette = PALETTES.find(p=>p.id===palette)||PALETTES[0];
  const activeMood    = MOODS.find(m=>m.id===mood);
  const activeStyle   = ART_STYLES.find(s=>s.id===artStyle);

  return (
    <div style={{display:"flex",flexDirection:"column",flex:1,minHeight:0,animation:"stepIn .3s ease"}}>
      <div className="story-layout">

        {/* LEFT: controls */}
        <div className="story-controls">

          {/* Hint banner */}
          <div style={{padding:"10px 14px",borderRadius:12,background:"rgba(251,191,36,.06)",border:"1.5px solid rgba(251,191,36,.15)",fontSize:11,color:"#d97706",fontWeight:700,lineHeight:1.5}}>
            ◎ Choose your style and mood first — these settings influence how your characters are illustrated. Changing them later will clear generated portraits.
          </div>

          <SectionCard title="Art Style">
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
              {ART_STYLES.map(s=>{
                const sel=artStyle===s.id;
                return (
                  <div key={s.id} onClick={()=>set("artStyle",s.id)} className="card-sel" style={{
                    borderRadius:12,overflow:"hidden",
                    border:`${sel?2:1.5}px solid ${sel?"#FBBF24":"rgba(255,255,255,.1)"}`,
                    background:"#0f0620",
                    boxShadow:sel?"0 0 16px rgba(251,191,36,.2)":"none",
                    position:"relative",
                  }}>
                    <div style={{position:"relative",width:"100%",paddingTop:"75%",overflow:"hidden"}}>
                      <img src={s.img} alt={s.label} style={{
                        position:"absolute",top:0,left:0,
                        width:"100%",height:"100%",
                        objectFit:"cover",objectPosition:"center center",
                        filter:sel?"brightness(1)":"brightness(.55) saturate(.75)",
                        transition:"filter .2s",display:"block",
                      }} onError={e=>{e.target.style.display="none";}}/>
                      <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(10,4,22,.92) 0%,rgba(10,4,22,.2) 55%,transparent 100%)"}}/>
                      {sel&&<div style={{position:"absolute",top:7,right:7,width:18,height:18,borderRadius:"50%",background:"#FBBF24",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:900,color:"#1a0533",zIndex:2}}>✓</div>}
                      <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"8px 10px",zIndex:2}}>
                        <div style={{fontSize:11,fontWeight:800,color:sel?"#FBBF24":"#f3e8ff"}}>{s.label}</div>
                        <div style={{fontSize:9,color:"#9ca3af",marginTop:1}}>{s.desc}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard>

          <SectionCard title="Colour Palette">
            <div style={{display:"flex",flexDirection:"column",gap:7}}>
              {PALETTES.map(p=>{
                const sel=palette===p.id;
                return (
                  <div key={p.id} onClick={()=>set("palette",p.id)} className="chip" style={{
                    display:"flex",alignItems:"center",gap:11,padding:"9px 12px",
                    borderRadius:10,
                    border:`${sel?2:1.5}px solid ${sel?"rgba(168,85,247,.5)":"rgba(255,255,255,.07)"}`,
                    background:sel?"rgba(168,85,247,.09)":"rgba(255,255,255,.03)",
                  }}>
                    <div style={{display:"flex",gap:4}}>
                      {p.colors.map((col,i)=>(
                        <div key={i} style={{width:18,height:18,borderRadius:5,background:col,boxShadow:`0 1px 6px ${col}55`}}/>
                      ))}
                    </div>
                    <span style={{fontSize:11,fontWeight:700,color:sel?"#c4b5fd":"#9ca3af",flex:1}}>{p.label}</span>
                    {sel&&<span style={{fontSize:12,color:"#a78bfa"}}>✓</span>}
                  </div>
                );
              })}
            </div>
          </SectionCard>

          <SectionCard title="Story Mood">
            <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
              {MOODS.map(m=>{
                const sel=mood===m.id;
                return (
                  <div key={m.id} onClick={()=>set("mood",m.id)} className="chip" style={{
                    padding:"8px 13px",borderRadius:20,
                    display:"flex",alignItems:"center",gap:6,fontSize:11,fontWeight:800,
                    border:`${sel?2:1.5}px solid ${sel?"#EC4899":"rgba(255,255,255,.1)"}`,
                    background:sel?"rgba(236,72,153,.1)":"rgba(255,255,255,.04)",
                    color:sel?"#EC4899":"#9ca3af",
                  }}>
                    <span style={{fontSize:11}}>{m.emoji}</span>{m.label}
                  </div>
                );
              })}
            </div>
          </SectionCard>
          <div style={{height:8}}/>
        </div>

        {/* RIGHT: live preview sidebar */}
        <div className="story-sidebar">
          <div style={{borderRadius:16,overflow:"hidden",border:"1.5px solid rgba(168,85,247,.18)",boxShadow:"0 4px 20px rgba(0,0,0,.3)"}}>
            <div style={{height:130,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",background:`linear-gradient(135deg,${activePalette.colors[0]}55,${activePalette.colors[1]}33,${activePalette.colors[2]}55)`}}>
              <span style={{fontSize:42,animation:"floatY 3.5s ease-in-out infinite",filter:"drop-shadow(0 3px 8px rgba(0,0,0,.5))"}}>{PREVIEW_SCENES[artStyle]?.scene||"✦"}</span>
              <div style={{position:"absolute",top:8,left:8,padding:"2px 8px",borderRadius:8,background:"rgba(0,0,0,.45)",backdropFilter:"blur(6px)",fontSize:8,fontWeight:800,color:"#FDE68A"}}>{activeStyle?.label}</div>
              <div style={{position:"absolute",top:8,right:8,padding:"2px 8px",borderRadius:8,background:"rgba(0,0,0,.45)",backdropFilter:"blur(6px)",fontSize:8,fontWeight:800,color:"#C084FC"}}>{activeMood?.emoji} {activeMood?.label}</div>
            </div>
            <div style={{padding:"11px 13px",background:"rgba(255,255,255,.04)"}}>
              <div style={{fontSize:11,color:"#9ca3af",marginTop:3}}>{activeMood?.emoji} {activeMood?.label} · {activeStyle?.label}</div>
            </div>
          </div>

          <div style={{padding:"11px 13px",borderRadius:12,background:"rgba(255,255,255,.04)",border:"1px solid rgba(168,85,247,.12)"}}>
            <div style={{fontSize:9,color:"#6b7280",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:7}}>{activePalette.label}</div>
            <div style={{display:"flex",gap:5}}>
              {activePalette.colors.map((col,i)=>(
                <div key={i} style={{flex:1,height:24,borderRadius:6,background:col,boxShadow:`0 2px 8px ${col}44`}}/>
              ))}
            </div>
          </div>

          <div style={{padding:"11px 13px",borderRadius:12,background:"rgba(251,191,36,.05)",border:"1px solid rgba(251,191,36,.15)"}}>
            <div style={{fontSize:10,color:"#d97706",fontWeight:700,lineHeight:1.5}}>
              ◎ Changing art style or palette on this screen will clear any character portraits generated in the next step.
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-cta">
        <button onClick={onNext} className="lift" style={{
          width:"100%",padding:"14px 0",borderRadius:14,border:"none",cursor:"pointer",
          fontSize:15,fontWeight:900,fontFamily:"'Fredoka One',cursive",
          background:"linear-gradient(135deg,#7c3aed 0%,#fbbf24 50%,#ec4899 100%)",
          color:"#1a0533",letterSpacing:.4,
        }}>Next — Build Characters →</button>
      </div>
    </div>
  );
}

// ─── STEP 2 — CUSTOMISE STORY (kept for sidebar reuse reference) ───────────────

function CustomizeStory({ charData, storyData, setStoryData, onNext, generatedImages, onGenerate }) {
  const { artStyle, palette, ageGroup, mood } = storyData;
  const [activePreviewChar, setActivePreviewChar] = useState(1);
  const set = (key,val) => setStoryData(prev=>({...prev,[key]:val}));

  const activePalette = PALETTES.find(p=>p.id===palette)||PALETTES[0];
  const activeMood    = MOODS.find(m=>m.id===mood);
  const activeStyle   = ART_STYLES.find(s=>s.id===artStyle);
  const heroName      = charData[1].name||CHARS[0].name;

  return (
    <div style={{display:"flex",flexDirection:"column",flex:1,minHeight:0,animation:"stepIn .3s ease"}}>
      <div className="story-layout">

        {/* LEFT: controls */}
        <div className="story-controls">
          <SectionCard title="Art Style">
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
              {ART_STYLES.map(s=>{
                const sel=artStyle===s.id;
                return (
                  <div key={s.id} onClick={()=>set("artStyle",s.id)} className="card-sel" style={{
                    borderRadius:12,overflow:"hidden",
                    border:`${sel?2:1.5}px solid ${sel?"#FBBF24":"rgba(255,255,255,.1)"}`,
                    background:"#0f0620",
                    boxShadow:sel?"0 0 16px rgba(251,191,36,.2)":"none",
                    position:"relative",
                  }}>
                    <div style={{position:"relative",width:"100%",paddingTop:"75%",overflow:"hidden"}}>
                      <img src={s.img} alt={s.label} style={{
                        position:"absolute",top:0,left:0,
                        width:"100%",height:"100%",
                        objectFit:"cover",objectPosition:"center center",
                        filter:sel?"brightness(1)":"brightness(.55) saturate(.75)",
                        transition:"filter .2s",display:"block",
                      }} onError={e=>{e.target.style.display="none";}}/>
                      <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(10,4,22,.92) 0%,rgba(10,4,22,.2) 55%,transparent 100%)"}}/>
                      {sel&&<div style={{position:"absolute",top:7,right:7,width:18,height:18,borderRadius:"50%",background:"#FBBF24",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:900,color:"#1a0533",zIndex:2}}>✓</div>}
                      <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"8px 10px",zIndex:2}}>
                        <div style={{fontSize:11,fontWeight:800,color:sel?"#FBBF24":"#f3e8ff"}}>{s.label}</div>
                        <div style={{fontSize:9,color:"#9ca3af",marginTop:1}}>{s.desc}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard>

          <SectionCard title="Colour Palette">
            <div style={{display:"flex",flexDirection:"column",gap:7}}>
              {PALETTES.map(p=>{
                const sel=palette===p.id;
                return (
                  <div key={p.id} onClick={()=>set("palette",p.id)} className="chip" style={{
                    display:"flex",alignItems:"center",gap:11,padding:"9px 12px",
                    borderRadius:10,
                    border:`${sel?2:1.5}px solid ${sel?"rgba(168,85,247,.5)":"rgba(255,255,255,.07)"}`,
                    background:sel?"rgba(168,85,247,.09)":"rgba(255,255,255,.03)",
                  }}>
                    <div style={{display:"flex",gap:4}}>
                      {p.colors.map((col,i)=>(
                        <div key={i} style={{width:18,height:18,borderRadius:5,background:col,boxShadow:`0 1px 6px ${col}55`}}/>
                      ))}
                    </div>
                    <span style={{fontSize:11,fontWeight:700,color:sel?"#c4b5fd":"#9ca3af",flex:1}}>{p.label}</span>
                    {sel&&<span style={{fontSize:12,color:"#a78bfa"}}>✓</span>}
                  </div>
                );
              })}
            </div>
          </SectionCard>

          <SectionCard title="Age Group">
            <div style={{display:"flex",gap:8}}>
              {AGE_GROUPS.map(ag=>{
                const sel=ageGroup===ag;
                return (
                  <div key={ag} onClick={()=>set("ageGroup",ag)} className="chip" style={{
                    flex:1,padding:"11px 8px",borderRadius:10,textAlign:"center",
                    fontSize:12,fontWeight:800,
                    border:`${sel?2:1.5}px solid ${sel?"#22D3EE":"rgba(255,255,255,.1)"}`,
                    background:sel?"rgba(34,211,238,.09)":"rgba(255,255,255,.04)",
                    color:sel?"#22D3EE":"#9ca3af",
                  }}>{ag}</div>
                );
              })}
            </div>
          </SectionCard>

          <SectionCard title="Story Mood">
            <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
              {MOODS.map(m=>{
                const sel=mood===m.id;
                return (
                  <div key={m.id} onClick={()=>set("mood",m.id)} className="chip" style={{
                    padding:"8px 13px",borderRadius:20,
                    display:"flex",alignItems:"center",gap:6,fontSize:11,fontWeight:800,
                    border:`${sel?2:1.5}px solid ${sel?"#EC4899":"rgba(255,255,255,.1)"}`,
                    background:sel?"rgba(236,72,153,.1)":"rgba(255,255,255,.04)",
                    color:sel?"#EC4899":"#9ca3af",
                  }}>
                    <span style={{fontSize:11}}>{m.emoji}</span>{m.label}
                  </div>
                );
              })}
            </div>
          </SectionCard>
          <div style={{height:8}}/>
        </div>

        {/* RIGHT: live preview — desktop only */}
        <div className="story-sidebar">
          {/* Scene card */}
          <div style={{borderRadius:16,overflow:"hidden",border:"1.5px solid rgba(168,85,247,.18)",boxShadow:"0 4px 20px rgba(0,0,0,.3)"}}>
            <div style={{height:130,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",background:`linear-gradient(135deg,${activePalette.colors[0]}55,${activePalette.colors[1]}33,${activePalette.colors[2]}55)`}}>
              <span style={{fontSize:42,animation:"floatY 3.5s ease-in-out infinite",filter:"drop-shadow(0 3px 8px rgba(0,0,0,.5))"}}>{PREVIEW_SCENES[artStyle]?.scene||"✦"}</span>
              <div style={{position:"absolute",top:8,left:8,padding:"2px 8px",borderRadius:8,background:"rgba(0,0,0,.45)",backdropFilter:"blur(6px)",fontSize:8,fontWeight:800,color:"#FDE68A"}}>{activeStyle?.label}</div>
              <div style={{position:"absolute",top:8,right:8,padding:"2px 8px",borderRadius:8,background:"rgba(0,0,0,.45)",backdropFilter:"blur(6px)",fontSize:8,fontWeight:800,color:"#C084FC"}}>{activeMood?.emoji} {activeMood?.label}</div>
            </div>
            <div style={{padding:"11px 13px",background:"rgba(255,255,255,.04)"}}>
              <div style={{fontSize:13,fontFamily:"'Fredoka One',cursive",color:"#FDE68A",lineHeight:1.3}}>The Kingdom of {heroName}</div>
              <div style={{fontSize:10,color:"#9ca3af",marginTop:3}}>{activeMood?.emoji} {activeMood?.label} · {ageGroup}</div>
            </div>
          </div>

          {/* Character cards */}
          <div>
            <div style={{fontSize:9,color:"#6b7280",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:9}}>Characters</div>
            <div className="char-cards-grid">
              {CHARS.map(ch=>(
                <CharacterPreviewCard key={ch.id} charId={ch.id} charData={charData}
                  isActive={activePreviewChar===ch.id} onClick={()=>setActivePreviewChar(ch.id)}
                  artStyle={artStyle} palette={palette}
                  generatedImages={generatedImages} onGenerate={onGenerate}/>
              ))}
            </div>
          </div>

          {/* Palette swatch strip */}
          <div style={{padding:"11px 13px",borderRadius:12,background:"rgba(255,255,255,.04)",border:"1px solid rgba(168,85,247,.12)"}}>
            <div style={{fontSize:9,color:"#6b7280",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:7}}>{activePalette.label}</div>
            <div style={{display:"flex",gap:5}}>
              {activePalette.colors.map((col,i)=>(
                <div key={i} style={{flex:1,height:24,borderRadius:6,background:col,boxShadow:`0 2px 8px ${col}44`}}/>
              ))}
            </div>
          </div>

          {/* Story excerpt */}
          <div style={{padding:"11px 13px",borderRadius:12,background:"rgba(255,255,255,.04)",border:"1px solid rgba(168,85,247,.12)"}}>
            <div style={{fontSize:9,color:"#6b7280",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:7}}>Story excerpt</div>
            <div style={{fontSize:11,color:"#c4b5fd",lineHeight:1.7,fontStyle:"italic"}}>
              "Once upon a time, <strong style={{color:"#FDE68A"}}>{heroName}</strong> discovered a secret only the bravest souls could find…"
            </div>
            <div style={{marginTop:8,display:"flex",flexWrap:"wrap",gap:4}}>
              {["12 pages","Illustrated","Printable"].map(tag=>(
                <div key={tag} style={{fontSize:9,padding:"2px 7px",borderRadius:7,background:"rgba(168,85,247,.1)",color:"#a78bfa",fontWeight:700,border:"1px solid rgba(168,85,247,.18)"}}>{tag}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bottom-cta">
        <button onClick={onNext} className="lift" style={{
          width:"100%",padding:"14px 0",borderRadius:14,border:"none",cursor:"pointer",
          fontSize:15,fontWeight:900,fontFamily:"'Fredoka One',cursive",
          background:"linear-gradient(135deg,#7c3aed 0%,#fbbf24 50%,#ec4899 100%)",
          color:"#1a0533",letterSpacing:.4,
        }}>Preview & Generate →</button>
      </div>
    </div>
  );
}

// ─── STEP 3 — PREVIEW & GENERATE ─────────────────────────────────────────────

function PreviewGenerate({ charData, storyData, onBack, generatedImages, onGenerate }) {
  const navigate = useNavigate();
  const [generating, setGenerating] = useState(false);
  const [generated,  setGenerated]  = useState(false);
  const [activeChar, setActiveChar] = useState(1);

  const { artStyle, palette, ageGroup, mood } = storyData;
  const activePalette = PALETTES.find(p=>p.id===palette)||PALETTES[0];
  const activeMood    = MOODS.find(m=>m.id===mood);
  const activeStyle   = ART_STYLES.find(s=>s.id===artStyle);
  const heroName      = charData[1].name||CHARS[0].name;
  const scene         = PREVIEW_SCENES[artStyle]?.scene || "✦";

  // Guard: all three characters must have a generated image (not loading, not missing)
  const allGenerated = CHARS.every(ch => {
    const img = generatedImages[ch.id];
    return img && img !== "loading";
  });

  const handleGenerate = () => {
    if (!allGenerated) return;
    setGenerating(true);
    setTimeout(() => {
      navigate("/generate", {
        state: {
          heroName,
          activeMood,
          activeStyle,
          activePalette,
          ageGroup,
          scene,
        },
      });
    }, 2500);
  };

  const progress = [
    { label:"Characters named",    done:Object.values(charData).every(d=>d.name.trim()) },
    { label:"Character previews",  done:allGenerated },
    { label:"Art style selected",  done:!!artStyle },
    { label:"Palette chosen",      done:!!palette  },
    { label:"Age group set",       done:!!ageGroup  },
    { label:"Mood selected",       done:!!mood      },
  ];
  const pct = Math.round((progress.filter(p=>p.done).length/progress.length)*100);

  return (
    <div className="preview-layout" style={{animation:"stepIn .3s ease"}}>

      {/* Col 1: Story cover */}
      <div>
        <div style={{fontSize:9,color:"#6b7280",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Story Cover</div>
        <div style={{borderRadius:18,overflow:"hidden",border:"1.5px solid rgba(168,85,247,.22)",boxShadow:"0 8px 28px rgba(0,0,0,.4)",marginBottom:14}}>
          <div style={{height:200,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6,
            background:`linear-gradient(135deg,${activePalette.colors[0]}66,${activePalette.colors[1]}44,${activePalette.colors[2]}66)`,position:"relative"}}>
            <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 25% 50%,rgba(255,255,255,.05) 1px,transparent 1px)",backgroundSize:"28px 28px"}}/>
            <span style={{fontSize:52,animation:"floatY 3.5s ease-in-out infinite",filter:"drop-shadow(0 4px 12px rgba(0,0,0,.5))",zIndex:1}}>{PREVIEW_SCENES[artStyle]?.scene||"✦"}</span>
            <div style={{zIndex:1,textAlign:"center"}}>
              <div style={{fontSize:9,color:"rgba(255,255,255,.5)",fontWeight:700,textTransform:"uppercase",letterSpacing:2}}>Story Weaver</div>
              <div style={{fontSize:18,fontFamily:"'Fredoka One',cursive",color:"#FDE68A",textShadow:"0 2px 10px rgba(0,0,0,.5)"}}>The Kingdom of {heroName}</div>
            </div>
            <div style={{position:"absolute",top:9,left:9,display:"flex",gap:5}}>
              <span style={{padding:"2px 8px",borderRadius:8,background:"rgba(0,0,0,.5)",backdropFilter:"blur(6px)",fontSize:8,fontWeight:700,color:"#FDE68A"}}>{activeStyle?.label}</span>
              <span style={{padding:"2px 8px",borderRadius:8,background:"rgba(0,0,0,.5)",backdropFilter:"blur(6px)",fontSize:8,fontWeight:700,color:"#C084FC"}}>{activeMood?.emoji} {activeMood?.label}</span>
            </div>
            <span style={{position:"absolute",top:9,right:9,padding:"2px 8px",borderRadius:8,background:"rgba(0,0,0,.5)",backdropFilter:"blur(6px)",fontSize:8,fontWeight:700,color:"#22D3EE"}}>{ageGroup}</span>
          </div>
          <div style={{padding:"12px 14px",background:"rgba(255,255,255,.05)",borderTop:"1px solid rgba(168,85,247,.12)"}}>
            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
              {["12 pages","Illustrated","Printable","Gift-ready"].map(tag=>(
                <div key={tag} style={{fontSize:9,padding:"3px 8px",borderRadius:7,background:"rgba(168,85,247,.1)",color:"#a78bfa",fontWeight:700,border:"1px solid rgba(168,85,247,.18)"}}>{tag}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Palette */}
        <div style={{display:"flex",gap:5,marginBottom:6}}>
          {activePalette.colors.map((col,i)=>(
            <div key={i} style={{flex:1,height:10,borderRadius:5,background:col,boxShadow:`0 2px 6px ${col}44`}}/>
          ))}
        </div>
        <div style={{fontSize:9,color:"#6b7280",textAlign:"right",marginBottom:14}}>{activePalette.label}</div>
      </div>

      {/* Col 2: Characters + checklist */}
      <div>
        <div style={{fontSize:9,color:"#6b7280",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Characters</div>
        <div className="char-cards-grid" style={{marginBottom:16}}>
          {CHARS.map(ch=>(
            <CharacterPreviewCard key={ch.id} charId={ch.id} charData={charData}
              isActive={activeChar===ch.id} onClick={()=>setActiveChar(ch.id)}
              artStyle={artStyle} palette={palette}
              generatedImages={generatedImages} onGenerate={onGenerate}/>
          ))}
        </div>

        {/* Checklist */}
        <div style={{padding:"14px",borderRadius:14,background:"rgba(255,255,255,.04)",border:"1px solid rgba(168,85,247,.12)"}}>
          <div style={{fontSize:10,fontWeight:800,color:"#a78bfa",textTransform:"uppercase",letterSpacing:.8,marginBottom:10}}>Checklist</div>
          {progress.map(item=>(
            <div key={item.label} style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}>
              <div style={{width:14,height:14,borderRadius:"50%",flexShrink:0,
                background:item.done?"#22D3EE":"rgba(255,255,255,.07)",
                border:item.done?"none":"1px solid rgba(255,255,255,.12)",
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:8,color:"#0f0620",fontWeight:900}}>
                {item.done?"✓":""}
              </div>
              <div style={{fontSize:11,color:item.done?"#e2d9f3":"#4b5563"}}>{item.label}</div>
            </div>
          ))}
          <div style={{marginTop:10,height:4,borderRadius:2,background:"rgba(255,255,255,.07)",overflow:"hidden"}}>
            <div style={{height:"100%",width:`${pct}%`,background:"linear-gradient(90deg,#7C3AED,#FBBF24,#22D3EE)",borderRadius:2,transition:"width .6s ease"}}/>
          </div>
          <div style={{textAlign:"right",fontSize:9,color:"#6b7280",marginTop:4,fontWeight:700}}>{pct}% complete</div>
        </div>
      </div>

      {/* Col 3: Generate CTA */}
      <div className="preview-checklist-col">
        <div style={{fontSize:9,color:"#6b7280",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Generate</div>

        {/* Lock notice when characters not yet generated */}
        {!allGenerated && (
          <div style={{
            padding:"10px 13px",borderRadius:12,marginBottom:10,
            background:"rgba(251,191,36,.06)",
            border:"1.5px solid rgba(251,191,36,.2)",
            display:"flex",alignItems:"center",gap:8,
          }}>
            <span style={{fontSize:13,flexShrink:0}}>◎</span>
            <div style={{fontSize:10,color:"#d97706",fontWeight:700,lineHeight:1.4}}>
              Generate a preview for all 3 characters first — this ensures visual consistency throughout your story.
            </div>
          </div>
        )}

        {!generated ? (
          <button
            onClick={handleGenerate}
            disabled={!allGenerated || generating}
            className={allGenerated && !generating ? "lift" : ""}
            style={{
              width:"100%",padding:"16px 0",borderRadius:16,border:"none",
              cursor: !allGenerated ? "not-allowed" : generating ? "wait" : "pointer",
              fontSize:16,fontWeight:900,fontFamily:"'Fredoka One',cursive",letterSpacing:.4,
              background: !allGenerated
                ? "rgba(255,255,255,.06)"
                : generating
                  ? "rgba(168,85,247,.2)"
                  : "linear-gradient(135deg,#7c3aed 0%,#fbbf24 50%,#ec4899 100%)",
              color: !allGenerated ? "#4b5563" : generating ? "#a78bfa" : "#1a0533",
              boxShadow: allGenerated && !generating
                ? "0 0 28px rgba(251,191,36,.28),0 0 56px rgba(168,85,247,.16)"
                : "none",
              display:"flex",alignItems:"center",justifyContent:"center",gap:9,
              marginBottom:10,
              opacity: !allGenerated ? 0.5 : 1,
              transition:"all .2s ease",
            }}>
            {generating ? (
              <>
                <div style={{width:16,height:16,border:"2px solid rgba(168,85,247,.3)",borderTopColor:"#a78bfa",borderRadius:"50%",animation:"spin 1s linear infinite"}}/>
                Crafting your story…
              </>
            ) : !allGenerated ? (
              "Generate all characters first"
            ) : (
              "Generate Story Book"
            )}
          </button>
        ):(
          <div style={{animation:"popIn .35s ease"}}>
            <div style={{padding:"20px",borderRadius:16,textAlign:"center",marginBottom:12,
              background:"linear-gradient(135deg,rgba(34,211,238,.1),rgba(168,85,247,.1))",
              border:"1.5px solid rgba(34,211,238,.25)"}}>
              <div style={{fontSize:32,marginBottom:7}}>✦</div>
              <div style={{fontSize:16,fontFamily:"'Fredoka One',cursive",color:"#FDE68A",marginBottom:4}}>Story Ready</div>
              <div style={{fontSize:11,color:"#9ca3af",lineHeight:1.6}}>"{heroName}" and friends are waiting for their adventure.</div>
            </div>
            <button className="lift" style={{width:"100%",padding:"14px 0",borderRadius:14,border:"none",cursor:"pointer",fontSize:14,fontWeight:900,fontFamily:"'Fredoka One',cursive",background:"linear-gradient(135deg,#7c3aed 0%,#fbbf24 50%,#ec4899 100%)",color:"#1a0533",marginBottom:10,display:"block"}}>
              Open My Book →
            </button>
            <div style={{display:"flex",gap:8}}>
              <button className="lift" style={{flex:1,padding:"11px 0",borderRadius:12,border:"1.5px solid rgba(34,211,238,.35)",background:"rgba(34,211,238,.08)",color:"#22D3EE",fontSize:11,fontWeight:800,cursor:"pointer",fontFamily:"'Fredoka One',cursive"}}>Preview</button>
              <button className="lift" style={{flex:1,padding:"11px 0",borderRadius:12,border:"1.5px solid rgba(168,85,247,.25)",background:"rgba(168,85,247,.07)",color:"#c4b5fd",fontSize:11,fontWeight:800,cursor:"pointer",fontFamily:"'Fredoka One',cursive"}}>Download PDF</button>
            </div>
          </div>
        )}

        {/* Story summary */}
        <div style={{padding:"13px",borderRadius:12,background:"rgba(255,255,255,.04)",border:"1px solid rgba(168,85,247,.12)",marginTop:12}}>
          <div style={{fontSize:9,color:"#6b7280",fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:9}}>Summary</div>
          {[
            { label:"Characters", val:CHARS.map(c=>charData[c.id].name||c.name).join(", ") },
            { label:"Art Style",  val:activeStyle?.label },
            { label:"Palette",    val:activePalette.label },
            { label:"Age",        val:ageGroup },
            { label:"Mood",       val:`${activeMood?.emoji} ${activeMood?.label}` },
          ].map(r=>(
            <div key={r.label} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:"1px solid rgba(168,85,247,.07)"}}>
              <span style={{fontSize:10,color:"#6b7280",fontWeight:700}}>{r.label}</span>
              <span style={{fontSize:10,color:"#e2d9f3",fontWeight:700}}>{r.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

//─── ROOT ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [step, setStep] = useState(1);
  const TOTAL = 3;

  const [charData, setCharData] = useState({
    1:{name:"Zara",skin:null,eyeColor:null,hairColor:null,gender:null,face:null,eyeShape:null,hairStyle:null,nose:null,mouth:null,extras:[]},
    2:{name:"Leo", skin:null,eyeColor:null,hairColor:null,gender:null,face:null,eyeShape:null,hairStyle:null,nose:null,mouth:null,extras:[]},
    3:{name:"Nova",skin:null,eyeColor:null,hairColor:null,gender:null,face:null,eyeShape:null,hairStyle:null,nose:null,mouth:null,extras:[]},
  });
  const [storyData, setStoryData] = useState({
    artStyle:"watercolor", palette:"royal", ageGroup:"6–8 yrs", mood:"brave",
  });
  const [generatedImages, setGeneratedImages] = useState({});

  // Invalidate all portraits when artStyle or palette changes in Step 1
  const handleStoryDataChange = (updater) => {
    setStoryData(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      const invalidated = next.artStyle !== prev.artStyle || next.palette !== prev.palette;
      if (invalidated) setGeneratedImages({});
      return next;
    });
  };

  const handleGenerateChar = (charId, genderId) => {
    setGeneratedImages(prev=>({...prev,[charId]:"loading"}));
    setTimeout(()=>{
      setGeneratedImages(prev=>({...prev,[charId]:generateImageForChar(charId,genderId)}));
    }, 1800);
  };

  return (
    <div className="app-shell">
      <GlobalStyle/>
      <BgOrbs/>
      <div style={{position:"relative",zIndex:10,display:"flex",flexDirection:"column",height:"100%",minHeight:0}}>
        <TopNav step={step} total={TOTAL} onBack={step>1?()=>setStep(s=>s-1):null}/>
        <div className="step-content">
          {/* Step 1 — Art Style + Colour Palette + Story Mood */}
          {step===1 && (
            <StyleMoodStep storyData={storyData} setStoryData={handleStoryDataChange}
              onNext={()=>setStep(2)}/>
          )}
          {/* Step 2 — Characters (portraits invalidated if Step 1 changes) */}
          {step===2 && (
            <CharacterEditor charData={charData} setCharData={setCharData}
              storyData={storyData}
              onNext={()=>setStep(3)} generatedImages={generatedImages} onGenerate={handleGenerateChar}/>
          )}
          {/* Step 3 — Age Group + Preview & Generate */}
          {step===3 && (
            <PreviewGenerate charData={charData} storyData={storyData} setStoryData={setStoryData}
              onBack={()=>setStep(2)} generatedImages={generatedImages} onGenerate={handleGenerateChar}/>
          )}
        </div>
      </div>
    </div>
  );
}