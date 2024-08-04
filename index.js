const form = document.querySelector('form')
const exerciseSection = document.getElementById('exercise')

form.onsubmit = async function(e) {
    e.preventDefault()
    const userSearch = form.search.value.trim()
    localStorage.setItem('userSearch', userSearch)
    exerciseSection.innerHTML = ''
    this.search.value = ''
    try {
        const res = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${userSearch}`, {
            headers: { 'X-Api-Key': 'K9uVhoHgQabLFXZg9xnvEw==HY6NE69guV75NOxH'}
        })
        if (res.status === 404) throw new Error('Exercise not found.')
        if (res.status === 400) throw new Error('Please search for a exercise.')
        const exerciseData = await res.json()
        console.log(exerciseData)
        renderExercise(exerciseData)
    } catch (err) {
        exerciseSection.innerHTML = err.message
    }
}

const renderExercise = ({
    0: {
        name,
        type,
        muscle,
        equipment,
        difficulty,
        instructions
    }    
}) => {
    exerciseSection.innerHTML = `<h3>${name}</h3>
    <p>Type: ${type}</p>
    <p>Muscle: ${muscle}</p>
    <p>Equipment: ${equipment}</p>
    <p>Difficulty: ${difficulty}</p>
    <p>Instructions: ${instructions}</p>`
}
