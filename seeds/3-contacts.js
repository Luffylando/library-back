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
          email: "luff7y@test.rs",
          message: "I am going to be pirate King!!!",
          reciveDate: "2019-07-09"
        },
        {
          firstName: "Zoro",
          lastName: "Roronoa",
          email: "zor7o@test.rs",
          message: "I am going to be the number one swordsman!!!",
          reciveDate: "2019-07-09"
        },
        {
          firstName: "Sanji",
          lastName: "Vinsmoke",
          email: "sanj7i@test.rs",
          message: "I am going to find All Blue!!!",
          reciveDate: "2019-07-09"
        },
        {
          firstName: "Luffy",
          lastName: "Monkey D.",
          email: "luffy6@test.rs",
          message: "I am going to be pirate King!!!",
          reciveDate: "2019-07-09"
        },
        {
          firstName: "Zoro",
          lastName: "Roronoa",
          email: "zor6o@test.rs",
          message: "I am going to be the number one swordsman!!!",
          reciveDate: "2019-07-09"
        },
        {
          firstName: "Sanji",
          lastName: "Vinsmoke",
          email: "sanj6i@test.rs",
          message: "I am going to find All Blue!!!",
          reciveDate: "2019-07-09"
        },
        {
          firstName: "Luffy",
          lastName: "Monkey D.",
          email: "luff5y@test.rs",
          message: "I am going to be pirate King!!!",
          reciveDate: "2019-07-09"
        },
        {
          firstName: "Zoro",
          lastName: "Roronoa",
          email: "zor5o@test.rs",
          message: "I am going to be the number one swordsman!!!",
          reciveDate: "2019-07-09"
        },
        {
          firstName: "Sanji",
          lastName: "Vinsmoke",
          email: "sanj5i@test.rs",
          message: "I am going to find All Blue!!!",
          reciveDate: "2019-07-09"
        },
        {
          firstName: "Luffy",
          lastName: "Monkey D.",
          email: "luffy4@test.rs",
          message: "I am going to be pirate King!!!",
          reciveDate: "2019-07-09"
        },
        {
          firstName: "Zoro",
          lastName: "Roronoa",
          email: "zo4ro@test.rs",
          message: "I am going to be the number one swordsman!!!",
          reciveDate: "2019-07-09"
        },
        {
          firstName: "Sanji",
          lastName: "Vinsmoke",
          email: "sanj4i@test.rs",
          message: "I am going to find All Blue!!!",
          reciveDate: "2019-07-09"
        },
        {
          firstName: "Luffy",
          lastName: "Monkey D.",
          email: "luff3y@test.rs",
          message: "I am going to be pirate King!!!",
          reciveDate: "2019-07-09"
        },
        {
          firstName: "Zoro",
          lastName: "Roronoa",
          email: "zo3ro@test.rs",
          message: "I am going to be the number one swordsman!!!",
          reciveDate: "2019-07-09"
        },
        {
          firstName: "Sanji",
          lastName: "Vinsmoke",
          email: "san3ji@test.rs",
          message: "I am going to find All Blue!!!",
          reciveDate: "2019-07-09"
        },
        {
          firstName: "Luffy",
          lastName: "Monkey D.",
          email: "luff2y@test.rs",
          message: "I am going to be pirate King!!!",
          reciveDate: "2019-07-09"
        },
        {
          firstName: "Zoro",
          lastName: "Roronoa",
          email: "zoro2@test.rs",
          message: "I am going to be the number one swordsman!!!",
          reciveDate: "2019-07-09"
        },
        {
          firstName: "Sanji",
          lastName: "Vinsmoke",
          email: "san2ji@test.rs",
          message: "I am going to find All Blue!!!",
          reciveDate: "2019-07-09"
        },
        {
          firstName: "Luffy",
          lastName: "Monkey D.",
          email: "luf1fy@test.rs",
          message: "I am going to be pirate King!!!",
          reciveDate: "2019-07-09"
        },
        {
          firstName: "Zoro",
          lastName: "Roronoa",
          email: "zor1o@test.rs",
          message: "I am going to be the number one swordsman!!!",
          reciveDate: "2019-07-09"
        },
        {
          firstName: "Sanji",
          lastName: "Vinsmoke",
          email: "san1ji@test.rs",
          message: "I am going to find All Blue!!!",
          reciveDate: "2019-07-09"
        }
      ]);
    });
};
