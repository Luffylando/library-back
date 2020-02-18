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
          status: false,
          highlighted: false,
          borrowCount: 10,
          image: "Orwell-1984.jpg"
        },
        {
          title: "The Republic",
          author: "Plato",
          genre: "Philosophy",
          status: false,
          highlighted: true,
          quote:
            "The object of education is to teach us to love what is beautiful.",
          status: false,
          image: "Plato-Republic.jpg"
        },
        {
          title: "1984",
          author: "George Orwell",
          genre: "Belatristics",
          quote:
            "Freedom is the freedom to say that two plus two make four. If that is granted, all else follows.",
          status: false,
          highlighted: false,
          borrowCount: 10,
          image: "Orwell-1984.jpg"
        },
        {
          title: "1984",
          author: "George Orwell",
          genre: "Belatristics",
          quote:
            "Freedom is the freedom to say that two plus two make four. If that is granted, all else follows.",
          status: false,
          highlighted: false,
          borrowCount: 10,
          image: "Orwell-1984.jpg"
        },
        {
          title: "1984",
          author: "George Orwell",
          genre: "Belatristics",
          quote:
            "Freedom is the freedom to say that two plus two make four. If that is granted, all else follows.",
          status: false,
          highlighted: false,
          borrowCount: 10,
          image: "Orwell-1984.jpg"
        },
        {
          title: "1984",
          author: "George Orwell",
          genre: "Belatristics",
          quote:
            "Freedom is the freedom to say that two plus two make four. If that is granted, all else follows.",
          status: false,
          highlighted: false,
          borrowCount: 10,
          image: "Orwell-1984.jpg"
        },
        {
          title: "1984",
          author: "George Orwell",
          genre: "Belatristics",
          quote:
            "Freedom is the freedom to say that two plus two make four. If that is granted, all else follows.",
          status: false,
          highlighted: true,
          borrowCount: 10,
          image: "Orwell-1984.jpg"
        },
        {
          title: "1984",
          author: "George Orwell",
          genre: "Belatristics",
          quote:
            "Freedom is the freedom to say that two plus two make four. If that is granted, all else follows.",
          status: false,
          highlighted: true,
          borrowCount: 10,
          image: "Orwell-1984.jpg"
        },
        {
          title: "1984",
          author: "George Orwell",
          genre: "Belatristics",
          quote:
            "Freedom is the freedom to say that two plus two make four. If that is granted, all else follows.",
          status: false,
          highlighted: true,
          borrowCount: 10,
          image: "Orwell-1984.jpg"
        },
        {
          title: "1984",
          author: "George Orwell",
          genre: "Belatristics",
          quote:
            "Freedom is the freedom to say that two plus two make four. If that is granted, all else follows.",
          status: false,
          highlighted: true,
          borrowCount: 10,
          image: "Orwell-1984.jpg"
        },
        {
          title: "1984",
          author: "George Orwell",
          genre: "Belatristics",
          quote:
            "Freedom is the freedom to say that two plus two make four. If that is granted, all else follows.",
          status: false,
          highlighted: true,
          borrowCount: 10,
          image: "Orwell-1984.jpg"
        }
      ]);
    });
};
