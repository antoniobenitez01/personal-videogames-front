import { FormControl } from "@angular/forms";

export interface Videogame {
  id: number;
  title: string;
  platform: string;
  rating: string;
  genres: string[];
  collection: boolean;
  romhack: boolean;
  fangame: boolean;
  flash: boolean;
  favourite: boolean;
}
export interface ExportVideogame {
  title: string;
  platform: string;
  rating: string;
  genres: string[];
  collection: boolean;
  romhack: boolean;
  fangame: boolean;
  flash: boolean;
  favourite: boolean;
}

export type EditGameForm = {
  title: FormControl<string>;
  platform: FormControl<string>;
  rating: FormControl<string>;
  genres: FormControl<string[]>;
  collection: FormControl<boolean>;
  romhack: FormControl<boolean>;
  fangame: FormControl<boolean>;
  flash: FormControl<boolean>;
  favourite: FormControl<boolean>;
};
