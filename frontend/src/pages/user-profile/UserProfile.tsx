import LocationIcon from "../../assets/icons/location-icon.svg";
import PhoneIcon from "../../assets/icons/phone-icon.svg";
import websiteIcon from "../../assets/icons/webiste-icon.svg";
import MailOutlineIcon from "../../assets/icons/mail-icon.svg";
import backArrow from "../../assets/icons/back-arrow.svg";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/root-reducer";
import { updateUser } from "../../store/user/user.slice";
import { Box } from "@mui/material";
import { User } from "../../utils/interfaces";
import { validateForm } from "../../utils/validation";
import EditIcon from "@mui/icons-material/Edit";
import Sidenav from "../sideNav/Sidenav";
import Header from "../header/Header";
import { toast } from "react-toastify";

const UserProfile = () => {
  const user = useSelector((state: RootState) => state.user.user);
  console.log("🚀 ~ UserProfile ~ user:", user);
  const { isDrawerOpen } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState<User>(() => user || ({} as User));
  const [errors, setErrors] = useState<Partial<User>>({});
  const [showMyaccount, setShowMyaccount] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      toast.success("Profile picture updated successfully!");

      reader.onloadend = () => {
        dispatch(
          updateUser({ userId: 1, profilePicture: reader.result as string })
        );
      };
    } else {
      toast.error("Error uploading profile", {
        style: { backgroundColor: "#FDE2E2", color: "#D32F2F" }, // Red-themed error toast
      });
    }
  };

  // Handle Input Change
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({ ...prevData, ...user }));
    }
  }, [user]);

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(updateUser(formData));
      toast.success("Profile updated successfully!");
    } else {
      toast.error("Please fill all mentioned Fields!", {
        style: { backgroundColor: "#FDE2E2", color: "#D32F2F" },
      });
    }
  };

  // Reusable Input Component
  const InputField = useMemo(() => {
    return ({
      name,
      value,
      error,
      onChange,
    }: {
      name: string;
      value: string | number | boolean;
      error?: string | number | boolean;
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }) => {
      return (
        <div>
          <label className="block text-[#616161] text-[14px] mt-2 mb-2 capitalize">
            {name.replace(/([A-Z])/g, " $1")}
          </label>
          <input
            type="text"
            name={name}
            value={typeof value === "boolean" ? value.toString() : value}
            onChange={onChange}
            className="bg-[#EFF4FB] w-full border rounded-lg p-2 text-gray-500"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );
    };
  }, []);

  return (
    <Box sx={{ display: "flex " }}>
      <Sidenav />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Header />
        <div className="p-6 pb-0 bg-[#EFF4FB] min-h-[92vh]">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 border-b border-gray-300">
            <Box className="flex items-center justify-start gap-4">
              <img
                src={backArrow}
                className="cursor-pointer"
                alt="Back"
                onClick={() => {
                  navigate("/");
                }}
              />
              <h1 className="text-2xl font-semibold text-gray-800">Profile</h1>
            </Box>
            <Box className="flex items-center justify-end gap-4">
              <p
                onClick={() => {
                  setShowMyaccount(false);
                }}
                className={`cursor-pointer hover:text-[#7A53E8] ${
                  showMyaccount
                    ? "text-gray-500"
                    : "text-[#7A53E8] relative after:content-[''] after:block after:h-[4px] after:bg-[#7A53E8] after:w-full after:rounded after:absolute after:left-0 after:top-full after:mt-1"
                }`}
              >
                Profile
              </p>
              <p
                onClick={() => {
                  setShowMyaccount(true);
                }}
                className={`cursor-pointer  hover:text-[#7A53E8] ${
                  !showMyaccount
                    ? "text-gray-500 "
                    : "text-[#7A53E8] relative after:content-[''] after:block after:h-[4px] after:bg-[#7A53E8] after:w-full after:rounded after:absolute after:left-0 after:top-full after:mt-1"
                }`}
              >
                My account
              </p>
            </Box>
          </div>

          {/* Profile Content */}
          <div className="flex flex-wrap gap-4">
            {/* Left Card */}
            <div className="bg-white shadow-md rounded-2xl p-6 min-w-[400px] h-[376px] ">
              <div className="text-center border-b border-gray-300 p-2">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  {/* Profile Image */}
                  <img
                    src={
                      user?.profilePicture || "https://via.placeholder.com/100"
                    }
                    alt="Profile "
                    className={`w-24 h-24 rounded-full${
                      showMyaccount ? "cursor-pointer" : ""
                    } `}
                    onClick={() =>
                      document.getElementById("imageUpload")?.click()
                    }
                  />

                  {/* Overlay when showMyaccount is true */}
                  {showMyaccount && (
                    <div
                      className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center rounded-full text-white cursor-pointer"
                      onClick={() =>
                        document.getElementById("imageUpload")?.click()
                      }
                    >
                      <EditIcon fontSize="small" />
                      <span className="ml-1 text-[12px]">Edit / Update</span>
                    </div>
                  )}

                  {/* Hidden file input */}
                  {showMyaccount && (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      hidden
                      id="imageUpload"
                    />
                  )}
                </div>
                <h2 className="text-[16px] font-semibold  text-[#2B2B2B]">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-sm text-[#9E9E9E]">{user?.jobTitle || ""}</p>
              </div>
              <div className="mt-6 space-y-4 text-left">
                <div className="flex items-center">
                  <img
                    src={PhoneIcon}
                    alt="Website"
                    className="text-gray-400 mr-2"
                  />
                  <p className="text-sm text-[#9E9E9E]">
                    {user?.phoneNumber || ""}
                  </p>
                </div>
                <div className="flex items-center">
                  <img
                    src={MailOutlineIcon}
                    alt="Website"
                    className="text-gray-400 mr-2"
                  />
                  <p className="text-sm text-[#9E9E9E]">{user?.email}</p>
                </div>
                <div className="flex items-center">
                  <img
                    src={LocationIcon}
                    alt="Website"
                    className="text-gray-400 mr-2"
                  />
                  <p className="text-sm text-[#9E9E9E]">{user?.city || ""}</p>
                </div>
                <div className="flex items-center">
                  <img
                    src={websiteIcon}
                    alt="Website"
                    className="text-gray-400 mr-2"
                  />
                  <a
                    href="https://www.websitename.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#9E9E9E] hover:underline"
                  >
                    {user?.website || ""}
                  </a>
                </div>
              </div>
            </div>

            {showMyaccount ? (
              <div
                className={`bg-white shadow-md rounded-2xl ${
                  isDrawerOpen ? "w-[66%]" : "w-[70%]"
                } mb-6`}
              >
                <div className="bg-[#F7F7F7] text-[#2B2B2B] p-4 rounded-t-lg">
                  <h3 className="font-semibold">My Account</h3>
                </div>
                <form className="space-y-4 p-6" onSubmit={handleSubmit}>
                  {/* Name & Job */}
                  <div>
                    <h4 className="font-[600] text-[14px] leading-[24px] mb-2">
                      Name & Job
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {["firstName", "lastName", "jobTitle"].map((field) => (
                        <InputField
                          key={field}
                          name={field}
                          value={
                            formData[field as keyof User] as string | number
                          }
                          error={errors[field as keyof User]}
                          onChange={handleChange}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="border-b border-gray-300"></div>

                  {/* Address */}
                  <div>
                    <h4 className="font-[600] text-[14px] leading-[24px] mb-2">
                      Address
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {["streetAddress", "city", "state", "zipCode"].map(
                        (field) => (
                          <InputField
                            key={field}
                            name={field}
                            value={formData[field as keyof User]}
                            error={errors[field as keyof User]}
                            onChange={handleChange}
                          />
                        )
                      )}
                    </div>
                  </div>

                  <div className="border-b border-gray-300"></div>

                  {/* Contact Info */}
                  <div>
                    <h4 className="font-[600] text-[14px] leading-[24px] mb-2">
                      Contact Info
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {["phoneNumber", "email"].map((field) => (
                        <InputField
                          key={field}
                          name={field}
                          value={formData[field as keyof User]}
                          error={errors[field as keyof User]}
                          onChange={handleChange}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="border-b border-gray-300"></div>

                  {/* Bio */}
                  <div>
                    <h4 className="font-[600] text-[14px] leading-[24px] mb-2">
                      Bio
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {["dateOfBirth", "education", "gender"].map((field) => (
                        <InputField
                          key={field}
                          name={field}
                          value={formData[field as keyof User]}
                          error={errors[field as keyof User]}
                          onChange={handleChange}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="border-b border-gray-300"></div>

                  {/* Financial Information */}
                  <div>
                    <h4 className="font-[600] text-[14px] leading-[24px] mb-2">
                      Financial Information
                    </h4>
                    <InputField
                      name="budgetLimit"
                      value={formData.budgetLimit}
                      error={errors.budgetLimit}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-start space-x-4">
                    <button
                      type="submit"
                      className="btn px-4 py-2 bg-[#7539FF] text-white rounded-sm hover:bg-purple-800"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-300 rounded-lg text-gray-600 hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="flex-1 space-y-6">
                {/* About Me */}
                <div className="bg-white shadow-md rounded-2xl">
                  {/* Upper Dark Section */}
                  <div className="bg-[#F7F7F7] text-white p-4 rounded-t-lg">
                    <h3 className="text-[#2B2B2B] font-semibold">About Me</h3>
                  </div>
                  {/* Divider Line */}
                  <div className="border-b border-gray-300"></div>
                  {/* Lower White Section */}
                  <div className="p-6">
                    <p className="text-[14px] text-gray-400 leading-relaxed">
                      {user?.aboutMe || ""}
                    </p>
                  </div>
                </div>

                {/* Personal Details */}
                <div className="bg-white shadow-md rounded-2xl max-h-[480px]">
                  {/* Upper Dark Section */}
                  <div className="bg-[#F7F7F7]  text-white p-4 rounded-t-lg">
                    <h3 className="text-[#2B2B2B] font-semibold">
                      Personal Details
                    </h3>
                  </div>
                  {/* Divider Line */}
                  <div className="border-b border-gray-300"></div>
                  {/* Lower White Section */}
                  <div className="p-4 pb-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Left Column */}
                      <div className="space-y-5">
                        <p className="font-[500] text-[14px]">
                          <span className="font-[400] text-[#9E9E9E]">
                            Full Name
                          </span>
                          <br />
                          {user?.firstName} {user?.middleName || ""}{" "}
                          {user?.lastName}
                        </p>
                        <p className="font-[500] text-[14px]">
                          <span className=" font-[400] text-[#9E9E9E]">
                            Gender
                          </span>
                          <br />
                          {user?.gender || ""}
                        </p>
                        <p className="font-[500] text-[14px]">
                          <span className="  font-[400] text-[#9E9E9E]">
                            Email
                          </span>
                          <br />
                          {user?.email}
                        </p>
                        <p className="font-[500] text-[14px]">
                          <span className=" font-[400] text-[#9E9E9E]">
                            Education
                          </span>
                          <br />
                          {user?.education || ""}
                        </p>
                        <p className="font-[500] text-[14px]">
                          <span className=" font-[400] text-[#9E9E9E]">
                            Address
                          </span>
                          <br />
                          {user?.streetAddress || ""} {user?.city || ""}
                          {user?.state || ""}
                        </p>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-5">
                        <p className="font-[500] text-[14px]">
                          <span className="font-[400] text-[#9E9E9E]">
                            Father Name
                          </span>
                          <br />
                          {user?.fatherName || ""}
                        </p>
                        <p className="font-[500] text-[14px]">
                          <span className="font-[400] text-[#9E9E9E]">
                            Phone
                          </span>
                          <br />
                          {user?.phoneNumber || ""}
                        </p>
                        <p className="font-[500] text-[14px]">
                          <span className=" font-[400] text-[#9E9E9E]">
                            Zip Code
                          </span>
                          <br />
                          {user?.zipCode || ""}
                        </p>
                        <p className="font-[500] text-[14px]">
                          <span className=" font-[400] text-[#9E9E9E]">
                            Date of Birth
                          </span>
                          <br />
                          {user?.dateOfBirth || ""}
                        </p>
                        <p className="font-[500] text-[14px]">
                          <span className=" font-[400] text-[#9E9E9E]">
                            Budget Limit
                          </span>
                          <br />
                          {user?.budgetLimit || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default UserProfile;
