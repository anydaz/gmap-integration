export interface IMarkerPosition {
  lat: number;
  lng: number;
}

export interface IAPIResponse<T> {
  data: T;
}

export interface IUploadResponse {
  id: string;
  path: string;
  fullPath: string;
}

export interface IPaginationParam {
  skip?: number;
  take?: number;
}
