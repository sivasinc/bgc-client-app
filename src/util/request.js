export const generateRequest = (
  userProfile,
  selectedProfile,
  securityQuestions
) => {
  const { firstName, lastName, email, password, confirmPassword, startMonth , startYear ,endMonth , endYear } = userProfile;
  let profileInfo;
  let securityInfo = [];
  switch (selectedProfile) {
    case "college":
      profileInfo = [{
          type: 'education', details: [{
        education: "College",
        university: userProfile["college-0"],
        fieldOfStudy: userProfile["college-1"],
        startMonth , startYear ,endMonth , endYear
      }
      ]}];
      break;
    case "workforce":
      profileInfo = [
          {
            type: 'workforce', details: [{
            company: userProfile["workforce-0"],
            department: userProfile["workforce-1"],
            jobTtile: userProfile["workforce-2"],
            startMonth , startYear ,endMonth , endYear
          }
       
      ]}];
      break;
      case "timeoff":
        profileInfo = [
            {
              type: 'timeoff', details: [{
              reason:userProfile["timeoff-0"]
            }
         
        ]}];
      break;
      case "figureout":
        profileInfo = [
            {
              type: 'figureout', details: [{
              reason:userProfile["timeoff-0"]
            }
         
        ]}];
      break;
    default:
      break;
  }
  securityInfo = securityQuestions.map(item => {
      return {
        securityI: item.id,
          securityAnswer: item.selectedItemValue
      }
  })
  return {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    profileInfo,
    securityInfo
  };
};
