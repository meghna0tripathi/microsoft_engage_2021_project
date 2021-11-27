import React, { useEffect, useState } from "react";
import { BiCalendarPlus } from "react-icons/bi";
import Modal from "react-modal";
import Button from '@material-ui/core/Button';
import LoginIcon from '@material-ui/icons/AccountCircle';

import { useHistory } from "react-router-dom";
import Calendar from "../components/Calendar";
import DashboardHeader from "../components/DashboardHeader";
import { useAuthContext } from "../context/AuthContext";
import { useDashboardContext } from "../context/DashboardContext";
import firebase from "../firebase/firebase";
import "../public/css/dashboard.css";
import AddEventPopup from "./AddEventPopup";
import DashboardHome from "./DashboardHome";
import DashboardProfile from "./DashboardProfile";
import ScheduledEvent from "./ScheduledEvent";
import DashboardClassroom from "./DashboardClassroom";
import { useClassroomContext } from "../context/ClassroomContext";
import { GrClose } from "react-icons/gr";
import SideBar from "./SideBar";
import LogoutIcon from '@material-ui/icons/ExitToApp';

const modalStyle = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        position: "absolute",
        border: "none",
        background: "transparent",
        borderRadius: "0px",
    },
};

function TimeTable(){
    const [modalIsOpen, toggleModal] = useState(false);
    const [snackbar, toggleSnackbar] = useState(true);
    const [eventData, setEventData] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);

    const { dashboardState, updateData } = useDashboardContext();
    const { classroomState, setTeacherExplicit } = useClassroomContext();

    const { currentUser, setCurrentUser } = useAuthContext();

    const history = useHistory();

    var snackbarStyle;
    if (classroomState.isTeacher === false && snackbar === true) {
        snackbarStyle = "flex flex-row bg-grey-900 justify-between";
    } else {
        snackbarStyle = "flex flex-row bg-grey-900 justify-between hidden";
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setCurrentUser(user);
                const response = firebase.firestore().collection("users").doc(user.uid);
                response.get().then((snapshot) => {
                    var temp = {};
                    if (snapshot.data()) temp = snapshot.data().attendanceData;
                    var tempEvents = [];
                    if (snapshot.data()) tempEvents = getTodayEvents(snapshot.data());
                    updateData(temp, tempEvents);
                    setTeacherExplicit(snapshot.data().isTeacher);
                });
            } else {
                history.replace("/");
            }
        });
    }, []);

    function logout() {
        firebase
            .auth()
            .signOut()
            .then(() => {
                history.replace("/");
            });
    }

    function getToday() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0");
        var yyyy = today.getFullYear();

        today = yyyy + "-" + mm + "-" + dd;
        return today;
    }

    function getTodayEvents(snapshotData) {
        var today = getToday();
        const events = snapshotData.events.filter((event) => event.date === today);
        return events;
    }

    function openModal() {
        setEventData(null);
        toggleModal(true);
    }

    function closeModal() {
        toggleModal(false);
    }

    function closeSnackbar() {
        toggleSnackbar(false);
    }



    return (<div className="flex dashboard-wall-container flex-col md:items-center 2xl:mt-0 md:px-2 mt-8 md:flex-grow-1 bg-grey-200">
       
    </div>);
}

export default TimeTable;