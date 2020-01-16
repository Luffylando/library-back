const resetTemplate = (from, to, url, id, resetToken) => {
  return {
    from,
    to,
    subject: "Luffy's library password reset.",
    html: `<p>To restart your password please <a href="${url}/members/reset-password/${id}/${resetToken}">click here</a>.</p>`
  };
};

module.exports = resetTemplate;
