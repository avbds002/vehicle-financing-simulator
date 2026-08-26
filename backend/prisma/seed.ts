import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const vehicles = [
  {
    name: 'Toyota Corolla XEi 2.0 Flex',
    brand: 'Toyota',
    model: 'Corolla',
    version: 'XEi 2.0 Flex',
    year: 2024,
    fipePrice: 159990,
    consumption: 12.5,
    insurance: 4200,
    imageUrl: null,
  },
  {
    name: 'Honda Civic EXL 2.0 Flex',
    brand: 'Honda',
    model: 'Civic',
    version: 'EXL 2.0 Flex',
    year: 2024,
    fipePrice: 168490,
    consumption: 13.1,
    insurance: 4500,
    imageUrl: null,
  },
  {
    name: 'Volkswagen Polo Highline 200 TSI',
    brand: 'Volkswagen',
    model: 'Polo',
    version: 'Highline 200 TSI',
    year: 2024,
    fipePrice: 109990,
    consumption: 14.2,
    insurance: 3100,
    imageUrl: null,
  },
  {
    name: 'Fiat Pulse Impetus Turbo 200',
    brand: 'Fiat',
    model: 'Pulse',
    version: 'Impetus Turbo 200',
    year: 2024,
    fipePrice: 134990,
    consumption: 11.8,
    insurance: 3600,
    imageUrl: null,
  },
  {
    name: 'Hyundai HB20 Diamond Plus 1.0 Turbo',
    brand: 'Hyundai',
    model: 'HB20',
    version: 'Diamond Plus 1.0 Turbo',
    year: 2024,
    fipePrice: 99990,
    consumption: 13.6,
    insurance: 2800,
    imageUrl: null,
  },
  {
    name: 'Chevrolet Onix Plus Premier 1.0 Turbo',
    brand: 'Chevrolet',
    model: 'Onix Plus',
    version: 'Premier 1.0 Turbo',
    year: 2024,
    fipePrice: 112990,
    consumption: 12.9,
    insurance: 3200,
    imageUrl: null,
  },
  {
    name: 'Jeep Compass Limited 1.3 T270',
    brand: 'Jeep',
    model: 'Compass',
    version: 'Limited 1.3 T270',
    year: 2024,
    fipePrice: 229990,
    consumption: 10.5,
    insurance: 6500,
    imageUrl: null,
  },
  {
    name: 'Renault Kwid Intense 1.0',
    brand: 'Renault',
    model: 'Kwid',
    version: 'Intense 1.0',
    year: 2024,
    fipePrice: 72990,
    consumption: 15.4,
    insurance: 2100,
    imageUrl: null,
  },
  {
    name: 'Ford Bronco Sport Wildtrak 2.0 EcoBoost',
    brand: 'Ford',
    model: 'Bronco Sport',
    version: 'Wildtrak 2.0 EcoBoost',
    year: 2024,
    fipePrice: 289990,
    consumption: 9.8,
    insurance: 8200,
    imageUrl: null,
  },
  {
    name: 'Toyota Hilux CD SRX 2.8 TDI 4x4',
    brand: 'Toyota',
    model: 'Hilux',
    version: 'CD SRX 2.8 TDI 4x4',
    year: 2024,
    fipePrice: 349990,
    consumption: 9.2,
    insurance: 9800,
    imageUrl: null,
  },
  {
    name: 'Fiat Argo Trekking 1.3 Firefly',
    brand: 'Fiat',
    model: 'Argo',
    version: 'Trekking 1.3 Firefly',
    year: 2024,
    fipePrice: 89990,
    consumption: 13.0,
    insurance: 2500,
    imageUrl: null,
  },
  {
    name: 'Volkswagen T-Cross Highline 1.4 TSI',
    brand: 'Volkswagen',
    model: 'T-Cross',
    version: 'Highline 1.4 TSI',
    year: 2024,
    fipePrice: 164990,
    consumption: 11.6,
    insurance: 4400,
    imageUrl: null,
  },
  {
    name: 'Honda HR-V EXL 1.5 Turbo',
    brand: 'Honda',
    model: 'HR-V',
    version: 'EXL 1.5 Turbo',
    year: 2024,
    fipePrice: 189990,
    consumption: 11.2,
    insurance: 5100,
    imageUrl: null,
  },
  {
    name: 'Chevrolet Tracker Premier Turbo',
    brand: 'Chevrolet',
    model: 'Tracker',
    version: 'Premier Turbo',
    year: 2024,
    fipePrice: 159990,
    consumption: 12.0,
    insurance: 4300,
    imageUrl: null,
  },
  {
    name: 'Hyundai Creta Ultimate 2.0 Flex',
    brand: 'Hyundai',
    model: 'Creta',
    version: 'Ultimate 2.0 Flex',
    year: 2024,
    fipePrice: 182990,
    consumption: 11.9,
    insurance: 4900,
    imageUrl: null,
  },
];

async function main() {
  console.log('🌱 Iniciando seed da Tabela FIPE...');

  // Remove registros existentes para evitar duplicatas
  await prisma.vehicle.deleteMany();

  for (const vehicle of vehicles) {
    await prisma.vehicle.create({ data: vehicle });
  }

  console.log(`✅ ${vehicles.length} veículos cadastrados com sucesso!`);
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
