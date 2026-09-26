const fs = require('fs')
const path = require('path')

const SCRIPT_TAG = '<script src="/dashboard-console-capture.js"></script>'

function injectIntoHtmlFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      injectIntoHtmlFiles(fullPath)
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8')

      if (!content.includes('dashboard-console-capture.js')) {
        content = content.replace('</head>', `${SCRIPT_TAG}</head>`)
        fs.writeFileSync(fullPath, content, 'utf8')
        console.log(`Injected console capture script into ${fullPath}`)
      }
    }
  }
}

const targetDir = path.join(process.cwd(), '.next')

if (fs.existsSync(targetDir)) {
  injectIntoHtmlFiles(targetDir)
} else {
  console.log('No .next directory found, skipping console capture injection.')
}