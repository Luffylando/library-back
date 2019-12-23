const verificationTemplate = (from, to, url, id, verificationToken) => {
  return {
    from,
    to,
    subject: 'HBC potvrda registracije.',
    html: `<p>Da biste potvrdili vaš HBC nalog molimo <a href="${url}/members/verify/${id}/${verificationToken}">kliknite ovde</a>.</p>`
  };
};

module.exports = verificationTemplate;
