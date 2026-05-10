import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// ─── STORY PAGES (mock) ───────────────────────────────────────────────────────
const STORY_PAGES = [
  {
    id: 1,
    title: "The Kingdom Awakes",
    paragraph:
      "In a land where the sunrise painted the sky in shades of rose and amber, young Zara discovered something extraordinary beneath the oldest oak tree in the meadow. A tiny door, no bigger than her palm, shimmered with golden light — pulsing like a heartbeat, waiting just for her.",
    illustrationPrompt:
      "A young girl with curly hair kneeling beside a glowing magical door at the base of a giant oak tree, sunrise light filtering through leaves, watercolour style, soft warm tones",
    illustrationImg:
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=85",
    audioDuration: "0:42",
  },
  {
    id: 2,
    title: "The Guardian Speaks",
    paragraph:
      'From behind the tiny door crept Leo, a lion cub no bigger than a house cat, wearing a crown of wildflowers. "I have been waiting for the one who could see me," he said in a voice like distant thunder wrapped in velvet. "The kingdom needs a hero today."',
    illustrationPrompt:
      "A tiny lion cub wearing a flower crown standing in front of a glowing door, speaking to a child, magical forest setting, chibi-inspired, warm gold lighting",
    illustrationImg:
      "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&q=85",
    audioDuration: "0:38",
  },
  {
    id: 3,
    title: "The Enchanted Map",
    paragraph:
      "Nova the wise owl descended from the clouds, carrying an ancient scroll in her talons. The parchment unrolled to reveal a map of the hidden kingdom — mountains made of moonlight, rivers of crystallised starlight, and at the very centre, a palace built entirely from stories.",
    illustrationPrompt:
      "A majestic owl carrying a glowing ancient map scroll, descending from golden clouds above a fantastical kingdom visible below, painterly illustration style",
    illustrationImg:
      "https://images.unsplash.com/photo-1557401622-cfc0aa5d14d9?w=800&q=85",
    audioDuration: "0:45",
  },
  {
    id: 4,
    title: "The Bridge of Whispers",
    paragraph:
      "Crossing the Bridge of Whispers was not as frightening as it sounded. Each plank whispered a secret of the world — why clouds cry, how stars were born, and the reason fireflies carry their own lanterns. By the time Zara reached the other side, she felt a hundred years wiser.",
    illustrationPrompt:
      "A magical bridge made of moonbeams over a glittering river, a child and small lion crossing it, fireflies glowing around them, dreamy watercolour",
    illustrationImg:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=85",
    audioDuration: "0:51",
  },
  {
    id: 5,
    title: "The Heart of the Kingdom",
    paragraph:
      'The palace of stories rose before them, its towers made of thousands of glowing books, its windows shaped like open pages. Inside, every story ever told lived on — waiting for new readers to breathe life into them again. Zara placed her hand on the door. It was warm, like a hug. "Welcome home," it said.',
    illustrationPrompt:
      "A magnificent palace made entirely of glowing storybooks, its towers reaching the clouds, a small girl and lion standing before the grand entrance, golden magic swirling, epic painterly style",
    illustrationImg:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85",
    audioDuration: "0:58",
  },
];

const GEN_STAGES = [
  { msg: "Analysing manuscript structure…",    pct: 8,   icon: "◎" },
  { msg: "Conjuring the world of characters…", pct: 22,  icon: "✦" },
  { msg: "Designing consistent character art…",pct: 37,  icon: "◈" },
  { msg: "Painting enchanted scenes…",         pct: 52,  icon: "▶" },
  { msg: "Composing narrative voice…",         pct: 65,  icon: "◉" },
  { msg: "Weaving story pages together…",      pct: 76,  icon: "≋" },
  { msg: "Adding finishing magical touches…",  pct: 88,  icon: "✧" },
  { msg: "Binding the illustrated storybook…", pct: 95,  icon: "◑" },
  { msg: "Your storybook is ready!",           pct: 100, icon: "✦" },
];

const NARRATIONS = [
  "Once upon a time, in a world built from imagination…",
  "The AI has read 3,847 storybooks to learn its craft…",
  "Mixing watercolour pigments with digital starlight…",
  "Every brushstroke is placed with intention and wonder…",
  "Your characters are coming alive on the canvas…",
  "The story knows your child's name. It's been waiting.",
];

const CHARS_META = [
  { name: "Zara", emoji: "👸", color: "#C084FC" },
  { name: "Leo",  emoji: "🦁", color: "#FBBF24" },
  { name: "Nova", emoji: "🧙", color: "#22D3EE" },
];

