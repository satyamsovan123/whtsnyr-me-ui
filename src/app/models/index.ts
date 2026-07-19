export interface Location {
  latitude: number;
  longitude: number;
}

export interface Place {
  placeId: string;
  name: string;
  photoUrl?: string;
  rating?: number;
  types?: string[];
  distance?: number;
  location?: Location;
  isOpen?: boolean;
  address?: string;
}

export interface Bookmark extends Place {}

export interface PlacePrediction {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
}

export interface AiCardData {
  name: string;
  description: string;
  imageUrl?: string;
  rating?: number;
  distance?: string;
  isOpen?: boolean;
  mapLink?: string;
  swiggyLink?: string;
}

export interface AiMessage {
  sender: 'user' | 'ai';
  text: string;
  showCard?: boolean;
  cardData?: AiCardData;
  isTyping?: boolean;
}

export interface NearbyPlacesResponse {
  places: Place[];
}

export interface AutocompleteResponse {
  predictions: PlacePrediction[];
}

export interface PlaceDetailsResponse {
  location: Location;
}

export interface AiChatResponse {
  text: string;
  showCard: boolean;
  cardData?: AiCardData;
}
