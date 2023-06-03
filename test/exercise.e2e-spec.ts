import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Connection, Types } from 'mongoose';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/auth/auth.guard';
import { CreateExerciseDto } from '../src/exercise/dto/create-exercise.dto';

describe('Exercise (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  const invalidObjectId = 'InvalidID1234';
  const exerciseData: CreateExerciseDto = {
    name: 'Test Exercise',
    level: 'adv',
    primaryMuscles: new Types.Array('chest', 'shoulders'),
    secondaryMuscles: new Types.Array('triceps'),
    equipment: 'Bench press',
    category: 'strength',
    instructions: new Types.Array('Lay on bench.', 'Press bar.'),
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
      data.name = '';
      return await request(app.getHttpServer())
        .post('/exercise')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when missing a level', async () => {
      const data = { ...exerciseData };
      data.level = '';
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
      data.primaryMuscles = new Types.Array('invalid');
      return await request(app.getHttpServer())
        .post('/exercise')
        .send(data)
        .expect(400);
    });

    it('should return a 400 when a secondaryMuscle is invalid', async () => {
      const data = { ...exerciseData };
      data.secondaryMuscles = new Types.Array('invalid');
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