// ─── GLOBAL STYLES — matching CustomizeStory.jsx exactly ─────────────────────
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
    @keyframes fadeIn  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
    @keyframes breathe { 0%,100%{transform:scale(1)} 50%{transform:scale(1.035)} }
    @keyframes pageReveal { from{opacity:0;transform:translateY(30px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
    @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:.45} }
    @keyframes goldSheen { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
    @keyframes scanline { 0%{transform:translateY(-10%)} 100%{transform:translateY(110%)} }
    @keyframes floatUp { 0%{transform:translateY(0) scale(1);opacity:.9} 100%{transform:translateY(-120px) scale(0.4);opacity:0} }

    ::-webkit-scrollbar { width:3px; height:3px; }
    ::-webkit-scrollbar-track { background:transparent; }
    ::-webkit-scrollbar-thumb { background:rgba(168,85,247,.3); border-radius:2px; }

    .chip:hover  { opacity:.85; transform:translateY(-1px); }
    .chip        { transition:all .15s ease; cursor:pointer; }
    .lift:hover  { transform:translateY(-2px); filter:brightness(1.06); }
    .lift        { transition:all .18s ease; cursor:pointer; }
    .page-card   { animation: pageReveal .6s cubic-bezier(.22,1,.36,1) both; }

    /* Shell identical to CustomizeStory */
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

    .step-content {
      flex: 1;
      display: flex;
      min-height: 0;
      overflow: hidden;
    }

    /* Generate screen: single scrolling column */
    .generate-layout {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
      overflow: hidden;
    }
    .generate-scroll {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 24px 24px 0;
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 1;
    }
    @media (max-width: 768px) {
      .generate-scroll { padding: 16px 16px 0; }
    }

    /* Story page card: two-col on wide */
    .story-page-inner {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      align-items: start;
    }
    @media (max-width: 860px) {
      .story-page-inner { grid-template-columns: 1fr; gap: 16px; }
    }

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

// ─── BG ORBS — identical to CustomizeStory ───────────────────────────────────
function BgOrbs() {
  return (
    <div style={{ position:"fixed",inset:0,pointerEvents:"none",zIndex:0 }}>
      <div style={{position:"absolute",top:"6%",left:"2%",width:"28vw",height:"28vw",maxWidth:380,maxHeight:380,borderRadius:"50%",background:"radial-gradient(circle,rgba(168,85,247,.14) 0%,transparent 70%)"}}/>
      <div style={{position:"absolute",top:"55%",right:"2%",width:"22vw",height:"22vw",maxWidth:300,maxHeight:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(251,191,36,.09) 0%,transparent 70%)"}}/>
      <div style={{position:"absolute",bottom:"8%",left:"30%",width:"18vw",height:"18vw",maxWidth:240,maxHeight:240,borderRadius:"50%",background:"radial-gradient(circle,rgba(34,211,238,.07) 0%,transparent 70%)"}}/>
    </div>
  );
}

// ─── FLOATING PARTICLES ───────────────────────────────────────────────────────
function Particles({ active }) {
  const particles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left:  `${8 + (i * 5.8) % 88}%`,
    delay: `${(i * 0.37) % 3.5}s`,
    dur:   `${3 + (i * 0.41) % 3}s`,
    size:  [10, 14, 18, 12, 16][i % 5],
    char:  ["✦","✧","⋆","◎","·","✦","⋆","◉"][i % 8],
    color: ["#FBBF24","#FDE68A","#C084FC","#FBBF24","#fff","#FDE68A"][i % 6],
  }));
  if (!active) return null;
  return (
    <div style={{ position:"fixed",inset:0,pointerEvents:"none",zIndex:5,overflow:"hidden" }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position:"absolute", bottom:"-20px", left:p.left,
          fontSize:p.size, color:p.color, opacity:.7,
          animation:`floatUp ${p.dur} ${p.delay} ease-out infinite`,
        }}>{p.char}</div>
      ))}
    </div>
  );
}

