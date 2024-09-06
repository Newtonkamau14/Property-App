type Coordinates = {
  type: string
  coordinates: number[]
};


export interface IProperty {
  property_id: string;
  property_name: string;
  property_type: string;
  property_location: string;
  property_price: number;
  property_image: string;
  property_purpose: boolean;
  geometry: Coordinates
  createdAt: Date
  updatedAt: Date
}

export interface PropertyProps {
    property: IProperty
}