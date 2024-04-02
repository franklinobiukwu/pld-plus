import { Form } from "react-router-dom";
import ProfileBtns from "../../components/Dashboard-components/ProfileBtn.jsx";
import ProfileBg from "../../images/pld-plud-profile-bg.png";
import { useEffect, useRef, useState } from "react";
import useDispatchUser from "../../hooks/useDispatchUser.jsx";
import useDispatchProfileImage from "../../hooks/useDispatchProfileImage.jsx";
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { loginState } from "../../features/userSlice.jsx";


const ProfileInfo = () => {
    const { user } = useDispatchUser();

    const [firstname, setFirstname] = useState(user.firstname || "");
    const [lastname, setLastname] = useState(user.lastname || "");
    const [username, setUsername] = useState(user.username || "");
    const [cohort, setCohort] = useState(user.cohort || "");
    const [profileEdit, setProfileEdit] = useState(false);
    const [profileInfo, setProfileInfo] = useState({});
    const [selectedFile, setSelectedFile] = useState(null)
    const dispatch = useDispatch()
        


    const uploadProfileImageEndpoint = `${import.meta.env.VITE_BASE_API}/dashboard/profile/img/upload`

    const profileImage = useDispatchProfileImage()
    const fileInputRef = useRef(null)

    const backgroundStyle = {
        backgroundImage: `url(${ProfileBg})`,
    };

  const gatherProfileInfo = () => {
    setProfileInfo({
      "firstname": firstname,
      "lastname": lastname,
      "username": username,
    });
  }; 

    
  const cancelProfileEdit = () => {
    setFirstname(profileInfo["firstname"]);
    setLastname(profileInfo["lastname"]);
    setUsername(profileInfo["username"]);
  };


  // Upload Profile Picture
    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file")
            return
        }

        try{
            const formData = new FormData()
            formData.append("image", selectedFile)
            formData.append("user_id", user.id)

            const response = await fetch(uploadProfileImageEndpoint, {
                "method": "POST",
                "headers": {
                    "Authorization": `Bearer ${user.token}`
                },
                "body": formData,
            })

            console.log("This is formdata", formData)
            if (!response.ok){
                const data = await response.json()
                console.log(data)
                throw new Error("Couldn't upload file", data.error)
            }

            const data = await response.json()
            console.log(data)
            const newUser = {...user, ...data.user}
            console.log(newUser)
           dispatch(loginState(newUser)) 

        } catch(error){
            console.error(`Error uploading file: ${error.message}`)
        }
    }

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    useEffect(() => {
        if (selectedFile){
            handleUpload()
        }
    }, [selectedFile])


const handleEditClick = () => {
    fileInputRef.current.click()
}

  return (
    <div>
      <div
        className="w-full h-60 bg-cover rounded-md"
        style={backgroundStyle}
      >
      </div>

      {/* Profile*/}
      <div className="flex flex-col justify-center items-center bg-white2 
                            relative shadow-md rounded-md mt-[-25%] md:mt-[-5%] md:w-[90%] px-10 py-5 md:block mx-auto">
        <div className="flex items-center justify-center md:block">
        <div className="relative">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full
                            absolute  top-0 mt-[-23%] md:mt-[-8%]">
            <img src={profileImage} alt="profile-photo" />
                <label htmlFor="profile-image" className="right-0 bottom-0 absolute">
                  <FaEdit className="text-pri cursor-pointer"/>
                </label>
          </div>
          <input
            type="file"
            onChange={handleFileChange}
            name="profile-image"
            id="profile-image"
            className="hidden"
            ref={fileInputRef}
            />
      </div>

          <Form className="md:ml-36 md:mt-0 md:block">
            {profileEdit
              ? (
                <div className="flex">
                  {/* First Name */}
                  <div>
                    {profileEdit
                      ? (
                        <span>
                          <label htmlFor="firstname" className="font-medium">
                            First name
                          </label>
                          <br />
                        </span>
                      )
                      : ""}
                    <input
                      name="firstname"
                      id="firstname"
                      className={profileEdit
                        ? "mr-4"
                        : `text-2xl font-semibold`}
                      placeholder="Franklin"
                      value={firstname}
                      disabled={profileEdit ? "" : "disabled"}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    {profileEdit
                      ? (
                        <span>
                          <label htmlFor="lastname" className="font-medium">
                            Last name
                          </label>
                          <br />
                        </span>
                      )
                      : ""}
                    <input
                      className={profileEdit ? "" : "text-2xl font-semibold"}
                      placeholder="Mdima"
                      value={lastname}
                      disabled={profileEdit ? "" : "disabled"}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </div>
                </div>
              )
              : ""}
            {profileEdit
              ? ""
              : (
                <h3 className="text-2xl font-semibold">
                  {firstname} {lastname}
                </h3>
              )}

            {/* Username */}
            <div>
              {profileEdit
                ? (
                  <div className="mt-2">
                    <label htmlFor="username" className="font-medium">
                      Username
                    </label>
                    <br />
                  </div>
                )
                : ""}
              <span>@</span>
              <input
                className={profileEdit ? "" : "text-md text-grey"}
                placeholder="@franklinmdima"
                value={username}
                disabled={profileEdit ? "" : "disabled"}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {/* Cohort */}
            <div>
              {profileEdit
                ? (
                  <div className="mt-2">
                    <label htmlFor="cohort" className="font-medium">
                      Cohort
                    </label>
                    <br />
                  </div>
                )
                : ""}
              {profileEdit ? "" : <span>Cohort</span>}
              <input
                className={profileEdit ? "" : "text-md text-grey"}
                placeholder="17"
                value={cohort}
                disabled={profileEdit ? "" : "disabled"}
                onChange={(e) => setCohort(e.target.value)}
              />
            </div>
          </Form>
        </div>

        {/* Profile Page Button */}
        <ProfileBtns
          setFormEdit={setProfileEdit}
          gather={gatherProfileInfo}
          cancel={cancelProfileEdit}
        />
      </div>
    </div>
  );
};
export default ProfileInfo;
