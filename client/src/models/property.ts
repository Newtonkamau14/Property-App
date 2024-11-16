type Coordinates = {
  type: string;
  coordinates: number[];
};

export type IProperty = {
  property_id: string;
  property_name: string;
  property_type: string;
  property_location: string;
  property_price: number;
  property_image: string;
  property_purpose: boolean;
  geometry: Coordinates;
  createdAt: Date;
  updatedAt: Date;
};

export type PropertyProps = {
  property: IProperty;
};
