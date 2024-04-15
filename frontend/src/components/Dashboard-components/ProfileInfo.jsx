import { Form } from "react-router-dom";
import ProfileBtns from "../../components/Dashboard-components/ProfileBtn.jsx";
import ProfileBg1 from "../../images/pld-plud-profile-bg.png";
import ProfileBg2 from "../../images/learning.jpg";
import ProfileBg3 from "../../images/learning2.jpg";
import ProfileBg4 from "../../images/learning3.jpg";
import { useEffect, useRef, useState } from "react";
import useDispatchUser from "../../hooks/useDispatchUser.jsx";
import { MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { loginState } from "../../features/userSlice.jsx";
import useProfileImage from "../../hooks/useProfileImage.jsx";
import { DNA } from "react-loader-spinner";
import useEditProfile from "../../hooks/useEditProfile.jsx";


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
    const { profileImage, loading, fetchProfileImage } = useProfileImage()
    const [isLoading, setIsLoading] = useState(false)
    const [profileBg, setProfileBg] = useState()
        

    const uploadProfileImageEndpoint = `${import.meta.env.VITE_BASE_API}/dashboard/profile/img/upload`

    useEffect(() => {
        fetchProfileImage()
    }, [])

    // Use Edit Hook: Handle Profile update
    const {editProfile} = useEditProfile()

    // Profile Page Background Image
    useEffect(() => {
        const profileBgs = [ProfileBg1, ProfileBg2, ProfileBg3, ProfileBg4]
        const randomIndex = Math.floor(Math.random() * profileBgs.length)
        const profileBg = profileBgs[randomIndex]
        setProfileBg(profileBg)
    }, [])
    const backgroundStyle = {
        backgroundImage: `url(${profileBg})`,
    };

    // Gather Profile Info
  const gatherProfileInfo = () => {
    setProfileInfo({
      "firstname": firstname,
      "lastname": lastname,
      "username": username,
        "cohort": cohort,
    });
  }; 

    // Cancel Edit 
  const cancelProfileEdit = () => {
    setFirstname(profileInfo["firstname"]);
    setLastname(profileInfo["lastname"]);
    setUsername(profileInfo["username"]);
      setCohort(profileInfo["cohort"])
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

            if (!response.ok){
                const data = await response.json()
                throw new Error("Couldn't upload file", data.error)
            }

            const data = await response.json()
            const newUser = {...user, ...data.user}
           dispatch(loginState(newUser)) 
            fetchProfileImage()
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


    // Handle Edit
    const handleEdit = async () => {
        setProfileEdit(false)
        setIsLoading(true)
        const details = {
            firstname: firstname,
            lastname: lastname,
            username: username,
            cohort: cohort,
            email: user.email,
//            socials: user.socials,
            current_user_id: user.id
        }

        console.log("Form updates", details)
        const newUser = await editProfile(details, setIsLoading) 
        console.log("The new user updeated is ", newUser)
        if (newUser.id === user.id){
            setIsLoading(false)
        } else {
            console.log("Error Editing Fields")
            setProfileEdit(true)
        }
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
            <div className="h-full w-full rounded-full overflow-hidden flex justify-center items-center bg-cream2">
                { loading? (
                    <DNA 
                        visible={true}
                        height={"50%"}
                        width={"50%"}
                        ariaLabel="profile-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                    />

                ) : (
                <img src={profileImage} alt="profile-photo" className="object-cover w-full h-full" />
                )}
            </div>
                <label htmlFor="profile-image" className="right-0 bottom-[20%] absolute bg-blue p-1 rounded-full text-white2">
                  <MdEdit className="cursor-pointer"/>
                </label>
          </div>
          <input
            type="file"
            onChange={handleFileChange}
            name="profile-image"
            id="profile-image"
            className="hidden"
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
                      disabled={profileEdit ? false : true}
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
                      disabled={profileEdit ? false : true}
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
                disabled={profileEdit ? false : true}
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
              {profileEdit ? "" : <span>Cohort </span>}
              <input
                className={profileEdit ? "" : "text-md text-grey"}
                placeholder="17"
                value={cohort}
                disabled={profileEdit ? true : false}
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
            handleEdit={handleEdit}
            loading={isLoading}
        />
      </div>
    </div>
  );
};
export default ProfileInfo;
