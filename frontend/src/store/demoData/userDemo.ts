import { User } from "../../utils/interfaces";

export const userDemo: Array<User> = [
  {
    userId: 1,
    firstName: "Jane",
    middleName: "M",
    lastName: "Smith",
    email: "jane@example.com",
    aboutMe:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    gender: "male",
    password: "abcdef",
    website: "www.janeSmith.com",
    phoneNumber: "+1 15616345",
    education: "Master's in Physics",
    streetAddress: "Berkely St",
    city: "Boston",
    state: "MA",
    zipCode: "556644",
    dateOfBirth: "1995-07-05",
    budgetLimit: 100000,
    profilePicture: "",
    isLoggedIn: false,
  },
];
