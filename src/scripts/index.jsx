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
                    name: "Peantbutter & Jelly Sandwich",
                    ingredients: "bread, Peantbutter,jelly"

                }, {
                    id: lil.uuid(),
                    name: "Grilled Cheese",
                    ingredients: "bread, cheese,butter"
                }, {
                    id: lil.uuid(),
                    name: "Turkey Sandwich",
                    ingredients: "bread, honey roasted turkey, mustard, letteuce, tomato"
                }
            ]
        }
    }
    newRecipe = () => {
        //this.refs.inputbox.value ;
        this.setState({recipes:this.state.recipes.concat({
            id: lil.uuid(),
            name: "New Recipe",
            ingredients: "Add ingredients"
        })})
    }

    render() {
        return (
            <div >
                <button onClick={() => this.newRecipe()}>+ Add new Recipe</button>
                <div ><RecipeBox recipeList={this.state.recipes}/></div>
            </div>
        )
    }
}

class RecipeBox extends React.Component { // Displayes recipe Names
    constructor(props) {
        super(props)

    }
    handleOnClick = (listName,listDesc) =>{
        this.refs.inputbox.value = listName;
        this.refs.textbox.value = listDesc;
    }
    render() {
        let recipeList = this.props.recipeList;
        return (
            <div>
                <div className='recipeList'>
                    <ul>
                        {recipeList.map((element,index) => {
                            return <li onClick={()=>this.handleOnClick(element.name, element.ingredients)}  key={element.id}>{element.name}</li>
                        })}
                    </ul>
                </div>
                <div className='RecipeForm'>
                    <form action='#' className="hide">
                        <label  htmlFor='recipeName'>Recipe Name:</label> <input ref='inputbox' id='recipeName' type='text' required /> <br />
                        <label htmlFor='ingredientsList'>ingredients:</label> <textarea ref='textbox' id="ingredientsList" defaultValue=""></textarea>
                    </form>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <RecipeContainer/>, content)
