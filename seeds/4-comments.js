exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("comments")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("comments").insert([
        {
          book_id: 1,
          user_id: 1,
          comment: "Testing first comment",
          created: "1970-01-01 12-00-00"
        },
        {
          book_id: 1,
          user_id: 2,
          comment: "Testing second comment",
          created: "1970-01-01 12:00:00"
        },
        {
          book_id: 1,
          user_id: 3,
          comment: "Testing third comment",
          created: "1970-01-01"
        },
        {
          book_id: 2,
          user_id: 1,
          comment: "Testing forht comment",
          created: "1970-01-01"
        },
        {
          book_id: 2,
          user_id: 2,
          comment: "Testing fifth comment",
          created: "1970-01-01"
        }
      ]);
    });
};
