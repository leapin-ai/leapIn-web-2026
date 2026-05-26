#!/usr/bin/env node

/**
 * Post-build script to copy the correct robots.txt based on build target
 * Usage: node scripts/copy-robots.mjs <global|cn>
 */

import { copyFileSync, existsSync } from 'fs';
import { join } from 'path';

const buildType = process.argv[2] || 'cn';
const publicDir = join(process.cwd(), 'public');
const distDir = join(process.cwd(), 'dist');

if (buildType === 'global') {
  // Copy robots.global.txt as robots.txt for global build
  const source = join(publicDir, 'robots.global.txt');
  const dest = join(distDir, 'robots.txt');

  if (existsSync(source)) {
    copyFileSync(source, dest);
    console.log('✅ Copied robots.global.txt to dist/robots.txt (Global site)');
  } else {
    console.warn('⚠️  robots.global.txt not found');
  }
} else {
  // For CN build, robots.txt is already copied by Astro from public folder
  console.log('✅ Using default robots.txt (China site)');
}

console.log(`📍 Build type: ${buildType === 'global' ? 'Global (leapin.io)' : 'China (leapin-ai.com)'}`);
