import { FormControl } from "@angular/forms";

export interface Videogame {
  id?: number;
  title: string;
  platform: string;
  rating: string;
  difficulty: string;
  genres: string[];
  fangame: boolean;
  favourite: boolean;
}
export interface ExportVideogame {
  title: string;
  platform: string;
  rating: string;
  difficulty: string;
  genres: string[];
  fangame: boolean;
  favourite: boolean;
}

export type EditGameForm = {
  title: FormControl<string>;
  platform: FormControl<string>;
  rating: FormControl<string>;
  difficulty: FormControl<string>;
  genres: FormControl<string[]>;
  fangame: FormControl<boolean>;
  favourite: FormControl<boolean>;
};
