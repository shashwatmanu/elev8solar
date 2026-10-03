const fs = require('fs');
const path = require('path');

const files = [
  'src/app/page.tsx',
  'src/app/projects/page.tsx',
  'src/components/Navbar.tsx',
  'src/components/ProjectsSlider.tsx',
  'src/components/ExplodedPanel.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace dark mode specific tailwind classes with light mode ones
  content = content.replace(/text-white/g, 'text-slate-900');
  content = content.replace(/bg-black/g, 'bg-white');
  content = content.replace(/bg-background/g, 'bg-stone-100');
  content = content.replace(/bg-white\/\[0\.02\]/g, 'bg-black/[0.02]');
  content = content.replace(/bg-white\/\[0\.03\]/g, 'bg-black/[0.03]');
  content = content.replace(/bg-white\/5/g, 'bg-black/5');
  content = content.replace(/bg-white\/10/g, 'bg-black/10');
  content = content.replace(/bg-white\/20/g, 'bg-black/20');
  
  content = content.replace(/border-white\/5/g, 'border-black/5');
  content = content.replace(/border-white\/10/g, 'border-black/10');
  content = content.replace(/border-white\/20/g, 'border-black/20');
  
  content = content.replace(/from-white/g, 'from-slate-900');
  content = content.replace(/from-black/g, 'from-white');
  content = content.replace(/via-black/g, 'via-white');
  
  content = content.replace(/text-black/g, 'text-white'); // Invert existing black text on buttons
  content = content.replace(/bg-black\/60/g, 'bg-white/60');
  content = content.replace(/bg-black\/20/g, 'bg-white/20');
  
  // Special overrides
  content = content.replace(/text-slate-900\/50/g, 'text-slate-500');
  content = content.replace(/text-slate-900\/60/g, 'text-slate-500');
  content = content.replace(/text-slate-900\/70/g, 'text-slate-600');
  content = content.replace(/text-slate-900\/80/g, 'text-slate-700');
  
  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Switched to light theme classes!');
