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
  { name: "January", value: "January" },
  { name: "February", value: "February" },
  { name: "March", value: "March" },
  { name: "April", value: "April" },
  { name: "May", value: "May" },
  { name: "June", value: "June" },
  { name: "July", value: "July" },
  { name: "August", value: "August" },
  { name: "September", value: "September" },
  { name: "October", value: "October" },
  { name: "November", value: "November" },
  { name: "December", value: "December" },
];
  export const years = 
  [
    { name : 'Year', value :'year'}, { name : '2021', value :'2021'} ,{ name: '2020', value: '2020'},
    { name: '2019', value: '2019'},{ name: '2018', value: '2018'}, { name: '2017', value: '2017'},
    { name: '2016', value: '2016'}, { name: '2015', value: '2015'}, { name: '2014', value: '2014'},
    { name: '2013', value: '2013'},{ name: '2012', value: '2012'},{ name: '2011', value: '2011'},
    { name: '2010', value: '2010'}, { name: '2009', value: '2009'}, { name: '2008', value: '2008'},
    { name: '2007', value: '2007'}, { name: '2006', value: '2006'}, { name: '2005', value: '2005'},
    { name: '2004', value: '2004'},{ name: '2003', value: '2003'},{ name: '2002', value: '2002'},
    { name: '2001', value: '2001'},{ name: '2000', value: '2000'}
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
  { key: 3, label: 'Mobile and app design',itemSelected:false },
  { key: 4, label: 'Robotics',itemSelected:false },
  { key: 5, label: 'HTML/CSS',itemSelected:false },
  { key: 6, label: 'UX/UI',itemSelected:false },
  { key: 7, label: 'VR/AR',itemSelected:false },
  { key: 8, label: 'React JS',itemSelected:false },
  { key: 9, label: 'Node JS',itemSelected:false },
  { key: 10, label: 'Java',itemSelected:false },
  
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
export const eventsData = [
  { name: "Workshop", value: "1" },
  { name: "Summer Camp", value: "2" },
  { name: "Enrichment", value: "3" },
  { name: "Ambassador/Alumnae Program", value: "4" },
  { name: "Code club", value: "5" },
  { name: "Hackathon", value: "6" },
  { name: "Special Project", value: "7" },
  { name: "Speaking Engagement", value: "8" },
  { name: "BGC Tabling", value: "9" },
  { name: "Volunteer", value: "10" },

];

export const chapterValue = [
  { name: "Atlanta", value: "1" },
  { name: "BayArea", value: "2" },
  { name: "Boston", value: "3" },
  { name: "Chicago", value: "4" },
  { name: "Dallas", value: "5" },
  { name: "Detroit", value: "6" },
  { name: "Houston", value: "7" },
  { name: "Los Angeles", value: "8" },
  { name: "Memphis", value: "9" },
  { name: "Miami", value: "10" },
  { name: "New York", value: "11" },
  { name: "Raleigh-Durham", value: "12" },
  { name: "Seattle", value: "13" },
  { name: "South Africa", value: "14" },
  { name: "Washington D.C", value: "15" },
];

// regex to capture links
  export const linkRegex = /((https?:\/\/)?[^\s.]+\.[\w][^\s]+)/g
