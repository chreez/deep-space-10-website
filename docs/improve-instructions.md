# 📁 Valheim Modpack Installation Layout (Visual Guide)

This guide shows the **expected folder structure** after correctly placing the modpack into your existing Valheim directory. It visually distinguishes between files/folders that:

* ✅ Already exist in a fresh Valheim install
* 📦 Are **folders added by the modpack**
* 📄 Are **files added by the modpack**

---

## 📂 Final Directory Structure (Depth 1)

```plaintext
Valheim/
├── valheim_Data/              ✅
├── 📦 doorstop_libs/          ← modpack folder (provided)
├── 📦 BepInEx/                ← modpack folder (provided)
├── valheim.exe                ✅
├── UnityCrashHandler64.exe    ✅
├── UnityPlayer.dll            ✅
├── 📄 doorstop_config.ini     ← modpack file (provided)
├── 📄 start_game_bepinex.sh   ← modpack file (provided)
├── 📄 start_server_bepinex.sh ← modpack file (provided)
├── 📄 winhttp.dll             ← modpack file (provided)
```

---

## 🪓 Installation Instructions

1. Open your Valheim install folder:

   * Windows default: `C:/Program Files (x86)/Steam/steamapps/common/Valheim`
2. Copy the **entire contents** of the modpack archive into this directory.
3. You should see the folders and files above placed **next to** `valheim.exe`.
4. None of the base game files will be overwritten.

---

## 🎨 Visual Styling (for website/documentation rendering)

* ✅ Existing Valheim files: **light gray**, muted, or standard font
* 📦 Modpack folders: **highlighted blue or purple**, bold or icon-accented
* 📄 Modpack files: **highlighted green or amber**, optionally with hover tooltip:

  > "Included in the Deep Space 10 modpack"

---

## ✅ Acceptance Criteria

* Rendered directory uses distinct styling per file type (game vs mod).
* Should be in a modal and shown when the user clicks "more details"
* Should provide clear instructions on how to place the files from the archive
* Shows clear placement with no ambiguity on what is replaced (none).
* Visual confirmation helps users verify install correctness without needing to read every instruction.
* Screenshot or rendered web pane supports comparison with local folder.
