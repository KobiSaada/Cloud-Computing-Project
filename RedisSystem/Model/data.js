var cities = [{
    cityEng: "Jerusalem",
    cityHeb: "ירושלים"
},
{
    cityEng: "Naaria",
    cityHeb: "נהריה"
},
{
    cityEng: "Haifa",
    cityHeb: "חיפה"
},
{
    cityEng: "Tel-Aviv",
    cityHeb: "תל אביב"
},
{
    cityEng: "Ashdod",
    cityHeb: "אשדוד"
},
{
    cityEng: "Ashkelon",
    cityHeb: "אשקלון"
},
{
    cityEng: "Beer-Sheva",
    cityHeb: "באר שבע"
}
]

var topics = [{
    topicEng: "joining",
    topicHeb: "הצטרפות"
},
{
    topicEng: "Service",
    topicHeb: "שירות"
},
{
    topicEng: "complaint",
    topicHeb: "תלונה"
},
{
    topicEng: "Disconnection",
    topicHeb: "התנתקות"
}

]

var products = [{
    prodEng: "Home Internet",
    prodHeb: "אינטרנט ביתי"
},
{
    prodEng: "cable TV",
    prodHeb: "כבלים"
},
{
    prodEng: "cellular",
    prodHeb: "סלולרי"
},
{
    prodEng: "Home Internet,cable TV,cellular",
    prodHeb: "כולם"
}

]

var genders = [{
    genderEng: "Male",
    genderHeb: "גבר"
},
{
    genderEng: "Female",
    genderHeb: "אישה"
}]

try{
    module.exports = {genders, products, cities, topics}
}
catch(error){
    
}