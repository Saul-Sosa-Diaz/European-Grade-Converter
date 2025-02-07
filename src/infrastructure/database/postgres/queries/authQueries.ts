export const authQueries = {
  VERIFY_USER: 'SELECT * FROM users WHERE username = $1 AND password = crypt($2, password);',
  LOG_USER_ACTIVITY: 'INSERT INTO LOGS (username, date, operation) VALUES ($1, $2, $3);',
}
