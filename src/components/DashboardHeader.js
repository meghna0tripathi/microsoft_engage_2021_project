import React from "react";
import Button from '@material-ui/core/Button';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import { useAuthContext } from "../context/AuthContext";
import { FiLogOut } from "react-icons/fi";
import { useClassroomContext } from "../context/ClassroomContext";

function DashboardHeader({ logout }) {
  const { currentUser } = useAuthContext();
  const { classroomState } = useClassroomContext();

  return (
    <>
      <div className="flex flex-row my-8 w-full justify-between items-center">
        <div className="flex flex-row justify-between items-center">
          
           
          
          <Button variant="outlined" color="primary"
            
            className="font-bold text-5xl  px-4 py-8  "
          >
            Welcome To your personalised web app {classroomState.isTeacher === true ? "Teacher" : "Student"}. This is an easy and efficient application made to ease out your college workload . {classroomState.isTeacher === true ? "You can schedule classes respected Teachers" : "Mark your attendance and attend classes"} !!!
          </Button>
          
            
        </div>
      </div>
        
       
        
    </>
  );
}

export default DashboardHeader;
