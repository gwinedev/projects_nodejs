const roles = {
  admin: {
    canCreateBooks: true,
    canUpdateBooks: true,
    canDeleteBooks: true,
  },
  moderator: {
    canCreateBooks: true,
    canUpdateBooks: true,
    canDeleteBooks: false,
  },
  user: {
    canCreateBooks: false,
    canUpdateBooks: false,
    canDeleteBooks: false,
  },
};

module.exports = roles;
