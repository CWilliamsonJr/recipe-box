require('../styles/style.scss');

import React from 'react';
import ReactDOM from 'react-dom';

class RecipeContainer extends React.Component { // container to hold all the recipes
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <RecipeForm/>
                </div>
            </div>
        );
    }
}

class RecipeForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recipes: [
                {
                    id: lil.uuid(),
                    name: "Sloppy Joes Recipe",
                    ingredients: `1 lb ground beef
2 stalks celery(finely chopped)
1 small onion(chopped),8 ounces fresh mushrooms(sliced)
1 green bell pepper(seeded and chopped)
1 (8 ounce)can tomato sauce, ¼ cup ketchup, ¼ cup barbeque sauce
1 tablespoon brown sugar
1 teaspoon dry mustard
salt and pepper(to taste)
1 tablespoon Worcestershire sauce
1 tablespoon vinegar
Sliced provolone cheese
Hamburger buns`,
                    instructions: `In a large skillet over medium high heat brown ground beef, celery, green pepper, mushrooms, and onion. Drain any excess fat.
 Stir in tomato sauce, ketchup, barbeque sauce, brown sugar, dry mustard, salt and pepper, Worcestershire sauce, and vinegar.
 Cover and simmer for 15-20 minutes stirring occasionally. If after 20 minutes the mixture still seems to watery, simmer for a little longer until the mixture has thickened.
 Serve on a bun and top with a slice of provolone cheese.`

                }, {
                    id: lil.uuid(),
                    name: "Healthy Peanut Butter Coconut Oatmeal Cookie Recipe",
                    ingredients: `2/3 cup canola oil
1/2 cup natural peanut butter
1/4 cup sugar
3/4 cup brown sugar
2 eggs
1 tsp vanilla
1/4c coconut
3C oats
1 1/4 cups whole wheat flour
1 tsp baking powder
1/2 tsp baking soda`,
                    instructions: `Preheat oven to 375F.
Beat together oil & peanut butter then beat in eggs, sugar and vanilla. Stir in coconut.
In a separate bowl mix together oats, flour, powder and soda.
Stir into peanut butter mixture but do not over mix.
Drop onto a baking sheet in 1 1/2 tablespoons round.
Gently press to flatten and bake for 10-12 minutes or until lightly browned.
Cool on a cooling rack, and don’t spoil your dinner.`
                }, {
                    id: lil.uuid(),
                    name: "Top Notch Top Round Chimichangas",
                    ingredients: `1 tablespoon chili powder
1 teaspoon cayenne pepper
1 tablespoon granulated garlic
1 tablespoon all-purpose flour
2 tablespoons canola oil
3 pounds boneless beef rump, trimmed and cut into 1-inch cubes
2 yellow onions, chopped
3 teaspoons seeded and minced jalapenos
2 tablespoons chopped garlic
2 1/4 cups beef broth, plus extra if necessary
1/4 cup red wine vinegar
1 (15-ounce) can pinto beans, drained and rinsed
1 (15-ounce) can black beans, drained and rinsed
1/4 cup lime juice (about 3 limes)
1/2 cup chopped fresh cilantro leaves
4 to 6 cups corn oil
10 (11-inch) flour tortillas, steamed
2 1/2 cups shredded pepper jack cheese
2 cups shredded iceberg lettuce
3/4 cup salsa
1 cup sour cream
1/2 cup seeded and diced tomatoes
1 avocado, diced`,
                    instructions: `In a small bowl, combine chili powder, cayenne, granulated garlic, and flour. Set aside.
In a heavy bottomed, large stock pot, heat canola oil over medium-high heat. Add beef cubes and brown on all sides.
Add onions and jalapenos and saute for 4 to 5 minutes.
Add garlic and saute for 1 minute more.
Mix in flour mixture, stirring frequently, for 2 to 3 minutes.
Deglaze with beef broth. Then add vinegar. Stir well to combine. Bring to a boil.
Lower heat to medium-low and simmer for 2 hours, adding additional beef broth, if necessary, to keep meat simmering in liquid.
When meat is fork tender, remove to a sheet pan and shred with 2 forks. Add shredded beef back into pot, along with pinto and black beans, lime juice and half the cilantro.
Cook until mixture is heated through. Remove from heat and allow to cool.
Preheat oven to 350 degrees F.
In a large, deep-sided skillet, heat corn oil to 325 degrees F.
While oil is heating, prepare chimichangas. Fill bottom half of a tortilla with 3/4 cup of the beef and bean mixture and 2 tablespoons pepper jack cheese (when filling tortillas, use a slotted spoon to scoop out beef if mixture is a little liquidy).
Lift the edge of the tortilla and roll it over the filling to secure it. Fold in both sides and continue rolling until you reach the opposite end. Secure with a 6-inch skewer weaved through the seam side of burrito. Repeat with remaining tortillas.
Slowly lower chimichangas into hot oil and cook 2 minutes on each side or until golden brown. You can cook 4 burritos per batch.
Remove from oil, drain on paper towels and keep warm in oven until all are cooked.
To serve, place a bed of shredded lettuce on each plate, then a spoonful of salsa.
Place chimichangas on top and add a dollop of sour cream, sprinkle with diced tomatoes, avocado and remaining cilantro to garnish. Serve immediately.`
                }
            ]
        }
    }
    newRecipe = () => {

        this.setState({
            recipes: this.state.recipes.concat({id: lil.uuid(), name: "New Recipe", ingredients: `Add ingredients`, instructions: `Add instructions`})
        })
    };
    onDelete = (id) => {
        let recipes = this.state.recipes;

        recipes = recipes.filter((element) => {
            return element.id !== id
        })

        this.setState({recipes: recipes});
    };
    handleUpdate = (recipeId,recipeName,ingredientsList,instructionsList) => {
        let update = this.state.recipes;

        update.map((element)=>{
            if(element.id === recipeId){
                element.name = recipeName;
                element.ingredients = ingredientsList;
                element.instructions = instructionsList;
            }
        })
        this.setState({recipes:update});
    };
    render() {
        return (
            <div >
                <button onClick={() => this.newRecipe()}>+ Add new Recipe</button>
                <div><RecipeBox update={this.handleUpdate} onDelete={this.onDelete} recipeList={this.state.recipes}/></div>
            </div>
        )
    }
}

