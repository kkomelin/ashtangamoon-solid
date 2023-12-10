import { onMount } from "solid-js";
import "./App.css";
import calculateMoonPhases from "./core/calculateMoonPhases";
import { currentDate } from "./core/utils";
import visualizeMoonPhase from "./core/visualizeMoonPhase";

function App() {
  const date = currentDate();
  let moonRef!: SVGSVGElement;

  onMount(() => {
    // Calculate moon phases.
    const { currentPhase, newMoon, fullMoon, nextFullMoon, nextNewMoon } =
      calculateMoonPhases();

    // Visualize the moon.
    visualizeMoonPhase(moonRef, currentPhase);
  });

  return (
    <>
      <header>
        <h1>Ashtanga Moon</h1>
        <div class="current-date">{date}</div>
      </header>
      <div class="loader">Loading...</div>
      <svg id="moon" ref={moonRef} />
      <div class="next-dates" />
    </>
  );
}

export default App;
