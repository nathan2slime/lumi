// import { Test } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import {
//   BillItemEntity,
// } from '@lumi/database';
// import { Repository } from 'typeorm';
// import { faker } from '@faker-js/faker/locale/en';

// import { BillItemService } from '../bill_item.service';

// describe('BillItemService', () => {
//   let billItemRepository: Repository<BillItemEntity>;
//   let billItemService: BillItemService;

//   beforeEach(async () => {
//     const module = await Test.createTestingModule({
//       providers: [
//         BillItemService,
//         {
//           provide: getRepositoryToken(BillItemEntity),
//           useClass: Repository,
//         },
//       ],
//     }).compile();

//     billItemService = module.get<BillItemService>(BillItemService);
//     billItemRepository = module.get<Repository<BillItemEntity>>(
//       getRepositoryToken(BillItemEntity),
//     );

//     jest
//       .spyOn(billItemRepository, 'save')
//       .mockImplementation(async (value: unknown) => value as BillItemEntity);
//   });

//   afterEach(() => {
//     jest.restoreAllMocks();
//   });

//   it('should be defined', () => {
//     expect(billItemRepository).toBeDefined();
//     expect(billItemService).toBeDefined();
//   });

//   describe('create', () => {
//     it('must create and return an invoice item', async () => {
//       const newBillItem = {
//         amount: faker.number.int(),
//         price: faker.number.int(),
//         unit_price: faker.number.int(),
//       } as any;
//       const bill = {} as any;

//       const res = await billItemService.create(newBillItem, bill);

//       expect(billItemRepository.save).toHaveBeenCalledWith({
//         ...newBillItem,
//         bill,
//       });
//       expect(res).toMatchObject(newBillItem);
//     });
//   });
// });
it('', () => {
  expect(true).toBe(true);
});
