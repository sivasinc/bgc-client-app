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
  } = userProfile;
  let profileInfo;

  const stDate =
    startYear !== "" ? new Date(startYear).getFullYear().toString() : "";
  const enDate =
    endYear !== "" ? new Date(endYear).getFullYear().toString() : "";

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
              startYear:stDate,
              endMonth,
              endYear:enDate,
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
          type: "linkedInOption",
          details: [
            {
              linkedInOption: userProfile["linkedInOption"],
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
              startYear:stDate,
              endMonth,
              endYear:enDate,
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
          type: "linkedInOption",
          details: [
            {
              linkedInOption: userProfile["linkedInOption"],
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
          type: "linkedInOption",
          details: [
            {
              linkedInOption: userProfile["linkedInOption"],
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
          type: "linkedInOption",
          details: [
            {
              linkedInOption: userProfile["linkedInOption"],
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
  };
};
