import { Test, TestingModule } from '@nestjs/testing';
import { RoomchatGateway } from './roomchat.gateway';

describe('RoomchatGateway', () => {
  let gateway: RoomchatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomchatGateway],
    }).compile();

    gateway = module.get<RoomchatGateway>(RoomchatGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
