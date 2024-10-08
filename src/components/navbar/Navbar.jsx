import React, { useEffect, useState } from 'react'
import classes from './navbar.module.css'
import {GiHamburgerMenu} from 'react-icons/gi'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineClose, AiOutlineFileImage,AiOutlineLogout, AiOutlineSearch, AiOutlineUser} from 'react-icons/ai'
import man from '../../assets/man.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/authSlice'
import { updateUser } from '../../redux/authSlice'
import { ImAccessibility } from "react-icons/im"

const Navbar = () => {
    const {token,user} = useSelector((state)=>state.auth)
    const [searchText,setSearchText] = useState("")
    const [state,setState] = useState({})
    const [photo,setPhoto] = useState("")
    const handleState = (e)=>{
        setState(prev => {
            return {...prev, [e.target.name]: e.target.value}
           })
    }

    const [showModal,setShowModal] = useState(false)
    const [showForm,setShowForm] = useState(false)

    const [allUsers,setAllUsers] = useState([])
    const [filterUsers,setFilterUsers] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    //mobile
     const [showMobileNav,setShowMobileNav] = useState(false)


    // fetch all users
    useEffect(()=>{
        const fetchAllUsers = async()=>{
            try {
              const res = await fetch(`https://friendyfy.onrender.com/user/findAll`)
              const data = await res.json()
              setAllUsers(data)
            } catch (error) {
                 console.error(error)
            }
        }
        fetchAllUsers()
    },[])

    useEffect(()=>{
     if(searchText){
        setFilterUsers(allUsers.filter((user)=> user.username.includes(searchText)))
     }
     else{
        setFilterUsers(allUsers)
     }
    },[searchText])


    const handleLogout = ()=>{
      if(!window.confirm("Are you sure want to logout"))
        return 
        dispatch(logout())
        navigate('/login')
    }

    const handleShowForm = ()=>{
        setShowForm(true)
        setShowModal(false)
    }

    const handleUpdateProfile = async(e)=>{
        e.preventDefault()
        let imageUrl = null
        if(photo)
        {
            // const formData = new FormData()
            // filename = crypto.randomUUID()+photo.name
            // formData.append('filename',filename)
            // formData.append('image',photo)

            // await fetch(`https://friendyfy.onrender.com/upload/image`,{
            //     headers:{
            //        'Authorization':`${token}`
    
            //     },
            //     method:"POST",
            //     body:formData
            // })
    

            const data = new FormData()
            data.append('file',photo)
            data.append('upload_preset','social-media')
            data.append('cloud_name','aditya12xyz')
     
            const cloudinaryResponse =  await fetch("https://api.cloudinary.com/v1_1/aditya12xyz/image/upload",{
             method:"POST",
             body:data
            })
            .then(res=>res.json())
           
            imageUrl = cloudinaryResponse.secure_url;
             console.log("imageurl ",imageUrl)
            


        }

       
        try {
            const res =await fetch(`https://friendyfy.onrender.com/user/updateUser/${user._id}`,{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`${token}`
                },
                method:"PUT",
                body:JSON.stringify({...state,profileImg:imageUrl})
            })

            const data = await res.json()
            console.log("navbar data :",data);
            setShowForm(false)
            dispatch(updateUser(data))
            window.location.reload()
        } catch (error) {
            console.error(error)
        }


    }

  return (
   
    <div className={classes.container}>
    <div className={classes.wrapper}>
      <div className={classes.left}>
        <Link to='/'>
          <span style={{fontSize:"35px",color: "#bc2a8d",}}><ImAccessibility /></span>
        
        Friendify
        </Link>
      </div>
      <div className={classes.center}>
        <input value={searchText} onChange={(e) => setSearchText(e.target.value)} type="text" placeholder="Search user..." />
        <AiOutlineSearch className={classes.searchIcon} />
        {searchText && (
          <div onClick={() => setSearchText("")}  className={classes.allUsersContainer}>
            {filterUsers?.map((user) => (
              
              <Link  to={`/profileDetail/${user._id}`} key={user._id}>
                {
                  console.log("users under filter :",user)
                }
                <img style={{borderRadius:"50%"}} src={user?.profileImg ?user?.profileImg:man}/>
                <div  className={classes.userData}>
                  <span>{user?.username}</span>
                  <span>{user?.bio?.slice(0, 10)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className={classes.right}>
        <Link to='/upload' style={{ textDecoration: 'none', color: 'inherit',fontSize:"19px" }}>
          Upload
        </Link>
        <div className={classes.icons}>
          <AiOutlineUser />
          <AiOutlineLogout onClick={handleLogout} />
        </div>
        <img src={ user?.profileImg ? user?.profileImg:man } className={classes.profileUserImg} onClick={() => setShowModal(prev => !prev)} />
        {showModal &&
          <div className={classes.modal}>
            <span onClick={handleShowForm}>Update Profile</span>
          </div>
        }
      </div>
        {
          showForm &&
          <div className={classes.updateProfileForm} onClick={() => setShowForm(false)}>
            <div className={classes.updateProfileWrapper} onClick={(e) => e.stopPropagation()}>
              <h2>Update Profile</h2>
              <form onSubmit={handleUpdateProfile}>
                <input type="text" placeholder='Username' name="username" onChange={handleState} />
                <input type="email"  placeholder='Email' name="email" onChange={handleState} />
                <input type="text" placeholder='Bio' name="bio" onChange={handleState} />
                <input type="password" placeholder='Password' name="password" onChange={handleState} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '50%' }}>
                  <label htmlFor='photo'>Profile Picture <AiOutlineFileImage /></label>
                  <input
                    type="file"
                    id='photo'
                    placeholder='Profile picture'
                    style={{ display: 'none' }}
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                  {photo && <p>{photo.name}</p>}
                </div>
                <button>Update profile</button>
              </form>
              <AiOutlineClose onClick={() => setShowForm(false)} className={classes.removeIcon} />
            </div>
          </div>
        }
    </div>
    {
        <div className={classes.mobileNav}>
          {showMobileNav &&
            <div className={classes.navigation}>
              <div className={classes.left} onClick={() => setShowMobileNav(false)}>
                <Link to='/'>
                <span style={{fontSize:"35px"}}><ImAccessibility /></span>
                  Friendify</Link>
              </div>
              <AiOutlineClose className={classes.mobileCloseIcon} onClick={() => setShowMobileNav(false)} />
              <div className={classes.center}>
                <input value={searchText} type="text" placeholder='Search user...' onChange={(e) => setSearchText(e.target.value)} />
                <AiOutlineSearch className={classes.searchIcon} />
                {searchText && (
                  <div onClick={() => setSearchText("")} className={classes.allUsersContainer}>
                    {filterUsers?.map((user) => (
                      <Link to={`/profileDetail/${user._id}`} key={user._id} onClick={() => setShowMobileNav(false)}>
                        <img src={user?.photo ? user?.photo : man} />
                        <div className={classes.userData}>
                          <span>{user?.username}</span>
                          <span>{user?.bio?.slice(0, 10)}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div className={classes.right}>
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/upload' onClick={() => setShowMobileNav(false)}>Upload</Link >
                <div className={classes.icons} onClick={() => setShowMobileNav(false)}>
                  <AiOutlineUser onClick={() => navigate(`/profileDetail/${user._id}`)} />
                  <AiOutlineLogout onClick={handleLogout} />
                </div>
                <img
                  onClick={() => setShowModal(!showModal)}
                  src={user?.profileImg ? user?.profileImg : man}
                  className={classes.profileUserImg}
                />
                {showModal && (
                  <div className={classes.modal}>
                    <span onClick={handleShowForm}>Update Profile</span>
                  </div>
                )}
              </div>
              {showForm &&
                <div className={classes.updateProfileForm} onClick={() => setShowForm(false)}>
                <div className={classes.updateProfileWrapper} onClick={(e) => e.stopPropagation()}>
                  <h2>Update Profile</h2>
                  <form onSubmit={handleUpdateProfile}>
                    <input type="text" placeholder='Username' name="username" onChange={handleState} />
                    <input type="email" placeholder='Email' name="email" onChange={handleState} />
                    <input type="text" placeholder='Bio' name="bio" onChange={handleState} />
                    <input type="password" placeholder='Password' name="password" onChange={handleState} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '50%' }}>
                      <label htmlFor='photo'>Profile Picture <AiOutlineFileImage /></label>
                      <input
                        type="file"
                        id='photo'
                        placeholder='Profile picture'
                        style={{ display: 'none' }}
                        onChange={(e) => setPhoto(e.target.files[0])}
                      />
                      {photo && <p>{photo.name}</p>}
                    </div>
                    <button>Update profile</button>
                  </form>
                  <AiOutlineClose onClick={() => setShowForm(false)} className={classes.removeIcon} />
                </div>
              </div>}
            </div>}
          {!showMobileNav && <GiHamburgerMenu onClick={() => setShowMobileNav(prev => !prev)} className={classes.hamburgerIcon} />}
        </div>
      }
    </div>
  )
}

export default Navbar
