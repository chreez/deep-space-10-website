import Hero from './components/Hero'
import SetupInstructions from './components/SetupInstructions'
import ServerDetails from './components/ServerDetails'
import Background from './components/Background'
import DirectoryTree from './components/DirectoryTree'

function App() {
  return (
    <>
      <Background />
      <Hero />
      <main>
        <SetupInstructions />
        <DirectoryTree />
        <ServerDetails />
      </main>
    </>
  )
}

export default App