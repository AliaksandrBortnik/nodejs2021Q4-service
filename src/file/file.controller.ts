import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Res, StreamableFile
} from "@nestjs/common";
import {Public} from "../auth/public.decorator";
import {Response} from 'express';
import {createReadStream} from "fs";
import * as fs from "fs";

@Controller('file')
export class FileController {
  @Public()
  @Get(':fileName')
  getFile(
    @Param('fileName') fileName: string,
    @Res({ passthrough: true }) res: Response
  ): StreamableFile | undefined {
    const filePath = `files/${fileName}`;

    try {
      if (!fs.existsSync(filePath)) {
        res.status(HttpStatus.NOT_FOUND).send();
        return;
      }
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }

    const file = createReadStream(`files/${fileName}`);
    res.set({
      'Content-Type': 'image/*',
      'Content-Disposition': `attachment; filename="${fileName}"`
    })
    return new StreamableFile(file);
  }
}