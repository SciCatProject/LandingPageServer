import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: '10.1799/ESS0001', url: 'http://esss.se' },
      { id: 12, name: '10.1799/ESS0002' },
      { id: 13, name: '10.1799/ESS0003' },
      { id: 14, name: '10.1799/ESS0004' },
      { id: 15, name: '10.1799/ESS0005' },
      { id: 16, name: '10.1799/ESS0006' },
      { id: 17, name: '10.1799/ESS0007' },
      { id: 18, name: '10.1799/ESS0008' },
      { id: 19, name: '10.1799/ESS0009' },
      { id: 20, name: '10.1799/ESS0010' }
    ];
    return {heroes};
  }
}
