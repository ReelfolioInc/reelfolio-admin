import {initializeApollo} from "../lib/apolloClient";
import GET_EPISODES from "./../lib/graphql/getEpisodes.graphql";
import {useQuery} from "@apollo/client";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import React, {Fragment, useEffect, useState} from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import {useRouter} from "next/router";



async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_EPISODES,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}


function Home() {

  let router = useRouter();
  let [users, setUsers] = useState([]);
  let [currentSection,setCurrentSection] = useState(0);
  let [accessToken,setAccessToken] = useState(null);


  useEffect(() => {
      let accessToken = window.localStorage.getItem("reelfolioToken");
      if(accessToken){
          setAccessToken(window.localStorage.getItem("reelfolioToken"));
      }else{
          router.push("/login");
      }
  },[]);

  useEffect(async () => {

      if(accessToken){
           if(currentSection === 0) {
               let users = await getAllUsers();
                setUsers(users);
          }else if(currentSection === 1){
               let users = await getPendingApprovalUsers();
               setUsers(users);
          }else if(currentSection === 2){}
      }

  },[currentSection,accessToken]);


  const getAllUsers = async () => {
        let users = await fetch("/api/get-users",{
                headers: {
                    "Content-Type": "application/json",
                    "accessToken": accessToken
                }
            }).then(res => res.json());
        return users.users ?? [];
  };

  const getPendingApprovalUsers = async () => {
        let users = await fetch("/api/get-users?isApproved=false&isRejected=false",{
                headers: {
                    "Content-Type": "application/json",
                    "accessToken": accessToken
                }
            }).then(res => res.json());
        return users.users ?? [];
  };




  const onSectionChangeHandler = (value) => {
      setCurrentSection(value);
  };

  const approveUser = async (userId) => {
      let acceptRes = await fetch(`/api/approve-user?userId=${userId}`,{
            headers: {
                "Content-Type": "application/json",
                "accessToken": accessToken
            }
        }).then(res => res.json());

       if(currentSection === 0) {
           let users = await getAllUsers();
            setUsers(users);
      }else if(currentSection === 1){
           let users = await getPendingApprovalUsers();
           setUsers(users);
      }


  };

  const rejectUser = async (userId) => {
      let rejectRes = await fetch(`/api/reject-user?userId=${userId}`,{
            headers: {
                "Content-Type": "application/json",
                "accessToken": accessToken
            }
        }).then(res => res.json());

       if(currentSection === 0) {
           let users = await getAllUsers();
            setUsers(users);
      }else if(currentSection === 1){
           let users = await getPendingApprovalUsers();
           setUsers(users);
      }
  };

   const deleteUser = async (userId) => {
      let deleteRes = await fetch(`/api/delete-user?userId=${userId}`,{
            headers: {
                "Content-Type": "application/json",
                "accessToken": accessToken
            }
        }).then(res => res.json());

       if(currentSection === 0) {
           let users = await getAllUsers();
            setUsers(users);
      }else if(currentSection === 1){
           let users = await getPendingApprovalUsers();
           setUsers(users);
      }
  };



  return (
    <div className="home-page">
      <AppBar position="fixed" className="app-bar">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className="drawer"
        variant="permanent"
        classes={{
          paper: "drawer-paper",
        }}
      >
        <Toolbar />
        <div className="drawer-container">
           <List>
              <ListItem button onClick={() => onSectionChangeHandler(0)}>
                  <ListItemText primary={"All Users"}/>
              </ListItem>
               <ListItem button onClick={() => onSectionChangeHandler(1)}>
                  <ListItemText primary={"Pending Approval"}/>
              </ListItem>
          </List>
        </div>
      </Drawer>
        <div className="content">
            <div className="content-inner">
                <Typography variant={"h3"} component="div"><Box mb={2}>
                    All users
                </Box></Typography>
                <Grid container direction={"column"}>
                     <Grid container direction={"row"} item xs={12} spacing={2}>
                          <Grid item xs={3} zeroMinWidth={true}>
                              <Typography noWrap component={"div"}><Box fontWeight="fontWeightBold">User Id</Box></Typography>
                          </Grid>
                          <Grid item xs={2}>
                              <Typography><Box component={"div"} fontWeight="fontWeightBold">Full Name</Box></Typography>
                          </Grid>
                          <Grid item xs={3}>
                              <Typography><Box component={"div"} fontWeight="fontWeightBold">Previous Work</Box></Typography>
                          </Grid>
                         <Grid item xs={1}>
                             <Typography><Box component={"div"} fontWeight="fontWeightBold">Status</Box></Typography>
                          </Grid>
                          <Grid item xs={2}>
                              <Typography><Box component={"div"} fontWeight="fontWeightBold">Actions</Box></Typography>
                          </Grid>
                     </Grid>
                    {users.map(user => {
                      return(
                          <Fragment key={user._id}>
                               <Grid container direction={"row"} item xs={12} spacing={2}>
                                    <Grid item xs={3} zeroMinWidth={true}>
                                        <Typography noWrap>{user._id}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography>{`${user.firstName} ${user.lastName}`}</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography>
                                            {user.previousWork && user.previousWork.map(work => {
                                              return(
                                                  <a href={work.includes("http") ? work : `https://${work}`} key={work} target={"_blank"}>
                                                      {work}
                                                  </a>
                                              )
                                            })}
                                        </Typography>
                                    </Grid>
                                   <Grid item xs={1}>
                                       <Typography>
                                           {user.isApproved && "Approved"}
                                           {!user.isApproved && user.isRejected && "Rejected"}
                                           {!user.isApproved && !user.isRejected && "Pending"}
                                       </Typography>
                                   </Grid>

                                     <Grid item xs={2}>
                                         {!user.isApproved && !user.isRejected &&
                                             <Fragment>
                                                 <Button onClick={() => approveUser(user._id)}>Approve</Button>
                                                 <Button onClick={() => rejectUser(user._id)}>Reject</Button>
                                             </Fragment>
                                         }
                                         <Button onClick={() => deleteUser(user._id)}>Delete</Button>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider/>
                                </Grid>
                          </Fragment>
                      )
                    })}
                </Grid>
            </div>

        </div>

    </div>
  )
}

// Home.layout = (props) => {
//   return(
//       <div className="home-layout">
//         {props.children}
//       </div>
//   )
// };


export default Home;

