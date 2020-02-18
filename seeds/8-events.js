exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("events")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("events").insert([
        {
          eventName: "Socrates Life",
          eventDescription: "Some Philosophy points of Socrates...",
          eventCreator: "Jon Snow",
          eventStatus: "comming",
          eventImage: "library.jpg",
          eventDate: "1970-01-01 10:00:00",
          eventCreated: "1970-01-01 10:00:00",
          eventUpdated: "1970-01-01 10:00:00",
          highlighted: true
        },
        {
          eventName: "Dostoyevski today",
          eventDescription: "Dostoyevski in 2020",
          eventCreator: "Frank Lampard",
          eventStatus: "comming",
          eventImage: "njegos.jpg",
          eventDate: "1970-01-01 10:00:00",
          eventCreated: "1970-01-01 10:00:00",
          eventUpdated: "1970-01-01 10:00:00",
          highlighted: false
        },
        {
          eventName: "12 Angry Men",
          eventDescription: "Charactersitics of 12 different people",
          eventCreator: "Fitdzgeraldo Johann",
          eventStatus: "comming",
          eventImage: "Plato-Republic.jpg",
          eventDate: "1970-01-01 10:00:00",
          eventCreated: "1970-01-01 10:00:00",
          eventUpdated: "1970-01-01 10:00:00",
          highlighted: false
        },
        {
          eventName: "Slughorns club",
          eventDescription:
            "Why did Horace Slaghorn club constitute only of elite wizards?",
          eventCreator: "Albus Dambuldore",
          eventStatus: "comming",
          eventImage: "Tolstoy-War.jpg",
          eventDate: "1970-01-01 10:00:00",
          eventCreated: "1970-01-01 10:00:00",
          eventUpdated: "1970-01-01 10:00:00",
          highlighted: true
        },
        {
          eventName: "12 Angry Men",
          eventDescription: "Charactersitics of 12 different people",
          eventCreator: "Fitdzgeraldo Johann",
          eventStatus: "comming",
          eventImage: "Plato-Republic.jpg",
          eventDate: "1970-01-01 10:00:00",
          eventCreated: "1970-01-01 10:00:00",
          eventUpdated: "1970-01-01 10:00:00",
          highlighted: true
        },
        {
          eventName: "12 Angry Men",
          eventDescription: "Charactersitics of 12 different people",
          eventCreator: "Fitdzgeraldo Johann",
          eventStatus: "comming",
          eventImage: "Plato-Republic.jpg",
          eventDate: "1970-01-01 10:00:00",
          eventCreated: "1970-01-01 10:00:00",
          eventUpdated: "1970-01-01 10:00:00",
          highlighted: true
        },
        {
          eventName: "12 Angry Men",
          eventDescription: "Charactersitics of 12 different people",
          eventCreator: "Fitdzgeraldo Johann",
          eventStatus: "comming",
          eventImage: "Plato-Republic.jpg",
          eventDate: "1970-01-01 10:00:00",
          eventCreated: "1970-01-01 10:00:00",
          eventUpdated: "1970-01-01 10:00:00",
          highlighted: true
        },
        {
          eventName: "12 Angry Men",
          eventDescription: "Charactersitics of 12 different people",
          eventCreator: "Fitdzgeraldo Johann",
          eventStatus: "comming",
          eventImage: "Plato-Republic.jpg",
          eventDate: "1970-01-01 10:00:00",
          eventCreated: "1970-01-01 10:00:00",
          eventUpdated: "1970-01-01 10:00:00",
          highlighted: true
        }
      ]);
    });
};
