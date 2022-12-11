import app from './index';
import request from 'supertest';

jest.setTimeout(19000);
describe('typeScript test suite', () => {
  afterAll((done) => {
    app.close();
    done();
  });

  it('should return error 404', async () => {
    const req = await request(app).get('/a');
    expect(req.statusCode).toBe(404);
  });

  it('should return successs code', async () => {
    const req = await request(app).get('/api/v1/sysinfo');
    expect(req.statusCode).toBe(200);
  });

  //TODO: add more tests
});