class RecipeBox extends React.Component { // Displayes recipe Names
    constructor(props) {
        super(props)
        this.state = {
            show: ''
        };
    }
    handleOnClick = (recipe) => {
        let ingredients = recipe.ingredients;
        let instructions = recipe.instructions;
        let regex = /\n/g;

        ingredients = ingredients.split(regex).map((element, index) => {
            return <li key={index}>{element}</li>
        });
        instructions = instructions.split(regex).map((element, index) => {
            return <li key={index}>{element}</li>
        });

        let display = (
            <div className='textlist'>
                <div className='h3 recipe-name'>{recipe.name}</div>
                <ul>
                    {ingredients}
                </ul>
                <ul className='instructions'>
                    {instructions}
                </ul>
            </div>
        );

        this.setState({show: display});
    };
    doUpdate = (recipe,recipeName,ingredientsList,instructionsList) =>{
        this.handleOnClick({ingredients:ingredientsList,instructions:instructionsList, name:recipeName});
        this.props.update(recipe,recipeName,ingredientsList,instructionsList);
    };
    onEdit = (recipe) => {
        let showform = (
            <div>
            <form>
                <label htmlFor='recipeName'>Recipe Name:</label>
                <input defaultValue={recipe.name} id='recipeName' type='text' required/>
                <br/>
                <label htmlFor='ingredientsList'>Ingredients:</label>
                <textarea defaultValue={recipe.ingredients} id="ingredientsList"></textarea>
                 <br />
                <label htmlFor='instructionsList'>Instructions:</label>
                <textarea defaultValue={recipe.instructions} id="instructionsList" ></textarea>
            </form>
            <button onClick={()=> this.doUpdate(recipe.id,recipeName.value,ingredientsList.value,instructionsList.value)}>Are you finsished</button>
            </div>
        );

        this.setState({show: showform});
    };
    render() {
        let recipeList = this.props.recipeList;
        return (
            <div>
                <div className='recipeList'>
                    <ul className='recipes'>

                        {recipeList.map((element, index) => {
                            return <div key={element.id}>
                                <li onClick={() => this.handleOnClick(element)}>{element.name}
                                </li>
                                <div className='displayInline'>
                                    <i role='button' title='edit recipe' className="fa fa-pencil fa-lg" aria-hidden="true" onClick={() => this.onEdit(element)}></i>
                                    <i role='button' title='remove recipe' className="fa fa-ban fa-lg" aria-hidden="true" onClick={() => this.props.onDelete(element.id)}></i>
                                </div>
                            </div>
                        })}
                    </ul>
                </div>
                <div className='RecipeForm'>
                    {this.state.show}
                </div>
            </div>
        );
    }
}
const content = document.getElementById('content');
ReactDOM.render(
    <RecipeContainer/>, content)
