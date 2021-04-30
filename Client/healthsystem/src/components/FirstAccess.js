import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import API from "../api/API"

function FirstAccess({user}){

    let [userType,setUserType] = useState("")
    let [name,setName] = useState("")
    let [Surname,setSurname] = useState("")
    let [date,setdate] = useState("")
    let [CF,setCF] = useState("")


    let buttonClick = (e) => {
      setUserType(e)
      /*
      let googleId = user["googleId"]
      let type = e
      API.changeUserType(user["googleId"],type)
        .then(console.log("ok"))
        .catch(console.log("no ok"))
      return
      */
    }
    
    let submit = () =>{
      return
    }
    let renderByType = () => {
      return(<>
          <TextField id="filled-basic" label="Name"/>
          <TextField id="filled-basic" label="Surname"/>
          {userType == "patient" && 
            <TextField id="filled-basic" label="Fiscal Code"/>}
          <TextField id="date" label="Birthday" defaultValue="1980-01-01"   InputLabelProps={{shrink: true,}}/>
      </>)
    }
    return(<form>
        <h1>This is your first access please choose who you are </h1>

        <Button id={1} onClick={(e) => buttonClick("Doctor")} variant={"contained"} color={"primary"}>Doctor</Button>
        <Button id={2} onClick={(e) => buttonClick("Nurse")} variant={"contained"} color={"primary"}>Nurse</Button>
        <Button id={3} onClick={(e) => buttonClick("Patient")} variant={"contained"} color={"primary"}>Patient</Button>
        {renderByType()}
      </form>)
}

export default FirstAccess;