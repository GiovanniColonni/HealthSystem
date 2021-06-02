import {useHistory} from "react-router"
import {Button} from "@material-ui/core/"

function Home(){
    
    const history = useHistory();

    return(
        <div>
            <h1>Home</h1>
            <Button onClick={()=>hisotry.push("/measure")}>Start a measure</Button>
            <Button onClick={()=>hisotry.push("/videocall")}>Start the appointment</Button>
	    </div>
    )
}
export default Home