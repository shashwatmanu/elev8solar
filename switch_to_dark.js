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
  
  // Revert special overrides first
  content = content.replace(/text-slate-500/g, 'text-white/50');
  content = content.replace(/text-slate-600/g, 'text-white/70');
  content = content.replace(/text-slate-700/g, 'text-white/80');
  
  // Revert text
  content = content.replace(/text-slate-900/g, 'text-white');
  content = content.replace(/text-white font-bold tracking-\[0\.2em\]/g, 'text-black font-bold tracking-[0.2em]'); // Specific fix for Start Project button
  content = content.replace(/text-white hover:bg-accent\/90/g, 'text-black hover:bg-accent/90'); // Specific fix for Contact button
  
  // Revert borders
  content = content.replace(/border-black\/5/g, 'border-white/5');
  content = content.replace(/border-black\/10/g, 'border-white/10');
  content = content.replace(/border-black\/20/g, 'border-white/20');
  
  // Revert backgrounds with opacity
  content = content.replace(/bg-black\/\[0\.02\]/g, 'bg-white/[0.02]');
  content = content.replace(/bg-black\/\[0\.03\]/g, 'bg-white/[0.03]');
  content = content.replace(/bg-black\/5/g, 'bg-white/5');
  content = content.replace(/bg-black\/10/g, 'bg-white/10');
  content = content.replace(/bg-black\/20/g, 'bg-white/20');
  
  content = content.replace(/bg-white\/60/g, 'bg-black/60');
  content = content.replace(/bg-white\/20/g, 'bg-black/20');
  
  // Revert gradients
  content = content.replace(/from-slate-900/g, 'from-white');
  content = content.replace(/from-white/g, 'from-black');
  content = content.replace(/from-black to-white\/30/g, 'from-white to-white/30'); // Fix the hero text gradient
  content = content.replace(/via-white/g, 'via-black');
  
  // Revert solid backgrounds
  content = content.replace(/bg-stone-100/g, 'bg-background');
  
  // For bg-white, we need to be careful not to overwrite the button's bg-white or the image's bg-white/90.
  // The script changed all bg-black to bg-white. Let's revert specific known bg-white that were bg-black.
  content = content.replace(/z-\[5\] bg-white/g, 'z-[5] bg-black'); // The veil
  content = content.replace(/z-10 bg-white pt-32/g, 'z-10 bg-black pt-32'); // Contact footer
  content = content.replace(/h-\[80vh\] md:h-\[90vh\] bg-white/g, 'h-[80vh] md:h-[90vh] bg-black'); // Projects slider
  
  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Switched back to dark theme classes!');
