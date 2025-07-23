import { useState } from 'react'
import styles from '../styles/modules/GameDirectoryTree.module.css'

const lines = [
  { text: 'Valheim/', className: styles.root },
  { text: '├── valheim.exe                 ✅', className: styles.existing },
  { text: '├── valheim_Data/              ✅', className: styles.existing },
  { text: '├── UnityPlayer.dll            ✅', className: styles.existing },
  { text: '├── UnityCrashHandler64.exe    ✅', className: styles.existing },
  { text: '├── steam_appid.txt            ✅', className: styles.existing },
  { text: '├── 📦 BepInEx/', className: styles.modpackFolder, tooltip: true },
  { text: '├── 📦 doorstop_libs/', className: styles.modpackFolder, tooltip: true },
  { text: '├── 📄 changelog.txt', className: styles.modpackFile, tooltip: true },
  { text: '├── 📄 doorstop_config.ini', className: styles.modpackFile, tooltip: true },
  { text: '├── 📄 start_game_bepinex.sh', className: styles.modpackFile, tooltip: true },
  { text: '├── 📄 start_server_bepinex.sh', className: styles.modpackFile, tooltip: true },
  { text: '└── 📄 winhttp.dll', className: styles.modpackFile, tooltip: true }
]

function GameDirectoryTree() {
  const [copied, setCopied] = useState(false)

  const copyTree = () => {
    const text = lines.map(l => l.text).join('\n')
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className={styles.wrapper}>
      <button className={`${styles.copyButton} ${copied ? styles.copied : ''}`} onClick={copyTree} aria-label="Copy directory tree">
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <pre className={styles.tree}>
        {lines.map((line, idx) => (
          <code
            key={idx}
            className={`${styles.line} ${line.className}`}
            data-tooltip={line.tooltip ? 'Included in the Deep Space 10 modpack' : undefined}
          >
            {line.text}
          </code>
        ))}
      </pre>
    </div>
  )
}

export default GameDirectoryTree
