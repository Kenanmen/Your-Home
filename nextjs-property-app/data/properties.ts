export interface Property {
  id: string
  propertyImage: string
  propertyName: string
  propertyDetail: string
  price: string
  location: string
  bedrooms?: number
  bathrooms?: number
  area?: string
  garage?: string
  yearBuilt?: string
  amenities?: string[]
}

export const propertyList: Property[] = [
  {
    id: '1',
    propertyImage: '/images/property-1.jpg',
    propertyName: 'CMC, Addis Ababa, ETH',
    propertyDetail: '',
    price: '50000000',
    location: 'Bole',
    bedrooms: 3,
    bathrooms: 4,
    area: '350 sqm',
    garage: '2 Parking Spaces',
    yearBuilt: '2003',
    amenities: ['Fully equipped gym', 'garage', 'Modern kitchen']
  },
  {
    id: '2',
    propertyImage: '/images/property-2.jpg',
    propertyName: 'Addisu Gebeya, Addis Ababa, ETH',
    propertyDetail: '',
    price: '10000',
    location: 'Gulele'
  },
  {
    id: '3',
    propertyImage: '/images/property-3.jpg',
    propertyName: 'Bethel, Addis Ababa, ETH',
    propertyDetail: '',
    price: '5000',
    location: 'Kolfe'
  },
  {
    id: '4',
    propertyImage: '/images/property-4.jpg',
    propertyName: 'Lebu, Addis Ababa, ETH',
    propertyDetail: '',
    price: '5000',
    location: 'Lafto'
  },
  {
    id: '5',
    propertyImage: '/images/property-5.jpg',
    propertyName: 'Torhayloch, Addis Ababa, ETH',
    propertyDetail: '',
    price: '5000',
    location: 'Kolfe'
  },
  {
    id: '6',
    propertyImage: '/images/property-6.jpg',
    propertyName: 'Kaliti, Addis Ababa, ETH',
    propertyDetail: '',
    price: '5000',
    location: 'Akaki'
  }
]
