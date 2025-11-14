import { Link } from 'react-router'
import { useAuthStore } from '../../stores/authStore'

const Myprofile = () => {
     const { user, loading, error, logout } = useAuthStore();

     if (loading) return <p>Loading... please wait</p>;
     if (error) return <p style={{ color: 'red' }}>Error: {error}</p>
     if (!user?.name) return <p>No User Data, try Logging in again.</p>

     const photoUrl = user.profilePhoto?.data
          ? `data:${user.profilePhoto.contentType};base64,${user.profilePhoto.data}`
          : 'https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg';

     return (
          <>
               <div >
                    <h1 className="text-2xl font-bold mb-4">My Profile</h1>

                    <img
                         src={photoUrl}
                         alt="Profile"
                         className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                    />

                    <h3 className="text-3xl font-semibold text-blue-400">Hello {user.name}</h3>
                    <p className="text-gray-700">Email - {user.email}</p>
                    <p>DOB - {user.dob ? new Date(user.dob).toLocaleDateString() : 'Not set'}</p>
                    <p>Mobile - {user.mobile || 'Not set'}</p>
                    <p>Location - {user.location || 'Not set'}</p>

                    <div >
                         <br />
                         <button
                              onClick={logout}
                         >
                              Logout
                         </button>
                         <br />
                         <Link
                              to="/myprofile/edit"
                         >
                              Edit Profile
                         </Link>
                    </div>
               </div>
          </>
     )
}

export default Myprofile