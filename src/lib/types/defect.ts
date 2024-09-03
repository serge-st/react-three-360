type Annotation = {
  category_name: string;
  bbox: [number, number, number, number];
};

export type JsonValue = {
  distance: string;
  video_time?: string;
  annotations: Annotation[];
};

export type Defect = Required<JsonValue>;
