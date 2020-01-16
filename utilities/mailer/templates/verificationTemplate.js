const verificationTemplate = (from, to, url, id, verificationToken) => {
  return {
    from,
    to,
    subject: "Luffy's Library registration conformation.",
    html: `<p>To activate your account, please <a href="${url}/members/verify/${id}/${verificationToken}">click here</a>.</p>`
  };
};

module.exports = verificationTemplate;
