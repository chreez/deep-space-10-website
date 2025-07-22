import { useRef } from 'react'
import { copyToClipboard } from '../utils/clipboard'
import './DirectoryTree.css'

function DirectoryTree() {
  const treeRef = useRef<HTMLPreElement>(null)

  const handleCopy = async () => {
    if (treeRef.current) {
      await copyToClipboard(treeRef.current.innerText)
    }
  }

  return (
    <div className="file-tree-container">
      <button className="copy-btn" onClick={handleCopy} aria-label="Copy folder structure">Copy</button>
      <pre ref={treeRef} className="file-tree" aria-label="Valheim directory layout">
        <code>
          <span className="existing">Valheim/</span>{"\n"}
          <span className="existing">├── valheim.exe</span>{"\n"}
          <span className="existing">├── valheim_Data/</span>{"\n"}
          <span className="existing">├── UnityPlayer.dll</span>{"\n"}
          <span className="existing">├── UnityCrashHandler64.exe</span>{"\n"}
          <span className="existing">├── steam_appid.txt</span>{"\n"}
          <span className="modpack">├── 📦 BepInEx/<span className="tooltip">Included in the Deep Space 10 modpack</span></span>{"\n"}
          <span className="modpack">├── 📦 doorstop_libs/<span className="tooltip">Included in the Deep Space 10 modpack</span></span>{"\n"}
          <span className="modpack-file">├── 📄 changelog.txt<span className="tooltip">Included in the Deep Space 10 modpack</span></span>{"\n"}
          <span className="modpack-file">├── 📄 doorstop_config.ini<span className="tooltip">Included in the Deep Space 10 modpack</span></span>{"\n"}
          <span className="modpack-file">├── 📄 start_game_bepinex.sh<span className="tooltip">Included in the Deep Space 10 modpack</span></span>{"\n"}
          <span className="modpack-file">├── 📄 start_server_bepinex.sh<span className="tooltip">Included in the Deep Space 10 modpack</span></span>{"\n"}
          <span className="modpack-file">└── 📄 winhttp.dll<span className="tooltip">Included in the Deep Space 10 modpack</span></span>
        </code>
      </pre>
    </div>
  )
}

export default DirectoryTree
