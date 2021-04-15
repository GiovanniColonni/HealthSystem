import React from "react"
import Button from "@material-ui/core/Button"


function FirstAccess(){
    
    let buttonClick = (e) => {
      
      console.log(e)
    }


    return(<div>
        <h1>This is your first access please choose who you are </h1>
        <Button id={1} onClick={(e) => buttonClick("Doctor")} variant={"contained"} color={"primary"}>Doctor</Button>
        <Button id={2} onClick={(e) => buttonClick("Nurse")} variant={"contained"} color={"primary"}>Nurse</Button>
        <Button id={3} onClick={(e) => buttonClick("Patient")} variant={"contained"} color={"primary"}>Patient</Button>
        
      </div>)
}

export default FirstAccess;