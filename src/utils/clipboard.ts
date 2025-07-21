export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    // Fallback for older browsers or permission denied
    const textArea = document.createElement("textarea")
    textArea.value = text
    textArea.style.position = "fixed"
    textArea.style.opacity = "0"
    textArea.style.pointerEvents = "none"
    document.body.appendChild(textArea)
    textArea.select()
    
    try {
      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)
      return successful
    } catch (fallbackErr) {
      document.body.removeChild(textArea)
      // Show manual copy prompt
      window.prompt('Please copy manually:', text)
      return false
    }
  }
}