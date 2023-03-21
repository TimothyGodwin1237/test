import { Grid, Divider } from "@material-ui/core";
import TopAppBar from "./TopAppBar";
import TaskLists from "./taskLists";

import "./App.scss";

function App() {
  return (
    <Grid container className="main-wrapper">
      <TopAppBar />
      <Divider className="top-divider" />
      <Grid item xs={12} className="task-lists">
        <TaskLists />
      </Grid>
    </Grid>
  );
}

export default App;
