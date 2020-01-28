exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("books_likes")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("books_likes").insert([
        {
          book_id: 1,
          user_id: 1,
          created: "1970-01-01 12-00-00"
        },
        {
          book_id: 1,
          user_id: 2,
          created: "1970-01-01 12:00:00"
        },
        {
          book_id: 1,
          user_id: 3,
          created: "1970-01-01"
        },
        {
          book_id: 2,
          user_id: 1,
          created: "1970-01-01"
        },
        {
          book_id: 2,
          user_id: 2,
          created: "1970-01-01"
        }
      ]);
    });
};
