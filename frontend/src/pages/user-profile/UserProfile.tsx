import LocationIcon from "../../assets/location-icon.svg";
import PhoneIcon from "../../assets/phone-icon.svg";
import websiteIcon from "../../assets/webiste-icon.svg";
import MailOutlineIcon from "../../assets/mail-icon.svg";
import backArrow from "../../assets/back-arrow.svg";
import { useState } from "react";
import { Box } from "@mui/material";

const UserProfile = () => {
  const [showMyaccount, setShowMyaccount] = useState(false);

  return (
    <div className="p-6 pb-0 bg-[#EFF4FB] min-h-[92vh]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-300">
        <Box className="flex items-center justify-start gap-4">
          <img src={backArrow} alt="Back" className="cursor-pointer" />
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
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="text-[16px] font-semibold  text-[#2B2B2B]">
              Cameron Williamson
            </h2>
            <p className="text-sm text-[#9E9E9E]">Project Manager</p>
          </div>
          <div className="mt-6 space-y-4 text-left">
            <div className="flex items-center">
              <img
                src={PhoneIcon}
                alt="Website"
                className="text-gray-400 mr-2"
              />
              <p className="text-sm text-[#9E9E9E]">(684) 555-0102</p>
            </div>
            <div className="flex items-center">
              <img
                src={MailOutlineIcon}
                alt="Website"
                className="text-gray-400 mr-2"
              />
              <p className="text-sm text-[#9E9E9E]">tim.jennings@example.com</p>
            </div>
            <div className="flex items-center">
              <img
                src={LocationIcon}
                alt="Website"
                className="text-gray-400 mr-2"
              />
              <p className="text-sm text-[#9E9E9E]">New York</p>
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
                www.websitename.com
              </a>
            </div>
          </div>
        </div>

        {showMyaccount ? (
          <div className="bg-white shadow-md rounded-2xl w-[70%]">
            <div className="bg-[#F7F7F7] text-[#2B2B2B]  p-4 rounded-t-lg">
              <h3 className="font-semibold">My Account</h3>
            </div>
            <form className="space-y-4 p-6">
              {/* Name & Job */}
              <div>
                <h4 className="font-[600] text-[14px] leading-[24px] line- mb-2">
                  Name & Job
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[#616161] text-[14px]  mt-2 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="bg-[#EFF4FB] w-full border rounded-lg p-2 text-gray-500"
                      placeholder="First Name"
                      value="Brooklyn"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-[#616161] text-[14px]  mt-2 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="bg-[#EFF4FB] w-full border rounded-lg p-2 text-gray-500"
                      placeholder="Last Name"
                      value="Simmons"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-[#616161] text-[14px]  mt-2 mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      className="bg-[#EFF4FB] w-full border rounded-lg p-2 text-gray-500"
                      placeholder="Job Title"
                      value="Projet Manager"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-300"></div>

              {/* Address */}
              <div>
                <h4 className="font-[600] text-[14px] leading-[24px] mb-2">
                  Address
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <Box>
                    <label className="block text-[#616161] text-[14px]  mt-2 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      className="bg-[#EFF4FB] w-full border rounded-lg p-2 text-gray-500"
                      placeholder="Street Address"
                      value="78 South 34 North"
                      readOnly
                    />
                  </Box>
                  <Box>
                    <label className="block text-[#616161] text-[14px]  mt-2 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      className="bg-[#EFF4FB] w-full border rounded-lg p-2 text-gray-500"
                      placeholder="City"
                      value="North Orange"
                      readOnly
                    />
                  </Box>
                  <Box>
                    <label className="block text-[#616161] text-[14px]  mt-2 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      className="bg-[#EFF4FB] w-full border rounded-lg p-2 text-gray-500"
                      placeholder="State"
                      value="New York"
                      readOnly
                    />
                  </Box>
                  <Box>
                    <label className="block text-[#616161] text-[14px]  mt-2 mb-2">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      className="bg-[#EFF4FB] w-full border rounded-lg p-2 text-gray-500"
                      placeholder="Zip Code"
                      value="9876655"
                      readOnly
                    />
                  </Box>
                </div>
                <div className="grid grid-cols-1  gap-4 mt-4">
                  <Box>
                    <label className="block text-[#616161] text-[14px]  mt-2 mb-2">
                      Complete Address
                    </label>
                    <input
                      type="text"
                      className="bg-[#EFF4FB] w-full border rounded-lg p-2 text-gray-500"
                      placeholder="Complete Address"
                      value="Address"
                      readOnly
                    />
                  </Box>
                </div>
              </div>

              <div className="border-b border-gray-300"></div>

              {/* Contact Info */}
              <div>
                <h4 className="font-[600] text-[14px] leading-[24px] mb-2">
                  Contact Info
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Box>
                    <label className="block text-[#616161] text-[14px]  mt-2 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="bg-[#EFF4FB] w-full border rounded-lg p-2 text-gray-500"
                      placeholder="Phone Number"
                      value="123-456-8945"
                      readOnly
                    />
                  </Box>
                  <Box>
                    <label className="block text-[#616161] text-[14px]  mt-2 mb-2">
                      Email
                    </label>
                    <input
                      type="text"
                      className="bg-[#EFF4FB] w-full border rounded-lg p-2 text-gray-500"
                      placeholder="Email"
                      value="Simon@gmail.com"
                      readOnly
                    />
                  </Box>
                </div>
              </div>

              <div className="border-b border-gray-300"></div>

              {/* Bio */}
              <div>
                <h4 className="font-[600] text-[14px] leading-[24px] mb-2">
                  Bio
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Box>
                    <label className="block text-[#616161] text-[14px]  mt-2 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="text"
                      className="bg-[#EFF4FB] w-full border rounded-lg p-2 text-gray-500"
                      placeholder="Date of Birth"
                      value="9/05/99"
                      readOnly
                    />
                  </Box>
                  <Box>
                    <label className="block text-[#616161] text-[14px]  mt-2 mb-2">
                      Education
                    </label>
                    <input
                      type="text"
                      className="bg-[#EFF4FB] w-full border rounded-lg p-2 text-gray-500"
                      placeholder="Education"
                      value="Masters"
                      readOnly
                    />
                  </Box>
                  <Box>
                    <label className="block text-[#616161] text-[14px]  mt-2 mb-2">
                      Gender
                    </label>
                    <input
                      type="text"
                      className="bg-[#EFF4FB] w-full border rounded-lg p-2 text-gray-500"
                      placeholder="Gender"
                      value="Female"
                      readOnly
                    />
                  </Box>
                </div>
              </div>

              <div className="border-b border-gray-300"></div>

              {/* Financial Information */}
              <div>
                <h4 className="font-[600] text-[14px] leading-[24px] mb-2">
                  Financial Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Box>
                    <label className="block text-[#616161] text-[14px]  mt-2 mb-2">
                      Budget Limit(PKR)
                    </label>
                    <input
                      type="text"
                      className="bg-[#EFF4FB] w-full border rounded-lg p-2 text-gray-500"
                      placeholder="Budget Limit (PKR)"
                      value="1000-500000"
                      readOnly
                    />
                  </Box>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-start space-x-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#7539FF] text-white rounded-sm hover:bg-purple-800"
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
                  Passionate UI/UX designer with over 5 years of experience in
                  creating user-friendly and visually appealing digital
                  experiences. Skilled in wireframing, prototyping, and user
                  research to deliver intuitive designs. Committed to enhancing
                  user satisfaction through innovative and effective design
                  solutions.
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
                      Michel Johnson
                    </p>
                    <p className="font-[500] text-[14px]">
                      <span className=" font-[400] text-[#9E9E9E]">Gender</span>
                      <br />
                      Male
                    </p>
                    <p className="font-[500] text-[14px]">
                      <span className="  font-[400] text-[#9E9E9E]">Email</span>
                      <br />
                      tim.jennings@example.com
                    </p>
                    <p className="font-[500] text-[14px]">
                      <span className=" font-[400] text-[#9E9E9E]">
                        Education
                      </span>
                      <br />
                      Master
                    </p>
                    <p className="font-[500] text-[14px]">
                      <span className=" font-[400] text-[#9E9E9E]">
                        Address
                      </span>
                      <br />
                      4140 Parker Rd. Allentown, New Mexico 31134
                    </p>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-5">
                    <p className="font-[500] text-[14px]">
                      <span className="font-[400] text-[#9E9E9E]">
                        Father Name
                      </span>
                      <br />
                      Michel Johnson
                    </p>
                    <p className="font-[500] text-[14px]">
                      <span className="font-[400] text-[#9E9E9E]">Phone</span>
                      <br />
                      (684) 555-0102
                    </p>
                    <p className="font-[500] text-[14px]">
                      <span className=" font-[400] text-[#9E9E9E]">
                        Zip Code
                      </span>
                      <br />
                      123455
                    </p>
                    <p className="font-[500] text-[14px]">
                      <span className=" font-[400] text-[#9E9E9E]">
                        Date of Birth
                      </span>
                      <br />
                      26 Oct 2019
                    </p>
                    <p className="font-[500] text-[14px]">
                      <span className=" font-[400] text-[#9E9E9E]">
                        Budget Limit
                      </span>
                      <br />
                      30000 PKR
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Right Details */}
      </div>
    </div>
  );
};

export default UserProfile;
