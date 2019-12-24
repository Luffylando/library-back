exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("books")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("books").insert([
        {
          title: "1984",
          author: "George Orwell",
          genre: "Beletrisctics",
          image: "Orwell-1984.jpg"
        },
        {
          title: "The Republic",
          author: "Plato",
          genre: "Philosophy",
          image: "Plato-Republic.jpg"
        }
      ]);
    });
};
