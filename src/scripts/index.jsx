require('../styles/style.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import {
    Modal,
    Button,
    ControlLabel,
    FormControl,
    FormGroup,
    HelpBlock
} from 'react-bootstrap';

$(document).on('click', '.recipes div', function() { // hilights selected recipe
    $(".recipes li").removeClass("active");
    $(this).find('li').addClass("active");
});

class RecipeContainer extends React.Component { // container to hold the page elements
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
            recipes: [ //exmaple recipes
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
    componentDidMount() { // loads saved data to state from local storage
    if (localStorage.state) {
      let prevState = JSON.parse(localStorage.state);
      this.setState({recipes:prevState});

    }
  }
  componentDidUpdate() { // saves state to local storage
    localStorage.state = JSON.stringify(this.state.recipes);
  }
    NewRecipe = () => { // adds new recipe

        this.setState({
            recipes: this.state.recipes.concat({id: lil.uuid(), name: '', ingredients: '', instructions: ''})
        })
    };
    onDelete = (id) => { // removes recipe
        let recipes = this.state.recipes;

        recipes = recipes.filter((element) => {
            return element.id !== id
        })

        this.setState({recipes: recipes});
    };
    onEdit = (recipeId, recipeName, ingredientsList, instructionsList) => { // propagate changes to the recipe
        let update = this.state.recipes;

        update.map((element) => {
            if (element.id === recipeId) {
                element.name = recipeName;
                element.ingredients = ingredientsList;
                element.instructions = instructionsList;
            }
        });
        this.setState({recipes: update});
    };
    render() {
        return (
            <div >
                <button onClick={() => this.NewRecipe()} className='add_recipe btn btn-primary'>Add new Recipe</button>
                <div><RecipeBox newRecipe={this.NewRecipe}   update={this.onEdit} onDelete={this.onDelete} recipeList={this.state.recipes}/></div>
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

    DisplayList = (recipe) => { // shows the text of the recipe
        let ingredients = recipe.ingredients;
        let instructions = recipe.instructions;
        let regex = /\n/g; // regular expression that separates the array at new lines

        recipe.name = this.NameRequire(recipe.name); // makes sure the recipe has a name
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

        this.setState({show: display}); // shows it to the screen
    };

    NameRequire = (recipeName) =>{ // used to make sure recipe has a name
        while(!(!!recipeName.trim())){
            recipeName = String(prompt('Please enter in a recipe name'));
        }
        return recipeName;
    };
    onUpdate = (recipe, recipeName, ingredientsList, instructionsList) => {
        recipeName = this.NameRequire(recipeName); // checks for no name
        this.DisplayList({ingredients: ingredientsList, instructions: instructionsList, name: recipeName}); // prints it back to screen
        this.props.update(recipe, recipeName, ingredientsList, instructionsList); // sends the updated fields to the parent
    };


    onEdit = (recipe) => {
        let showform = ( // modal used to edit the recipe
            <Modal show={true} onHide={() => this.DisplayList(recipe)}>
                <Modal.Header>
                    <Modal.Title>Edit Recipe for {recipe.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormGroup controlId="recipetxt" >
                            <ControlLabel>Recipe Name</ControlLabel>
                            <FormControl placeholder='Recipe Name' type="input" defaultValue={recipe.name}/>
                             <HelpBlock bsClass='helptxt'>Recipe Name is required</HelpBlock>
                        </FormGroup>
                        <FormGroup controlId="ingredientsList">
                            <ControlLabel>Recipe Ingredients</ControlLabel>
                            <FormControl placeholder='Recipe Ingredients' componentClass="textarea" defaultValue={recipe.ingredients}/>
                        </FormGroup>
                        <FormGroup controlId="instructionsList">
                            <ControlLabel>Recipe Instructions</ControlLabel>
                            <FormControl placeholder='Recipe Instructions' componentClass="textarea" defaultValue={recipe.instructions}/>
                        </FormGroup>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.DisplayList(recipe)}>Close</Button>
                    <Button onClick={() => this.onUpdate(recipe.id, recipetxt.value, ingredientsList.value, instructionsList.value)} bsStyle="primary">Save changes</Button>
                </Modal.Footer>
            </Modal>
        );

        this.setState({show: showform});
    };

    onDelete = (id) =>{ // removes the recipe
        if(confirm('Are you sure you want to delete this recipe')){
            this.props.onDelete(id);
            this.setState({show:''});
        }
    };
    render() {
        let recipeList = this.props.recipeList;
        return (
            <div>
                <div className='recipeList'>
                    <ul className='recipes'>

                        {recipeList.map((element, index) => { // prints recipe names to the screen
                            return <div key={element.id}>
                                <li onClick={() => this.DisplayList(element)}>{element.name}

                                </li>
                                <div className='displayInline'>
                                    <i role='button' title='edit recipe' className="fa fa-pencil fa-lg btn btn-success" aria-hidden="true" onClick={() => this.onEdit(element)}></i>
                                    <i role='button' title='remove recipe' className="fa fa-ban fa-lg btn btn-danger" aria-hidden="true" onClick={() => this.onDelete(element.id)}></i>
                                </div>
                            </div>
                        })}
                    </ul>
                </div>
                <div className='RecipeForm'>
                    {this.state.show} {/*prints either the modal or recipe text to screen*/}
                </div>
            </div>
        );
    }
}
const content = document.getElementById('content');
ReactDOM.render(
    <RecipeContainer/>, content)
