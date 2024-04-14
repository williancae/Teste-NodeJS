import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";

export function ApiFile(description?: string) {
  return applyDecorators(
    UseInterceptors(FileInterceptor("file")),
    ApiConsumes("multipart/form-data"),
    ApiBody({
      schema: {
        type: "object",
        properties: {
          file: {
            description: description || "Escolha um arquivo",
            type: "string",
            format: "binary",
          },
        },
      },
    })
  );
}
