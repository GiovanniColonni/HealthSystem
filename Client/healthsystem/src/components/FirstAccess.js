import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import API from "../api/API"

function FirstAccess({user}){

    let [userType,setUserType] = useState("")
    let [name,setName] = useState("")
    let [surname,setSurname] = useState("")
    let [CF,setCF] = useState("")
    let [birthday,setBirthday] = useState("")

    let buttonClick = (e) => {
      setUserType(e)
    }
    
    let submit = () =>{
      API.submitFirstAccess(user["googleId"],name,surname,birthday,CF,userType)
        .then()
        .catch()
    }
    let onChangeName = (e) => {
        setName(e.target.value)
    }
    let onChangeSurname = (e) => {
      setSurname(e.target.value)
    }
    let onChangeCF = (e) => {
      // controllare se corretto il CF
      setCF(e.target.value)
      return
    }
    let onChangeBirthdate = (e) => {
        setBirthday(e.target.value)
    }

    let renderByType = () => {
      return(<>
          <TextField id="filled-basic" label="Name" onChange={(e)=>{onChangeName(e)}}/>
          <TextField id="filled-basic" label="Surname" onChange={(e)=>{onChangeSurname(e)}}/>
          {(userType === "Patient") && <TextField onChange={(e)=> onChangeCF(e)} id="filled-basic" label="Fiscal Code"/>}
          <TextField id="date" onChange={(e) => onChangeBirthdate(e)} label="Birthday" defaultValue="1980-01-01"   InputLabelProps={{shrink: true,}}/>
          <Button id={4} onClick={()=> submit()} variant={"contained"} color={"secondary"}>Submit Form</Button>
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