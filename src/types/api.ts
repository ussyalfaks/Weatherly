export interface WeatherApiResponse {
  timezone: string;
  coord: {
    lat: number;
    lon: number;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_max: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  name: string;
}

export interface ForecastApiResponse {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
    pop: number;
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
  };
}

export interface GeocodingApiResponse {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}