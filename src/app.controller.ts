import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import StorageDto from './storage.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Szerver fut a ' + "3000" + '-es porton' };
  }

  @Get('/api/tarhely')
  async listStorage() {
    const [storage] = await db.execute(
      'SELECT id, nev, meret, ar FROM tarhelycsomagok ORDER BY id'
    );
    return { storage: storage };
  }

  @Post('/api/tarhely')
  async newStorage(@Body() storagedata: StorageDto) {
    await db.execute('INSERT INTO tarhelycsomagok (nev, meret, ar) VALUES (?, ?, ?)', [
      storagedata.nev, storagedata.meret, storagedata.ar
    ]);
  }

  @Delete('/api/tarhely/:id')
  async deleteStorage(@Param('id') id: number) {
    await db.execute(
      'DELETE FROM tarhelycsomagok WHERE id = ?',
      [id]
    );
  }
}
