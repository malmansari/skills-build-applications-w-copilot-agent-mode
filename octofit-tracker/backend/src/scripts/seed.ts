import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Maya Chen', username: 'mayachen', email: 'maya.chen@example.com', avatar: 'MC' },
      { name: 'Jordan Williams', username: 'jordanw', email: 'jordan.williams@example.com', avatar: 'JW' },
      { name: 'Priya Shah', username: 'priyashah', email: 'priya.shah@example.com', avatar: 'PS' },
      { name: 'Alex Rivera', username: 'alexrivera', email: 'alex.rivera@example.com', avatar: 'AR' },
    ]);

    const teams = await Team.create([
      {
        name: 'Summit Striders',
        description: 'A steady crew focused on endurance and consistency.',
        color: '#e76f51',
        memberIds: [users[0]._id, users[1]._id],
      },
      {
        name: 'Morning Momentum',
        description: 'Early risers building strength together.',
        color: '#2a9d8f',
        memberIds: [users[2]._id, users[3]._id],
      },
    ]);

    await User.bulkWrite([
      { updateOne: { filter: { _id: users[0]._id }, update: { teamId: teams[0]._id } } },
      { updateOne: { filter: { _id: users[1]._id }, update: { teamId: teams[0]._id } } },
      { updateOne: { filter: { _id: users[2]._id }, update: { teamId: teams[1]._id } } },
      { updateOne: { filter: { _id: users[3]._id }, update: { teamId: teams[1]._id } } },
    ]);

    await Activity.create([
      { userId: users[0]._id, teamId: teams[0]._id, type: 'Running', duration: 42, distance: 6.4, calories: 490, date: new Date('2026-09-14') },
      { userId: users[1]._id, teamId: teams[0]._id, type: 'Cycling', duration: 55, distance: 18.2, calories: 620, date: new Date('2026-09-13') },
      { userId: users[2]._id, teamId: teams[1]._id, type: 'Strength', duration: 35, calories: 280, date: new Date('2026-09-15') },
      { userId: users[3]._id, teamId: teams[1]._id, type: 'Swimming', duration: 30, distance: 1.2, calories: 360, date: new Date('2026-09-12') },
    ]);

    await LeaderboardEntry.create([
      { userId: users[0]._id, teamId: teams[0]._id, points: 1280, rank: 1, week: '2026-W38' },
      { userId: users[2]._id, teamId: teams[1]._id, points: 1140, rank: 2, week: '2026-W38' },
      { userId: users[1]._id, teamId: teams[0]._id, points: 980, rank: 3, week: '2026-W38' },
      { userId: users[3]._id, teamId: teams[1]._id, points: 860, rank: 4, week: '2026-W38' },
    ]);

    await Workout.create([
      { name: 'Trail Builder', type: 'Cardio', difficulty: 'Intermediate', duration: 35, description: 'Build aerobic strength with alternating running intervals.', exercises: ['5 min warm-up', '6 x 3 min run', '5 min cool-down'] },
      { name: 'Desk Reset', type: 'Mobility', difficulty: 'Beginner', duration: 15, description: 'Release tension in hips, shoulders, and back.', exercises: ['Cat-cow', 'Worlds greatest stretch', 'Child pose'] },
      { name: 'Full Body Foundation', type: 'Strength', difficulty: 'Beginner', duration: 30, description: 'A balanced bodyweight session for every major muscle group.', exercises: ['Squats', 'Push-ups', 'Reverse lunges', 'Plank'] },
    ]);

    console.log('Database seeding complete: users, teams, activities, leaderboard, and workouts populated');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
