import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Connection, Types } from 'mongoose';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/auth/auth.guard';
import { CreateLogDto } from '../src/log/dto/create-log.dto';

describe('Log (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    connection = module.get<Connection>(getConnectionToken());
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  }, 10_000);

  afterAll(async () => {
    await connection.close();
    await app.close();
  }, 10_000);

  describe('POST /log', () => {
    const logData = {
      userId: '123abc' as any,
      exerciseId: '456def' as any,
      reps: 10 as any,
      weightImperial: 225 as any,
      weightMetric: 100 as any,
      form: 'good' as any,
    };

    it('should return a 400 when userId is missing', async () => {
      const data = { ...logData };
      data.userId = null;
      return await request(app.getHttpServer())
        .post('/exercise')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when userId is not ObjecId', async () => {
      const data = { ...logData };
      data.userId = 'randomString';
      return await request(app.getHttpServer())
        .post('/exercise')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when exerciseId is missing', async () => {
      const data = { ...logData };
      data.exerciseId = null;
      return await request(app.getHttpServer())
        .post('/exercise')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when exerciseId is not ObjectId', async () => {
      const data = { ...logData };
      data.exerciseId = 'randomString';
      return await request(app.getHttpServer())
        .post('/exercise')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when reps is not a number', async () => {
      const data = { ...logData };
      data.reps = 'invalidString';
      return await request(app.getHttpServer())
        .post('/exercise')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when reps is less than 0', async () => {
      const data = { ...logData };
      data.reps = -1;
      return await request(app.getHttpServer())
        .post('/exercise')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when weightImperial is not a number', async () => {
      const data = { ...logData };
      data.weightImperial = 'invalidString';
      return await request(app.getHttpServer())
        .post('/exercise')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when weightImperial is less than 0', async () => {
      const data = { ...logData };
      data.weightImperial = -1;
      return await request(app.getHttpServer())
        .post('/exercise')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when weightMetric is not a number', async () => {
      const data = { ...logData };
      data.weightMetric = 'invalidString';
      return await request(app.getHttpServer())
        .post('/exercise')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when weightMetric is less than 0', async () => {
      const data = { ...logData };
      data.weightMetric = -1;
      return await request(app.getHttpServer())
        .post('/exercise')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when form is invalid', async () => {
      const data = { ...logData };
      data.form = 'invalid';
      return await request(app.getHttpServer())
        .post('/exercise')
        .send(data)
        .expect(400);
    });
  });

  describe('GET /log', () => {
    it('should return a 200 with all routines', async () => {
      return await request(app.getHttpServer()).get('/log').send().expect(200);
    });
  });

  describe('GET /log/:id', () => {
    it('should return a 400 when id is invalid', async () => {
      const invalidId = '1234';
      return await request(app.getHttpServer())
        .get('/log/' + invalidId)
        .send()
        .expect(400);
    });
  });

  describe('PATCH /log/:id', () => {
    it('should return a 400 when id is invalid', async () => {
      const invalidId = '1234';
      return await request(app.getHttpServer())
        .patch('/log/' + invalidId)
        .send()
        .expect(400);
    });
  });

  describe('DELETE /log/:id', () => {
    it('should return a 400 when id is invalid', async () => {
      const invalidId = '1234';
      return await request(app.getHttpServer())
        .delete('/log/' + invalidId)
        .send()
        .expect(400);
    });
  });
});
