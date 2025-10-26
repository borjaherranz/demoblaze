import { test as base, expect } from '@playwright/test'

export type TestData = {
  contactEmail: string;
  contactName: string;
  contactMessage: string;
  country: string;
  city: string;
  crediCard: string;
  expiryMonth: string;
  expiryYear: string;
  productName: string;
  productPrice: string;
  productDescription: string;
};

const defaultData: TestData = {
  contactEmail: 'pepe.botella@gmail.com',
  contactName: 'pepe',
  contactMessage: 'message',
  country: 'Spain',
  city: 'Madrid',
  crediCard: '1234 5678 2233 4433',
  expiryMonth: '12',
  expiryYear: '2030',
  productName: 'Nokia lumia 1520',
  productPrice: '$820',
  productDescription: 'The Nokia Lumia 1520 is powered by 2.2GHz quad-core Qualcomm Snapdragon 800 processor and it comes with 2GB of RAM.  ',
};

export const test = base.extend<{ testData: TestData }>({
  testData: [defaultData, { option: true }],
});

export { expect };
