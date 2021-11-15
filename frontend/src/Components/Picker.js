import React, {useState, useEffect} from "react";
import "../csses/Picker.css";
function MyPicker({value, setValue, choices}){

    // useEffect(()=>{
    //     console.log(props.value, props.firstValue, props.secondValue);
    // })
    return(
        <div className = "PickerContainer">
            {/* <div className = "circleContainer">
                <div className = {props.value == props.firstValue? "circleS":"circle"}
                    onClick = {()=>{props.setValue(props.firstValue)}} ></div>
            </div>
            <div className = "PickerTitle">{props.firstValue}</div>

            <div className = "circleContainer">
                <div className = {props.value === props.secondValue? "circleS":"circle"}
                    onClick = {()=>{props.setValue(props.secondValue)}} ></div>
            </div>
            <div className = "PickerTitle">{props.secondValue}</div> */}
            {
                choices.map((item)=>{
                    return(
                        <>
                        <div className = "circleContainer">
                            <div className = {value === item? "circleS":"circle"}
                                onClick = {()=>{setValue(item)}} ></div>
                        </div>
                        <div className = "PickerTitle">{item}</div>
                        </>
                    )
                })
            }
        </div>
    )
}

export default MyPicker;