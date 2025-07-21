import Hero from './components/Hero'
import SetupInstructions from './components/SetupInstructions'
import ServerDetails from './components/ServerDetails'
import Background from './components/Background'

function App() {
  return (
    <>
      <Background />
      <Hero />
      <main>
        <SetupInstructions />
        <ServerDetails />
      </main>
    </>
  )
}

export default App