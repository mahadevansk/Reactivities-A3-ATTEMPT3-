import { Box } from "@mui/material";
import ActivityCards from "./ActivityCards";
type Props = {activities:Activity[]

    selectActivity : (id:string) => void
      deleteActivity : (id:string) => void
}

export default function ActivityList({activities ,
  selectActivity, deleteActivity
  
} : Props) {
  return (

    <Box sx ={{display:'flex', flexDirection:'column', gap:3}}>
        {activities.map(activity => (
            <ActivityCards key={activity.id} activity={activity}
            selectActivity = {selectActivity}
            deleteActivity = {deleteActivity}
            />
       ))}
    </Box>

  )
}