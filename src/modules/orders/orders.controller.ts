import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { extname } from "path";
import { ApiFile } from "./../../decorators/api-file.decorator";
import { IUser, OrdersService } from "./orders.service";

@ApiTags("Order")
@Controller("order")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post(`/upload`)
  @ApiFile("Selecionar apenas arquivos .txt")
  async upload(@UploadedFile() file: Express.Multer.File): Promise<IUser[]> {
    if (!file) {
      throw new BadRequestException("Nenhum arquivo foi enviado.");
    }

    const fileExtName = extname(file.originalname).toLowerCase();

    if (fileExtName !== ".txt") {
      throw new BadRequestException("Apenas arquivos .txt são aceitos");
    }

    return this.ordersService.upload(file);
  }
}
