import { beforeEach, describe, expect, test } from '@jest/globals';
import * as fs from 'fs';
import path from 'path';
import { UserDto } from '../../application/services/user/dto/user-dto';
import { JSendSuccess } from '../shared/jsend-response';
import { userController } from './user-controller';

describe('user-controller', () => {
  beforeEach(async () => {
    const devDbPath = path.join(process.cwd(), 'prisma', 'dev.db');
    const fakeDbPath = path.join(process.cwd(), 'prisma', 'fake.db');

    try {
      // NOTE: 同期処理にしないとテスト結果が異なることに注意
      fs.copyFileSync(devDbPath, fakeDbPath);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  });

  test('設定確認', () => {
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`process.cwd(): ${process.cwd()}`);
  });

  test('ユーザーを登録する', async () => {
    const user = (await userController.registerUser({ name: 'dummy' })) as JSendSuccess<UserDto>;
    expect(user.data.name).toBe('dummy');
  });

  test('ユーザーを取得する', async () => {
    const usersBefore = (await userController.getUsers()) as JSendSuccess<UserDto[]>;
    console.log(`data length before: ${usersBefore.data.length}`);
    console.log(JSON.stringify(usersBefore.data));

    await userController.registerUser({ name: 'dummy-a' });
    await userController.registerUser({ name: 'dummy-b' });

    const usersAfter = (await userController.getUsers()) as JSendSuccess<UserDto[]>;
    console.log(`data length after: ${usersAfter.data.length}`);
    console.log(JSON.stringify(usersAfter.data));

    expect(usersAfter.data.length).toBe(usersBefore.data.length + 2);
  });

  test('ユーザー名を変更する', async () => {
    const user = await userController.registerUser({ name: 'dummy' });

    await userController.updateUser({ id: user.data.id, name: 'dummy-changed' });
    const updatedUser = await userController.getUserById({ id: user.data.id });
    expect(updatedUser.data.name).toBe('dummy-changed');
  });

  test('ユーザーを削除する', async () => {
    const usersBefore = (await userController.getUsers()) as JSendSuccess<UserDto[]>;

    const newUser = await userController.registerUser({ name: 'dummy-to-delete' });
    await userController.deleteUser({ id: newUser.data.id });

    const usersAfter = (await userController.getUsers()) as JSendSuccess<UserDto[]>;
    expect(usersAfter.data.length).toBe(usersBefore.data.length);
  });
});
