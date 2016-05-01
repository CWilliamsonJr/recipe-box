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
                    <button>+ Add new Recipe</button>
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
                    name: "Peantbutter & Jelly Sandwich",
                    Ingredients: "bred, Peantbutter,jelly"

                }, {
                    id: lil.uuid(),
                    name: "Grilled Cheese",
                    Ingredients: "bread, cheese,butter"
                }, {
                    id: lil.uuid(),
                    name: "Turkey Sandwich",
                    Ingredients: "bread, honey roasted turkey, mustard, letteuce, tomato"
                }
            ]
        }
    }
    handleOnClick(event){
        this.refs.inputbox.value = event.target.id;
        console.log(event);
    }
    render() {
        return (
            <div onClick={() => this.handleOnClick(event)}>
                <div className='recipeList'><RecipeBox recipeList={this.state.recipes}/></div>
                <div className='RecipeForm'>
                    <form action='#'>
                        <label  htmlFor='recipeName'>Recipe Name:</label> <input ref='inputbox' id='recipeName' type='text' required /> <br />
                        <label htmlFor='ingredientsList'>Ingredients:</label> <textarea ref='textbox' id="ingredientsList" defaultValue=""></textarea>
                    </form>
                </div>
            </div>
        )
    }
}

class RecipeBox extends React.Component { // Displayes recipe Names
    constructor(props) {
        super(props)

    }

    render() {
        let recipeList = this.props.recipeList;
        return (
            <div>
                <div>
                    <ul>
                        {recipeList.map((element,index) => {
                            return <li id={'id_'+index} key={element.id}>{element.name}</li>
                        })}
                    </ul>
                </div>

            </div>
        );
    }
}

ReactDOM.render(
    <RecipeContainer/>, content)
