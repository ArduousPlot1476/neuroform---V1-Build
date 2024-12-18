import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import { config } from './config';
import { loggerMiddleware, errorLogger } from './middleware/logger';
import { metricsMiddleware } from './middleware/metrics';
import { createRateLimiter } from './middleware/rateLimit';
import routes from './routes';

const app = express();

// Production optimizations
if (config.isProduction) {
  app.set('trust proxy', 1);
  app.use(compression());
}

// Security middleware
app.use(helmet(config.security.helmet));
app.use(createRateLimiter());

// Logging and metrics
app.use(loggerMiddleware);
app.use(metricsMiddleware);

// Body parsing
app.use(express.json());

// Routes
app.use('/api', routes);

// Error handling
app.use(errorLogger);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: {
      message: err.message,
      ...(config.isProduction ? {} : { stack: err.stack }),
    },
  });
});

export { app };