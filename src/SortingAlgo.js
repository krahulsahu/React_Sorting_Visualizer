import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Bars from "./components/Bars";
import bubbleSort from "./algorithms/BubbleSort";
import selectionSort from "./algorithms/SelectionSort";
import insertionSort from "./algorithms/InsertionSort";
import mergeSort from "./algorithms/MergeSort";
import quickSort from "./algorithms/QuickSort";

const SortingAlgo = () => {

  const generateRandomArray = (len) => {
    setCompleted(false);
    setSorting(false);
    setSortedIndex([]);

    const randomArray = Array.from(Array(len + 1).keys()).slice(1); 

    for (let i = randomArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i - 1));
      const temp = randomArray[i];

      randomArray[i] = randomArray[randomIndex];
      randomArray[randomIndex] = temp;
    }

    setBlocks(randomArray);
  };

  const [algo, setAlgo] = useState("bubbleSort");
  const [len, setLength] = useState(30);
  const [blocks, setBlocks] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [completed, setCompleted] = useState(true);
  const [speed, setSpeed] = useState(250);
  const [compare, setCompare] = useState([]);
  const [swap, setSwap] = useState([]);
  const [sortedIndex, setSortedIndex] = useState([]);

  useEffect(() => {
    generateRandomArray(len);
  }, [len, algo]);
  const handleAlgo = (event) => {
    setAlgo(event.target.value);
  };

  const handleLength = (event) => {
    setLength(Number(event.target.value));
  };

  const handleSpeed = (event) => {
    setSpeed(Math.ceil(400 / Number(event.target.value)));
  };

  const handleSort = () => {
    const sortAccOrder = (order) => {
      (function loop(i) {
        setTimeout(function () {
          const [j, k, arr, index] = order[i];
          setCompare([j, k]);
          setSwap([]);

          if (index !== null) {
            setSortedIndex((prevState) => [...prevState, index]);
          }

          if (arr) {
            setBlocks(arr);
            if (j !== null || k != null) setSwap([j, k]);
          }

          if (++i < order.length) {
            loop(i);
          } else {
            setSorting(false);
            setCompleted(true);
          }
        }, speed);
      })(0);
    };

    setSorting(true);

    algo === "bubbleSort"
      ? sortAccOrder(bubbleSort(blocks))
      : algo === "selectionSort"
      ? sortAccOrder(insertionSort(blocks))
      : algo === "insertionSort"
      ? sortAccOrder(selectionSort(blocks))
      : algo === "mergeSort"
      ? sortAccOrder(mergeSort(blocks))
      : algo === "quickSort"
      ? sortAccOrder(quickSort(blocks))
      : (() => {
          setSorting(false);
          setCompleted(true);
        })();
  };

  return (
   <div className="algo">
      <Navbar
        generateRandomArray={() => generateRandomArray(len)}
        handleLength={handleLength}
        handleSpeed={handleSpeed}
        handleAlgo={handleAlgo}
        handleSort={handleSort}
        sorting={sorting}
        completed={completed}
        len={len}
        speed={speed}
        algo={algo}
      />

      <Bars
        blocks={blocks}
        compare={sorting && compare}
        swap={sorting && swap}
        sorted={sortedIndex}
      />
    </div>
  );
};

export default SortingAlgo;