// ─── TOP NAV — identical pattern to CustomizeStory ────────────────────────────
function TopNav({ phase, onBack }) {
  const phaseLabel =
    phase === "queue"   ? "Waiting in Queue"        :
    phase === "loading" ? "Generating Storybook"    :
                          "Your Story";

  return (
    <div style={{
      flexShrink:0, zIndex:50,
      padding:"10px 24px",
      display:"flex", alignItems:"center", gap:16,
      borderBottom:"1px solid rgba(168,85,247,.15)",
      backdropFilter:"blur(16px)",
      background:"rgba(15,6,32,.8)",
    }}>
      {/* Back button — only on result phase */}
      {phase === "result" && onBack && (
        <button onClick={onBack} style={{
          width:34, height:34, borderRadius:"50%",
          background:"rgba(168,85,247,.1)", border:"1.5px solid rgba(168,85,247,.2)",
          color:"#c4b5fd", fontSize:15, cursor:"pointer", flexShrink:0,
          display:"flex", alignItems:"center", justifyContent:"center",
        }}>←</button>
      )}

      {/* Wordmark */}
      <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
        <div style={{
          width:28, height:28, borderRadius:8,
          background:"linear-gradient(135deg,#7c3aed,#fbbf24)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:14, fontWeight:900, color:"#1a0533", fontFamily:"'Fredoka One',cursive",
        }}>S</div>
        <div>
          <div style={{fontSize:10,color:"#6b7280",fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",lineHeight:1}}>Story</div>
          <div style={{fontSize:14,fontFamily:"'Fredoka One',cursive",color:"#FDE68A",lineHeight:1.1}}>Weaver</div>
        </div>
      </div>

      <div style={{ width:"1px", height:28, background:"rgba(168,85,247,.2)", flexShrink:0 }}/>

      {/* Phase label */}
      <div style={{ fontSize:13, fontWeight:800, color:"#c4b5fd", display:"flex", alignItems:"center", gap:6 }}>
        <span style={{ fontSize:10, color:"#6b7280", fontWeight:700 }}>Step 3/3</span>
        <span style={{ color:"rgba(168,85,247,.3)" }}>·</span>
        {phaseLabel}
      </div>

      {/* Progress bars */}
      <div style={{ flex:1, display:"flex", gap:4 }}>
        {[1,2,3].map((_,i)=>(
          <div key={i} style={{
            flex:1, height:3, borderRadius:2,
            background:"linear-gradient(90deg,#7c3aed,#fbbf24)",
            transition:"background .4s ease",
          }}/>
        ))}
      </div>

      {/* Phase pill */}
      {phase === "loading" && (
        <div style={{
          padding:"5px 12px", borderRadius:10,
          background:"rgba(168,85,247,.12)",
          border:"1px solid rgba(168,85,247,.25)",
          fontFamily:"'Nunito',sans-serif", fontSize:11, fontWeight:800, color:"#c4b5fd",
          animation:"pulse 2s ease-in-out infinite", flexShrink:0,
        }}>Generating…</div>
      )}
      {phase === "result" && (
        <div style={{
          padding:"5px 12px", borderRadius:10,
          background:"rgba(34,211,238,.1)",
          border:"1px solid rgba(34,211,238,.25)",
          fontFamily:"'Nunito',sans-serif", fontSize:11, fontWeight:800, color:"#22D3EE",
          flexShrink:0,
        }}>✓ Complete</div>
      )}
    </div>
  );
}

// ─── QUEUE CARD ───────────────────────────────────────────────────────────────
function QueueCard({ position = 3, waitSec = 7 }) {
  const [remaining, setRemaining] = useState(waitSec);
  useEffect(() => {
    if (remaining <= 0) return;
    const t = setInterval(() => setRemaining(r => r - 1), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      flex:1, display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      padding:32, animation:"fadeIn .6s ease",
    }}>
      <div style={{
        maxWidth:400, width:"100%",
        background:"rgba(255,255,255,.04)",
        border:"1.5px solid rgba(168,85,247,.2)",
        borderRadius:24, padding:"40px 36px",
        textAlign:"center", backdropFilter:"blur(16px)",
        boxShadow:"0 12px 48px rgba(0,0,0,.4)",
        animation:"popIn .4s ease",
      }}>
        <div style={{ fontSize:48, marginBottom:18, animation:"floatY 3s ease-in-out infinite" }}>⏳</div>
        <div style={{ fontFamily:"'Fredoka One',cursive", fontSize:26, color:"#FDE68A", marginBottom:8 }}>
          Almost Your Turn!
        </div>
        <div style={{ fontSize:13, color:"#9ca3af", marginBottom:28, lineHeight:1.7 }}>
          Our magical storytellers are busy creating wonders.<br/>
          Your storybook is queued and ready to begin.
        </div>

        {/* Queue badge */}
        <div style={{
          display:"inline-flex", alignItems:"center", gap:12,
          padding:"14px 28px", borderRadius:20,
          background:"linear-gradient(135deg,rgba(124,58,237,.3),rgba(251,191,36,.15))",
          border:"1.5px solid rgba(168,85,247,.35)",
          marginBottom:24,
        }}>
          <span style={{ fontFamily:"'Fredoka One',cursive", fontSize:38, fontWeight:900, color:"#FBBF24" }}>#{position}</span>
          <div style={{ textAlign:"left" }}>
            <div style={{ fontSize:10, fontWeight:800, color:"rgba(251,191,36,.8)", textTransform:"uppercase", letterSpacing:1 }}>in the queue</div>
            <div style={{ fontSize:13, fontWeight:700, color:"#f3e8ff" }}>{remaining}s remaining</div>
          </div>
        </div>

        {/* Mini progress */}
        <div style={{ height:4, borderRadius:3, background:"rgba(255,255,255,.08)", overflow:"hidden" }}>
          <div style={{
            height:"100%", borderRadius:3,
            background:"linear-gradient(90deg,#7C3AED,#FBBF24)",
            width:`${Math.max(0, 100 - (remaining / waitSec * 100))}%`,
            transition:"width 1s linear",
          }}/>
        </div>
        <div style={{ fontSize:11, color:"#6b7280", marginTop:10, fontWeight:700 }}>
          Starting automatically…
        </div>
      </div>
    </div>
  );
}

// ─── GENERATION LOADER ────────────────────────────────────────────────────────
function GenerationLoader({ stage, pct, narration, pagesReady, totalPages, timeLeft }) {
  const bar = Math.max(0, Math.min(100, pct));

  return (
    <div style={{
      flex:1, display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      padding:"32px 24px", animation:"fadeIn .6s ease",
    }}>
      {/* Central orb */}
      <div style={{
        position:"relative", width:160, height:160,
        display:"flex", alignItems:"center", justifyContent:"center",
        marginBottom:36, animation:"breathe 3s ease-in-out infinite",
      }}>
        {/* Rings */}
        <div style={{ position:"absolute", inset:0,    borderRadius:"50%", border:"2px solid rgba(251,191,36,.35)",   animation:"spin 8s linear infinite" }}/>
        <div style={{ position:"absolute", inset:12,   borderRadius:"50%", border:"1.5px solid rgba(124,58,237,.4)",  animation:"spin 5s linear infinite reverse" }}/>
        <div style={{ position:"absolute", inset:24,   borderRadius:"50%", border:"1px solid rgba(34,211,238,.45)",   animation:"spin 3s linear infinite" }}/>
        {/* Glow core */}
        <div style={{
          width:80, height:80, borderRadius:"50%",
          background:"radial-gradient(circle,rgba(251,191,36,.85) 0%,rgba(124,58,237,.7) 60%,transparent 100%)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:32,
          boxShadow:"0 0 40px rgba(251,191,36,.45), 0 0 80px rgba(124,58,237,.3)",
          animation:"breathe 2s ease-in-out infinite",
        }}>
          {GEN_STAGES[stage]?.icon || "✦"}
        </div>
        {/* Orbiting dots */}
        {[0,1,2,3].map(i => (
          <div key={i} style={{
            position:"absolute", top:"50%", left:"50%",
            width:8, height:8, borderRadius:"50%",
            background: i % 2 === 0 ? "#FBBF24" : "#C084FC",
            boxShadow: `0 0 8px ${i % 2 === 0 ? "#FBBF24" : "#C084FC"}`,
            transform:`rotate(${i * 90}deg) translateX(70px) translateY(-50%)`,
            animation:`spin ${3 + i * 0.5}s linear infinite`,
            transformOrigin:"0 50%",
          }}/>
        ))}
      </div>

      {/* Title */}
      <div style={{
        fontFamily:"'Fredoka One',cursive", fontSize:28,
        color:"#FDE68A", textAlign:"center",
        textShadow:"0 2px 20px rgba(251,191,36,.5)",
        marginBottom:10, lineHeight:1.2,
        animation:"floatY 4s ease-in-out infinite",
      }}>
        Crafting Your Storybook
      </div>

      {/* Narration */}
      <div key={narration} style={{
        fontFamily:"'Nunito',sans-serif", fontSize:14, fontWeight:600,
        color:"rgba(253,230,138,.65)", textAlign:"center",
        maxWidth:320, marginBottom:36,
        fontStyle:"italic", lineHeight:1.6,
        animation:"fadeIn .5s ease",
      }}>{narration}</div>

      {/* Progress bar */}
      <div style={{ width:"100%", maxWidth:400, marginBottom:10 }}>
        <div style={{
          height:8, borderRadius:10,
          background:"rgba(255,255,255,.08)",
          overflow:"hidden", position:"relative",
        }}>
          <div style={{
            position:"absolute", inset:0, right:`${100 - bar}%`,
            borderRadius:10,
            background:"linear-gradient(90deg,#7C3AED,#FBBF24,#22D3EE)",
            backgroundSize:"200% 100%",
            transition:"right .8s cubic-bezier(.4,0,.2,1)",
            animation:"goldSheen 2s linear infinite",
            boxShadow:"0 0 12px rgba(251,191,36,.6)",
          }}/>
          {/* Scanline */}
          <div style={{
            position:"absolute", top:0, bottom:0, width:40,
            background:"linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent)",
            animation:"scanline 1.8s linear infinite",
          }}/>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:8 }}>
          <span style={{
            fontFamily:"'Nunito',sans-serif", fontSize:11, fontWeight:800,
            color:"#a78bfa", letterSpacing:1, textTransform:"uppercase",
          }}>
            {GEN_STAGES[stage]?.msg || "Generating…"}
          </span>
          <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:11, fontWeight:700, color:"rgba(253,230,138,.6)" }}>
            {bar}%
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display:"flex", gap:12, marginTop:8, flexWrap:"wrap", justifyContent:"center" }}>
        {[
          { icon:"◎", label:"Pages built",    val:`${pagesReady} / ${totalPages}` },
          { icon:"⏱", label:"Time remaining", val:`~${timeLeft}s`                 },
          { icon:"✦", label:"Quality",         val:"Premium HD"                   },
        ].map(s => (
          <div key={s.label} style={{
            padding:"10px 18px", borderRadius:14,
            background:"rgba(255,255,255,.04)",
            border:"1px solid rgba(168,85,247,.13)",
            display:"flex", flexDirection:"column", alignItems:"center", gap:3,
          }}>
            <span style={{ fontSize:16, color:"#a78bfa" }}>{s.icon}</span>
            <span style={{ fontFamily:"'Fredoka One',cursive", fontSize:16, color:"#FDE68A" }}>{s.val}</span>
            <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:9, fontWeight:700, color:"#6b7280", textTransform:"uppercase", letterSpacing:1 }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Stage step pills */}
      <div style={{ marginTop:28, display:"flex", gap:5, flexWrap:"wrap", justifyContent:"center", maxWidth:380 }}>
        {GEN_STAGES.slice(0, -1).map((s, i) => (
          <div key={i} style={{
            width:28, height:4, borderRadius:3,
            background: i <= stage
              ? "linear-gradient(90deg,#7C3AED,#FBBF24)"
              : "rgba(255,255,255,.1)",
            transition:"background .5s ease",
            boxShadow: i <= stage ? "0 0 8px rgba(251,191,36,.4)" : "none",
          }}/>
        ))}
      </div>
    </div>
  );
}

