import React, {useState, useEffect} from "react";
import "../csses/Picker.css";
function MyPicker(props){

    useEffect(()=>{
        console.log(props.value, props.firstValue, props.secondValue);
    })
    return(
        <div className = "PickerContainer">
            <div className = "circleContainer">
                <div className = {props.value == props.firstValue? "circleS":"circle"}
                    onClick = {()=>{props.setValue(props.firstValue)}} ></div>
            </div>
            <div className = "PickerTitle">{props.firstValue}</div>
            <div className = "circleContainer">
                <div className = {props.value === props.secondValue? "circleS":"circle"}
                    onClick = {()=>{props.setValue(props.secondValue)}} ></div>
            </div>
            <div className = "PickerTitle">{props.secondValue}</div>
        </div>
    )
}

export default MyPicker;