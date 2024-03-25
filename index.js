const form = document.querySelector('form')
const recipeSection = document.getElementById('recipe')

form.onsubmit = async function(e) {
    e.preventDefault()
    const userSearch = form.search.value.trim()
    localStorage.setItem('userSearch', userSearch)
    recipeSection.innerHTML = ''
    this.search.value = ''
    try {
        const res = await fetch(`https://api.api-ninjas.com/v1/recipe?query=${userSearch}`, {
            headers: { 'X-Api-Key': 'OZQk/6ir9ftXppmlpBoUOg==QVzAM3ILCSMgMnNz'}
        })
        if (res.status === 404) throw new Error('Recipe not found.')
        if (res.status === 400) throw new Error('Please search for a recipe.')
        const recipeData = await res.json()
        console.log(recipeData)
        renderRecipe(recipeData)
    } catch (err) {
        recipeSection.innerHTML = err.message
    }
}

const renderRecipe = ({
    0: {
        ingredients,
        instructions,
        servings,
        title
    }    
}) => {
    recipeSection.innerHTML = `<h3>${title}</h3>
    <p>Servings: ${servings}</p>
    <p>Ingredients: ${ingredients}</p>
    <p>Instructions: ${instructions}</p>`
}
