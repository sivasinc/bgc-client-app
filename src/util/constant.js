export const initialValue = [
  {
      name : "Select first security question",
      id: '1',
      answerOptions: [
        { name: "None", value: "0" },
        { name: "What is your favorite BGC workshop?", Value: "1"},
        { name: "what is your favorite programming language?", Value: "2" },
        { name: "What is your favorite role model?", Value: "3"},
        { name: "What is your favorite subject?", Value: "4"},
        { name: "What is your favorite food?", Value: "5"},
        { name: "What is your dream job/career?", Value: "6"},
        { name: "What is your favorite sport?", Value: "7"},
        { name: "What is your favorite color?", Value: "8" },
        { name: "What is your favorite music genre?", Value: "9"},
        { name: "What high school did you attend?", Value: "10" },
      ],
    },
    {
      name: "Select second security question",
      id: "2",
      answerOptions: [
        { name: "None", value: "0" },
        { name: "What is your favorite BGC workshop?", Value: "1"},
        { name: "what is your favorite programming language?", Value: "2" },
        { name: "What is your favorite role model?", Value: "3"},
        { name: "What is your favorite subject?", Value: "4"},
        { name: "What is your favorite food?", Value: "5"},
        { name: "What is your dream job/career?", Value: "6"},
        { name: "What is your favorite sport?", Value: "7"},
        { name: "What is your favorite color?", Value: "8" },
        { name: "What is your favorite music genre?", Value: "9"},
        { name: "What high school did you attend?", Value: "10" },
      ],
    },
    {
      name: "Select third security question",
      id: "3",
      answerOptions: [
        { name: "None", value: "0" },
        { name: "What is your favorite BGC workshop?", Value: "1"},
        { name: "what is your favorite programming language?", Value: "2" },
        { name: "What is your favorite role model?", Value: "3"},
        { name: "What is your favorite subject?", Value: "4"},
        { name: "What is your favorite food?", Value: "5"},
        { name: "What is your dream job/career?", Value: "6"},
        { name: "What is your favorite sport?", Value: "7"},
        { name: "What is your favorite color?", Value: "8" },
        { name: "What is your favorite music genre?", Value: "9"},
        { name: "What high school did you attend?", Value: "10" },
      ],
    },
  ];

export const profileQuestionsInit = [
  {
      type : "college",
      values: [
          'What College or University do you attend ?',
          'What are you studying ?',
      ]
  },
  {
      type : "workforce",
      values: [
          'Where do you work ?',
          'What depeartment do you work in ?',
          'What is your job titile ?'
      ]
},
{
  type : "timeoff",
  values: [
      'Why are you taking some time off ?'
  ]
},
,
{
  type : "figureout",
  values: [
      'What exactly are you trying to figure out ?'
  ]
}
];
export const months = [
  { name: "Month", value: "month" },
  { name: "January", value: "january" },
  { name: "February", value: "february" },
  { name: "March", value: "march" },
  { name: "April", value: "april" },
  { name: "May", value: "may" },
  { name: "June", value: "june" },
  { name: "July", value: "july" },
  { name: "August", value: "august" },
  { name: "September", value: "september" },
  { name: "October", value: "october" },
  { name: "November", value: "november" },
  { name: "December", value: "december" },
];
  export const years = 
  [
    { name : 'Year', value :'year'}, { name : '2021', value :'2021'} ,{ name: '2020', value: '2020'},
    { name: '2019', value: '2019'},{ name: '2018', value: '2018'}
  ]  

export const experience = [
  { name: 'Company', value :'updatedCompany' },
  { name: 'Department', value : 'updatedDepartment' },
  { name: 'Job Title', value : 'updatedJobTtile' }
];
export const educations = [
  { name: 'University', value :'updatedUniversity' },
  { name: 'Field Of Study', value : 'updatedFieldOfStudy' }
]
export const initialChipData = [
  { key: 0, label: 'Artificial Intelligence',itemSelected:true },
  { key: 1, label: 'Blockchain',itemSelected:false },
  { key: 2, label: 'Gaming',itemSelected:false },
  { key: 3, label: 'Mobile and apps design',itemSelected:false },
  { key: 4, label: 'VRobotics',itemSelected:false },
] 
export const getRoutes = (authenticated, value, history) => {
  if (authenticated) {
    switch (value) {
      case 0:
      case 1:
        // Needs to change later
        history.push("/communityHome");
        break;
      case 2:
        history.push("/communityHome");
        break;
      default:
        history.push("/login");
        // logoutUser();
        break;
    }
  }
  if (!authenticated) {
    switch (value) {
      case 0:
        history.push("/login");
      case 1:
        history.push("/signup");
      default:
        history.push("/login");
    }
  }
}