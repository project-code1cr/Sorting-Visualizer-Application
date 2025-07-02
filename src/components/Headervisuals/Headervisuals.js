import React from 'react';
import './Headervisuals.css';

class Headervisuals extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sortingAlgo : ""
        }
    }
    sortingAlgo(algo){

    }
    render(){
        return(<div>
            <button onClick={()=>this.genArray()}> New array </button>
            <button onClick={()=>{this.sortingAlgo('bs')}}> Bubble Sort </button>
            <button onClick={()=>{this.sortingAlgo('ms')}}> Merge Sort</button>
            <button onClick={()=>{this.sortingAlgo('qs')}}> Quick Sort</button>
            <button onClick={()=>{this.sortingAlgo('is')}}> Insertion Sort </button>
            <button onClick={()=>{this.sortingAlgo('ss')}}> Selection Sort</button>
            <p>{this.state.sortingAlgo}</p>
        </div>)
    }
}

export default Headervisuals