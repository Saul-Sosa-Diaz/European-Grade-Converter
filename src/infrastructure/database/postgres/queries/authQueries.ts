export const authQueries = {
  VERIFY_USER: 'SELECT * FROM users WHERE username = $1 AND password = crypt($2, password);',
}
