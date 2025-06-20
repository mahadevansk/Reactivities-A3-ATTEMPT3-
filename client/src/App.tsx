import { List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";
import {  useEffect, useState } from "react"


function App() {

  const [activities,setActivities] = useState<Activity[]>([]);

  useEffect(() => {


    // going to use the Axios to fetch the data from the server 
    // fetch('https://localhost:5101/api/activities')
    // .then(response => response.json())
    // .then(data => setActivities(data))

    axios.get<Activity[]>('https://localhost:5101/api/activities')
    .then(response => setActivities(response.data))

  }, [])

  return (
      <>
        <Typography variant='h3'>Reactivities</Typography>
        <List >
          {
            activities.map((activity) => (
              <ListItem key={activity.id}>
                <ListItemText>
                  {activity.title}
                </ListItemText>
                </ListItem>
            ))
          }
        </List>
      </>
  )
}

export default App
