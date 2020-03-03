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
          image: "b2.jpg"
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
          borrowCount: 3,
          image: "b3.jpg"
        },
        {
          title: "The Critique of Pure Reason",
          author: "Immanuel Kant",
          genre: "Philosophy",
          quote:
            "All our knowledge begins with the senses, proceeds then to the understanding, and ends with reason. There is nothing higher than reason.",
          status: false,
          highlighted: false,
          borrowCount: 10,
          image: "b1.jpg"
        },
        {
          title: "War and Peace",
          author: "Leo Tolstoy",
          genre: "Belatristics",
          quote:
            "Nothing is so necessary for a young man as the company of intelligent women.",
          status: false,
          highlighted: false,
          borrowCount: 5,
          image: "b4.jpg"
        },
        {
          title: "The Sorrows of Young Werther",
          author: "J. W. von Goethe",
          genre: "Belatristics",
          quote:
            "I am proud of my heart alone, it is the sole source of everything, all our strength, happiness and misery. All the knowledge I possess everyone else can acquire, but my heart is all my own.",
          status: false,
          highlighted: false,
          borrowCount: 10,
          image: "b5.jpg"
        },
        {
          title: "The Lord of The Rings - Fellowship of The Ring",
          author: "J. R. R. Tolkien",
          genre: "Belatristics",
          quote: "Not all those who wander are lost.",
          status: false,
          highlighted: false,
          borrowCount: 50,
          image: "b6.jpg"
        },
        {
          title: "A Game of Thrones",
          author: "G. R. R. Marin",
          genre: "Belatristics",
          quote:
            "... a mind needs books as a sword needs a whetstone, if it is to keep its edge.",
          status: false,
          highlighted: true,
          borrowCount: 114,
          image: "b7.jpg"
        },
        {
          title: "Harry Potter and The Half-Blood Prince",
          author: "J. K. Rowling",
          genre: "Belatristics",
          quote:
            "Let us step into the night and pursue that flighty temptress, adventure.",
          status: false,
          highlighted: true,
          borrowCount: 64,
          image: "b8.jpg"
        },
        {
          title: "Tractatus Logico-Philosophicus",
          author: "Ludwig Wittgenstein",
          genre: "Philosophy",
          quote:
            "We feel that even if all possible scientific questions be answered, the problems of life have still not been touched at all.",
          status: false,
          highlighted: true,
          borrowCount: 4,
          image: "b9.jpg"
        },
        {
          title: "Le Petit Prince",
          author: "Antoine de Saint-Exupery",
          genre: "Belatristics",
          quote:
            "And now here is my secret, a very simple secret: It is only with the heart that one can see rightly; what is essential is invisible to the eye.",
          status: false,
          highlighted: true,
          borrowCount: 212,
          image: "b10.jpg"
        }
      ]);
    });
};
