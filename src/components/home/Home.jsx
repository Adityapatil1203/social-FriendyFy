// import React from 'react'
// import classes from './home.module.css'
// import ProfileCard from '../profileCard/ProfileCard'
// import SuggestedUsers from '../suggestedUsers/SuggestedUsers'
// import Posts from '../posts/Posts'
// import RightSide from '../rightside/RightSide'

// const Home = () => {
//   return (
//     <div className={classes.container}>
//        <div className={classes.left}>
//           <ProfileCard/>
//           <SuggestedUsers/>
//        </div>
//        <Posts/>
//        <RightSide/>
//     </div>
//   )
// }

// export default Home
import React from 'react';
import classes from './home.module.css';
import ProfileCard from '../profileCard/ProfileCard';
import SuggestedUsers from '../suggestedUsers/SuggestedUsers';
import Posts from '../posts/Posts';
import RightSide from '../rightside/RightSide';

const Home = () => {
  return (
    <div className={classes.container}>
      <div className={`${classes.left} ${classes.section}`}>
        <ProfileCard />
        <SuggestedUsers />
      </div>
      <div className={`${classes.center} ${classes.section}`}>
        <Posts />
      </div>
      <div className={`${classes.right} ${classes.section}`}>
        <RightSide />
      </div>
    </div>
  );
}

export default Home;

