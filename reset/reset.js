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
            var granet = {
                _id: "c0a0",
                name: "musée Granet",
                nature: "place",
                editor: {
                    _id: gilles._id,
                    email: gilles.emails[0].address
                },
                pictures: ["/images/Aix/granet1.jpg", "/images/Aix/granet2.jpg"],
                comments: [{
                    user: {
                        _id: derek._id,
                        email: derek.emails[0].address
                    },
                    date: new Date(),
                    text: "I love this place !!"
  }],
                description: "Le musée Granet présente près de 600 oeuvres de peinture, sculpture, pièces archéologiques. Peintures hollandaises, italiennes, françaises de diverses époques",
                url: "http://museegranet-aixenprovence.fr"
            };
            var saintSauveur = {
                _id: "c0a1",
                name: "cathedral saint Sauveur",
                nature: "place",
                editor: {
                    _id: gilles._id,
                    email: gilles.emails[0].address
                },
                pictures: ["/images/Aix/sauveur1.jpg", "/images/Aix/sauveur2.jpg"],
                comments: [{
                    user: {
                        _id: derek._id,
                        email: derek.emails[0].address
                    },
                    date: new Date(),
                    text: "great"
  }],
                description: "no description"
            };
            var festival = {
                _id: "c0a2",
                name: "festival de musique",
                nature: "event",
                editor: {
                    _id: gilles._id,
                    email: gilles.emails[0].address
                },
                pictures: ["/images/Aix/festival1.png", "/images/Aix/festival1.jpg", "/images/Aix/festival2.jpg"],
                comments: [{
                    user: {
                        _id: derek._id,
                        email: derek.emails[0].address
                    },
                    date: new Date(),
                    text: "Awful music"
  }],
                description: "Fort de son succès, le Festival d’Aix accueille un public non seulement local, mais aussi national, et un grand nombre de spectateurs et de journalistes venus du monde entier.",
                url: "http://festival-aix.com/en",
                dateStart: new Date('2016-6-15'),
                dateEnd: new Date('2016-7-10')
            };
            Activities.remove({})
            Activities.insert(granet);
            Activities.insert(saintSauveur);
            Activities.insert(festival);

            // **** cities
            var aix = {
                _id: "c0",
                name: 'Aix en Provence',
                coordinates: {
                    long: "43.5263",
                    lat: "5.4454"
                },
                description: "Protégée par la Montagne Sainte Victoire qui culmine à 1.011 m, Aix est entourée d'une campagne richementpréservée avec d'authentiques bastides provençales entourées de jardins à la française. Son nom vient des sources thermales découvertes à la fondation de la ville en 123 avant JC par les romains. <br />Aix en Provence était la capitale de la Provence au XVème siècle : marchands prospères et notables firent de la ville la Florence provençale que l'on connaît aujourd'hui. Demeures bourgeoises, placettes fleuries, hôtels particuliers, fontaines anciennes, ruelles ombragées... toutes les images de la Provence noble des XVII° et XVIII° sont rassemblées à Aix. <br />",
                picture: '/images/Aix/aix.jpg',
                activities: [{
                    _id: granet._id,
                    name: granet.name,
                    nature: granet.nature,
                    picture: granet.pictures[0]
  }, {
                    _id: saintSauveur._id,
                    name: saintSauveur.name,
                    nature: saintSauveur.nature,
                    picture: saintSauveur.pictures[0]
  }, {
                    _id: festival._id,
                    name: festival.name,
                    nature: festival.nature,
                    picture: festival.pictures[0]
  }]
            };
            var boulogne = {
                _id: "c1",
                name: 'Boulogne sur mer',
                coordinates: {
                    long: "50.7264",
                    lat: "1.6147"
                },
                description: "",
                picture: '/images/Boulogne/centre.jpg',
                activities: []
            };
            Cities.remove({});
            Cities.insert(aix);
            Cities.insert(boulogne);
        },
    })
}
