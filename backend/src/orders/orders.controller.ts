import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { VerifyingOrderDto } from './dto/verifying-order.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles-guard';
import { PayloadUser, ReqPayloadUser } from 'src/auth/PayloadUser';
import { RoleTypes } from 'src/role/entities/role.entity';
import { ConfirmingOrderDto } from './dto/confirming-order.dto';

@UsePipes(ValidationPipe)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createOrderDto: CreateOrderDto, @UploadedFile() image: Express.Multer.File) {
    // console.log('Мы на маршруте orders')
    console.log(createOrderDto)
    return this.ordersService.create(createOrderDto, image);
  }

  @Get()
  @Roles(RoleTypes.MANAGER, RoleTypes.ADMIN)
  @UseGuards(RolesGuard)
  findAll(@Req() req: ReqPayloadUser) {
    // console.log('дошел')
    return this.ordersService.findAll(req);
  }

  @Get('fios')
  @Roles(RoleTypes.MANAGER, RoleTypes.ADMIN)
  @UseGuards(RolesGuard)
  findAllFio(@Req() req: ReqPayloadUser) {
    console.log('fio')
    return this.ordersService.allFio(req);
  }

  @Get('testsem')
  @Roles(RoleTypes.MANAGER, RoleTypes.ADMIN)
  @UseGuards(RolesGuard)
  testingGuardSemesters(@Req() req: ReqPayloadUser) {
    console.log('fio')
    return this.ordersService.testsem(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch('verifying/:id')
  verifying(@Param('id') id: string, @Body() verifyingOrderDto: VerifyingOrderDto) {
    return this.ordersService.verifying(+id, verifyingOrderDto);
  }

  @Patch('confirming/:id')
  confirming(@Param('id') id: string, @Body() confirmingOrderDto: ConfirmingOrderDto) {
    return this.ordersService.confirming(+id, confirmingOrderDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
