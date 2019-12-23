const resetTemplate = (from, to, url, id, resetToken) => {
  return {
    from,
    to,
    subject: 'HBC reset lozinke.',
    html: `<p>Da biste resetovali vašu lozinku HBC molimo <a href="${url}/members/reset-password/${id}/${resetToken}">kliknite ovde</a>.</p>`
  };
};

module.exports = resetTemplate;
