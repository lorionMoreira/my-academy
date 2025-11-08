export type Item = {
  id: number;
  title: string;
  created_at: string;
};

export interface Exercise {
  id?: number;
  name: string;
  weight: number;
  repetitions: number;
  type_training_id: number;
}

export interface TypeTraining {
  id?: number;
  name: string;
  hardness: number;
}

export interface Training {
  id?: number;
  date_before: string;
  date_after: string;
  restlesness: number; //dormi
  type_training_id: number;
}
