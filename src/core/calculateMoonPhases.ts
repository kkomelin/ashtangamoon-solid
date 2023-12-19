import lune from 'lune'

const calculateMoonPhases = () => {
  const { phase } = lune.phase()
  const { nextnew_date, new_date, full_date } = lune.phase_hunt()

  return {
    currentPhase: phase as number,
    newMoon: new_date as Date,
    fullMoon: full_date as Date,
    nextNewMoon: nextnew_date as Date,
  }
}

export default calculateMoonPhases
