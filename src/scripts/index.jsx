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
    onDelete = (id) =>{
        let recipes = this.state.recipes;

        recipes = recipes.filter((element) =>{
            return element.id !== id
        })

        this.setState({recipes:recipes});
    }
    render() {
        return (
            <div >
                <button onClick={() => this.newRecipe()}>+ Add new Recipe</button>
                <div ><RecipeBox onDelete={this.onDelete} recipeList={this.state.recipes}/></div>
            </div>
        )
    }
}

class RecipeBox extends React.Component { // Displayes recipe Names
    constructor(props) {
        super(props)
        this.state = {show:''};
    }
    handleOnClick = (listName,listDesc) =>{
        // this.refs.inputbox.value = listName;
        // this.refs.textbox.value = listDesc;
        let display =(<div className='textlist'> <span>{listName}</span><ul> <li>{listDesc}</li> </ul></div>);
        //onClick={() => this.props.onDelete(element.id)
        this.setState({show:display});
    }
    render() {
        let recipeList = this.props.recipeList;
        return (
            <div>
                <div className='recipeList'>
                    <ul className='recipes'>

                        {recipeList.map((element,index) => {
                            return <div key={element.id}> <li onClick={()=>this.handleOnClick(element.name, element.ingredients)}  >{element.name} </li>
                            <div className='displayInline'>
                                <i role='button' className="fa fa-pencil fa-lg" aria-hidden="true"></i>
                                <i role='button' className="fa fa-ban fa-lg" aria-hidden="true" onClick={() => this.props.onDelete(element.id)}></i></div>
                            </div>
                        })}
                    </ul>
                </div>
                <div className='RecipeForm'>
                    {this.state.show}
                    <form action='#' className="hide">
                        <label  htmlFor='recipeName'>Recipe Name:</label> <input ref='inputbox' id='recipeName' type='text' required /> <br />
                        <label htmlFor='ingredientsList'>ingredients:</label> <textarea ref='textbox' id="ingredientsList" defaultValue=""></textarea>
                    </form>
                </div>
            </div>
        );
    }
}
const content = document.getElementById('content');
ReactDOM.render(
    <RecipeContainer/>, content)
