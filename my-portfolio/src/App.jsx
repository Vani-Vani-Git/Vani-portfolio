import React, { useState, useEffect, useRef } from "react";
import DOLL_WAVE from "./assets/doll-wave.mp4";
import DOLL_DESK from "./assets/doll-desk.png";
import DOLL_STUDY from "./assets/doll-study.png";

import Slide1 from "./assets/1st image.png";
import Slide2 from "./assets/2nd image.png";
import Slide3 from "./assets/3rd image.png";
import Slide4 from "./assets/4th image.png";
import Slide5 from "./assets/5th image.png";
import EXPERIENCE_DOLL from "./assets/experience-doll.png";
import CONTACT_DOLL from "./assets/contact-doll.png";
import TRACK_DOLL from "./assets/track-doll.png";
/* =========================================================================
   EMBEDDED ASSETS (base64) — self-contained, no external files needed.
   Swap these for real files (e.g. /assets/doll-wave.jpg) if you move this
   into a bundled project like Vite — that will make the source much smaller.
   ========================================================================= */
/*const DOLL_WAVE = "./assets/doll-wave.jpg";
const DOLL_DESK = "./assets/doll-desk.jpg";
const DOLL_PORTRAIT = "./assets/doll-portrait.webp";
const Slide1 = "./assets/1st image.png";
const Slide2 = "./assets/2nd image.png";
const Slide3 = "./assets/3rd image.png";
const Slide4 = "./assets/4th image.png";
const Slide5 = "./assets/5th image.png";*/
const ICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const SKILLS = [
  { cat: "Languages", items: [
    ["Java (OOP)", `${ICON_BASE}/java/java-original.svg`],
    ["Python", `${ICON_BASE}/python/python-original.svg`],
    ["Dart", `${ICON_BASE}/dart/dart-original.svg`],
    ["SQL", `${ICON_BASE}/mysql/mysql-original.svg`],
  ]},
  { cat: "Backend", items: [
    ["Spring Boot", `${ICON_BASE}/spring/spring-original.svg`],
    ["REST APIs", `${ICON_BASE}/postman/postman-original.svg`],
    ["JUnit", `${ICON_BASE}/junit/junit-original.svg`],
  ]},
  { cat: "Frontend", items: [
    ["React", `${ICON_BASE}/react/react-original.svg`],
    ["Flutter", `${ICON_BASE}/flutter/flutter-original.svg`],
    ["HTML", `${ICON_BASE}/html5/html5-original.svg`],
    ["CSS", `${ICON_BASE}/css3/css3-original.svg`],
  ]},
  { cat: "Data", items: [
    ["MySQL", `${ICON_BASE}/mysql/mysql-original.svg`],
    ["MongoDB", `${ICON_BASE}/mongodb/mongodb-original.svg`],
    ["Schema Design", `${ICON_BASE}/mysql/mysql-original.svg`],
  ]},
  { cat: "Cloud & DevOps", items: [
    ["AWS Fundamentals", `${ICON_BASE}/amazonwebservices/amazonwebservices-original-wordmark.svg`],
    ["Git / GitHub", `${ICON_BASE}/github/github-original.svg`],
    ["CI/CD", `${ICON_BASE}/githubactions/githubactions-original.svg`],
    ["Agile", `${ICON_BASE}/jira/jira-original.svg`],
    ["n8n", "n8n"],
  ]},
  { cat: "Tools", items: [
    ["IntelliJ IDEA", `${ICON_BASE}/intellij/intellij-original.svg`],
    ["Eclipse", `${ICON_BASE}/eclipse/eclipse-original.svg`],
    ["VS Code", `${ICON_BASE}/vscode/vscode-original.svg`],
    ["PyCharm", `${ICON_BASE}/pycharm/pycharm-original.svg`],
  ]},
];

const EXPERIENCE = [
  {
    year: "2025",
    title: "Advanced Software Engineering — Virtual Simulation",
    org: "Walmart Global Tech, via Forage",
    points: [
      "Completed a competitive, invite-based enterprise simulation covering system design, data structures, and software architecture at retail scale.",
      "Applied OOP principles to design modular, scalable solutions — deliverables reviewed against real Walmart engineering standards.",
    ],
  },
  {
    year: "2023",
    title: "Software Development Intern",
    org: "KV Technology Services, Madurai",
    points: [
      "Delivered 3 SQL-integrated software modules from spec to tested build within a 10-day sprint, on time and within scope.",
      "Owned solution design, task estimation, and code review participation across the SDLC.",
      "Wrote and modified SQL scripts to create and update database objects in MySQL.",
    ],
  },
];

const PROJECTS = [
  {
    flagship: true,
    tag: "Flagship · Live in Production",
    title: "Indian Sign Language Translator",
    desc: "End-to-end ML pipeline for ISL recognition — data collection, preprocessing, model training and a live React frontend, translating sign to text & speech in real time.",
    stack: ["Python", "MediaPipe", "LSTM", "React"],
    link: "https://islconnect.vercel.app",
    linkLabel: "islconnect.vercel.app",
    stats: [
      { n: "100%", l: "Validation accuracy" },
      { n: "50", l: "Sign / word classes" },
      { n: "126", l: "Keypoints per frame" },
    ],
  },
  {
    tag: "Biometric Systems",
    title: "Iris Recognition Attendance",
    desc: "Spring Boot app automating attendance for 60+ students via iris biometrics — eliminating roll-call and preventing proxy attendance.",
    stack: ["Java", "Spring Boot", "MySQL"],
  },
  {
    tag: "Security",
    title: "TOTP Authentication System",
    desc: "Secure two-factor auth with OTP generation, verification and JWT-backed sessions, plus a responsive Flutter interface.",
    stack: ["Flutter", "Spring Boot", "JWT", "MySQL"],
    link: "https://totp-authentication.vercel.app/",
    linkLabel: "Live demo",
  },
  {
    tag: "Full-Stack",
    title: "Library Management System",
    desc: "Inventory, accounts and borrowing workflows on a hand-designed MySQL schema, with JUnit coverage on core operations.",
    stack: ["Java", "Spring Boot", "MySQL", "JUnit"],
  },
  {
    tag: "Education Tooling",
    title: "DSA Algorithm Visualization Platform",
    desc: "Interactive visualizer & code-generation tool for 20+ algorithms — sorting, graphs, trees, heaps, shortest-path and MST — from Figma to Flutter.",
    stack: ["Flutter", "Dart", "Figma"],
  },
];

const CERTS = [
  { title: "Object-Oriented System Development using UML, Java & Patterns", sub: "NPTEL · IIT Madras", year: "2025" },
  { title: "C++ Programming", sub: "Spoken Tutorial Project · IIT Bombay", year: "2023" },
  { title: "Machine Learning Using Python — Workshop", sub: "PSNA College of Engineering & Technology", year: "2023" },
];

const EDU = [
  { title: "Master of Computer Applications (MCA)", sub: "PSNA College of Engineering and Technology · CGPA 83%", year: "2024–26" },
  { title: "Bachelor of Computer Applications (BCA)", sub: "The American College · CGPA 85%", year: "2020–23" },
];

const ACHIEVEMENTS = [
  { n: "01", text: <>Designed, trained and deployed a live ML accessibility app — <a href="https://islconnect.vercel.app" target="_blank" rel="noreferrer">islconnect.vercel.app</a> — used by real visitors, not a local demo.</> },
  { n: "02", text: "Top-percentile academic run: 83% in MCA, 85% in BCA, across 5+ years of formal CS education." },
  { n: "03", text: "Selected for and completed Walmart Global Tech's Advanced Software Engineering simulation — system design & DSA at retail scale." },
  { n: "04", text: "Shipped 4 independent full-stack / ML projects across Java, Python and Flutter, each taken from design through to a working build." },
];

