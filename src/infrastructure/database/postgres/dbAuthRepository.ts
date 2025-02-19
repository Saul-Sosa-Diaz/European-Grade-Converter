/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains the implementation of the authentication repository for PostgreSQL.
 * It defines the methods for verifying a user and logging user activity.
 *
 * @date February 18, 2025
 * @description This file has the implementation of the authentication repository for PostgreSQL.
 * @author Saul Sosa
 */

import { User } from '@/domain/auth/auth'
import { AUTH_QUERIES } from './queries/authQueries'
import { Pool } from 'pg'
import { DBAuthRepository } from '@/infrastructure/config/databaseConfig'

export class PostgresAuthRepository implements DBAuthRepository {
  private pool: Pool

  constructor(pool: Pool) {
    this.pool = pool
  }

  async verifyUser(username: string, password: string): Promise<User> {
    const QUERY = AUTH_QUERIES.VERIFY_USER
    const VALUES = [username, password]
    const { rows } = await this.pool.query(QUERY, VALUES)
    if (rows.length === 0) {
      throw new Error('Invalid credentials')
    }
    const user: User = {
      id: rows[0].userID,
      name: rows[0].username,
      role: rows[0].role,
    }
    return user
  }

  async logUserActivity(username: string, date: Date, operation: string): Promise<void> {
    const QUERY = AUTH_QUERIES.LOG_USER_ACTIVITY
    const VALUES = [username, date, operation]
    await this.pool.query(QUERY, VALUES)
  }
}
