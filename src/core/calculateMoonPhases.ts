import lune from 'lune'

const calculateMoonPhases = () => {
  const { phase } = lune.phase()
  const { nextnew_date, nextfull_date, new_date, full_date } = lune.phase_hunt()

  return {
    currentPhase: phase,
    newMoon: new_date,
    fullMoon: full_date,
    nextNewMoon: nextnew_date,
    nextFullMoon: nextfull_date,
  }
}

export default calculateMoonPhases
