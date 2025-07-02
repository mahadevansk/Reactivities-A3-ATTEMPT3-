import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";


function App() {

  const [activities, setActivities] = useState<Activity[]>([]);

  // defining other functions temperoryly instead of  using the statemanagement. 
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {


    // going to use the Axios to fetch the data from the server 
    // fetch('https://localhost:5101/api/activities')
    // .then(response => response.json())
    // .then(data => setActivities(data))

    axios.get<Activity[]>('https://localhost:5101/api/activities')
      .then(response => setActivities(response.data))

  }, [])

  const handleSelectedActivity = (id:string) => {
    setSelectedActivity(activities.find(x => x.id === id))
  }

  const handleCancelSelectedActivity = () => {
    setSelectedActivity(undefined)
  }

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectedActivity(id);
    else handleCancelSelectedActivity();
    setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }

  const handleSubmitForm = (activity:Activity) => {
    if (activity.id) {
      setActivities(activities.map(x => x.id == activity.id ? activity : x ))
    }
    else {
      const newActivity = {...activity, id: activities.length.toString()}
      setSelectedActivity(newActivity)
      setActivities([...activities, newActivity])
    }

    setEditMode(false);
  }


  const handleDelete = (id:string) => {
    setActivities(activities.filter(x => x.id !== id ))
  }

  return (
    <Box sx={{bgcolor: '#eeeeee'}}>
      <CssBaseline />
      <NavBar openForm = {handleOpenForm}/>
      <Container maxWidth = "xl" sx = {{mt:3}}> 
        <ActivityDashboard activities = {activities}
        selectActivity = {handleSelectedActivity}
        cancelSelectActivity = {handleCancelSelectedActivity}
        selectedActivity = {selectedActivity}
        editMode = {editMode}
        openForm = {handleOpenForm}
        closeForm = {handleFormClose}
        
        submitForm = {handleSubmitForm}
        deleteActivity = {handleDelete}
        >

        </ActivityDashboard>

      </Container>

    </Box>
  )
}

export default App
