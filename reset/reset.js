if (Meteor.isServer) {
    Meteor.methods({
        // reset database
        reset: function () {
            var derek = {
                "_id": "u0",
                "createdAt": new Date("2016-02-04T09:28:14.187Z"),
                "services": {
                    "password": {
                        "bcrypt": "$2a$10$5J/u4IF59xW8Xi73eQajzu5rnF2bcvXaKKQaye.Njh3knctvLnuf6" // derek.ie
                    },
                    "resume": {
                        "loginTokens": []
                    }
                },
                "emails": [{
                        "address": "derek@dkit.ie",
                        "verified": false
      }
  ]
            };
            var gilles = {
                "_id": "u1",
                "createdAt": new Date("2016-02-04T09:29:14.662Z"),
                "services": {
                    "password": {
                        "bcrypt": "$2a$10$PtpfLpKrWd3/AbQz1CCL6ubnHpWd2D.QVvQSJLoL.WPKpQjZCGIi." //gilles.fr
                    },
                    "resume": {
                        "loginTokens": []
                    }
                },
                "emails": [{
                        "address": "gilles@iut.fr",
                        "verified": false
      }
  ]
            };
            Meteor.users.remove({});
            Meteor.users.insert(derek);
            Meteor.users.insert(gilles);

            // *** activities
            var grand_palace = {
                _id: "c0a0",
                name: "la Grand Place",
                nature: "place",
                editor: {
                    _id: gilles._id,
                    email: gilles.emails[0].address
                },
                pictures: ["/images/lille/grand_place1.jpg", "/images/lille/grand_place2.jpg"],
                comments: [{
                    user: {
                        _id: derek._id,
                        email: derek.emails[0].address
                    },
                    date: new Date(),
                    text: "I love this place !!"
                }],
                description: "The Lillois' favourite meeting place offers an interesting view of the architecture from the 17th to the 20th century. Standing in the centre of the squares stands the Goddess commemorates Lille's resistance to the Austrian siege in 1792. In front of the Old Stock Exchange built from 1652 to 1653, is undoubtly the town's finest building. This building is made up fo 24 little houses around an arched courtyard. A second-hand book market as well as chess players can be seen inside. On this square is situated the Grand Garde.The building was used to house soldiers from the sentry guard. It is now the Théâtre du Nord.",
                url: "http://lille.fr"
            };
            var old_lille = {
                _id: "c0a1",
                name: "The old Lille",
                nature: "place",
                editor: {
                    _id: gilles._id,
                    email: gilles.emails[0].address
                },
                pictures: ["/images/lille/old_lille1.jpg"],
                comments: [{
                    user: {
                        _id: derek._id,
                        email: derek.emails[0].address
                    },
                    date: new Date(),
                    text: "great"
                }],
                description: "Stroll around the streets and the squares to discover the heritage, the history and art of living of the town through its main sites and monuments: the Palais Rihour, the Main Square, the old stock exchange, the Opera House, the Chamber of Commerce, the Notre-Dame de la Treille cathedral. After a tour that reveals the architectural aspects of the city, the tour ends near the Hospice Comtesse, founded in 1237 by Jeanne de Flandre, which displays works from Lille's past (objects from every day life, wood sculptures, earthenware, furniture and paintings)."
            };
			var parque = {
                _id: "c0a2",
                name: "Parque das Nações",
                nature: "place",
                editor: {
                    _id: gilles._id,
                    email: gilles.emails[0].address
                },
                pictures: ["/images/lisbon/parque.jpg"],
                comments: [{
                    user: {
                        _id: derek._id,
                        email: derek.emails[0].address
                    },
                    date: new Date(),
                    text: "great place"
                }],
                description: "Explore the Parque das Nacoes, one of Lisbon's cultural landmarks, and discover the marine diversity of the Oceanarium. Stroll through the pleasant parks before an enjoyable tour to enjoy the variety of sea life that calls the facility home.The Parque das Nacoes, or Park of Nations, was developed for Lisbon's World's Fair in 1998. Now absorbed within Lisbon's northern reaches, the park is a huge cultural development housing many attractions originally built to attract visitors to the Expo '98. Wander around the pedestrianized pathways and see the shopping malls, monuments, the promenade, a marina, and even a cable car in this newly developed region.."
            };
			
            var braderie = {
                _id: "c0a3",
                name: "Braderie de Lille",
                nature: "event",
                editor: {
                    _id: gilles._id,
                    email: gilles.emails[0].address
                },
                pictures: ["/images/lille/braderie1.jpg", "/images/lille/braderie2.jpg"],
                comments: [{
                    user: {
                        _id: derek._id,
                        email: derek.emails[0].address
                    },
                    date: new Date(),
                    text: "Good Place"
                }],
                description: "Annual street market/flea market, that takes place on the weekend of the first Sunday of September in Lille, France. The event dates back to the 12th century and claims to be the largest such event in Europe with over 10,000 sellers and several million attendees.",
                url: "http://lille.fr",
                dateStart: new Date('2017-09-02'),
                dateEnd: new Date('2016-09-03')
            };
			
			var festival = {
                _id: "c0a4",
                name: "February Carnival",
                nature: "event",
                editor: {
                    _id: gilles._id,
                    email: gilles.emails[0].address
                },
                pictures: ["/images/lisbon/carnival1.jpg", "/images/lisbon/carnival2.jpg"],
                comments: [{
                    user: {
                        _id: derek._id,
                        email: derek.emails[0].address
                    },
                    date: new Date(),
                    text: "Good Place"
            }],
                description: "annual street market/flea market, that takes place on the weekend of the first Sunday of September in Lille, France. The event dates back to the 12th century and claims to be the largest such event in Europe with over 10,000 sellers and several million attendees.",
                url: "https://www.visitlisboa.com/",
                dateStart: new Date('2017-09-02'),
                dateEnd: new Date('2016-09-03')
            };
            Activities.remove({})
            Activities.insert(grand_palace);
            Activities.insert(old_lille);
            Activities.insert(braderie);
			Activities.insert(parque);
			Activities.insert(festival);

            // **** cities
            var lille = {
                _id: "c0",
                name: 'lille',
                coordinates: {
                    long: "50.6292",
                    lat: "3.0573"
                },
                description: "Lille is the capital of the Nord-Pas-de-Calais region in northern France, near the border with Belgium. A cultural hub and bustling university town today, it was once an important merchant center of French Flanders. Many Flemish influences remain in the city's culture, cuisine and architecture. The historic center, Vieux Lille, is characterized by 17th-century brick town houses and cobbled pedestrian streets.",
                picture: '/images/lille/lille1.jpg',
                activities: [{
                    _id: grand_palace._id,
                    name: grand_palace.name,
                    nature: grand_palace.nature,
                    picture: grand_palace.pictures[0]
                    }, {
                    _id: old_lille._id,
                    name: old_lille.name,
                    nature: old_lille.nature,
                    picture: old_lille.pictures[0]
                    }, {
                    _id: braderie._id,
                    name: braderie.name,
                    nature: braderie.nature,
                    picture: braderie.pictures[0]
                    }]
            };
            var lisbon = {
                _id: "c1",
                name: 'Lisbon',
                coordinates: {
                    long: "38.7223",
                    lat: "9.1393"
                },
                description: "Lisbon is Portugal's capital and the hub of a multifaceted area that appeals to different tastes and senses.In a city that has been influenced by many different far-off cultures over time, there is still a village feel in each historic neighbourhood. Stroll through the Pombaline grid of streets in the Baixa district that opens on to the Tagus in Praça do Comércio, then follow the river to discover some of the city’s most beautiful parts: the monumental area of Belém with its World Heritage monuments, the mediaeval quarters and the latest contemporary leisure spaces, such as the Parque das Nações.",
                picture: '/images/lisbon/lisbon.jpg',
                activities: [{
                    _id: parque._id,
                    name: parque.name,
                    nature: parque.nature,
                    picture: parque.pictures[0]
                    }, {
                    _id: festival._id,
                    name: festival.name,
                    nature: festival.nature,
                    picture: festival.pictures[0]
                }]
            };

            Cities.remove({});
            Cities.insert(lille);
            Cities.insert(lisbon);
        },
    })
}
