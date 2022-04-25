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
    prodEng: "HomeInternet",
    prodHeb: "אינטרנט ביתי"
},
{
    prodEng: "cableTV",
    prodHeb: "כבלים"
},
{
    prodEng: "cellular",
    prodHeb: "סלולרי"
},
{
    prodEng: "All",
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