// Hero image stack — cycles through these on each "Know More" click.
// Swap `src` for real project screenshots any time; add more objects to
// extend the sequence past 2 slides.
const HERO_SLIDES = [
  { src: Slide1, label: "Myself", target: "about" },
  { src: Slide2, label: "Education", target: "certifications-education" },
  { src: Slide3, label: "Technologies", target: "skills" },
  { src: Slide4, label: "Projects", target: "projects" },
  { src: Slide5, label: "Let's Work", target: "contact" },
];

/* ---------------- GLOBAL STYLES ---------------- */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,450;0,9..144,600;0,9..144,700;1,9..144,500&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

:root{
  --ink:#07111F; --ink-2:#0B1A2D; --panel:#10243A; --panel-line:#23405C;
  --maroon:#8B2635; --maroon-bright:#C23B55; --scan:#55E6D1; --scan-dim:#2E8F87;
  --parchment:#F4F7FB; --muted:#A9B8C9; --muted-2:#70849A;
}
/* Neutralize any leftover Vite/CRA scaffold CSS (default #root max-width,
   centered flex body, etc.) so the site can go fully edge-to-edge. */
html, body{
  margin:0!important; padding:0!important; width:100%!important; min-width:0!important;
  min-height:100vh!important; display:block!important; place-items:normal!important;
  background:#0F0F16!important;
}
#root, #root > div{
  max-width:none!important; width:100%!important; margin:0!important; padding:0!important; text-align:left!important;
}
.vp-root *{ box-sizing:border-box; }
.vp-root > *{ position:relative; z-index:1; }
.vp-root{
  background:
    radial-gradient(circle at 12% 16%, rgba(78,145,255,.13) 0 1px, transparent 2px),
    radial-gradient(circle at 30% 68%, rgba(85,230,209,.09) 0 1px, transparent 2px),
    radial-gradient(circle at 62% 28%, rgba(130,190,255,.10) 0 1px, transparent 2px),
    radial-gradient(circle at 86% 56%, rgba(85,230,209,.09) 0 1px, transparent 2px),
    radial-gradient(circle at 72% 88%, rgba(78,145,255,.09) 0 1px, transparent 2px),
    linear-gradient(135deg, #050C18 0%, #071426 48%, #0A1C31 100%); color:var(--parchment); font-family:'Space Grotesk', sans-serif;
  overflow-x:hidden; position:relative; width:100%; min-height:100vh;
}
.vp-root::before{
  content:'';
  position:fixed;
  inset:0;
  pointer-events:none;
  z-index:0;
  opacity:.55;
  background-image:
    radial-gradient(circle, rgba(125,190,255,.75) 0 1px, transparent 1.7px),
    radial-gradient(circle, rgba(85,230,209,.60) 0 1px, transparent 1.7px),
    radial-gradient(circle, rgba(255,255,255,.42) 0 .8px, transparent 1.5px);
  background-size: 137px 149px, 211px 193px, 173px 181px;
  background-position: 10px 20px, 70px 80px, 130px 35px;
  animation:sparkleDrift 16s linear infinite;
}
@keyframes sparkleDrift{
  0%{ transform:translate3d(0,0,0); opacity:.42; }
  50%{ transform:translate3d(-8px,5px,0); opacity:.68; }
  100%{ transform:translate3d(0,0,0); opacity:.42; }
}
.vp-root ::selection{ background:var(--maroon); color:var(--parchment); }
.vp-root h1,.vp-root h2,.vp-root h3,.vp-root h4{ font-family:'Fraunces', serif; font-weight:600; margin:0; letter-spacing:-0.01em; }
.mono{ font-family:'JetBrains Mono', monospace; }
.vp-root a{ color:inherit; text-decoration:none; }
.vp-root button{ font-family:inherit; cursor:pointer; }
.container{ max-width:min(1680px, 94vw); margin:0 auto; padding:0 40px; }
.eyebrow{
  font-family:'JetBrains Mono', monospace; font-size:12px; letter-spacing:0.18em; text-transform:uppercase;
  color:var(--scan); display:flex; align-items:center; gap:10px; margin-bottom:18px;
}
.eyebrow::before{ content:''; width:22px; height:1px; background:var(--scan); display:inline-block; }

@media (prefers-reduced-motion: reduce){
  .vp-root::before{ animation:none !important; }
  .vp-root *{ animation-duration:0.01ms !important; animation-iteration-count:1 !important; transition-duration:0.01ms !important; }
}

/* LOADER */
#loader{
  position:fixed; inset:0; z-index:999;
  background:
    radial-gradient(circle at 20% 20%, rgba(85,230,209,.12) 0 1px, transparent 2px),
    radial-gradient(circle at 80% 30%, rgba(125,190,255,.12) 0 1px, transparent 2px),
    radial-gradient(circle at 55% 75%, rgba(255,255,255,.08) 0 1px, transparent 2px),
    linear-gradient(135deg,#050C18,#0A1C31);
  display:flex; align-items:center; justify-content:center; flex-direction:column;
  transition:opacity .9s ease, visibility .9s ease;
}
#loader.hide{ opacity:0; visibility:hidden; pointer-events:none; }
.loader-stage{ position:relative; width:220px; height:220px; display:flex; align-items:flex-end; justify-content:center; }
.doll-wrap{ position:relative; width:190px; animation: dollFloat 2.6s ease-in-out infinite; filter:drop-shadow(0 18px 24px rgba(0,0,0,0.55)); }
.doll-wrap img{ width:100%; display:block; border-radius:10px; }
.doll-wave-video{
  width:100%;
  display:block;
  border-radius:10px;
  object-fit:contain;
  background:transparent;
}
@keyframes dollFloat{ 0%,100%{ transform:translateY(0) rotate(-1.2deg); } 50%{ transform:translateY(-10px) rotate(1.2deg); } }
.doll-ground-shadow{
  position:absolute; bottom:-6px; left:50%; transform:translateX(-50%); width:120px; height:16px; border-radius:50%;
  background:radial-gradient(ellipse, rgba(0,0,0,0.55) 0%, transparent 72%); animation: shadowPulse 2.6s ease-in-out infinite;
}
@keyframes shadowPulse{ 0%,100%{ transform:translateX(-50%) scale(1); opacity:0.6; } 50%{ transform:translateX(-50%) scale(0.82); opacity:0.35; } }
.speech-bubble{
  position:absolute; top:-6px; right:-58px; background:var(--parchment); color:var(--ink);
  font-family:'Fraunces', serif; font-weight:600; font-size:15px; padding:8px 14px; border-radius:16px 16px 16px 4px;
  opacity:0; transform:scale(0.6) translateY(6px); white-space:nowrap;
}
.speech-bubble.show{ animation: bubblePop .5s cubic-bezier(.34,1.56,.64,1) forwards; }
@keyframes bubblePop{ 0%{ opacity:0; transform:scale(0.5) translateY(10px); } 70%{ opacity:1; transform:scale(1.08) translateY(-2px); } 100%{ opacity:1; transform:scale(1) translateY(0); } }
.loader-name{ margin-top:34px; font-family:'JetBrains Mono', monospace; font-size:13px; letter-spacing:0.14em; text-transform:uppercase; color:var(--muted); min-height:18px; }
.loader-name .cursor{ display:inline-block; width:7px; height:14px; background:var(--scan); margin-left:2px; vertical-align:middle; animation:blink 0.9s steps(1) infinite; }
@keyframes blink{ 50%{ opacity:0; } }
.scan-bar{ width:220px; height:2px; margin-top:22px; background:var(--panel-line); position:relative; overflow:hidden; border-radius:2px; }
.scan-bar-fill{ position:absolute; left:0; top:0; height:100%; background:linear-gradient(90deg, var(--scan-dim), var(--scan)); width:0%; transition:width .25s linear; }
.scan-pct{ margin-top:10px; font-family:'JetBrains Mono', monospace; font-size:11px; color:var(--muted-2); letter-spacing:0.1em; }

#iris-wipe{ position:fixed; inset:0; z-index:998; pointer-events:none; background:#071426; clip-path:circle(0% at 50% 50%); }
#iris-wipe.open{ clip-path:circle(150% at 50% 50%); transition:clip-path 1.1s cubic-bezier(.76,0,.24,1); }

/* NAV */
header.nav{ position:fixed; top:0; left:0; right:0; z-index:120; backdrop-filter:blur(10px); background:rgba(15,15,22,0.72); border-bottom:1px solid var(--panel-line); }
.nav-inner{ max-width:min(1680px, 94vw); margin:0 auto; padding:0 40px; height:68px; display:flex; align-items:center; justify-content:space-between; }
.brand{ font-family:'Fraunces', serif; font-weight:700; font-size:20px; }
.brand span{ color:var(--scan); }
.nav-links{ display:flex; gap:34px; }
.nav-links a{ font-size:13px; letter-spacing:0.06em; text-transform:uppercase; font-family:'JetBrains Mono', monospace; color:var(--muted); position:relative; padding-bottom:4px; }
.nav-links a:hover{ color:var(--parchment); }
.nav-cta{ border:1px solid var(--maroon-bright); color:var(--parchment); background:transparent; padding:9px 18px; font-size:12px; letter-spacing:0.08em; text-transform:uppercase; font-family:'JetBrains Mono', monospace; transition:background .25s ease, color .25s ease; }
.nav-cta:hover{ background:var(--maroon-bright); }
@media (max-width:860px){ .nav-links{ display:none; } }

/* HERO */
.hero{ position:relative; min-height:100vh; display:flex; align-items:center; padding-top:68px; overflow:hidden; }
.hero-grid{ position:relative; z-index:2; width:100%; display:grid; grid-template-columns:0.9fr 1.1fr; gap:24px; align-items:center; }

/* HERO IMAGE STACK — full image, wide layout, white background blended naturally */
.hero-visual{
  position:relative;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  height:100%;
  min-height:520px;
}
.hero-visual-frame{
  position:relative;
  width:100%;
  max-width:700px;
  aspect-ratio:4/3;
  display:flex;
  align-items:center;
  justify-content:center;
  background:#FFFFFF;
}
.hero-visual-img{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  object-fit:contain;
  background:#FFFFFF;

  /* The source artwork already has a white background, so it
     blends directly into the white portfolio background. */
  filter:contrast(1.03) brightness(.93) saturate(.98);
  -webkit-mask-image:radial-gradient(ellipse 76% 82% at 50% 48%, #000 52%, rgba(0,0,0,.88) 72%, transparent 100%);
  mask-image:radial-gradient(ellipse 76% 82% at 50% 48%, #000 52%, rgba(0,0,0,.88) 72%, transparent 100%);
  opacity:0;
  transition:opacity .7s ease;
}
.hero-visual-img{ cursor:default; pointer-events:none; }
.hero-visual-img.active{
  opacity:1;
  cursor:pointer;
  pointer-events:auto;
}
.hero-visual-img.active:focus-visible{
  outline:2px solid var(--scan);
  outline-offset:4px;
}
.hero-visual-glow{
  position:absolute;
  inset:-6%;
  border-radius:50%;
  background:radial-gradient(circle, rgba(85,230,209,0.12) 0%, rgba(55,130,255,.05) 35%, transparent 70%);
  pointer-events:none;
}
.hero-know-more{
  margin-top:22px; background:none; border:none; display:flex; align-items:center; gap:10px;
  font-family:'JetBrains Mono', monospace; font-size:13px; letter-spacing:.1em; text-transform:uppercase;
  color:var(--parchment); padding:10px 4px; transition:color .25s ease, gap .25s ease;
}
.hero-know-more:hover{ color:var(--scan); gap:16px; }
.hero-know-more .arrow{ color:var(--scan); font-size:15px; }
.hero-dots{ margin-top:14px; display:flex; gap:8px; }
.hero-dots span{ width:6px; height:6px; border-radius:50%; background:var(--panel-line); transition:background .25s ease, transform .25s ease; }
.hero-dots span.on{ background:var(--scan); transform:scale(1.3); }
.hero-kicker{ font-family:'JetBrains Mono', monospace; font-size:13px; color:var(--scan); letter-spacing:0.16em; text-transform:uppercase; margin-bottom:22px; display:flex; align-items:center; gap:10px; }
.hero-dot{ width:8px; height:8px; border-radius:50%; background:var(--scan); box-shadow:0 0 12px var(--scan); animation:dotPulse 1.6s ease-in-out infinite; }
@keyframes dotPulse{ 0%,100%{ opacity:1; } 50%{ opacity:0.35; } }
.hero h1{ font-size:clamp(40px, 6vw, 74px); line-height:1.02; color:var(--parchment); }
.hero h1 em{ font-style:italic; color:var(--maroon-bright); }
.hero-role{ margin-top:22px; font-size:19px; color:var(--muted); max-width:520px; line-height:1.6; }
.hero-actions{ margin-top:40px; display:flex; gap:18px; flex-wrap:wrap; }
.btn{ padding:15px 28px; font-size:13px; letter-spacing:0.08em; text-transform:uppercase; font-family:'JetBrains Mono', monospace; border-radius:2px; transition:all .25s ease; display:inline-flex; align-items:center; gap:10px; }
.btn-primary{ background:var(--maroon); color:var(--parchment); border:1px solid var(--maroon); }
.btn-primary:hover{ background:var(--maroon-bright); border-color:var(--maroon-bright); transform:translateY(-2px); }
.btn-ghost{ background:transparent; color:var(--parchment); border:1px solid var(--panel-line); }
.btn-ghost:hover{ border-color:var(--scan); color:var(--scan); transform:translateY(-2px); }
.hero-stats{ margin-top:56px; display:flex; gap:46px; flex-wrap:wrap; }
.hero-stat b{ display:block; font-family:'Fraunces', serif; font-size:32px; color:var(--parchment); }
.hero-stat span{ font-family:'JetBrains Mono', monospace; font-size:11px; color:var(--muted-2); letter-spacing:0.08em; text-transform:uppercase; }
.hero-scroll{ position:absolute; bottom:36px; left:32px; display:flex; align-items:center; gap:12px; font-family:'JetBrains Mono', monospace; font-size:11px; color:var(--muted-2); letter-spacing:0.1em; }
.hero-scroll-line{ width:1px; height:34px; background:linear-gradient(var(--scan), transparent); animation:scrollLine 1.8s ease-in-out infinite; }
@keyframes scrollLine{ 0%{ transform:scaleY(0); transform-origin:top; } 50%{ transform:scaleY(1); transform-origin:top; } 51%{ transform-origin:bottom; } 100%{ transform:scaleY(0); transform-origin:bottom; } }
@media (max-width:940px){
  .hero-grid{ grid-template-columns:1fr; }
  .hero-visual{ min-height:400px; margin-top:20px; }
  .hero-visual-frame{ max-width:700px; width:100%; }
  .hero-scroll{ display:none; }
}

section{ position:relative; padding:120px 0; }
.section-head{ max-width:640px; margin-bottom:64px; }
.section-head h2{ font-size:clamp(30px,4vw,46px); color:var(--parchment); }
.section-head p{ margin-top:16px; color:var(--muted); font-size:16px; line-height:1.7; }
.divider{ height:1px; background:var(--panel-line); border:none; margin:0; }

/* ACHIEVEMENTS — vertical cards with flip reveal */
.reveal-section{
  min-height:170vh;
}
.reveal-sticky{
  position:sticky;
  top:0;
  min-height:100vh;
  height:auto;
  box-sizing:border-box;
  display:flex;
  align-items:center;
  justify-content:center;
  overflow:visible;
  padding:56px 0;
}
.track-record-layout{
  width:min(1180px,92vw);
  min-height:620px;
  display:grid;
  grid-template-columns:minmax(300px,430px) minmax(0,1fr);
  gap:56px;
  align-items:center;
}
.track-record-art{
  height:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  pointer-events:none;
  overflow:visible;
}
.track-record-art img{
  display:block;
  width:min(420px,100%);
  max-height:610px;
  height:auto;
  object-fit:contain;
  object-position:center center;
  filter:drop-shadow(0 20px 28px rgba(0,0,0,.20));
  transform:translateY(-70px);
  opacity:0;
  transform:translateY(-46px);
  transition:opacity .9s ease, transform 1s cubic-bezier(.22,1,.36,1);
}
.reveal-sticky.active .track-record-art img{
  opacity:1;
  transform:translateY(-70px);
}
.track-record-content{
  min-width:0;
}
.reveal-heading{
  width:100%;
  text-align:left;
  margin-bottom:24px;
  opacity:0;
  transform:translateY(18px);
  transition:opacity .7s ease, transform .7s ease;
}
.reveal-sticky.active .reveal-heading{
  opacity:1;
  transform:translateY(0);
}
.reveal-heading h2{
  margin-top:12px;
  color:var(--parchment);
}

/* One card per row */
.reveal-cards{
  width:100%;
  display:flex;
  flex-direction:column;
  gap:18px;
}

/* Flip shell */
.reveal-card{
  position:relative;
  width:100%;
  min-height:126px;
  perspective:1000px;
  opacity:0;
  transform:translateY(24px);
  transition:opacity .55s ease var(--delay), transform .65s cubic-bezier(.22,1,.36,1) var(--delay);
}
.reveal-sticky.active .reveal-card{
  opacity:1;
  transform:translateY(0);
}
.reveal-card-inner{
  position:relative;
  width:100%;
  min-height:126px;
  transform-style:preserve-3d;
  transition:transform .9s cubic-bezier(.22,1,.36,1);
  transform:rotateY(180deg);
}
.reveal-sticky.active .reveal-card-inner{
  transform:rotateY(0deg);
}
.reveal-card-front,
.reveal-card-back{
  position:absolute;
  inset:0;
  width:100%;
  min-height:126px;
  box-sizing:border-box;
  background:var(--panel);
  border:1px solid var(--panel-line);
  backface-visibility:hidden;
  -webkit-backface-visibility:hidden;
}
.reveal-card-front{
  display:flex;
  align-items:center;
  justify-content:center;
}
.reveal-card-front .num{
  font-size:18px;
}
.reveal-card-back{
  padding:22px;
  transform:rotateY(180deg);
}

.reveal-card .num{
  font-family:'JetBrains Mono', monospace;
  color:var(--scan);
  font-size:11px;
  letter-spacing:.1em;
}
.reveal-card-back p{
  margin-top:10px;
  color:var(--parchment);
  font-size:13.5px;
  line-height:1.55;
}
.reveal-card a{
  color:var(--maroon-bright);
  border-bottom:1px solid var(--maroon-bright);
}
.reveal-note{
  margin-top:22px;
  font-family:'JetBrains Mono', monospace;
  font-size:11px;
  color:var(--muted-2);
  letter-spacing:.06em;
  text-align:center;
  opacity:.7;
}

/* Mobile: keep the content readable; never force the desktop two-column
   composition into a tiny width. The character sits above the cards. */
@media (max-width:900px){
  .reveal-section{
    min-height:auto;
    padding:80px 0;
  }
  .reveal-sticky{
    position:relative;
    height:auto;
    min-height:auto;
    overflow:visible;
  }
  .track-record-layout{
    width:min(680px,calc(100% - 40px));
    min-height:auto;
    grid-template-columns:1fr;
    gap:30px;
    padding:20px 0;
  }
  .track-record-art{
    height:auto;
    order:-1;
  }
  .track-record-art img{
    width:min(250px,68vw);
    max-height:340px;
  }
  .reveal-heading{
    text-align:center;
  }
  .reveal-heading h2{
    font-size:clamp(28px,7vw,36px) !important;
    line-height:1.12;
  }
  .reveal-cards{
    gap:16px;
  }
  .reveal-card,
  .reveal-card-inner,
  .reveal-card-front,
  .reveal-card-back{
    min-height:150px;
  }
  .reveal-card-back{
    padding:20px;
  }
  .reveal-card-back p{
    font-size:14px;
    line-height:1.6;
  }
}
@media (max-width:520px){
  .track-record-layout{
    width:calc(100% - 28px);
  }
  .track-record-art img{
    width:min(215px,72vw);
  }
  .reveal-heading{
    margin-bottom:20px;
  }
  .reveal-card,
  .reveal-card-inner,
  .reveal-card-front,
  .reveal-card-back{
    min-height:165px;
  }
  .reveal-card-back{
    padding:18px;
  }
  .reveal-card-back p{
    font-size:13.5px;
    line-height:1.58;
  }
}

/* ABOUT */
.about-wrap{ display:grid; grid-template-columns:0.85fr 1.15fr; gap:70px; align-items:center; }
.about-figure{ position:relative; }
.about-figure img{
  width:340px;
  height:340px;
  max-width:100%;
  display:block;
  margin:0 auto;
  object-fit:cover;
  object-position:center top;
  border-radius:50%;
  border:2px solid rgba(85,230,209,.45);
  box-shadow:
    0 0 0 8px rgba(85,230,209,.05),
    0 24px 45px rgba(0,0,0,.45);
}
.about-figure .ring{
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  width:370px;
  height:370px;
  border:1px dashed rgba(85,230,209,.35);
  border-radius:50%;
  animation:spin 40s linear infinite;
  pointer-events:none;
}
@keyframes spin{ to{ transform:translate(-50%,-50%) rotate(360deg); } }
.about-copy p{ color:var(--muted); font-size:16px; line-height:1.85; margin-bottom:18px; }
.about-copy strong{ color:var(--parchment); font-weight:600; }
@media (max-width:900px){
  .about-wrap{ grid-template-columns:1fr; }
  .about-figure img{
    width:min(320px, 78vw);
    height:min(320px, 78vw);
  }
  .about-figure .ring{ display:none; }
}

/* SKILLS */
/* TECHNICAL SKILLS — clean, editorial cards with a one-time reveal */
.skills-cats{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:34px 36px;
}
.skill-cat{
  border-top:1px solid var(--panel-line);
  padding-top:20px;
}
.skill-cat h4{
  font-family:'JetBrains Mono', monospace;
  font-size:12px;
  letter-spacing:.12em;
  text-transform:uppercase;
  color:var(--scan);
  font-weight:500;
  margin-bottom:16px;
}
.skill-tags{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
}
.skill-tag{
  position:relative;
  min-width:92px;
  min-height:104px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:9px;
  padding:12px 8px;
  border:1px solid rgba(70,112,150,.55);
  border-radius:10px;
  color:var(--parchment);
  background:linear-gradient(145deg,rgba(17,39,63,.94),rgba(7,23,40,.94));
  box-shadow:0 8px 22px rgba(0,0,0,.12);
  font-family:'JetBrains Mono',monospace;
  font-size:11px;
  line-height:1.25;
  text-align:center;
  opacity:0;
  transform:translateY(20px) scale(.97);
  transition:
    opacity .5s ease,
    transform .35s ease,
    border-color .3s ease,
    box-shadow .3s ease;
}
.skill-tag::before{
  content:'';
  position:absolute;
  top:0;
  left:18%;
  right:18%;
  height:1px;
  background:linear-gradient(90deg,transparent,rgba(85,230,209,.55),transparent);
}
.skill-tag img{
  width:34px;
  height:34px;
  object-fit:contain;
  display:block;
  transition:transform .3s ease;
}
.n8n-icon{
  width:34px;
  height:34px;
  display:grid;
  place-items:center;
  border-radius:9px;
  background:#EA4B71;
  color:#fff;
  font-family:Arial,sans-serif;
  font-size:14px;
  font-weight:800;
  letter-spacing:-.7px;
  box-shadow:0 5px 14px rgba(234,75,113,.22);
  transition:transform .3s ease;
}
.skill-tag:hover{
  border-color:rgba(85,230,209,.8);
  box-shadow:0 14px 30px rgba(0,0,0,.25),0 0 20px rgba(85,230,209,.08);
  transform:translateY(-5px);
}
.skill-tag:hover img,
.skill-tag:hover .n8n-icon{
  transform:scale(1.08);
}

/* Elegant staggered entrance — no continuous floating. */
#skills.skills-visible .skill-tag{
  opacity:1;
  transform:translateY(0) scale(1);
}
#skills.skills-visible .skill-tag:nth-child(1){ transition-delay:.04s; }
#skills.skills-visible .skill-tag:nth-child(2){ transition-delay:.09s; }
#skills.skills-visible .skill-tag:nth-child(3){ transition-delay:.14s; }
#skills.skills-visible .skill-tag:nth-child(4){ transition-delay:.19s; }
#skills.skills-visible .skill-tag:nth-child(5){ transition-delay:.24s; }

@media (max-width:900px){
  .experience-layout{
    grid-template-columns:1fr;
    gap:24px;
  }
  .experience-art{
    order:-1;
    min-height:0;
  }
  .experience-art img{
    width:min(310px,70vw);
    max-height:430px;
  }
}

@media (max-width:760px){
  .skills-cats{ grid-template-columns:1fr 1fr; }
}
@media (max-width:520px){
  .skills-cats{ grid-template-columns:1fr; }
  .skill-tag{ min-width:86px; min-height:94px; }
}
@media (prefers-reduced-motion:reduce){
  .skill-tag{
    opacity:1;
    transform:none;
    transition:none;
  }
}

/* EXPERIENCE */
.experience-layout{
  display:grid;
  grid-template-columns:minmax(0,1fr) minmax(330px,430px);
  gap:44px;
  align-items:center;
}
.experience-art{
  display:flex;
  align-items:flex-end;
  justify-content:center;
  min-height:600px;
  pointer-events:none;
  overflow:visible;
}
.experience-art img{
  display:block;
  width:min(430px,100%);
  height:auto;
  max-height:640px;
  object-fit:contain;
  object-position:center bottom;
  filter:drop-shadow(0 22px 28px rgba(0,0,0,.18));
}
.timeline{ position:relative; padding-left:36px; }
.timeline::before{ content:''; position:absolute; left:5px; top:6px; bottom:6px; width:1px; background:var(--panel-line); }
.tl-item{ position:relative; padding-bottom:56px; }
.tl-item:last-child{ padding-bottom:0; }
.tl-item::before{ content:''; position:absolute; left:-36px; top:4px; width:11px; height:11px; border-radius:50%; background:var(--ink); border:2px solid var(--scan); }
.tl-year{ font-family:'JetBrains Mono', monospace; font-size:12px; color:var(--scan); letter-spacing:.1em; }
.tl-item h3{ margin-top:10px; font-size:22px; color:var(--parchment); }
.tl-item .org{ color:var(--muted-2); font-size:13px; margin-top:4px; font-family:'JetBrains Mono', monospace; }
.tl-item ul{ margin:18px 0 0; padding-left:18px; color:var(--muted); line-height:1.75; font-size:15px; }
.tl-item li{ margin-bottom:8px; }

/* PROJECTS */
.projects-grid{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:26px;
}

.contact-showcase{
  position:relative;
  min-height:420px;
  display:flex;
  align-items:center;
  justify-content:center;
}
.contact-copy{
  position:relative;
  z-index:1;
  width:100%;
  text-align:center;
}
.contact-doll{
  position:absolute;
  z-index:0;
  left:5px;
  bottom:-4px;
  width:min(285px,23vw);
  height:auto;
  object-fit:contain;
  pointer-events:none;
}
.projects-showcase{
  position:relative;
}
.project-doll{
  position:absolute;
  z-index:1;
  right:40px;
  top:-130px;
  width:min(255px,22vw);
  height:auto;
  pointer-events:none;
  object-fit:contain;
  filter:drop-shadow(0 10px 18px rgba(0,0,0,.18));
  transform:translateY(0);
  transition:transform .35s ease;
}
.projects-showcase:hover .project-doll{
  transform:translateY(-3px);
}
.projects-grid{
  position:relative;
  z-index:1;
}
.projects-grid .project-card{
  position:relative;
  z-index:1;
}
.project-card{
  position:relative;
  background:var(--panel);
  border:1px solid var(--panel-line);
  padding:32px;
  transition:transform .35s ease, border-color .35s ease, box-shadow .35s ease;
}
.project-card:hover{ border-color:var(--maroon-bright); box-shadow:0 20px 40px rgba(0,0,0,.4); }
.project-card.flagship{ grid-column:1 / -1; display:grid; grid-template-columns:1.2fr 0.8fr; gap:30px; }
.project-tag{ font-family:'JetBrains Mono', monospace; font-size:10.5px; color:var(--maroon-bright); letter-spacing:.14em; text-transform:uppercase; }
.project-card h3{ margin-top:12px; font-size:24px; color:var(--parchment); }
.project-card p{ margin-top:14px; color:var(--muted); font-size:14.5px; line-height:1.7; }
.project-stack{ margin-top:20px; display:flex; flex-wrap:wrap; gap:8px; }
.project-stack span{ font-family:'JetBrains Mono', monospace; font-size:11px; color:var(--muted-2); border:1px solid var(--panel-line); padding:4px 9px; }
.project-link{ margin-top:22px; display:inline-flex; align-items:center; gap:8px; font-family:'JetBrains Mono', monospace; font-size:12.5px; color:var(--scan); border-bottom:1px solid transparent; }
.project-link:hover{ border-color:var(--scan); }
.flagship-stats{ display:flex; flex-direction:column; justify-content:center; gap:22px; border-left:1px solid var(--panel-line); padding-left:30px; }
.flagship-stats b{ font-family:'Fraunces', serif; font-size:30px; color:var(--scan); display:block; }
.flagship-stats span{ font-family:'JetBrains Mono', monospace; font-size:11px; color:var(--muted-2); letter-spacing:.08em; text-transform:uppercase; }
@media (max-width:900px){ .project-doll{ width:200px; top:-70px; right:8px; opacity:.95; } }
@media (max-width:860px){ .projects-grid{ grid-template-columns:1fr; } .project-card.flagship{ grid-template-columns:1fr; } .flagship-stats{ border-left:none; border-top:1px solid var(--panel-line); padding-left:0; padding-top:20px; flex-direction:row; flex-wrap:wrap; } }

/* CERT / EDU */
.split-two{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:70px;
  align-items:start;
}
.list-row{
  display:flex;
  justify-content:space-between;
  gap:20px;
  padding:18px 0;
  border-bottom:1px solid var(--panel-line);
}
.list-row:first-child{ border-top:1px solid var(--panel-line); }
.list-row .l-title{ color:var(--parchment); font-size:15px; font-weight:500; }
.list-row .l-sub{
  color:var(--muted-2);
  font-size:12.5px;
  margin-top:4px;
  font-family:'JetBrains Mono', monospace;
}
.list-row .l-year{
  font-family:'JetBrains Mono', monospace;
  font-size:12.5px;
  color:var(--scan);
  white-space:nowrap;
}
.cert-edu-art{
  display:flex;
  justify-content:center;
  align-items:flex-end;
  margin-top:28px;
  min-height:260px;
  pointer-events:none;
}
.cert-edu-art img{
  display:block;
  width:min(430px,100%);
  height:auto;
  max-height:390px;
  object-fit:contain;
  object-position:center bottom;
  filter:drop-shadow(0 18px 26px rgba(0,0,0,.16));
}
@media (max-width:820px){
  .split-two{
    grid-template-columns:1fr;
    gap:55px;
  }
  .cert-edu-art{
    margin-top:20px;
    min-height:0;
  }
  .cert-edu-art img{
    width:min(330px,78vw);
    max-height:360px;
  }
}

/* CONTACT */
.contact-section{ background:var(--ink-2); text-align:center; }
.contact-section h2{ font-size:clamp(32px,5.5vw,58px); }
.contact-section p.lead{ margin:20px auto 0; max-width:480px; color:var(--muted); font-size:16px; }
.contact-links{ margin-top:48px; display:flex; justify-content:center; gap:30px; flex-wrap:wrap; }
.contact-links a{ font-family:'JetBrains Mono', monospace; font-size:13px; color:var(--parchment); border:1px solid var(--panel-line); padding:14px 22px; transition:all .25s ease; display:inline-flex; align-items:center; gap:8px; }
.contact-links a:hover{ border-color:var(--scan); color:var(--scan); transform:translateY(-2px); }
footer{ padding:34px 0; text-align:center; color:var(--muted-2); font-family:'JetBrains Mono', monospace; font-size:12px; border-top:1px solid var(--panel-line); }

/* ==================================================
   VANI AI CHAT
   ================================================== */

.chat-fab{
  position:fixed;
  bottom:28px;
  right:28px;
  z-index:200;

  display:flex;
  align-items:center;
  gap:10px;

  background:var(--panel);
  border:1px solid var(--panel-line);

  padding:14px 20px 14px 16px;

  border-radius:40px;

  cursor:pointer;

  color:var(--parchment);

  transition:
    border-color .25s ease,
    transform .25s ease,
    box-shadow .25s ease;
}

.chat-fab:hover,
.chat-fab.active{
  border-color:var(--scan);
  transform:translateY(-2px);

  box-shadow:
    0 10px 30px rgba(0,0,0,.35),
    0 0 22px rgba(85,230,209,.08);
}

.chat-fab .dot{
  width:9px;
  height:9px;

  flex-shrink:0;

  border-radius:50%;

  background:var(--scan);

  box-shadow:
    0 0 10px var(--scan);

  animation:dotPulse 1.6s infinite;
}

.chat-fab span{
  font-family:'JetBrains Mono',monospace;
  font-size:12.5px;
  color:var(--parchment);
  letter-spacing:.03em;
}


/* ---------------- CHAT PANEL ---------------- */

.vani-chat-panel{
  position:fixed;

  right:28px;
  bottom:88px;

  z-index:201;

  width:min(390px,calc(100vw - 32px));
  height:min(570px,calc(100vh - 120px));

  display:flex;
  flex-direction:column;

  overflow:hidden;

  background:
    linear-gradient(
      145deg,
      rgba(16,36,58,.98),
      rgba(5,18,32,.98)
    );

  border:1px solid var(--panel-line);

  border-radius:14px;

  box-shadow:
    0 25px 70px rgba(0,0,0,.55),
    0 0 40px rgba(85,230,209,.06);

  animation:vaniChatOpen .3s cubic-bezier(.22,1,.36,1);
}

@keyframes vaniChatOpen{
  from{
    opacity:0;
    transform:
      translateY(18px)
      scale(.96);
  }

  to{
    opacity:1;
    transform:
      translateY(0)
      scale(1);
  }
}


/* ---------------- HEADER ---------------- */

.vani-chat-header{
  display:flex;
  align-items:center;
  justify-content:space-between;

  padding:17px 18px;

  border-bottom:1px solid var(--panel-line);

  background:rgba(7,17,31,.55);
}

.vani-chat-identity{
  display:flex;
  align-items:center;
  gap:11px;
}

.vani-avatar{
  width:36px;
  height:36px;

  display:grid;
  place-items:center;

  border-radius:50%;

  background:
    linear-gradient(
      145deg,
      var(--maroon),
      var(--maroon-bright)
    );

  color:var(--parchment);

  font-family:'Fraunces',serif;
  font-size:18px;
  font-weight:600;

  box-shadow:
    0 0 18px rgba(194,59,85,.22);
}

.vani-name{
  color:var(--parchment);

  font-family:'Fraunces',serif;
  font-size:18px;
  font-weight:600;
}

.vani-status{
  display:flex;
  align-items:center;
  gap:6px;

  margin-top:2px;

  color:var(--muted-2);

  font-family:'JetBrains Mono',monospace;
  font-size:9px;
  letter-spacing:.04em;
}

.vani-status span{
  width:6px;
  height:6px;

  border-radius:50%;

  background:var(--scan);

  box-shadow:0 0 8px var(--scan);
}

.vani-close{
  width:32px;
  height:32px;

  display:grid;
  place-items:center;

  border:1px solid transparent;
  border-radius:50%;

  background:transparent;

  color:var(--muted);

  font-size:23px;
  line-height:1;

  cursor:pointer;

  transition:
    color .2s ease,
    border-color .2s ease,
    background .2s ease;
}

.vani-close:hover{
  color:var(--parchment);
  border-color:var(--panel-line);
  background:rgba(255,255,255,.04);
}


/* ---------------- MESSAGES ---------------- */

.vani-chat-messages{
  flex:1;

  overflow-y:auto;

  padding:20px 16px;

  display:flex;
  flex-direction:column;
  gap:12px;

  scrollbar-width:thin;
  scrollbar-color:var(--panel-line) transparent;
}

.vani-message-row{
  display:flex;
  width:100%;
}

.vani-message-row.assistant{
  justify-content:flex-start;
}

.vani-message-row.user{
  justify-content:flex-end;
}

.vani-message{
  max-width:82%;

  padding:11px 13px;

  border-radius:12px;

  font-family:'Space Grotesk',sans-serif;
  font-size:13px;
  line-height:1.6;

  white-space:pre-wrap;

  word-break:break-word;
}

.vani-message-row.assistant .vani-message{
  background:rgba(35,64,92,.65);

  border:1px solid rgba(70,112,150,.45);

  color:var(--parchment);

  border-bottom-left-radius:4px;
}

.vani-message-row.user .vani-message{
  background:var(--maroon);

  border:1px solid var(--maroon-bright);

  color:var(--parchment);

  border-bottom-right-radius:4px;
}


/* ---------------- TYPING ---------------- */

.vani-typing{
  display:flex;
  align-items:center;
  gap:5px;

  min-width:54px;
}

.vani-typing span{
  width:6px;
  height:6px;

  border-radius:50%;

  background:var(--scan);

  animation:vaniTyping 1.2s infinite ease-in-out;
}

.vani-typing span:nth-child(2){
  animation-delay:.15s;
}

.vani-typing span:nth-child(3){
  animation-delay:.3s;
}

@keyframes vaniTyping{
  0%,60%,100%{
    opacity:.3;
    transform:translateY(0);
  }

  30%{
    opacity:1;
    transform:translateY(-3px);
  }
}


/* ---------------- INPUT ---------------- */

.vani-chat-input-area{
  display:flex;
  align-items:flex-end;
  gap:9px;

  padding:12px;

  border-top:1px solid var(--panel-line);

  background:rgba(5,18,32,.8);
}

.vani-chat-input-area textarea{
  flex:1;

  min-height:42px;
  max-height:100px;

  resize:none;

  padding:11px 12px;

  border:1px solid var(--panel-line);
  border-radius:8px;

  outline:none;

  background:rgba(16,36,58,.8);

  color:var(--parchment);

  font-family:'Space Grotesk',sans-serif;
  font-size:13px;
  line-height:1.4;

  transition:border-color .2s ease;
}

.vani-chat-input-area textarea::placeholder{
  color:var(--muted-2);
}

.vani-chat-input-area textarea:focus{
  border-color:var(--scan);
}

.vani-chat-input-area textarea:disabled{
  opacity:.6;
}

.vani-send{
  width:42px;
  height:42px;

  flex-shrink:0;

  border:1px solid var(--scan);
  border-radius:8px;

  background:var(--scan);

  color:var(--ink);

  font-size:20px;
  font-weight:600;

  cursor:pointer;

  transition:
    transform .2s ease,
    opacity .2s ease;
}

.vani-send:hover:not(:disabled){
  transform:translateY(-2px);
}

.vani-send:disabled{
  opacity:.35;
  cursor:not-allowed;
}


/* ---------------- MOBILE ---------------- */

@media (max-width:640px){

  .chat-fab{
    right:16px;
    bottom:18px;

    padding:12px 16px 12px 14px;
  }

  .vani-chat-panel{
    right:16px;
    bottom:76px;

    width:calc(100vw - 32px);

    height:min(
      570px,
      calc(100vh - 100px)
    );

    border-radius:12px;
  }

  .vani-message{
    max-width:88%;
    font-size:13px;
  }
}

@media (max-width:640px){ .container{ padding:0 20px; } section{ padding:80px 0; } .hero-stats{ gap:28px; } }`;

/* ---------------- LOADER (fully React-driven — no external <script>) ---------------- */
function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [typed, setTyped] = useState("");
  const [bubbleShown, setBubbleShown] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [wipeOpen, setWipeOpen] = useState(false);
  const fullText = "loading portfolio";

  useEffect(() => {
    let i = 0;
    const typeId = setInterval(() => {
      i++;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(typeId);
    }, 55);
    const bubbleId = setTimeout(() => setBubbleShown(true), 350);
    return () => { clearInterval(typeId); clearTimeout(bubbleId); };
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setPct((p) => {
        const next = Math.min(100, p + (Math.random() * 14 + 6));
        return next;
      });
    }, 220);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (pct >= 100) {
      const t1 = setTimeout(() => setHidden(true), 300);
      const t2 = setTimeout(() => setWipeOpen(true), 300);
      const t3 = setTimeout(() => onDone && onDone(), 1500);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, [pct, onDone]);

  // safety net in case something stalls
  useEffect(() => {
    const safety = setTimeout(() => setPct((p) => (p < 100 ? 100 : p)), 4500);
    return () => clearTimeout(safety);
  }, []);

  return (
    <>
      <div id="loader" className={hidden ? "hide" : ""}>
        <div className="loader-stage">
          <div className="doll-wrap">
            <video
              className="doll-wave-video"
              src={DOLL_WAVE}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="Animated illustrated character waving hello"
            />
            <div className={`speech-bubble ${bubbleShown ? "show" : ""}`}></div>
          </div>
          <div className="doll-ground-shadow"></div>
        </div>
        <div className="loader-name mono">
          <span>{typed}</span><span className="cursor"></span>
        </div>
        <div className="scan-bar"><div className="scan-bar-fill" style={{ width: `${pct}%` }}></div></div>
        <div className="scan-pct mono">INITIALIZING · {Math.floor(pct)}%</div>
      </div>
      <div id="iris-wipe" className={wipeOpen ? "open" : ""}></div>
    </>
  );
}

/* ---------------- HERO IMAGE STACK ----------------
   Shows one complete image at a time.
   Images automatically advance every 2 seconds. Clicking the
   active image smoothly navigates to its matching portfolio section,
   while "Know More >" can also be clicked to advance manually. */
function HeroVisual() {
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((i) => (i + 1) % HERO_SLIDES.length);

  // Automatically move to the next image every 2 seconds.
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIdx((i) => (i + 1) % HERO_SLIDES.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="hero-visual">
      <div className="hero-visual-frame">
        <div className="hero-visual-glow"></div>
        {HERO_SLIDES.map((slide, i) => (
          <img
            key={i}
            src={slide.src}
            alt={slide.label}
            className={`hero-visual-img ${i === idx ? "active" : ""}`}
            onClick={() => {
              const target = document.getElementById(slide.target);
              if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            role="link"
            tabIndex={i === idx ? 0 : -1}
            onKeyDown={(e) => {
              if (i === idx && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                const target = document.getElementById(slide.target);
                if (target) {
                  target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }
            }}
          />
        ))}
      </div>
      <button className="hero-know-more" onClick={next}>
        {HERO_SLIDES[idx].label} <span className="arrow">Know More &gt;</span>
      </button>
      <div className="hero-dots">
        {HERO_SLIDES.map((_, i) => (
          <span key={i} className={i === idx ? "on" : ""}></span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav() {
  const links = ["About", "Projects", "Experience", "Skills", "Contact"];
  return (
    <header className="nav">
      <div className="nav-inner">
        <div className="brand">Vanitha<span></span></div>
        <nav className="nav-links">
          {links.map((l) => <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>)}
        </nav>
        <a href="mailto:vanithaoffic@gmail.com" className="nav-cta">Hire Me</a>
      </div>
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div>
          <div className="hero-kicker"><span className="hero-dot"></span>Available for full-stack &amp; backend roles</div>
          <h1>Vanitha<br />Athiyappan<em></em></h1>
          <p className="hero-role">Software Engineer building full-stack products and applied ML systems — Java, Spring Boot, Python, and a live, publicly deployed sign-language translator.</p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-ghost">Get In Touch</a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><b>83%</b><span>MCA Aggregate</span></div>
            <div className="hero-stat"><b>5</b><span>Shipped Projects</span></div>
            <div className="hero-stat"><b>100%</b><span>ML Model Accuracy</span></div>
          </div>
        </div>
        <HeroVisual />
      </div>
      <div className="hero-scroll mono"><div className="hero-scroll-line"></div>SCROLL</div>
    </section>
  );
}

/* ---------------- ACHIEVEMENTS — scroll-triggered hand reveal ----------------
   Note: the source portrait is a head-and-shoulders bust, so there's no literal
   hand in frame. The "open hand" is stood in for with a glow that blooms at
   chest height on scroll and releases the four cards outward from that point —
   swap in a full-body/hand-visible pose later and this same rig will work with
   a real hand position instead of the glow. */
const CARD_POSITIONS = [
  { left: "2%", top: "0px" },
  { left: "27%", top: "50px" },
  { left: "52%", top: "0px" },
  { left: "77%", top: "50px" },
];

function Achievements() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.18 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="reveal-section" ref={sectionRef}>
      <div className={`reveal-sticky ${active ? "active" : ""}`}>
        <div className="track-record-layout">
          <div className="track-record-art" aria-hidden="true">
            <img src={TRACK_DOLL} alt="" />
          </div>

          <div className="track-record-content">
            <div className="reveal-heading">
              <div className="eyebrow">Track Record</div>
              <h2 style={{ fontSize: "clamp(26px,3.4vw,38px)" }}>
                Software that shipped, not just coursework.
              </h2>
            </div>

            <div className="reveal-cards">
              {ACHIEVEMENTS.map((a, i) => (
                <div
                  className="reveal-card"
                  key={a.n}
                  style={{ "--delay": `${i * 180}ms` }}
                >
                  <div className="reveal-card-inner">
                    <div className="reveal-card-front">
                      <div className="num mono">{a.n}</div>
                      <p>{a.text}</p>
                    </div>
                    <div className="reveal-card-back">
                      <div className="num mono">{a.n}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal-note mono">keep scrolling ↓</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */

function About() {
  return (
    <section id="about">
      <div className="container about-wrap">
        <div className="about-figure">
          <div className="ring"></div>
          <img src={DOLL_DESK} alt="Illustrated character at a work desk" />
        </div>
        <div className="about-copy">
          <div className="eyebrow">About</div>
          <h2 style={{ fontSize: "clamp(28px,3.6vw,40px)", marginBottom: 22 }}>MCA graduate who treats side projects like production systems.</h2>
          <p>I'm an <strong>MCA graduate (83% aggregate)</strong> with a habit of shipping working software rather than leaving things at the prototype stage — including a live, publicly deployed ML application that real visitors use today.</p>
          <p>I'm hands-on with <strong>Java, Spring Boot, REST APIs, MySQL/MongoDB and Python</strong> across three end-to-end projects and one industry internship, and I was selected for <strong>Walmart Global Tech's</strong> competitive Advanced Software Engineering simulation.</p>
          <p>I'm currently looking for a <strong>full-stack or backend engineering role</strong> where I can own features end-to-end inside a mentorship-driven team.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SKILLS ---------------- */
function Skills() {
  const skillsRef = React.useRef(null);

  React.useEffect(() => {
    const section = skillsRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("skills-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={skillsRef}>
      <div className="container">
        <div className="eyebrow">Toolkit</div>
        <div className="section-head"><h2>Technical Skills</h2></div>

        <div className="skills-cats">
          {SKILLS.map((s) => (
            <div className="skill-cat" key={s.cat}>
              <h4>{s.cat}</h4>
              <div className="skill-tags">
                {s.items.map(([name, icon]) => (
                  <span className="skill-tag mono" key={name} title={name}>
                    <span>{name}</span>
                    {icon === "n8n" ? (
                      <span className="n8n-icon" aria-label="n8n icon">n8n</span>
                    ) : (
                      <img src={icon} alt={`${name} icon`} loading="lazy" />
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- EXPERIENCE ---------------- */
function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <div className="eyebrow">Experience</div>
        <div className="section-head"><h2>Where I've worked.</h2></div>

        <div className="experience-layout">
          <div className="timeline">
            {EXPERIENCE.map((e) => (
              <div className="tl-item" key={e.title}>
                <div className="tl-year mono">{e.year}</div>
                <h3>{e.title}</h3>
                <div className="org">{e.org}</div>
                <ul>{e.points.map((p, i) => <li key={i}>{p}</li>)}</ul>
              </div>
            ))}
          </div>

          <div className="experience-art" aria-hidden="true">
            <img src={EXPERIENCE_DOLL} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROJECTS ---------------- */
function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <div className="eyebrow">Selected Work</div>
        <div className="section-head"><h2>Five projects, taken from design to a working build.</h2></div>
        <div className="projects-showcase">
          <div className="projects-grid">
          {PROJECTS.map((p) => (
            <div className={`project-card ${p.flagship ? "flagship" : ""}`} key={p.title}>
              <div>
                <div className="project-tag">{p.tag}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="project-stack">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
                {p.link && (
                  <a className="project-link" href={p.link} target="_blank" rel="noreferrer">{p.linkLabel} →</a>
                )}
              </div>
              {p.flagship && (
                <div className="flagship-stats">
                  {p.stats.map((s) => (
                    <div key={s.l}><b>{s.n}</b><span>{s.l}</span></div>
                  ))}
                </div>
              )}
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CERTS + EDU ---------------- */
function CertsEdu() {
  return (
    <section id="certifications-education">
      <div className="container split-two">
        <div>
          <div className="eyebrow">Certifications</div>
          <h2 style={{ fontSize: 28, marginBottom: 10 }}>Training & Certifications</h2>
          <div style={{ marginTop: 30 }}>
            {CERTS.map((c) => (
              <div className="list-row" key={c.title}>
                <div>
                  <div className="l-title">{c.title}</div>
                  <div className="l-sub">{c.sub}</div>
                </div>
                <div className="l-year">{c.year}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="eyebrow">Education</div>
          <h2 style={{ fontSize: 28, marginBottom: 10 }}>Academic Background</h2>
          <div style={{ marginTop: 30 }}>
            {EDU.map((c) => (
              <div className="list-row" key={c.title}>
                <div>
                  <div className="l-title">{c.title}</div>
                  <div className="l-sub">{c.sub}</div>
                </div>
                <div className="l-year">{c.year}</div>
              </div>
            ))}
          </div>

          {/* Transparent artwork only — no frame/card/background. */}
          <div className="cert-edu-art" aria-hidden="true">
            <img src={DOLL_STUDY} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="container contact-showcase">
        <img className="contact-doll" src={CONTACT_DOLL} alt="" aria-hidden="true" />
        <div className="contact-copy">
          <div className="eyebrow" style={{ justifyContent: "center" }}>Get In Touch</div>
          <h2>Let’s create something that<br />makes an impact.</h2>
          <p className="lead">Open to full-stack and backend engineering roles on mentorship-driven teams. Reach out — I reply fast.</p>
          <div className="contact-links">
            <a href="mailto:vanithaoffic@gmail.com">✉ vanithaoffic@gmail.com</a>
            <a href="tel:+916379499082">☎ +91 63794 99082</a>
            <a href="https://github.com/Vani-Vani-Git" title="Add your GitHub profile URL">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/vanitha-a-45a52a254" title="Add your LinkedIn profile URL">LinkedIn ↗</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CHATBOT FAB (placeholder for future AI integration) ---------------- */
/* ---------------- VANI AI CHAT ---------------- */

function ChatFab({ open, setOpen }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm Vani, Vanitha's personal AI assistant. Ask me about her projects, skills, experience, or education."
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const sessionIdRef = useRef(
    `portfolio-${Date.now()}-${Math.random().toString(36).slice(2)}`
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages, loading]);

  async function sendMessage() {
    const message = input.trim();

    if (!message || loading) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: message
      }
    ]);
    
    setInput("");
    setLoading(true);
    
    const API_URL = import.meta.env.VITE_API_URL;
    console.log("API_URL =", API_URL);
    console.log("CHAT_URL =", `${API_URL}/api/chat`);
    try {
      const response = await fetch(`${API_URL}/api/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            session_id: sessionIdRef.current,
            message
          })
        }
      );

      if (!response.ok) {
        throw new Error(
          `Server returned ${response.status}`
        );
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.reply ||
            "Sorry, I couldn't generate a response right now."
        }
      ]);
    } catch (error) {
      console.error("Vani API error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm unable to connect to Vani right now. Please make sure the Vani backend is running."
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {open && (
        <div className="vani-chat-panel">

          <div className="vani-chat-header">
            <div className="vani-chat-identity">
              <div className="vani-avatar">
                V
              </div>

              <div>
                <div className="vani-name">
                  Vani
                </div>

                <div className="vani-status">
                  <span></span>
                  Vanitha's AI assistant
                </div>
              </div>
            </div>

            <button
              className="vani-close"
              onClick={() => setOpen(false)}
              aria-label="Close Vani chat"
            >
              ×
            </button>
          </div>

          <div className="vani-chat-messages">

            {messages.map((message, index) => (
              <div
                key={index}
                className={`vani-message-row ${
                  message.role === "user"
                    ? "user"
                    : "assistant"
                }`}
              >
                <div className="vani-message">
                  {message.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="vani-message-row assistant">
                <div className="vani-message vani-typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />

          </div>

          <div className="vani-chat-input-area">

            <textarea
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Ask me something..."
              rows={1}
              disabled={loading}
            />

            <button
              className="vani-send"
              onClick={sendMessage}
              disabled={
                loading || !input.trim()
              }
              aria-label="Send message"
            >
              →
            </button>

          </div>

        </div>
      )}

      <button
        className={`chat-fab ${open ? "active" : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-label="Open Vani AI assistant"
      >
        <span className="dot"></span>

        <span>
          {open ? "Close Vani" : "Ask Vani (AI)"}
        </span>
      </button>
    </>
  );
}

/* ---------------- APP ---------------- */
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="vp-root">
      <style>{CSS}</style>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <Nav />
      <Hero />
      <Achievements />
      <hr className="divider" />
      <About />
      <hr className="divider" />
      <Skills />
      <hr className="divider" />
      <Experience />
      <hr className="divider" />
      <Projects />
      <hr className="divider" />
      <CertsEdu />
      <Contact />
      <footer>© {new Date().getFullYear()} Vanitha Athiyappan · Built with React &amp; Three.js</footer>
      <ChatFab open={chatOpen} setOpen={setChatOpen} />
    </div>
  );
}