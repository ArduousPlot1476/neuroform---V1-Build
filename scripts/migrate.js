import { execSync } from 'child_process';
import { config } from '../server/config';

const runMigrations = async () => {
  try {
    console.log('Running database migrations...');
    
    // Run migrations using prisma
    execSync('npx prisma migrate deploy', {
      env: {
        ...process.env,
        DATABASE_URL: config.database.url,
      },
      stdio: 'inherit',
    });

    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

runMigrations();