// ─── COMPLETION BANNER ────────────────────────────────────────────────────────
function CompletionBanner({ pageCount, heroName }) {
  return (
    <div style={{
      marginBottom:24, borderRadius:20,
      background:"linear-gradient(135deg,rgba(124,58,237,.35),rgba(251,191,36,.18),rgba(34,211,238,.15))",
      border:"1.5px solid rgba(251,191,36,.3)",
      boxShadow:"0 8px 32px rgba(124,58,237,.2), 0 0 0 1px rgba(251,191,36,.12)",
      padding:"28px 28px",
      position:"relative", overflow:"hidden",
      animation:"popIn .6s cubic-bezier(.22,1,.36,1)",
    }}>
      {/* Shine */}
      <div style={{
        position:"absolute", top:0, left:"-100%", width:"60%", height:"100%",
        background:"linear-gradient(90deg,transparent,rgba(255,255,255,.06),transparent)",
        animation:"shimmer 3s ease-in-out infinite", backgroundSize:"300% 100%",
      }}/>
      <div style={{ position:"relative", zIndex:1, textAlign:"center" }}>
        <div style={{ fontSize:40, marginBottom:10, animation:"floatY 3s ease-in-out infinite" }}>✦</div>
        <div style={{ fontFamily:"'Fredoka One',cursive", fontSize:24, color:"#FDE68A", marginBottom:6, lineHeight:1.2 }}>
          Your Storybook Is Alive!
        </div>
        <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:13, color:"#9ca3af", lineHeight:1.7 }}>
          {heroName ? `"${heroName}" and friends are` : "Your characters are"} ready for their adventure.<br/>
          {pageCount} magical pages crafted just for you.
        </div>
        <div style={{ marginTop:16, display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap" }}>
          {[`◎ ${pageCount} Pages`, "◈ Illustrated", "◉ Narrated", "✦ Gift-ready"].map(t => (
            <div key={t} style={{
              padding:"5px 13px", borderRadius:10,
              background:"rgba(255,255,255,.07)",
              fontFamily:"'Nunito',sans-serif", fontSize:11, fontWeight:700,
              color:"#f3e8ff", border:"1px solid rgba(168,85,247,.18)",
            }}>{t}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ILLUSTRATION AREA ────────────────────────────────────────────────────────
function IllustrationArea({ page, rendered, onRender, rendering }) {
  return (
    <div style={{
      position:"relative", width:"100%",
      paddingTop:"60%",
      borderRadius:16, overflow:"hidden",
      background: rendered
        ? "#000"
        : "linear-gradient(135deg,rgba(124,58,237,.15),rgba(251,191,36,.06),rgba(124,58,237,.1))",
      border:"1.5px solid rgba(168,85,247,.13)",
      marginBottom:0,
    }}>
      {/* Rendered image */}
      {rendered && (
        <img
          src={page.illustrationImg}
          alt={page.title}
          style={{
            position:"absolute", inset:0, width:"100%", height:"100%",
            objectFit:"cover", objectPosition:"center",
            animation:"fadeIn .8s ease",
          }}
          onError={e => { e.target.style.display = "none"; }}
        />
      )}

      {/* Rendering overlay */}
      {rendering && !rendered && (
        <div style={{
          position:"absolute", inset:0,
          display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center",
          gap:12, background:"rgba(15,6,32,.8)",
        }}>
          <div style={{
            width:36, height:36, borderRadius:"50%",
            border:"2.5px solid rgba(168,85,247,.2)",
            borderTopColor:"#a78bfa",
            animation:"spin 1s linear infinite",
          }}/>
          <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:11, fontWeight:800, color:"#a78bfa", letterSpacing:1.2, textTransform:"uppercase", animation:"pulse 1.2s ease-in-out infinite" }}>
            Painting scene…
          </div>
        </div>
      )}

      {/* Unrendered placeholder */}
      {!rendered && !rendering && (
        <div style={{
          position:"absolute", inset:0,
          display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center",
          gap:14, padding:24,
        }}>
          {/* Grid texture */}
          <div style={{
            position:"absolute", inset:0,
            backgroundImage:`
              repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(168,85,247,.05) 28px,rgba(168,85,247,.05) 29px),
              repeating-linear-gradient(90deg,transparent,transparent 28px,rgba(168,85,247,.05) 28px,rgba(168,85,247,.05) 29px)
            `,
          }}/>
          <div style={{ position:"relative", zIndex:1, textAlign:"center", padding:"0 12px" }}>
            <div style={{ fontSize:28, marginBottom:10, animation:"floatY 4s ease-in-out infinite", color:"#a78bfa" }}>◈</div>
            <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:10, fontWeight:800, color:"#a78bfa", textTransform:"uppercase", letterSpacing:.8, marginBottom:7 }}>
              Scene Prompt
            </div>
            <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:11, fontWeight:600, color:"#6b7280", fontStyle:"italic", lineHeight:1.65 }}>
              {page.illustrationPrompt}
            </div>
          </div>
        </div>
      )}

      {/* Page badge */}
      <div style={{
        position:"absolute", top:10, left:10,
        padding:"3px 10px", borderRadius:8,
        background:"rgba(15,6,32,.75)", backdropFilter:"blur(12px)",
        fontFamily:"'Nunito',sans-serif", fontSize:9, fontWeight:800,
        color:"#FBBF24", letterSpacing:1.2, textTransform:"uppercase",
      }}>
        Page {page.id}
      </div>

      {/* Render button */}
      {!rendered && !rendering && (
        <button
          onClick={onRender}
          className="lift"
          style={{
            position:"absolute", bottom:12, right:12,
            padding:"8px 16px", borderRadius:12, border:"none", cursor:"pointer",
            background:"linear-gradient(135deg,#7C3AED,#FBBF24)",
            fontFamily:"'Fredoka One',cursive", fontSize:12,
            color:"#1a0533", letterSpacing:.4,
            boxShadow:"0 4px 20px rgba(124,58,237,.35)",
          }}>
          Render Scene ✦
        </button>
      )}

      {/* Rendered badge */}
      {rendered && (
        <div style={{
          position:"absolute", bottom:10, right:10,
          padding:"3px 10px", borderRadius:8,
          background:"rgba(34,211,238,.15)", backdropFilter:"blur(12px)",
          fontFamily:"'Nunito',sans-serif", fontSize:9, fontWeight:800,
          color:"#22D3EE", letterSpacing:1, border:"1px solid rgba(34,211,238,.25)",
        }}>
          ✦ Illustrated
        </div>
      )}
    </div>
  );
}

