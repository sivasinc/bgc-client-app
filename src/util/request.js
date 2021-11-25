import { id } from "date-fns/locale";

export const generateRequest = (userProfile, selectedProfile) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    startMonth,
    startYear,
    endMonth,
    endYear,
    endDateCheckBox,
  } = userProfile;
  let profileInfo;
  let enDate;
  const stDate =
    startYear !== "" ? new Date(startYear).getFullYear().toString() : "";

  if (endDateCheckBox) {
    enDate = endYear !== "" ? new Date(endYear).getFullYear().toString() : "";
  }

  const userRole = "member";
  switch (selectedProfile) {
    case "college":
      profileInfo = [
        {
          type: "education",
          details: [
            {
              education: "College",
              university: userProfile["college-0"],
              fieldOfStudy: userProfile["college-1"],
              startMonth,
              startYear: stDate,
              endMonth,
              endYear: endDateCheckBox ? enDate : null,
            },
          ],
        },
        {
          type: "interests",
          details: [
            {
              interestFields: userProfile["interestField"],
              eventsAttended: userProfile["eventsAttended"],
              chapter: userProfile["participatedChapter"],
              likeToLearn: userProfile["likeToLearn"],
              connection: userProfile["connections"],
              state: userProfile["state"],
            },
          ],
        },
        {
          type: "Visible and search option",
          details: [
            {
              visibility:
                typeof userProfile["visibility"] !== "undefined"
                  ? userProfile["visibility"]
                  : "yes",
            },
          ],
        },
      ];
      break;
    case "workforce":
      profileInfo = [
        {
          type: "workforce",
          details: [
            {
              company: userProfile["workforce-0"],
              department: userProfile["workforce-1"],
              jobTtile: userProfile["workforce-2"],
              startMonth,
              startYear: stDate,
              endMonth,
              endYear: enDate,
            },
          ],
        },
        {
          type: "interests",
          details: [
            {
              interestFields: userProfile["interestField"],
              eventsAttended: userProfile["eventsAttended"],
              chapter: userProfile["participatedChapter"],
              likeToLearn: userProfile["likeToLearn"],
              connection: userProfile["connections"],
              state: userProfile["state"],
            },
          ],
        },
        {
          type: "Visible and search option",
          details: [
            {
              visibility: userProfile["visibility"],
            },
          ],
        },
      ];
      break;
    case "timeoff":
      profileInfo = [
        {
          type: "timeoff",
          details: [
            {
              reason: userProfile["timeoff-0"],
            },
          ],
        },
        {
          type: "interests",
          details: [
            {
              interestFields: userProfile["interestField"],
              eventsAttended: userProfile["eventsAttended"],
              chapter: userProfile["participatedChapter"],
              likeToLearn: userProfile["likeToLearn"],
              connection: userProfile["connections"],
              state: userProfile["state"],
            },
          ],
        },
        {
          type: "Visible and search option",
          details: [
            {
              visibility: userProfile["visibility"],
            },
          ],
        },
      ];
      break;
    case "figureout":
      profileInfo = [
        {
          type: "figureout",
          details: [
            {
              reason: userProfile["figureout-0"],
            },
          ],
        },
        {
          type: "interests",
          details: [
            {
              interestFields: userProfile["interestField"],
              eventsAttended: userProfile["eventsAttended"],
              chapter: userProfile["participatedChapter"],
              likeToLearn: userProfile["likeToLearn"],
              connection: userProfile["connections"],
              state: userProfile["state"],
            },
          ],
        },
        {
          type: "Visible and search option",
          details: [
            {
              visibility: userProfile["visibility"],
            },
          ],
        },
      ];
      break;
    default:
      break;
  }

  return {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    profileInfo,
    userRole,
  };
};
