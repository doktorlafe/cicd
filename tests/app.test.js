const request = require('supertest');
const app = require('../src/app');

describe('GET /', () => {
  it('should return welcome message with status ok', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Hello from CI/CD Web App!');
    expect(res.body.status).toBe('ok');
  });
});

describe('GET /health', () => {
  it('should return healthy status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
    expect(typeof res.body.uptime).toBe('number');
  });
});

describe('GET /api/items', () => {
  it('should return an array of items', async () => {
    const res = await request(app).get('/api/items');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(3);
  });
});

describe('POST /api/items', () => {
  it('should create a new item', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ name: 'New Item' });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('New Item');
    expect(res.body.id).toBeDefined();
  });

  it('should return 400 when name is missing', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Name is required');
  });

  it('should return 400 when name is empty string', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ name: '   ' });
    expect(res.statusCode).toBe(400);
  });
});
