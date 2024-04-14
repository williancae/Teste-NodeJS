import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";

describe("OrdersController", () => {
  let controller: OrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: {
            upload: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it("should throw BadRequestException if no file is uploaded", async () => {
    await expect(controller.upload(undefined)).rejects.toThrow(
      BadRequestException
    );
  });

  it("should throw BadRequestException if file is not a .txt file", async () => {
    const file: any = {
      originalname: "file.pdf",
    };
    await expect(controller.upload(file)).rejects.toThrow(BadRequestException);
  });
});
