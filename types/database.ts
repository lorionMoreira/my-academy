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
  training_id: number;
  type_exercise_id: number;
}

export interface TypeExercise {
  id?: number;
  name: string;
  slug: string; 
}

export interface Training {
  id?: number;
  date_before: string;
  date_after: string;
  restlesness: number; //dormi
}
