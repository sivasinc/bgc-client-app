
  export const initialValue = [
    {
        name : "Select first security question",
        id: '1',
        answerOptions : [
          { name : 'None', value :'0'}, { name : 'In What city were you born', value :'1'} ,{ name: 'What is the name of your pet', value: '2'},
            { name: 'What is your favourite food to eat', value: '3'}
        ]
    },
    {
      name : "Select second security question",
      id: '2',
      answerOptions : [
        { name : 'None', value :'0'},{ name : 'In What city were you born', value :'1'} ,{ name: 'What is the name of your pet', value: '2'},
        { name: 'What is your favourite food to eat', value: '3'}
      ]
  }
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
  export const months = 
    [
      { name : 'Month', value :'month'}, { name : 'January', value :'january'} ,{ name: 'February', value: 'february'},
      { name: 'March', value: 'march'},{ name: 'April', value: 'april'}
    ]
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