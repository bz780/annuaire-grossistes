#!/usr/bin/env node
// Patch anti-spam : remplace le handler submit JS dans toutes les pages contenant le contact-form.
// (Les hidden inputs ts_load/ts_token/ts_elapsed ont déjà été ajoutés par un premier passage.)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Marqueur pour éviter de patcher 2x
const MARKER_JS = 'TS_LOAD=Date.now()';

// Replace handler bloc complet : commence à `var f=document.getElementById('contact-form');`
// et se termine à `\n})();` (close du IIFE) — capture tout le if(f){...} jusqu'à la fin de la fonction.
// Approche : chercher la ligne `var f=document.getElementById('contact-form');` et remplacer
// la prochaine ligne (handler) par un nouveau bloc.

// Build replacement function for contact pages (variante "Message bien reçu" avec form hide)
const NEW_BLOCK_HIDE = `var f=document.getElementById('contact-form');
if(f){var TS_LOAD=Date.now();var tsl=f.querySelector('[name=ts_load]');if(tsl)tsl.value=String(TS_LOAD);var tst=f.querySelector('[name=ts_token]');if(tst){try{tst.value=btoa(location.href+'|'+TS_LOAD).slice(0,24)}catch(_){tst.value=String(TS_LOAD%9973)}}f.addEventListener('submit',function(e){e.preventDefault();var btn=f.querySelector('button[type=submit]');if(btn.disabled)return;var s=document.getElementById('cf-status');var hp=f.querySelector('[name=_honeypot]');if(hp&&hp.value){return}var elapsed=Date.now()-TS_LOAD;var els=f.querySelector('[name=ts_elapsed]');if(els)els.value=String(elapsed);if(elapsed<2000){s.textContent='Veuillez prendre quelques secondes pour remplir le formulaire.';return}var ua=(navigator.userAgent||'').toLowerCase();if(/curl|wget|python-requests|headlesschrome|phantomjs/.test(ua)){s.textContent='Erreur. Réessayez depuis un navigateur standard.';return}btn.disabled=true;var bt=btn.textContent;btn.textContent='Envoi en cours…';btn.style.opacity='0.7';btn.style.cursor='wait';s.textContent='Envoi…';fetch(f.action,{method:'POST',body:new FormData(f),headers:{'Accept':'application/json'}}).then(function(r){return r.json()}).then(function(d){if(d.success){f.style.display='none';s.innerHTML='<strong>✓ Message bien reçu.</strong><br>Notre équipe vous répond sous 24h ouvrées.';s.className='cf-success';}else{s.textContent='Erreur. Vérifiez vos champs et réessayez.';btn.disabled=false;btn.textContent=bt;btn.style.opacity='';btn.style.cursor=''}}).catch(function(){s.textContent='Erreur réseau. Réessayez plus tard.';btn.disabled=false;btn.textContent=bt;btn.style.opacity='';btn.style.cursor=''})})}`;

function walk(dir, files = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.git' || e.name === 'assets') continue;
      walk(p, files);
    } else if (e.name === 'index.html') {
      files.push(p);
    }
  }
  return files;
}

const files = walk(__dirname);
let patched = 0, skipped = 0, noform = 0, nomatch = 0;

// Regex que on cible : 2 lignes
//   var f=document.getElementById('contact-form');
//   if(f){f.addEventListener('submit',function(e){...})}
const BLOCK_RE = /var f=document\.getElementById\('contact-form'\);\s*\nif\(f\)\{f\.addEventListener\('submit',function\(e\)\{[^\n]*\}\)\}/;

for (const f of files) {
  let html = fs.readFileSync(f, 'utf8');
  if (!html.includes('id="contact-form"') && !html.includes("id='contact-form'")) {
    noform++;
    continue;
  }
  if (html.includes(MARKER_JS)) {
    skipped++;
    continue;
  }

  if (!BLOCK_RE.test(html)) {
    console.log(`  [NO-MATCH] ${path.relative(__dirname, f)}`);
    nomatch++;
    continue;
  }

  html = html.replace(BLOCK_RE, NEW_BLOCK_HIDE);
  fs.writeFileSync(f, html);
  console.log(`  [PATCH] ${path.relative(__dirname, f)}`);
  patched++;
}

console.log(`\nDone. PATCHED: ${patched} / SKIPPED: ${skipped} / NO-FORM: ${noform} / NO-MATCH: ${nomatch}`);
