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

export interface TypeExercise {//peito e braço
  id?: number;
  name: string;
  slug: string; 
}

export interface Training {// unidade peito e braço
  id?: number;
  date_before: string;// tira
  date_after: string; // tira
  restlesness: number; //dormi
  toughness: number;
}

export interface TrainingHistory {
  training_id: number;
  date: string;
}
