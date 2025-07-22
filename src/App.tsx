import Hero from './components/Hero'
import SetupInstructions from './components/SetupInstructions'
import ServerDetails from './components/ServerDetails'
import Background from './components/Background'
import QuickNav from './components/QuickNav'

function App() {
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