// ─── STORY PAGE CARD ──────────────────────────────────────────────────────────
function StoryPageCard({ page, index, renderedPages, renderingPages, onRenderPage, isFailed, isPreview }) {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const ch = CHARS_META[index % CHARS_META.length];

  const isRendered  = renderedPages.includes(page.id);
  const isRendering = renderingPages.includes(page.id);

  // Failed state — shown until user triggers a retry, then transitions to normal card
  if (isFailed && !isRendering && !isRendered) {
    return (
      <div className="page-card" style={{ animationDelay:`${index * 0.15}s`, marginBottom:20 }}>
        <div style={{
          background:"rgba(200,50,50,.08)",
          border:"1.5px solid rgba(200,50,50,.25)",
          borderRadius:16, padding:"24px",
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
            <div style={{
              width:36, height:36, borderRadius:"50%",
              background:"rgba(200,50,50,.15)",
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:18,
            }}>⚠</div>
            <div>
              <div style={{ fontFamily:"'Fredoka One',cursive", fontSize:16, color:"#ef4444", marginBottom:2 }}>
                Page {page.id} Could Not Be Completed
              </div>
              <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:12, color:"rgba(239,68,68,.7)" }}>
                The illustration pipeline encountered an issue for this scene.
              </div>
            </div>
          </div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            <button onClick={() => onRenderPage(page.id)} className="lift" style={{
              padding:"9px 18px", borderRadius:12, border:"none", cursor:"pointer",
              background:"linear-gradient(135deg,#dc2626,#ef4444)",
              fontFamily:"'Fredoka One',cursive", fontSize:12, color:"#fff",
            }}>↺ Retry Page</button>
            <button onClick={() => onRenderPage(page.id)} className="lift" style={{
              padding:"9px 18px", borderRadius:12, cursor:"pointer",
              background:"rgba(239,68,68,.08)",
              border:"1.5px solid rgba(239,68,68,.25)",
              fontFamily:"'Fredoka One',cursive", fontSize:12, color:"#ef4444",
            }}>⟳ Regenerate Missing Pages</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-card" style={{ animationDelay:`${index * 0.12}s`, marginBottom:20 }}>
      {/* Card wrapper — matching CustomizeStory SectionCard style but bigger */}
      <div style={{
        padding:"20px",
        borderRadius:16,
        background:"rgba(255,255,255,.04)",
        border:"1.5px solid rgba(168,85,247,.13)",
      }}>
        {/* Accent strip top */}
        <div style={{
          height:3, borderRadius:2,
          background:"linear-gradient(90deg,#7C3AED,#FBBF24,#22D3EE)",
          marginBottom:16, marginLeft:-20, marginRight:-20, marginTop:-20,
          borderRadius:"14px 14px 0 0",
        }}/>

        {/* Page header row */}
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
          {/* Page number badge */}
          <div style={{
            width:32, height:32, borderRadius:10,
            background:"linear-gradient(135deg,#7C3AED,#C084FC)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontFamily:"'Fredoka One',cursive", fontSize:14, color:"#FDE68A",
            flexShrink:0,
          }}>{page.id}</div>

          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontFamily:"'Fredoka One',cursive", fontSize:18, color:"#f3e8ff", lineHeight:1.2 }}>
              {page.title}
            </div>
          </div>

          {/* Character chip */}
          <div style={{
            display:"flex", alignItems:"center", gap:5,
            padding:"4px 10px", borderRadius:10,
            background:`${ch.color}15`,
            border:`1px solid ${ch.color}28`,
            flexShrink:0,
          }}>
            <span style={{ fontSize:13 }}>{ch.emoji}</span>
            <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:9, fontWeight:700, color:ch.color }}>
              {ch.name}
            </span>
          </div>

          {/* Audio button */}
          <button
            onClick={() => setAudioPlaying(v => !v)}
            title="Play narration"
            style={{
              width:34, height:34, borderRadius:"50%", border:"none", cursor:"pointer",
              background: audioPlaying
                ? "linear-gradient(135deg,#7C3AED,#C084FC)"
                : "rgba(168,85,247,.1)",
              border: audioPlaying ? "none" : "1.5px solid rgba(168,85,247,.2)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:13, flexShrink:0,
              color: audioPlaying ? "#FDE68A" : "#a78bfa",
              transition:"all .2s",
            }}>
            {audioPlaying ? "⏸" : "▶"}
          </button>
          {audioPlaying && (
            <div style={{
              fontFamily:"'Nunito',sans-serif", fontSize:9, color:"#6b7280", fontWeight:700,
              animation:"pulse 1.4s ease-in-out infinite", flexShrink:0,
            }}>
              ◉ {page.audioDuration}
            </div>
          )}
        </div>

        {/* Two-column layout: illustration | text */}
        <div className="story-page-inner">
          {/* Left: Illustration */}
          <IllustrationArea
            page={page}
            rendered={isRendered}
            rendering={isRendering}
            onRender={() => onRenderPage(page.id)}
          />

          {/* Right: Story content */}
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {/* Story paragraph */}
            <p style={{
              fontFamily:"'Nunito',sans-serif", fontSize:14, lineHeight:1.85,
              color:"#e2d9f3", fontWeight:500,
            }}>
              {page.paragraph}
            </p>

            {/* Scene prompt — only visible in preview/sidebar context */}
            {isPreview && (
              <div style={{
                padding:"10px 13px", borderRadius:12,
                background:"rgba(255,255,255,.04)",
                border:"1px solid rgba(168,85,247,.12)",
              }}>
                <div style={{ fontSize:9, fontWeight:800, color:"#a78bfa", textTransform:"uppercase", letterSpacing:.8, marginBottom:5 }}>
                  Scene Prompt
                </div>
                <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:11, color:"#6b7280", fontStyle:"italic", lineHeight:1.6 }}>
                  {page.illustrationPrompt}
                </div>
              </div>
            )}

            {/* Rendered status */}
            {isRendered && (
              <div style={{
                display:"flex", alignItems:"center", gap:7,
                padding:"7px 12px", borderRadius:10,
                background:"rgba(34,211,238,.08)",
                border:"1px solid rgba(34,211,238,.2)",
              }}>
                <span style={{ fontSize:12, color:"#22D3EE" }}>✦</span>
                <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:10, fontWeight:800, color:"#22D3EE" }}>Scene rendered</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── BOTTOM ACTION BAR ────────────────────────────────────────────────────────
