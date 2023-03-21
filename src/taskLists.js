import React, { useReducer, useRef, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Popover,
  Divider,
} from "@material-ui/core";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CloseIcon from "@mui/icons-material/Close";
import TitleIcon from "@mui/icons-material/Title";
import ScaleIcon from "@mui/icons-material/Scale";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import _ from "lodash";
import "./taskLists.scss";

const popOverFunctions = {
  weight: true,
  openTitleSection: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "openTitleSection":
      return { ...state, openTitleSection: !state.openTitleSection };
    case "weight":
      return { ...state, weight: !state.weight };
    default:
      return state;
  }
};

const TaskLists = () => {
  const [enable, dispatch] = useReducer(reducer, popOverFunctions);
  const [titleOfTasks, setTitleOfTasks] = useState("");
  const [taskName, setTaskName] = useState({
    task: "",
    weight: 1,
  });
  const [spinnerList, setSpinnerList] = useState([]);
  const [openPopover, setOpenPopover] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleClosePopover = () => {
    setAnchorEl(null);
    setOpenPopover(false);
  };

  const handlePlanNameSelectedMenu = (event) => {
    setOpenPopover(true);
    setAnchorEl(event.currentTarget);
  };

  const handleChecked = (action, index) => {
    const temp = spinnerList;
    action === "check"
      ? (temp[index].checked = !temp[index].checked)
      : temp.splice(index, 1);
    setSpinnerList([...temp]);
  };

  const handleInListChange = (action, e, index) => {
    const temp = spinnerList;
    temp[index][action] = e.target.value;
    setSpinnerList([...temp]);
  };

  const handleListData = (e) => {
    if (e.key === "Enter" && taskName.task.length > 0) {
      const temp = spinnerList;
      const obj = {
        name: taskName.task,
        weight: taskName.weight,
        checked: true,
      };
      temp.push(obj);
      setSpinnerList([...temp]);
      setTaskName({
        task: "",
        weight: 1,
      });
    }
  };

  const handleReChangePosition = () => {
    let temp = spinnerList;
    const item = temp.splice(dragItem.current, 1)[0];
    temp.splice(dragOverItem.current, 0, item);
    dragItem.current = null;
    dragOverItem.current = null;
    setSpinnerList([...temp]);
  };

  const renderAllLists = () => {
    return (
      <Grid container xs={12} className="lists-map">
        {spinnerList?.map((item, index) => {
          return (
            <>
              <Grid container item xs={10} className="text-weight-fields">
                {enable.weight && (
                  <Grid item xs={1}>
                    <input
                      placeholder="Input text here..."
                      value={item.weight}
                      className="textFieldInsideWeights"
                      onChange={(e) => handleInListChange("weight", e, index)}
                    />
                  </Grid>
                )}
                <Grid item xs={enable.weight ? 11 : 12}>
                  <input
                    placeholder="Input text here..."
                    value={item.name}
                    className="textFieldInside"
                    onChange={(e) => handleInListChange("name", e, index)}
                  />
                </Grid>
              </Grid>
              <Grid container item xs={2}>
                <Grid item xs={4}>
                  <DragIndicatorIcon className="drag-icon" />
                </Grid>
                <Grid item xs={4} className="checkbox-style">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={item.checked}
                        onClick={() => handleChecked("check", index)}
                        size="large"
                        style={{
                          color: "green",
                        }}
                      />
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <CloseIcon
                    onClick={() => handleChecked("delete", index)}
                    className="close-icon"
                  />
                </Grid>
              </Grid>
            </>
          );
        })}
      </Grid>
    );
  };

  const renderPopOver = () => {
    return (
      <Popover
        PaperProps={{
          style: {
            maxWidth: "20rem",
            padding: "1rem",
          },
        }}
        className="popup"
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Grid>
          <Grid container xs={12} className="popOver-wrapper">
            <Grid
              item
              xs={12}
              onClick={() => {
                handleClosePopover();
                dispatch({
                  type: "openTitleSection",
                });
              }}
              className="popOver-grid"
            >
              <TitleIcon className="color-icon" />
              <Typography component="span" className="popOver-text">
                {!enable.openTitleSection ? "Open" : "Close"} Title Section{" "}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              onClick={() => {
                handleClosePopover();
                dispatch({
                  type: "weight",
                });
              }}
              className="popOver-grid"
            >
              <ScaleIcon className="color-icon" />
              <Typography component="span" className="popOver-text">
                {!enable.weight ? "Enable" : "Disable"} Weight{" "}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              onClick={() => {
                setSpinnerList(_.shuffle(spinnerList));
                handleClosePopover();
              }}
              className="popOver-grid"
            >
              <AutorenewIcon className="color-icon" />
              <Typography component="span" className="popOver-text">
                Shuffle{" "}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              onClick={() => {
                setSpinnerList([]);
                handleClosePopover();
              }}
              className="popOver-grid"
            >
              <CleaningServicesIcon className="color-icon-red" />
              <Typography component="span" className="popOver-text">
                Remove All Inputs{" "}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Popover>
    );
  };

  const renderTitleSection = () => {
    return (
      <Grid container item xs={10} className="title-edit-section">
        <Divider className="section-divider" />
        <input
          placeholder="Title: Type Here..."
          value={titleOfTasks}
          className="textFieldSection"
          onChange={(e) => setTitleOfTasks(e.target.value)}
        />
        <Divider className="section-divider" />
      </Grid>
    );
  };

  const renderAllLists2 = () => {
    return (
      <Grid container xs={12} className="lists-map">
        {spinnerList?.map((item, index) => (
          <Grid
            container
            xs={12}
            key={index}
            draggable
            onDragStart={(e) => (dragItem.current = index)}
            onDragEnter={(e) => (dragOverItem.current = index)}
            onDragEnd={handleReChangePosition}
          >
            <Grid container item xs={10} className="text-weight-fields">
              {enable.weight && (
                <Grid item xs={1}>
                  <input
                    placeholder="Input text here..."
                    value={item.weight}
                    className="textFieldInsideWeights"
                    onChange={(e) => handleInListChange("weight", e, index)}
                  />
                </Grid>
              )}
              <Grid item xs={enable.weight ? 11 : 12}>
                <input
                  placeholder="Input text here..."
                  value={item.name}
                  className="textFieldInside"
                  onChange={(e) => handleInListChange("name", e, index)}
                />
              </Grid>
            </Grid>
            <Grid container item xs={2}>
              <Grid item xs={4}>
                <DragIndicatorIcon className="drag-icon" />
              </Grid>
              <Grid item xs={4} className="checkbox-style">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={item.checked}
                      onClick={() => handleChecked("check", index)}
                      size="large"
                      style={{
                        color: "green",
                      }}
                    />
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <CloseIcon
                  onClick={() => handleChecked("delete", index)}
                  className="close-icon"
                />
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderLists = () => {
    const a = false;
    return (
      <Grid
        container
        item
        xs={12}
        justifyContent="center"
        className="render-lists"
      >
        {enable.openTitleSection && renderTitleSection()}
        <Grid container item xs={10} className="lists">
          <Grid item xs={11} className="first-row-content">
            <Typography component="span" className="inputs-font">
              INPUTS
            </Typography>{" "}
            <Typography component="span" className="countBox">
              {spinnerList.length}
            </Typography>
          </Grid>
          <Grid item xs={1} className="actions-grid">
            <MoreHorizIcon
              onClick={handlePlanNameSelectedMenu}
              className="verticalIcon"
            />
          </Grid>
          <Grid
            container
            item
            xs={12}
            spacing={2}
            className="textField-actions-area"
          >
            <Grid container item xs={10}>
              {enable.weight && (
                <Grid item xs={1}>
                  <input
                    value={taskName.weight}
                    onChange={(e) =>
                      setTaskName({ ...taskName, weight: e.target.value })
                    }
                    className="textField-weights"
                  />
                </Grid>
              )}
              <Grid item xs={enable.weight ? 11 : 12}>
                <input
                  placeholder="Input text here..."
                  value={taskName.task}
                  onChange={(e) =>
                    setTaskName({ ...taskName, task: e.target.value })
                  }
                  className="textField"
                  onKeyDown={(e) => handleListData(e)}
                />
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Button
                onClick={() =>
                  console.log(JSON.stringify({ data: { spinnerList } }))
                }
                className="add-icon-style"
              >
                <AddIcon />
              </Button>
            </Grid>
          </Grid>
          <hr className="text-list-divider" />
          {a && renderAllLists()}
          {renderAllLists2()}
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid
      container
      xs={12}
      justifyContent="center"
      className="task-list-wrapper"
    >
      <Grid container item xs={9} className="main-wrapper">
        <Grid item xs={12} className="header-topic">
          <Typography className="first-sub-head">Picker Wheel</Typography>
          <Typography className="second-sub-head">
            Help you to make a random decision
          </Typography>
        </Grid>
        <Grid container item xs={12} className="main-wrapper-grid">
          <Grid item xs={12} lg={6}>
            {""}
          </Grid>
          <Grid item xs={12} lg={6} className="list-of-task-wrapper">
            {renderLists()}
          </Grid>
        </Grid>
        <Grid container item xs={12} className="final-grid">
          {""}
        </Grid>
      </Grid>
      {renderPopOver()}
    </Grid>
  );
};

export default TaskLists;
