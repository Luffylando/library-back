exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", table => {
      table.increments("id").primary();
      table.string("firstName", 100).notNullable();
      table.string("lastName", 100).notNullable();
      table.date("dob").notNullable();
      table.string("gender", 100).notNullable();
      table.string("role", 40).notNullable();
      table
        .string("email", 100)
        .unique()
        .notNullable();
      table.string("password", 255).notNullable();
      table.date("joinDate").notNullable();
      table.date("endDate").notNullable();
      table
        .boolean("verified")
        .default(0)
        .notNullable();
      table.string("verificationToken", 255).nullable();
      table.string("resetToken", 255).notNullable();
    })
    .createTable("books", table => {
      table.increments("id").primary();
      table.string("title", 150).notNullable();
      table.string("author", 100).notNullable();
      table.string("genre", 40).notNullable();
      table.string("image", 225).nullable();
    })
    .createTable("contacts", table => {
      table.increments("id").primary();
      table.string("firstName", 100).notNullable();
      table.string("lastName", 100).notNullable();
      table
        .string("email", 100)
        .unique()
        .notNullable();
      table.string("message", 3000).notNullable();
      table.date("reciveDate").notNullable();
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("contacts");
};
