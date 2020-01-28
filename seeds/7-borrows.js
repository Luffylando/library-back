exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("borrows")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("borrows").insert([
        {
          book_id: 1,
          user_id: 2,
          status: "requested",
          created: "1970-01-01 12:00:00",
          updated: "1970-01-01 12:00:00"
        },
        {
          book_id: 1,
          user_id: 1,
          status: "declined",
          created: "1970-01-01 12:00:00",
          updated: "1970-01-01 12:00:00"
        },
        {
          book_id: 2,
          user_id: 3,
          status: "approved",
          created: "1970-01-01 12:00:00",
          updated: "1970-01-01 12:00:00"
        }
      ]);
    });
};
