import { useState,useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../components/loading/Spinner";

function Profile() {
  const { auth, actualizarUsuario, cargando } = useAuth();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState(auth.name || "");
  const [mensaje, setMensaje] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState(auth.genres ? auth.genres.split(",") : []);

  useEffect(() => {
    if (auth.name) {
      setName(auth.name);
    }
    if(auth.genres){
      setSelectedGenres(auth.genres.split(","));
    }
  }, [auth.name, auth.genres]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleGenreToggle = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const handleUpdate = () => {
    if (name.trim() === "") {
      setMensaje("Name is required");
      return;
    }
    actualizarUsuario({ name, genres: selectedGenres, profilePicture: image });
    setPreview(null);
    setMensaje(null);
  };

  if (cargando) return <Spinner />;
  
  return (
    <>
    
    <h1 className="text-2xl font-bold max-w-6xl mx-auto mt-6">Your Profile</h1>
    
    <div className="max-w-6xl mx-auto mt-6 p-6 text-white border border-gray-600 rounded-xl flex gap-6 ">
      {/* Profile Picture Section */}
      <div className="flex flex-col items-center w-1/3 p-4 rounded-lg">
      <label htmlFor="fileUpload" className="cursor-pointer text-gray-400 text-sm">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          id="fileUpload"
          className="hidden"
        />
        <img
          src={preview || auth.profilePicture || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover mb-2 border-2 border-[#979797]"
        />
        Press to change the photo</label>
      </div>

      {/* User Info Section */}
      <div className="flex flex-col w-1/3 space-y-4 pl-5 border-l-[1px] border-[#333]">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <p className="w-full p-2 border border-gray-300 rounded-lg">{auth.email}</p>
        </div>
        {mensaje && <p className="text-red-500 text-sm">{mensaje}</p>}
      </div>

      {/* Movie Genre Selection */}
      <div className="w-1/3 space-y-4">
        <p className="text-sm font-medium">Select Your Favorite Genres</p>
        <div className="flex flex-wrap gap-2">
          {["Horror", "Animation","Music", "Romance", "Action", "Mystery", "Crime",
              "Sci-Fi", "Biography", "Comedy", "Drama", "Fantasy",
              "Family","History"].map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreToggle(genre)}
              className={`px-3 py-1 rounded-lg text-sm cursor-pointer ${selectedGenres.includes(genre) ? "bg-red-600" : "bg-gray-700"}`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
    <div className="flex justify-end max-w-6xl mx-auto mt-6">
        <button
          onClick={handleUpdate}
          className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 cursor-pointer"
        >
          Update Changes
        </button>
      </div>
    </>
  );
}

export default Profile;