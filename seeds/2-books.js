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
          genre: "Belatristics",
          quote:
            "Freedom is the freedom to say that two plus two make four. If that is granted, all else follows.",
          status: true,
          borrowCount: 10,
          image: "Orwell-1984.jpg"
        },
        {
          title: "The Republic",
          author: "Plato",
          genre: "Philosophy",
          quote:
            "The object of education is to teach us to love what is beautiful.",
          status: false,
          image: "Plato-Republic.jpg"
        }
      ]);
    });
};
