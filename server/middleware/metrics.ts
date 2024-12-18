import { Request, Response, NextFunction } from 'express';
import { Counter, Histogram } from 'prom-client';

const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});

const httpRequestTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    
    httpRequestDuration.labels(
      req.method,
      req.route?.path || req.path,
      res.statusCode.toString()
    ).observe(duration);

    httpRequestTotal.labels(
      req.method,
      req.route?.path || req.path,
      res.statusCode.toString()
    ).inc();
  });

  next();
};