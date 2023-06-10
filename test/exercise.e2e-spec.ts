import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Connection, Types } from 'mongoose';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/auth/auth.guard';

describe('Exercise (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  const invalidObjectId = 'InvalidID1234';
  const exerciseData = {
    name: 'Test Exercise' as any,
    level: 'adv' as any,
    primaryMuscles: ['chest', 'shoulders'] as any,
    secondaryMuscles: ['triceps'] as any,
    equipment: 'Bench press' as any,
    category: 'strength' as any,
    instructions: ['Lay on bench.', 'Press bar.'] as any,
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    connection = await module.get(getConnectionToken());
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  }, 10_000);

  afterAll(async () => {
    await connection.close();
    await app.close();
  }, 10_000);

  describe('POST /exercise', () => {
    it('should return a 400 when missing a name', async () => {
      const data = { ...exerciseData };
      data.name = null;
      return await request(app.getHttpServer())
        .post('/exercise')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when name has a length less than 1', async () => {
      const data = { ...exerciseData };
      data.name = '';
      return await request(app.getHttpServer())
        .post('/exercise')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when name is not a string', async () => {
      const data = { ...exerciseData };
      data.name = 12;
      return await request(app.getHttpServer())
        .post('/exercise')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when missing a level', async () => {
      const data = { ...exerciseData };
      data.level = null;
      return await request(app.getHttpServer())
        .post('/exercise')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when level is invalid', async () => {
      const data = { ...exerciseData };
      data.level = 'invalid';
      return await request(app.getHttpServer())
        .post('/exercise')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when missing a primaryMuscle', async () => {
      const data = { ...exerciseData };
      data.primaryMuscles = null;
      return await request(app.getHttpServer())
        .post('/exercise')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when a primaryMuscle is invalid', async () => {
      const data = { ...exerciseData };
      data.primaryMuscles.push('invalid');
      return await request(app.getHttpServer())
        .post('/exercise')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when a primaryMuscle is not an array', async () => {
      const data = { ...exerciseData };
      data.primaryMuscles = 'chest';
      return await request(app.getHttpServer())
        .post('/exercise')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when a secondaryMuscle is invalid', async () => {
      const data = { ...exerciseData };
      data.secondaryMuscles.push('invalid');
      return await request(app.getHttpServer())
        .post('/exercise')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when a secondaryMuscle is not an array', async () => {
      const data = { ...exerciseData };
      data.secondaryMuscles = 'chest';
      return await request(app.getHttpServer())
        .post('/exercise')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when equiment is not a string', async () => {
      const data = { ...exerciseData };
      data.equipment = 123;
      return await request(app.getHttpServer())
        .post('/exercise')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when a category is invalid', async () => {
      const data = { ...exerciseData };
      data.category = 'invalid';
      return await request(app.getHttpServer())
        .post('/exercise')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when instructions is not an array', async () => {
      const data = { ...exerciseData };
      data.instructions = 'instructions';
      return await request(app.getHttpServer())
        .post('/exercise')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when instructions is not a string', async () => {
      const data = { ...exerciseData };
      data.instructions.push(123);
      return await request(app.getHttpServer())
        .post('/exercise')
        .send(data)
        .expect(400);
    });
  });

  describe('GET /exercise', () => {
    it('should return a 200', async () => {
      return await request(app.getHttpServer())
        .get('/exercise')
        .send()
        .expect(200);
    });
  });

  describe('GET /exercise/name/:name', () => {
    const searchName = 'test';

    it('should return a 200', async () => {
      return await request(app.getHttpServer())
        .get('/exercise/name/' + searchName)
        .send()
        .expect(200);
    });
  });

  describe('GET /exercise/muscle/:muscle', () => {
    const searchMuscle = 'chest';

    it('should return a 200', async () => {
      return await request(app.getHttpServer())
        .get('/exercise/muscle/' + searchMuscle)
        .send()
        .expect(200);
    });
  });

  describe('GET /exercise/:id', () => {
    it('should return a 400 when id is invalid', async () => {
      return await request(app.getHttpServer())
        .get('/exercise/' + invalidObjectId)
        .send()
        .expect(400);
    });
  });

  describe('PATCH /exercise/:id', () => {
    it('should return a 400 when id is invalid', async () => {
      return await request(app.getHttpServer())
        .patch('/exercise/' + invalidObjectId)
        .send(exerciseData)
        .expect(400);
    });
  });

  describe('DELETE /exercise/:id', () => {
    it('should return a 400 when id is invalid', async () => {
      return await request(app.getHttpServer())
        .delete('/exercise/' + invalidObjectId)
        .expect(400);
    });
  });
});
