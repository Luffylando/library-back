exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("events")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("events").insert([
        {
          eventName: "library Conference",
          eventDescription: "Description for event 1...",
          eventCreator: "Fitdzgeraldo Johann",
          eventStatus: "comming",
          eventImage: "e1.jpg",
          eventDate: "1970-01-01 10:00:00",
          eventCreated: "1970-01-01 10:00:00",
          eventUpdated: "1970-01-01 10:00:00",
          highlighted: true
        },
        {
          eventName: "An Evening of library",
          eventDescription: "Description for event 2...",
          eventCreator: "Saul Kripke",
          eventStatus: "comming",
          eventImage: "e2.jpg",
          eventDate: "1970-01-01 10:00:00",
          eventCreated: "1970-01-01 10:00:00",
          eventUpdated: "1970-01-01 10:00:00",
          highlighted: false
        },
        {
          eventName: "A Celebration of Life and library",
          eventDescription: "Description for event 3...",
          eventCreator: "Stivenson Stiven",
          eventStatus: "comming",
          eventImage: "e3.jpg",
          eventDate: "1970-01-01 10:00:00",
          eventCreated: "1970-01-01 10:00:00",
          eventUpdated: "1970-01-01 10:00:00",
          highlighted: false
        },
        {
          eventName: "A Triumph of library",
          eventDescription: "Description for event 4...",
          eventCreator: "Fitdzgeraldo Johann",
          eventStatus: "comming",
          eventImage: "e4.jpg",
          eventDate: "1970-01-01 10:00:00",
          eventCreated: "1970-01-01 10:00:00",
          eventUpdated: "1970-01-01 10:00:00",
          highlighted: true
        },

        {
          eventName: "In Commemoration of library",
          eventDescription: "Description for event 5...",
          eventCreator: "Fitdzgeraldo Johann",
          eventStatus: "comming",
          eventImage: "e5.jpg",
          eventDate: "1970-01-01 10:00:00",
          eventCreated: "1970-01-01 10:00:00",
          eventUpdated: "1970-01-01 10:00:00",
          highlighted: true
        },
        {
          eventName: "The library Confessions",
          eventDescription: "Description for event 6...",
          eventCreator: "Fitdzgeraldo Johann",
          eventStatus: "comming",
          eventImage: "e6.jpg",
          eventDate: "1970-01-01 10:00:00",
          eventCreated: "1970-01-01 10:00:00",
          eventUpdated: "1970-01-01 10:00:00",
          highlighted: true
        },
        {
          eventName: "A Traditional Evening of library",
          eventDescription: "Description for event 7...",
          eventCreator: "Fitdzgeraldo Mat",
          eventStatus: "comming",
          eventImage: "e7.jpg",
          eventDate: "1970-01-01 10:00:00",
          eventCreated: "1970-01-01 10:00:00",
          eventUpdated: "1970-01-01 10:00:00",
          highlighted: true
        },
        {
          eventName: "An Education for library",
          eventDescription: "Description for event 8...",
          eventCreator: "Fitdzgeraldo Johann",
          eventStatus: "comming",
          eventImage: "e8.jpg",
          eventDate: "1970-01-01 10:00:00",
          eventCreated: "1970-01-01 10:00:00",
          eventUpdated: "1970-01-01 10:00:00",
          highlighted: true
        },
        {
          eventName: "7th Annual library Workshop",
          eventDescription: "Event 9 description",
          eventCreator: "Dzon Stewart",
          eventStatus: "comming",
          eventImage: "e9.jpg",
          eventDate: "1970-01-01 10:00:00",
          eventCreated: "1970-01-01 10:00:00",
          eventUpdated: "1970-01-01 10:00:00",
          highlighted: true
        },
        {
          eventName: "library Summit",
          eventDescription: "Event 10 description",
          eventCreator: "Fitdzgeraldo Johann",
          eventStatus: "comming",
          eventImage: "e10.jpg",
          eventDate: "1970-01-01 10:00:00",
          eventCreated: "1970-01-01 10:00:00",
          eventUpdated: "1970-01-01 10:00:00",
          highlighted: true
        }
      ]);
    });
};
