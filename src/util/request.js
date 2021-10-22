export const generateRequest = (
  userProfile,
  selectedProfile,
  
) => {
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
              startYear,
              endMonth: endMonth ? endMonth: '',
              endYear: endYear ? endYear: '',
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
              startYear,
              endMonth: endMonth ? endMonth: '',
              endYear: endYear ? endYear: '',
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