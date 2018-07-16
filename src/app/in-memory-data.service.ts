import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: '10.1799/ESS0001', creator: 'ESS',  affiliation: 'ESS', title, 'ESS data',  publisher :'ESS ', year : '2017' ,resource_type :'data', url: 'http://esss.se' },
      { id: 12, name: '10.1799/ESS0002', creator: 'ESS',  affiliation: 'ESS', title, 'ESS data',  publisher :'ESS ', year : '2017' ,resource_type :'data'},
      { id: 13, name: '10.1799/ESS0003', creator: 'ESS',  affiliation: 'ESS', title, 'ESS data',  publisher :'ESS ', year : '2017' ,resource_type :'data' },
      { id: 14, name: '10.1799/ESS0004', creator: 'ESS',  affiliation: 'ESS', title, 'ESS data',  publisher :'ESS ', year : '2017' ,resource_type :'data' },
      { id: 15, name: '10.1799/ESS0005', creator: 'ESS',  affiliation: 'ESS', title, 'ESS data',  publisher :'ESS ', year : '2017' ,resource_type :'data' },
      { id: 16, name: '10.1799/ESS0006', creator: 'ESS',  affiliation: 'ESS', title, 'ESS data',  publisher :'ESS ', year : '2017' ,resource_type :'data' },
      { id: 17, name: '10.1799/ESS0007', creator: 'ESS',  affiliation: 'ESS', title, 'ESS data',  publisher :'ESS ', year : '2017' ,resource_type :'data' },
      { id: 18, name: '10.1799/ESS0008', creator: 'ESS',  affiliation: 'ESS', title, 'ESS data',  publisher :'ESS ', year : '2017' ,resource_type :'data' },
      { id: 19, name: '10.1799/ESS0009', creator: 'ESS',  affiliation: 'ESS', title, 'ESS data',  publisher :'ESS ', year : '2017' ,resource_type :'data' },
      { id: 20, name: '10.1799/ESS0010', creator: 'ESS',  affiliation: 'ESS', title, 'ESS data',  publisher :'ESS ', year : '2017' ,resource_type :'data' }
    ];
    return {heroes};
  }
}
