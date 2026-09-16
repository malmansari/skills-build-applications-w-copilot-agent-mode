import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');
  } catch (error) {
    console.error('Unable to connect to octofit_db:', error);
  }
}

export function isDatabaseReady(): boolean {
  return mongoose.connection.readyState === 1;
}

export default mongoose.connection;
