import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

const EditProfile = () => {
     const { user, updateProfile, loading, error } = useAuthStore();
     const [name, setName] = useState('');
     const [dob, setDob] = useState('');
     const [mobile, setMobile] = useState('');
     const [photo, setPhoto] = useState(null);
     const [location, setLocation] = useState('');
     const navigate = useNavigate();

     useEffect(() => {
          if (user) {
               setName(user.name || '');
               setDob(user.dob ? user.dob.split('T')[0] : '');
               setMobile(user.mobile || '');
               setLocation(user.location || '');
          }
     }, [user]);

     const submitForm = async (e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.append('name', name);
          formData.append('dob', dob);
          formData.append('mobile', mobile);
          formData.append('location', location);
          if (photo) formData.append('photo', photo);

          const result = await updateProfile(formData);
          if (result.success) {
               navigate('/myprofile');
          }
     };

     const photoUrl = user.profilePhoto?.data
          ? `data:${user.profilePhoto.contentType};base64,${user.profilePhoto.data}`
          : 'https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg';


     return (
          <div className="">
               <h1 >Edit Profile</h1>
               <img
                    src={photoUrl}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
               />
               {error && <p style={{ color: 'red' }}>{error}</p>}
               <form onSubmit={submitForm} className="space-y-4">

                    <br /><input
                         type="file"
                         accept="image/*"
                         onChange={(e) => setPhoto(e.target.files[0])}
                         className="p-2 border rounded"
                    />
                    <br />
                    <input
                         type="text"
                         value={name}
                         onChange={(e) => setName(e.target.value)}
                         placeholder="Name"
                         required
                    />
                    <br />
                    <input
                         type="date"
                         value={dob}
                         onChange={(e) => setDob(e.target.value)}
                         placeholder="DOB"
                         required
                    />
                    <br />
                    <input
                         type="tel"
                         value={mobile}
                         onChange={(e) => setMobile(e.target.value)}
                         placeholder="Phone"
                         required
                         pattern="[0-9]{10}"
                         maxLength="10"
                         minLength="10"
                         title="Phone number must be exactly 10 digits"
                    />

                    <br />
                    <input
                         type="location"
                         value={location}
                         onChange={(e) => setLocation(e.target.value)}
                         placeholder="Location"
                         required
                    />
                    <br />

                    <br />
                    <button type="submit" disabled={loading}>
                         {loading ? 'Updating...' : 'Update Profile'}
                    </button>
               </form>
          </div>
     );
};

export default EditProfile;