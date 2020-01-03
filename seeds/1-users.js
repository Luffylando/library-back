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
          role: "admin",
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
          role: "moderator",
          email: "moderator@test.rs",
          password: "password",
          joinDate: "2019-07-09",
          endDate: "2020-07-09",
          verified: 1,
          resetToken:
            "rrFof3EVyC9R2BVCsJxNvN0Z_7pvWYaZsAdqFWdpXwmiaYliQBEQgYecNulW5EnbLbFj53ve5OnmHco2"
        },
        {
          firstName: "Hercule",
          lastName: "Poirot",
          dob: "1970-01-01",
          gender: "Female",
          role: "user",
          email: "user@test.rs",
          password: "password",
          joinDate: "2019-07-09",
          endDate: "2020-07-09",
          verified: 1,
          resetToken:
            "rrFof3EVyC9R2BVCsJxNvN0Z_7pvWYaZsAdqFWdpXwmiaYliQBEQgYecNulW5EnbLbFj53ve5OnmHco2"
        },
        {
          firstName: "Dale",
          lastName: "Cooper",
          dob: "1970-01-01",
          gender: "Male",
          role: "guest",
          email: "guest@test.rs",
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
