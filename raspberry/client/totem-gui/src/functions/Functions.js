let md5 = require('md5');
const prefix = "https://meet.jit.si/"
const suffix = "#config.prejoinPageEnabled=false"
function createMeeting(patientId, doctorId){
    const hash = md5(patientId+doctorId+Date.now())
    return prefix + hash + suffix
}

const Functions = {createMeeting}
export default Functions;