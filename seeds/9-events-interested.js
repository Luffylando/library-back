exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("events_interested")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("events_interested").insert([
        {
          event_id: 1,
          user_id: 1,
          created: "1970-01-01 12-00-00"
        },
        {
          event_id: 1,
          user_id: 2,
          created: "1970-01-01 12:00:00"
        },
        {
          event_id: 1,
          user_id: 3,
          created: "1970-01-01"
        },
        {
          event_id: 2,
          user_id: 1,
          created: "1970-01-01"
        },
        {
          event_id: 2,
          user_id: 2,
          created: "1970-01-01"
        }
      ]);
    });
};
