import { Pool } from 'pg'

export const pool = new Pool({
  host: process.env.PGHOST || 'postgresDCN',
  port: parseInt(process.env.PGPORT || '5432'),
  user: process.env.POSTGRES_USER || 'dcnlab',
  password: process.env.POSTGRES_PASSWORD || 'DCNLab@2025',
  database: process.env.POSTGRES_DB || 'dcn',
})