function ActionBar({ onBack, onFinish, allPagesVisible }) {
  return (
    <div className="bottom-cta">
      <div style={{ display:"flex", gap:10, alignItems:"center" }}>
        <button
          onClick={onBack}
          className="lift"
          style={{
            padding:"13px 20px", borderRadius:14, cursor:"pointer",
            border:"1.5px solid rgba(168,85,247,.2)",
            background:"rgba(168,85,247,.07)",
            fontFamily:"'Fredoka One',cursive", fontSize:13,
            color:"#c4b5fd", letterSpacing:.3, flexShrink:0,
          }}>
          ← Back
        </button>

        <button
          onClick={onFinish}
          disabled={!allPagesVisible}
          className={allPagesVisible ? "lift" : ""}
          style={{
            flex:1, padding:"14px 24px", borderRadius:14, border:"none",
            cursor: allPagesVisible ? "pointer" : "not-allowed",
            background: allPagesVisible
              ? "linear-gradient(135deg,#7c3aed 0%,#fbbf24 50%,#ec4899 100%)"
              : "rgba(255,255,255,.06)",
            fontFamily:"'Fredoka One',cursive", fontSize:15, fontWeight:900,
            color: allPagesVisible ? "#1a0533" : "#4b5563",
            letterSpacing:.4,
            boxShadow: allPagesVisible
              ? "0 0 28px rgba(251,191,36,.28),0 0 56px rgba(168,85,247,.16)"
              : "none",
            opacity: allPagesVisible ? 1 : 0.5,
            transition:"all .2s ease",
          }}>
          {allPagesVisible ? "Final Review & Complete →" : "Generating pages…"}
        </button>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function GenerateIllustratedStory({
  onBack      = () => {},
  onFinish    = () => {},
  queueMode   = false,
  failedPageId = 4,
}) {
  // ── Router state ───────────────────────────────────────────────────────────
  const location = useLocation();
  const {
    heroName,
    activeMood,
    activeStyle,
    activePalette,
    ageGroup,
    scene,
  } = location.state || {};

  // ── Phase: "queue" → "loading" → "result" ─────────────────────────────────
  const [phase,        setPhase]        = useState(queueMode ? "queue" : "loading");
  const [genStage,     setGenStage]     = useState(0);
  const [genPct,       setGenPct]       = useState(0);
  const [narrationIdx, setNarIdx]       = useState(0);
  const [pagesReady,   setPagesReady]   = useState(0);
  const [timeLeft,     setTimeLeft]     = useState(28);

  const [visiblePages,   setVisiblePages]   = useState([]);
  const [renderedPages,  setRenderedPages]  = useState([]);
  const [renderingPages, setRenderingPages] = useState([]);

  const scrollRef = useRef(null);

  // ── Queue → loading ────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "queue") return;
    const t = setTimeout(() => setPhase("loading"), 7000);
    return () => clearTimeout(t);
  }, [phase]);

  // ── Loading sequence ───────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "loading") return;

    const TOTAL_MS   = 26000;
    const stageTimes = [0, 3000, 6000, 9500, 12500, 15500, 18500, 21500, 24000];

    const stageTimers = stageTimes.map((t, i) =>
      setTimeout(() => {
        setGenStage(i);
        setGenPct(GEN_STAGES[i].pct);
        setPagesReady(Math.floor((i / stageTimes.length) * STORY_PAGES.length));
      }, t)
    );

    const narTimer  = setInterval(() => setNarIdx(n => (n + 1) % NARRATIONS.length), 3800);
    const countdown = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000);
    const doneTimer = setTimeout(() => {
      clearInterval(narTimer);
      clearInterval(countdown);
      setPhase("result");
    }, TOTAL_MS);

    return () => {
      stageTimers.forEach(clearTimeout);
      clearInterval(narTimer);
      clearInterval(countdown);
      clearTimeout(doneTimer);
    };
  }, [phase]);

  // ── Progressive page reveal ────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "result") return;
    const ids = STORY_PAGES.map(p => p.id);
    const timers = ids.map((id, i) =>
      setTimeout(() => {
        setVisiblePages(prev => [...prev, id]);
        setTimeout(() => {
          scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior:"smooth" });
        }, 100);
      }, i * 900)
    );
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  // ── Render handler ─────────────────────────────────────────────────────────
  const handleRenderPage = (pageId) => {
    if (renderingPages.includes(pageId) || renderedPages.includes(pageId)) return;
    setRenderingPages(r => [...r, pageId]);
    setTimeout(() => {
      setRenderingPages(r => r.filter(id => id !== pageId));
      setRenderedPages(r => [...r, pageId]);
    }, 2200);
  };

  const allPagesVisible = visiblePages.length === STORY_PAGES.length;

  // ── Story summary for sidebar (derived from location.state) ────────────────
  const summaryRows = [
    { label:"Hero",      val: heroName      || "—"                                           },
    { label:"Mood",      val: activeMood    ? `${activeMood.emoji} ${activeMood.label}` : "—" },
    { label:"Art Style", val: activeStyle   ? activeStyle.label  : "—"                       },
    { label:"Palette",   val: activePalette ? activePalette.label : "—"                      },
    { label:"Age Group", val: ageGroup      || "—"                                           },
  ];

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="app-shell">
      <GlobalStyle/>
      <BgOrbs/>
      <Particles active={phase === "loading"}/>

      <div style={{ position:"relative", zIndex:10, display:"flex", flexDirection:"column", height:"100%", minHeight:0 }}>
        <TopNav phase={phase} onBack={onBack}/>

        <div className="step-content">
          <div className="generate-layout">

            {/* ── Queue phase ── */}
            {phase === "queue" && <QueueCard position={3} waitSec={7}/>}

            {/* ── Loading phase ── */}
            {phase === "loading" && (
              <GenerationLoader
                stage={genStage}
                pct={genPct}
                narration={NARRATIONS[narrationIdx]}
                pagesReady={pagesReady}
                totalPages={STORY_PAGES.length}
                timeLeft={timeLeft}
              />
            )}

            {/* ── Result phase ── */}
            {phase === "result" && (
              <>
                <div ref={scrollRef} className="generate-scroll">

                  {/* Completion banner */}
                  {allPagesVisible && (
                    <CompletionBanner pageCount={STORY_PAGES.length} heroName={heroName}/>
                  )}

                  {/* Story summary strip — uses location.state data */}
                  <div style={{
                    marginBottom:20,
                    padding:"13px 16px",
                    borderRadius:14,
                    background:"rgba(255,255,255,.04)",
                    border:"1px solid rgba(168,85,247,.12)",
                    display:"flex", gap:20, flexWrap:"wrap", alignItems:"center",
                  }}>
                    <div style={{ fontSize:9, fontWeight:800, color:"#a78bfa", textTransform:"uppercase", letterSpacing:1, flexShrink:0 }}>
                      Story Summary
                    </div>
                    {summaryRows.map(r => (
                      <div key={r.label} style={{ display:"flex", flexDirection:"column", gap:1 }}>
                        <span style={{ fontSize:9, color:"#6b7280", fontWeight:700, textTransform:"uppercase", letterSpacing:.7 }}>{r.label}</span>
                        <span style={{ fontSize:11, color:"#e2d9f3", fontWeight:700, fontFamily:"'Fredoka One',cursive" }}>{r.val}</span>
                      </div>
                    ))}
                    {scene && (
                      <div style={{ display:"flex", flexDirection:"column", gap:1 }}>
                        <span style={{ fontSize:9, color:"#6b7280", fontWeight:700, textTransform:"uppercase", letterSpacing:.7 }}>Scene</span>
                        <span style={{ fontSize:11, color:"#e2d9f3", fontWeight:700, fontFamily:"'Fredoka One',cursive" }}>{scene}</span>
                      </div>
                    )}
                  </div>

                  {/* Pages */}
                  {STORY_PAGES.map((page, i) => {
                    if (!visiblePages.includes(page.id)) return null;
                    return (
                      <StoryPageCard
                        key={page.id}
                        page={page}
                        index={i}
                        renderedPages={renderedPages}
                        renderingPages={renderingPages}
                        onRenderPage={handleRenderPage}
                        isFailed={page.id === failedPageId}
                        isPreview={false}   // scene prompt hidden on generated pages
                      />
                    );
                  })}

                  {/* Streaming indicator */}
                  {!allPagesVisible && (
                    <div style={{
                      display:"flex", alignItems:"center", justifyContent:"center",
                      gap:10, padding:"28px 0",
                      animation:"pulse 1.5s ease-in-out infinite",
                    }}>
                      <div style={{
                        width:14, height:14, borderRadius:"50%",
                        border:"2px solid rgba(168,85,247,.2)",
                        borderTopColor:"#a78bfa",
                        animation:"spin 1s linear infinite",
                      }}/>
                      <div style={{
                        fontFamily:"'Nunito',sans-serif", fontSize:11, fontWeight:800,
                        color:"rgba(167,139,250,.6)", letterSpacing:1, textTransform:"uppercase",
                      }}>
                        Building page {visiblePages.length + 1} of {STORY_PAGES.length}…
                      </div>
                    </div>
                  )}

                  <div style={{ height:120 }}/>
                </div>

                {/* Action bar */}
                <ActionBar
                  onBack={onBack}
                  onFinish={onFinish}
                  allPagesVisible={allPagesVisible}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}