import Hero from './components/Hero'
import SetupInstructions from './components/SetupInstructions'
import ServerDetails from './components/ServerDetails'
import Background from './components/Background'
import QuickNav from './components/QuickNav'
import { usePermalink } from './hooks/usePermalink'

function App() {
  // Handle permalink navigation
  usePermalink();
  
  return (
    <>
      <Background />
      <Hero />
      <main>
        <SetupInstructions />
        <ServerDetails />
      </main>
      <QuickNav />
    </>
  )
}

export default App