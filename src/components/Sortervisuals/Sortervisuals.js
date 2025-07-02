/* eslint-disable eqeqeq */
import React from "react";
import ReactSlider from "react-slider";
import "./Sortervisuals.css";
import * as bs from "../../sortingAlgorithms/bubbleSort.js";
import * as is from "../../sortingAlgorithms/insertionSort.js";
import * as ss from "../../sortingAlgorithms/selectionSort.js";
import * as qs from "../../sortingAlgorithms/quickSort.js";
import * as ms from "../../sortingAlgorithms/mergeSort.js";

class Sortervisuals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      NOELEM: 20,
      speed: 201 - 20,
      valueNow: 10,
      running: false,
      paused: false,
    };
  }

  componentDidMount() {
    this.genArray();
  }

  genArray() {
    var array = [];

    const MAX_VALUE = 100;
    const MIN_VALUE = 5;
    const NOELEM = this.state.NOELEM;
    for (let idx = 0; idx < NOELEM; idx++) {
      array.push(
        Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE) + 1) + MIN_VALUE
      );
    }
    // console.log("to sort");
    // console.log(array);
    this.setState({ array });
  }
  animate(plan) {
    var speed = this.state.speed;
    var array = this.state.array;
    console.log(plan);
    const arraybarlist = document.getElementsByClassName("value-bar");
    for (let move = 0; move < plan.pos.length; move++) {
      // eslint-disable-next-line no-loop-func
      setTimeout(() => {
        var pos1 = plan.pos[move][0];
        var pos2 = plan.pos[move][1];
        if (plan.swap[move]) {
          //a swap or not
          var temp = array[pos1];
          array[pos1] = array[pos2];
          array[pos2] = temp;
          if (move != 0) {
            arraybarlist[plan.pos[move - 1][0]].style.backgroundColor = "blue";
            if (plan.pos[move - 1][1] >= 0) {
              arraybarlist[plan.pos[move - 1][1]].style.backgroundColor =
                "blue";
            }
          }

          arraybarlist[pos1].style.backgroundColor = "red";
          arraybarlist[pos2].style.backgroundColor = "red";
          this.setState({ array });
        } else {
          var pos1 = plan.pos[move][0];
          var pos2 = plan.pos[move][1];
          if (move != 0) {
            arraybarlist[plan.pos[move - 1][0]].style.backgroundColor = "blue";
            arraybarlist[plan.pos[move - 1][1]].style.backgroundColor = "blue";
          }

          arraybarlist[pos1].style.backgroundColor = "green";
          if (pos2 >= 0) {
            arraybarlist[pos2].style.backgroundColor = "green";
          }

          this.setState({ array });
        }
      }, move * speed);
    }
    console.log("FINITO");
    setTimeout(() => {
      array = plan.sorted;
      this.setState({ array });
      const arraybarlist = document.getElementsByClassName("value-bar");
      for (let idx = 0; idx < arraybarlist.length; idx++) {
        arraybarlist[idx].style.backgroundColor = "green";
      }
      setTimeout(() => {
        for (let idx = 0; idx < arraybarlist.length; idx++) {
          arraybarlist[idx].style.backgroundColor = "blue";
        }
        this.setState({ running: false });
      }, speed * 3);
    }, plan.pos.length * speed + 20);
  }

  QueueAnimate(plan) {
    var speed = this.state.speed;
    var array = this.state.array;
    console.log(plan);
    var animationSteps = [];
    const arraybarlist = document.getElementsByClassName("value-bar");
    for (let move = 0; move < plan.pos.length; move++) {
      var step = function(plan) {
        var pos1 = plan.pos[move][0];
        var pos2 = plan.pos[move][1];
        if (plan.swap[move]) {
          //a swap or not
          var temp = array[pos1];
          array[pos1] = array[pos2];
          array[pos2] = temp;
          if (move != 0) {
            arraybarlist[plan.pos[move - 1][0]].style.backgroundColor = "blue";
            if (plan.pos[move - 1][1] >= 0) {
              arraybarlist[plan.pos[move - 1][1]].style.backgroundColor =
                "blue";
            }
          }

          arraybarlist[pos1].style.backgroundColor = "red";
          arraybarlist[pos2].style.backgroundColor = "red";
          this.setState({ array });
        } else {
          var pos1 = plan.pos[move][0];
          var pos2 = plan.pos[move][1];
          if (move != 0) {
            arraybarlist[plan.pos[move - 1][0]].style.backgroundColor = "blue";
            arraybarlist[plan.pos[move - 1][1]].style.backgroundColor = "blue";
          }

          arraybarlist[pos1].style.backgroundColor = "green";
          if (pos2 >= 0) {
            arraybarlist[pos2].style.backgroundColor = "green";
          }

          this.setState({ array });
        }
      };
      var stepWrap = this.wrapFunction(step, this, [plan]); //--------------------
      animationSteps.push(stepWrap);
    }
    var step = function(plan) {
      array = plan.sorted;
      this.setState({ array });
      const arraybarlist = document.getElementsByClassName("value-bar");
      for (let idx = 0; idx < arraybarlist.length; idx++) {
        arraybarlist[idx].style.backgroundColor = "green";
      }
      setTimeout(() => {
        for (let idx = 0; idx < arraybarlist.length; idx++) {
          arraybarlist[idx].style.backgroundColor = "blue";
        }
        this.setState({ running: false });
      }, speed * 3);
    };
    var stepWrap = this.wrapFunction(step, this, [plan]); //----------------------------------
    animationSteps.push(stepWrap);
    this.display(animationSteps);
  }
  /*
    //https://stackoverflow.com/questions/899102/how-do-i-store-javascript-functions-in-a-queue-for-them-to-be-executed-eventuall
    wrapFunction(fn, context, params) {
        return function() {
            fn.apply(context, params);
        };
    }
    */

  /*
    display(aniSteps){
        var count = 1;
        while(aniSteps.length>0){
            if(!this.state.paused){
                (aniSteps.shift())();
            }
        }
    }


    QuickSortanimate(plan){
        var speed = this.state.speed;
        var array = this.state.array;
        console.log(plan);
        const arraybarlist = document.getElementsByClassName('value-bar');
        for(let move = 0; move <plan.pos.length;move ++){
            // eslint-disable-next-line no-loop-func
            setTimeout(()=>{
                var pos1 = plan.pos[move][0];
                var pos2 = plan.pos[move][1];
                if(plan.isPartition){
                    if(arraybarlist[plan.pos[move][0]].style.backgroundColor == 'yellow'){
                        arraybarlist[plan.pos[move][0]].style.backgroundColor = 'blue';
                    }
                    else{
                        arraybarlist[plan.pos[move]].style.backgroundColor = 'yellow';
                    }
                }
                else if(plan.swap[move]){//a swap or not
                    var temp = array[pos1];
                    array[pos1] = array[pos2];
                    array[pos2] = temp;
                    if(move!=0){
                        arraybarlist[plan.pos[move-1][0]].style.backgroundColor = 'blue';
                        arraybarlist[plan.pos[move-1][1]].style.backgroundColor = 'blue';
                    }

                    arraybarlist[pos1].style.backgroundColor = 'red';
                    arraybarlist[pos2].style.backgroundColor = 'red';
                    this.setState({array})
                }else{
                    var pos1 = plan.pos[move][0];
                    var pos2 = plan.pos[move][1];
                    if(move!=0){
                        arraybarlist[plan.pos[move-1][0]].style.backgroundColor = 'blue';
                        arraybarlist[plan.pos[move-1][1]].style.backgroundColor = 'blue';
                    }
                    
                    arraybarlist[pos1].style.backgroundColor = 'green';
                    arraybarlist[pos2].style.backgroundColor = 'green';
                    
                    this.setState({array})
                }
            },move * speed)
        }
        console.log("FINITO")
        setTimeout(()=>{
            array = plan.sorted;
            this.setState({array});
            const arraybarlist = document.getElementsByClassName('value-bar');
            for(let idx = 0; idx < arraybarlist.length; idx++){
                arraybarlist[idx].style.backgroundColor = 'green';
            }
            setTimeout(()=>{
                for(let idx = 0; idx < arraybarlist.length; idx++){
                    arraybarlist[idx].style.backgroundColor = 'blue';
                }
            },speed*3);
        },(((plan.pos.length) * speed) + 20))
    }
    */
  bubbleSort() {
    console.log("bubblesort");
    if (!this.state.running) {
      this.setState({ running: true });
      const bubbleSortPlan = bs.bubbleSort(this.state.array.filter(() => true));
      this.animate(bubbleSortPlan);
    }
  }

  mergeSort() {
    console.log("mergesort");
    if (!this.state.running) {
      this.setState({ running: true });
      const mergeSortPlan = ms.mergeSort(this.state.array.filter(() => true));
      this.animate(mergeSortPlan);
    }
  }

  quickSort() {
    console.log("quicksort");
    if (!this.state.running) {
      this.setState({ running: true });
      const quickSortPlan = qs.quickSort(this.state.array.filter(() => true));
      this.animate(quickSortPlan);
    }
  }

  insertionSort() {
    console.log("insertionsort");
    if (!this.state.running) {
      this.setState({ running: true });
      const insertionSortPlan = is.insertionSort(
        this.state.array.filter(() => true)
      );
      this.animate(insertionSortPlan);
    }
  }

  selectionSort() {
    console.log("selectionsort");
    if (!this.state.running) {
      this.setState({ running: true });
      const selectionSortPlan = ss.selectionSort(
        this.state.array.filter(() => true)
      );
      this.animate(selectionSortPlan);
    }
  }

  changeNum(val) {
    var speed = 201 - this.state.NOELEM;
    if (val < 20) {
      const arraybarlist = Array.from(
        document.getElementsByClassName("value-bar")
      );
      arraybarlist.forEach((box) => {
        box.style.fontSize = `${20}px`;
      });
    } else {
      const arraybarlist = Array.from(
        document.getElementsByClassName("value-bar")
      );
      arraybarlist.forEach((box) => {
        box.style.fontSize = `${0}px`;
      });
    }

    this.setState({ NOELEM: val });
    this.setState({ speed });
    this.genArray();
  }

  render() {
    return (
      <div>
        <div className="Header">
          <div className="button-container">
            <button className="button" onClick={() => this.genArray()}>
              {" "}
              New array{" "}
            </button>
          </div>
          <div className="vl"></div>
          <div className="button-container">
            <button className="button" onClick={() => this.bubbleSort()}>
              {" "}
              Bubble Sort{" "}
            </button>
          </div>
          <div className="button-container">
            <button className="button" onClick={() => this.mergeSort()}>
              {" "}
              Merge Sort
            </button>
          </div>
          <div className="button-container">
            <button className="button" onClick={() => this.quickSort()}>
              {" "}
              Quick Sort
            </button>
          </div>
          <div className="button-container">
            <button className="button" onClick={() => this.insertionSort()}>
              {" "}
              Insertion Sort{" "}
            </button>
          </div>
          <div className="button-container">
            <button className="button" onClick={() => this.selectionSort()}>
              {" "}
              Selection Sort
            </button>
          </div>
          <ReactSlider
            onChange={(val) => {
              if (!this.state.running) {
                this.changeNum(val);
              }
            }}
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            defaultValue={this.state.NOELEM}
            min="10"
            max="200"
            renderThumb={(props, state) => (
              <div {...props}>{state.valueNow}</div>
            )}
          />
          {
            //<div className='button-container'><button className='button' onClick={()=>{this.setState({paused:!this.state.paused})}}>PAUSE</button></div>
          }
        </div>

        <div className="array-holder">
          {/* Maps value in the array to its own div tag*/}
          {/*------------------- POTENTIAL ERROR SPOT WITH key = IDX -------------------------*/}
          {this.state.array.map((value, idx) => (
            <div
              className="value-bar"
              key={idx}
              style={{
                paddingBottom: `${value * 5}px`,
                paddingLeft: `${Math.floor(
                  window.innerWidth / (this.state.array.length * 2) / 2
                )}px`,
                paddingRight: `${Math.floor(
                  window.innerWidth / (this.state.array.length * 2) / 2
                )}px`,
              }}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Sortervisuals;
