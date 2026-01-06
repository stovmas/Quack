export interface Note {
  id: string;
  content: string;
  transcription: string;
  themes: string[];
  createdAt: Date;
  updatedAt: Date;
  audioBlob?: Blob;
}

export interface Theme {
  id: string;
  name: string;
  color: string;
  noteIds: string[];
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'note' | 'theme';
  color: string;
  val?: number;
}

export interface GraphLink {
  source: string;
  target: string;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}
