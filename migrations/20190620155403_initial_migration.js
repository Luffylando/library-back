exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", table => {
      table.increments("id").primary();
      table.string("firstName", 100).notNullable();
      table.string("lastName", 100).notNullable();
      table.string("image", 225).nullable();
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
      table.string("quote").notNullable();
      table.boolean("status", true).nullable();
      table
        .integer("borrowCount")
        .unsigned()
        .notNullable()
        .default(0);
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
      table.boolean("answered", false).nullable();
      table.boolean("archived", false).nullable();

      table.date("reciveDate").notNullable();
    })
    .createTable("comments", table => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .notNullable();
      table
        .integer("book_id")
        .unsigned()
        .notNullable();
      table.string("comment").notNullable();
      table.datetime("created", { precision: 6 }).defaultTo(knex.fn.now(6));

      table
        .foreign("book_id")
        .references("id")
        .inTable("books");
      table
        .foreign("user_id")
        .references("id")
        .inTable("users");
    })
    .createTable("books_likes", table => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .notNullable();
      table
        .integer("book_id")
        .unsigned()
        .notNullable();
      table.enu("liked", ["liked", "unliked", "neutral"]).defaultTo("neutral");
      table.datetime("created", { precision: 6 }).defaultTo(knex.fn.now(6));
      table
        .foreign("book_id")
        .references("id")
        .inTable("books");
      table
        .foreign("user_id")
        .references("id")
        .inTable("users");
    })
    .createTable("borrows", table => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .notNullable();
      table
        .integer("book_id")
        .unsigned()
        .notNullable();
      table
        .enu("status", ["requested", "approved", "declined"])
        .defaultTo("requested");
      table.datetime("updated", { precision: 6 }).defaultTo(knex.fn.now(6));
      table.datetime("created", { precision: 6 }).defaultTo(knex.fn.now(6));
      table
        .foreign("book_id")
        .references("id")
        .inTable("books");
      table
        .foreign("user_id")
        .references("id")
        .inTable("users");
    })
    .createTable("orders", table => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .notNullable();
      table
        .integer("book_id")
        .unsigned()
        .notNullable();
      table
        .enu("status", ["requested", "shipped", "declined"])
        .defaultTo("requested");
      table.datetime("updated", { precision: 6 }).defaultTo(knex.fn.now(6));
      table.datetime("created", { precision: 6 }).defaultTo(knex.fn.now(6));
      table
        .foreign("book_id")
        .references("id")
        .inTable("books");
      table
        .foreign("user_id")
        .references("id")
        .inTable("users");
    });
  // .createTable("comments_likes", table => {
  //   table.increments("id").primary();
  //   table
  //     .integer("user_id")
  //     .unsigned()
  //     .notNullable();
  //   table
  //     .integer("comment_id")
  //     .unsigned()
  //     .notNullable();
  //   table
  //     .integer("book_id")
  //     .unsigned()
  //     .notNullable();
  //   table.enu("liked", ["liked", "unliked", "neutral"]).defaultTo("neutral");
  //   table.datetime("created", { precision: 6 }).defaultTo(knex.fn.now(6));
  //   table
  //     .foreign("book_id")
  //     .references("id")
  //     .inTable("books");
  //   table
  //     .foreign("user_id")
  //     .references("id")
  //     .inTable("users");
  //   table
  //     .foreign("comment_id")
  //     .references("id")
  //     .inTable("comments");
  // });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("contacts");
};
