import React from "react"
import Button from "@material-ui/core/Button"

import API from "../api/API"

function FirstAccess({user}){
    
    let buttonClick = (e) => {
      let googleId = user["googleId"]
      let type = e
      API.changeUserType(user["googleId"],type)
        .then(console.log("ok"))
        .catch(console.log("no ok"))
      return
    }


    return(<div>
        <h1>This is your first access please choose who you are </h1>
        <Button id={1} onClick={(e) => buttonClick("Doctor")} variant={"contained"} color={"primary"}>Doctor</Button>
        <Button id={2} onClick={(e) => buttonClick("Nurse")} variant={"contained"} color={"primary"}>Nurse</Button>
        <Button id={3} onClick={(e) => buttonClick("Patient")} variant={"contained"} color={"primary"}>Patient</Button>
        
      </div>)
}

export default FirstAccess;