exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex("contacts")
      .del()
      .then(function() {
        // Inserts seed entries
        return knex("contacts").insert([
          {
           firstName: "Luffy",
           lastName: "Monkey D.",
           email: "luffy@test.rs",
           message: "I am going to be pirate King!!!",
          reciveDate: "2019-07-09",
          },
          {
            firstName: "Zoro",
            lastName: "Roronoa",
            email: "zoro@test.rs",
            message: "I am going to be the number one swordsman!!!",
            reciveDate: "2019-07-09",

           },
           {
            firstName: "Sanji",
            lastName: "Vinsmoke",
            email: "sanji@test.rs",
            message: "I am going to find All Blue!!!",
            reciveDate: "2019-07-09",

           },
        ]);
      });
  };
  