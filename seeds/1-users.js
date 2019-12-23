exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          firstName: "Auguste",
          lastName: "Dupin",
          dob: "1970-01-01",
          gender: "Male",
          email: "admin@test.rs",
          password: "password",
          joinDate: "2019-07-09",
          endDate: "2119-07-09",
          verified: 1,
          resetToken:
            "rrFof3EVyC9R2BVCsJxNvN0Z_7pvWYaZsAdqFWdpXwmiaYliQBEQgYecNulW5EnbLbFj53ve5OnmHco2"
        },
        {
          firstName: "Sherlock",
          lastName: "Holmes",
          dob: "1970-01-01",
          gender: "Male",
          email: "member@test.rs",
          password: "password",
          joinDate: "2019-07-09",
          endDate: "2020-07-09",
          verified: 1,
          resetToken:
            "rrFof3EVyC9R2BVCsJxNvN0Z_7pvWYaZsAdqFWdpXwmiaYliQBEQgYecNulW5EnbLbFj53ve5OnmHco2"
        }
      ]);
    });
};
