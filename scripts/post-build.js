import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Go up one level from scripts/ to project root
const projectRoot = path.join(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const distDir = path.join(projectRoot, 'dist');
const artifactsDir = 'C:/Users/chate/.gemini/antigravity/brain/31cd9641-fd50-45d9-a1c9-0e77d99fad62';

// Copy manifest.json
const manifestSrc = path.join(publicDir, 'manifest.json');
const manifestDest = path.join(distDir, 'manifest.json');
fs.copyFileSync(manifestSrc, manifestDest);
console.log('✓ Copied manifest.json');

// Copy icons
const icons = [
  { src: 'icon_128_1765130607366.png', dest: 'icon128.png' },
  { src: 'icon_48_1765130623374.png', dest: 'icon48.png' },
  { src: 'icon_16_1765130645449.png', dest: 'icon16.png' }
];

icons.forEach(({ src, dest }) => {
  const srcPath = path.join(artifactsDir, src);
  const destPath = path.join(distDir, dest);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✓ Copied ${dest}`);
  } else {
    console.warn(`⚠ Warning: ${src} not found`);
  }
});

console.log('✓ Build assets copied successfully!');

